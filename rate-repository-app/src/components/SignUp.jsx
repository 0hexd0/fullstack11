import { useState } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { useApolloClient, useMutation } from "@apollo/client";
import { Formik } from "formik";
import { string, object, ref } from "yup";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";
import useAuthStorage from "../hooks/useAuthStorage";
import { CREATE_USER } from "../graphql/mutations";

let timer = null;

const validationSchema = object().shape({
  username: string()
    .min(1, "Username must be at least 1 characters long")
    .max(30, "Username must be at most 30 characters long")
    .required("Username is required"),
  password: string()
    .min(5, "Password must be at least 5 characters long")
    .max(50, "Password must be at most 50 characters long")
    .required("Password is required"),
  passwordConfirm: string()
    .oneOf([ref("password"), null], "Password confirm must be same as Password")
    .required("Password confirm is required"),
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
  username: "",
  password: "",
  passwordConfirm: "",
};

const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Password confirmation"
        secureTextEntry={true}
      />
      <Pressable onPress={onSubmit}>
        <Text style={styles.submitBtn}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({
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
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp] = useMutation(CREATE_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({
        variables: {
          user: {
            username,
            password,
          },
        },
      });
      const { data } = await signIn({ username, password });
      authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
      navigate("/");
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
      <SignUpContainer
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      />
      {!!errMsg && <Text style={styles.errorText}>{errMsg}</Text>}
    </>
  );
};

export default SignUp;
