import { StyleSheet, View } from "react-native";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  reviewItem: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    padding: 20,
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
    fontSize: 16,
  },
  username: {
    fontWeight: "bold",
  },
  date: {
    color: theme.colors.textSecondary,
    marginTop: 4,
    marginBottom: 10,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewItem}>
      <Text style={styles.rating}>{review.rating}</Text>
      <View style={{ flexShrink: 1 }}>
        <Text style={styles.username}>{review.username}</Text>
        <Text style={styles.date}>{review.date}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
