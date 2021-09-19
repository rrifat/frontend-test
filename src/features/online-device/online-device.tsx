import { Box, Button, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { useAppDispatch } from "store/hooks";
import { setToken } from "features/auth/auth-slice";
import Orbit from "features/online-device/components/orbit";
import { removeToken } from "utility";
import NotifyModal from "features/online-device/components/notify-modal";

function OnlineDevice() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    removeToken();
    dispatch(setToken(null));
  };

  return (
    <>
      <Flex direction="column" h="100vh">
        <Box padding="5" bg="gray.400" w="full" h="full">
          <Orbit />
        </Box>
        <Box padding="5" bg="gray.300" w="full">
          <Stack direction="row" align="center" justify="center" spacing={10}>
            <Button colorScheme="teal" onClick={onOpen}>
              Notify
            </Button>
            <Button colorScheme="teal" variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Box>
      </Flex>
      <NotifyModal onClose={onClose} isOpen={isOpen} />
    </>
  );
}

export default OnlineDevice;
