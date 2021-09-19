import React, { FormEvent } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { login } from "requests";
import { useAppDispatch } from "store/hooks";
import { setToken } from "features/auth/auth-slice";

function LoginForm() {
  const toast = useToast();
  const id = "error-toast";
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password })
      .then((data) => {
        window.localStorage.setItem("__auth_token__", data);
        dispatch(setToken(data));
      })
      .catch((error) => {
        if (!toast.isActive(id)) {
          toast({
            id,
            position: "top",
            title: error.response.data || error.message,
            status: "error",
          });
        }
      });
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <FormControl isRequired isInvalid={true}>
        <FormLabel>Email</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <FormErrorMessage>Email Required</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={true}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <LockIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
