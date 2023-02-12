import { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useNavigate } from "react-router-native";
import { Searchbar } from "react-native-paper";
import Text from "./Text";
import { useDebounce } from "use-debounce";

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
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [value] = useDebounce(searchKeyword, 500);

  const onChangeSearch = (query) => setSearchKeyword(query);

  const handleChoose = (orderBy, orderDirection) => {
    setOrderBy(orderBy);
    setOrderDirection(orderDirection);
  };

  useEffect(() => {
    refetch({
      orderBy,
      orderDirection,
      searchKeyword: value,
    });
  }, [orderBy, orderDirection, value]);

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchKeyword}
      />

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
