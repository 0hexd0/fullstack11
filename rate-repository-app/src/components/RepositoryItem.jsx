import { View, Text, StyleSheet, Image } from 'react-native';

const headLineHeight = 30

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        padding: 20
    },
    fullName: {
        fontWeight: 'bold',
        lineHeight: headLineHeight
    },
    language: {
        color: "white",
        backgroundColor: '#0366d6'
    },
    description: {
        lineHeight: headLineHeight
    },
    profile: {
        width: 50,
        height: 50,
        marginRight: 20
    },
});

const RepositoryItem = (props) => {
    const repository = props.repository
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.profile} source={{
                    uri: repository.ownerAvatarUrl
                }} />
                <View>
                    <Text style={styles.fullName}>{repository.fullName}</Text>
                    <Text style={styles.description}>{repository.description}</Text>
                    <Text style={styles.language}> {repository.language}</Text>
                </View>
            </View>


            <Text>Stars: {repository.stargazersCount}</Text>
            <Text>Forks: {repository.forksCount}</Text>
            <Text>Reviews: {repository.reviewCount}</Text>
            <Text>Rating: {repository.ratingAverage}</Text>
        </View>
    )
}

export default RepositoryItem