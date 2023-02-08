import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  default: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: theme.colors.border
  },
  error: {
    borderColor: theme.colors.error
  }
});

const TextInput = ({ style, ...props }) => {
  const textInputStyle = [styles.default, style, props.error && styles.error];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;