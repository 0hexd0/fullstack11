import { Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { string, object, number } from "yup";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useState } from "react";

let timer = null;

const validationSchema = object().shape({
  ownerName: string()
    .min(3, "Repository owner name must be at least 8 characters long")
    .required("Repository owner name is required"),
  repositoryName: string()
    .min(3, "Repository name must be at least 8 characters long")
    .required("Repository name is required"),
  rating: number()
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100")
    .required("Rating is required"),
  text: string().max(100, "Review must be at most 100 characters long"),
});

const styles = StyleSheet.create({
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
  errorText: {
    marginLeft: 12,
    color: theme.colors.error,
  },
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const ReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput
        keyboardType="numeric"
        name="rating"
        placeholder="Rating between 0 and 100"
      />
      <FormikTextInput
        name="text"
        multiline
        placeholder="review"
        style={{ height: 80 }}
      />
      <Pressable onPress={onSubmit}>
        <Text style={styles.submitBtn}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export const FormContainer = ({
  initialValues,
  onSubmit,
  validationSchema,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const NewReviewForm = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const data = await mutate({
        variables: {
          review: {
            ...values,
            rating: Number.parseInt(values.rating),
          },
        },
      });
      if (data) {
        navigate(`/${data.data.createReview.repositoryId}`);
      }
    } catch (e) {
      setErrMsg(e.message);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setErrMsg("");
      }, 5000);
    }
  };

  return (
    <>
      <FormContainer
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      />
      {!!errMsg && <Text style={styles.errorText}>{errMsg}</Text>}
    </>
  );
};

export default NewReviewForm;
