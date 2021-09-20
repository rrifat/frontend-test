import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

export const FullPageSpinner = () => (
  <Box w="full" h="100vh" d="flex" alignItems="center" justifyContent="center">
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Box>
);
