import React, { FormEvent } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { getToken } from "utility";
import { notify } from "requests";
import { AxiosError } from "axios";

export type State = {
  name: string;
  email: string;
  repoUrl: string;
  message: string;
};

function NotifyModal({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) {
  const toast = useToast();
  const id = "toast-id";
  const { sender }: { sender: string } = jwt_decode(getToken() as string);
  const [state, setState] = React.useReducer(
    (s: State, a: Partial<State>) => ({ ...s, ...a }),
    {
      name: "",
      email: sender,
      repoUrl: "https://github.com/rrifat/frontend-test",
      message: "",
    }
  );
  const [status, setStatus] = React.useState("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    notify(state).then(handleResponse).catch(handleError);
  };

  const handleResponse = (data: string) => {
    setStatus("resolved");
    showToastMessage(data, "success");
    onClose();
  };

  const handleError = (error: AxiosError) => {
    setStatus("rejected");
    const msg = error.response?.data || error.message;
    showToastMessage(msg, "error");
  };

  const showToastMessage = (
    message: string,
    status: "error" | "info" | "warning" | "success"
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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notify after completion</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Stack>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    placeholder="Username"
                    value={state.name}
                    onChange={(e) => setState({ name: e.target.value })}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={state.email}
                    readOnly
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Repo Url</FormLabel>
                  <Input
                    placeholder="Repo Url"
                    value={state.repoUrl}
                    readOnly
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    placeholder="Message"
                    value={state.message}
                    onChange={(e) => setState({ message: e.target.value })}
                  />
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                type="submit"
                isLoading={status == "loading"}
              >
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NotifyModal;
