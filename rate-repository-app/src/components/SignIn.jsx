import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { string, object } from 'yup';
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

const validationSchema = object().shape({
  username:
  string()
      .min(3, 'username must be at least 8 characters long')
      .required('Username is required'),
  password:
  string()
      .min(3, 'Password must be at least 8 characters long')
      .required('Password is required'),
});

const styles = StyleSheet.create({
  signBtn: {
    backgroundColor: theme.colors.primary,
    color: "white",
    borderRadius: 4,
    height: 40,
    lineHeight: 40,
    margin: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const initialValues = {
  username: "",
  password: "",
};

const BodyMassIndexForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <Pressable onPress={onSubmit}>
        <Text style={styles.signBtn}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <BodyMassIndexForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
