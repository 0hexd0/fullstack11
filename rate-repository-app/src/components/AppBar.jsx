import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useQuery, useApolloClient } from "@apollo/client";
import Constants from "expo-constants";
import { Link } from "react-router-native";

import useAuthStorage from "../hooks/useAuthStorage";
import { GET_ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  link: {
    marginRight: 20,
  },
  text: {
    color: "#fff",
    lineHeight: 50,
    fontSize: 16,
    fontWeight: "bold",
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const { data, loading } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
  });

  const onLogout = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={styles.link}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {!data.me && (
          <Link to="/signin" style={styles.link}>
            <Text style={styles.text}>Sign in</Text>
          </Link>
        )}
        {!data.me && (
          <Link to="/signup" style={styles.link}>
            <Text style={styles.text}>Sign up</Text>
          </Link>
        )}
        {data.me && (
          <Link to="/newReview" style={styles.link}>
            <Text style={styles.text}>Create a review</Text>
          </Link>
        )}
        {data.me && (
          <Pressable onPress={onLogout}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
