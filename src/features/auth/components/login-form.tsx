import React, { FormEvent } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { login } from "requests";
import { useAppDispatch } from "store/hooks";
import { setToken } from "features/auth/auth-slice";
import { AxiosError } from "axios";

function LoginForm() {
  const toast = useToast();
  const id = "error-toast";
  const dispatch = useAppDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    login({ email, password }).then(handleResponse).catch(handleError);
  };

  const handleResponse = (data: string) => {
    dispatch(setToken(data));
    setStatus("resolved");
    showToastMessage("Login successfully", "success");
  };

  const handleError = (error: AxiosError) => {
    const msg = error.response?.data || error.message;
    setStatus("rejected");
    showToastMessage(msg, "error");
  };

  const showToastMessage = (
    message: string,
    status: "info" | "warning" | "success" | "error"
  ) => {
    if (!toast.isActive(id)) {
      toast({
        id,
        position: "top",
        title: message,
        status,
      });
    }
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <Stack spacing={5}>
        <FormControl isRequired>
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
        <FormControl isRequired>
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
        <Button
          size="lg"
          colorScheme="teal"
          w="full"
          type="submit"
          isLoading={status == "loading"}
        >
          Login
        </Button>
      </Stack>
    </form>
  );
}

export default LoginForm;
