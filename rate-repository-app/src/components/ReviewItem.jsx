import { StyleSheet, View, Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#ffffff",
    padding: 20,
  },
  reviewItem: {
    display: "flex",
    flexDirection: "row",
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
  header: {
    fontWeight: "bold",
  },
  date: {
    color: theme.colors.textSecondary,
    marginTop: 4,
    marginBottom: 10,
  },
  btnWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitBtn: {
    backgroundColor: theme.colors.primary,
    color: "white",
    borderRadius: 4,
    height: 40,
    lineHeight: 40,
    marginTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  redBtn: {
    backgroundColor: theme.colors.error,
  },
});

const ReviewItem = ({ review, forCurrentUser = false, onDelete }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/${review.repository.id}`);
  };

  const handleDelete = () => {
    Alert.alert("Delete review", "Are you sure want to delete this review?", [
      {
        text: "CANCEL",
        onPress: () => {},
      },
      { text: "DELETE", onPress: () => onDelete(review.id) },
    ]);
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.reviewItem}>
        <Text style={styles.rating}>{review.rating}</Text>
        <View style={{ flexShrink: 1 }}>
          <Text style={styles.header}>
            {forCurrentUser ? review.repository.fullName : review.username}
          </Text>
          <Text style={styles.date}>{review.date}</Text>
          <Text style={styles.text}>{review.text}</Text>
        </View>
      </View>
      {forCurrentUser && (
        <View style={styles.btnWrapper}>
          <Pressable onPress={handleView}>
            <Text style={styles.submitBtn}>View repository</Text>
          </Pressable>
          <Pressable onPress={handleDelete}>
            <Text style={[styles.submitBtn, styles.redBtn]}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
