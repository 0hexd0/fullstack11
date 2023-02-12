import { useQuery } from "@apollo/client";
import { FlatList, View, Text } from "react-native";
import { format, parseISO } from "date-fns";
import { GET_CURRENT_USER } from "../graphql/queries";

import ReviewItem from "./ReviewItem";
import ItemSeparator from "./ItemSeparator";

const MyReviews = () => {
  const { data, loading, fetchMore } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    variables: {
      includeReviews: true,
      first: 1,
    },
  });

  const onEndReach = () => {
    const canFetchMore = !loading && data?.me?.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
      },
    });
  };

  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  const reviewNodes = data.me.reviews.edges
    .map((edge) => edge.node)
    .map((node) => ({
      ...node,
      username: node.user.username,
      date: format(parseISO(node.createdAt), "MM.dd.yyyy"),
    }));

  return (
    <FlatList
      data={reviewNodes}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <ReviewItem forCurrentUser={true} review={item} />
      )}
    />
  );
};

export default MyReviews;
