import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";

function LoginForm() {
  return (
    <form style={{ width: "100%" }}>
      <FormControl isRequired isInvalid={true}>
        <FormLabel>Email</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input type="email" placeholder="Enter your email" />
        </InputGroup>
        <FormErrorMessage>Email Required</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={true}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <LockIcon color="gray.300" />
          </InputLeftElement>
          <Input type="password" placeholder="Enter your password" />
        </InputGroup>
        <FormErrorMessage>Password Required</FormErrorMessage>
      </FormControl>
      <Button size="lg" colorScheme="teal" w="full" type="submit">
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
