import { useParams } from "react-router-native";
import { StyleSheet, Pressable, FlatList, View } from "react-native";
import { format, parseISO } from "date-fns";
import { useQuery } from "@apollo/client";
import * as Linking from "expo-linking";

import { GET_REPOSITORY } from "../graphql/queries";
import theme from "../theme";
import Text from "./Text";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";

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
    fontWeight: "bold",
    textAlign: "center",
  },
  repositoryInfo: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
});

const RepositoryInfo = ({ repository }) => {
  const onOpen = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View style={styles.repositoryInfo}>
      <RepositoryItem repository={repository} />
      <Pressable onPress={onOpen}>
        <Text style={styles.submitBtn}>Open in Github</Text>
      </Pressable>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: {
      id,
      first: 4,
    },
  });

  const onEndReach = () => {
    const canFetchMore =
      !loading && data?.repository?.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  if (loading) {
    return <Text>loading...</Text>;
  }

  const reviewNodes = data?.repository.reviews
    ? data.repository.reviews.edges
        .map((edge) => edge.node)
        .map((node) => ({
          ...node,
          username: node.user.username,
          date: format(parseISO(node.createdAt), "MM.dd.yyyy"),
        }))
    : [];

  return (
    <>
      <RepositoryInfo repository={data.repository} />
      <FlatList
        data={reviewNodes}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <ReviewItem review={item} />}
      />
    </>
  );
};

export default SingleRepository;
