import { useParams } from 'react-router-native';
import { StyleSheet, Pressable, FlatList, View } from 'react-native'
import { format, parseISO } from 'date-fns'
import { useQuery } from '@apollo/client'
import * as Linking from 'expo-linking';

import Text from './Text';
import RepositoryItem from "./RepositoryItem"
import { GET_REPOSITORY } from "../graphql/queries";
import theme from '../theme'

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    submitBtn: {
        backgroundColor: theme.colors.primary,
        color: "white",
        borderRadius: 4,
        height: 40,
        lineHeight: 40,
        margin: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    reviewItem: {
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        padding: 20
    },
    repositoryInfo: {
        backgroundColor: '#ffffff',
        marginBottom: 10
    },
    rating: {
        color: theme.colors.primary,
        borderColor: theme.colors.primary,
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: 36,
        borderWidth: 2,
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 20,
        fontSize: 16
    },
    username: {
        fontWeight: 'bold'
    },
    date: {
        color: theme.colors.textSecondary,
        marginTop: 4,
        marginBottom: 10
    },
    text: {

    }
});

const RepositoryInfo = ({ repository }) => {
    const onOpen = () => {
        Linking.openURL(repository.url)
    }

    return (
        <View style={styles.repositoryInfo}>
            <RepositoryItem repository={repository} />
            <Pressable onPress={onOpen}>
                <Text style={styles.submitBtn}>Open in Github</Text>
            </Pressable>
        </View>
    )
};

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.reviewItem}>
            <Text style={styles.rating}>{review.rating}</Text>
            <View style={{flexShrink: 1}}>
                <Text style={styles.username}>{review.username}</Text>
                <Text style={styles.date}>{review.date}</Text>
                <Text style={styles.text}>{review.text}</Text>
            </View>
        </View>
    )
};

const SingleRepository = () => {
    const { id } = useParams();
    const { data, loading } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: {
            id
        }
    });

    if (loading) {
        return (<Text>loading...</Text>)
    }
    console.log('data.repository', data.repository)


    const reviewNodes = data && data.repository && data.repository.reviews
        ? data.repository.reviews.edges.map((edge) => edge.node).map(node => ({
            ...node,
            username: node.user.username,
            date: format(parseISO(node.createdAt), "MM.dd.yyyy")
        }))
        : [];

    return (
        <>
            <RepositoryInfo repository={data.repository} />
            <FlatList
                data={reviewNodes}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => (
                    <ReviewItem review={item} />
                )}
            />
        </>
    )
}

export default SingleRepository