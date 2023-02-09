import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import theme from "../theme";
import AppBar from "./AppBar";
// routes
import RepositoryList from "./RepositoryList";
import SingleRepository from "./SingleRepository";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NewReviewForm from "./NewReviewForm";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/:id" element={<SingleRepository />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/newReview" element={<NewReviewForm />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
