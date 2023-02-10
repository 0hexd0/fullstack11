import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useNavigate } from "react-router-native";
import { Text } from "react-native";

import useRepositories from "../hooks/useRepositories";
import ListHeader from "./ListHeader";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handlePress = (repository) => {
    navigate(`/${repository.id}`);
  };

  return (
    <>
      <FlatList
        data={repositoryNodes}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
      />
    </>
  );
};

const RepositoryList = () => {
  const [data, loading, refetch] = useRepositories();

  const handleChoose = (orderBy, orderDirection) => {
    refetch({
      orderBy,
      orderDirection,
    });
  };

  return (
    <>
      <ListHeader onChoose={handleChoose} />
      {loading && (
        <View>
          <Text>loading...</Text>
        </View>
      )}
      {!loading && <RepositoryListContainer repositories={data.repositories} />}
    </>
  );
};

export default RepositoryList;
