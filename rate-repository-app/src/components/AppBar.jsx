import { View, Text, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={styles.link}>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link to="/signin" style={styles.link}>
          <Text style={styles.text}>Login</Text>
        </Link>
        <Link to="/signin" style={styles.link}>
          <Text style={styles.text}>Login</Text>
        </Link>
        <Link to="/signin" style={styles.link}>
          <Text style={styles.text}>Login</Text>
        </Link>
        <Link to="/signin" style={styles.link}>
          <Text style={styles.text}>Login</Text>
        </Link>
        <Link to="/signin" style={styles.link}>
          <Text style={styles.text}>Login</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
