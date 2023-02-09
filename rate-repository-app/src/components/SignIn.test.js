import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { string, object } from "yup";
import { SignInContainer } from "./SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();

      const initialValues = {
        username: "",
        password: "",
      };

      const validationSchema = object().shape({
        username: string()
          .min(3, "username must be at least 8 characters long")
          .required("Username is required"),
        password: string()
          .min(3, "Password must be at least 8 characters long")
          .required("Password is required"),
      });

      const { getByPlaceholderText, getByText } = render(
        <SignInContainer
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        />
      );

      fireEvent.changeText(getByPlaceholderText("Username"), "kalle");
      fireEvent.changeText(getByPlaceholderText("Password"), "password");
      fireEvent.press(getByText("Sign in"));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
