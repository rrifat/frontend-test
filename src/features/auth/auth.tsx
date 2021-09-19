import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import LoginForm from "features/auth/components/login-form";

function Login() {
  return (
    <Container>
      <Flex
        height="100vh"
        py={20}
        direction="column"
        justifyContent="center"
        alignItems="center"
        bg="gray.50"
        shadow="lg"
      >
        <Heading size="2xl">Login</Heading>
        <Box w="full" p={10}>
          <LoginForm />
        </Box>
      </Flex>
    </Container>
  );
}

export default Login;
