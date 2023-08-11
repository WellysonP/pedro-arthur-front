import { Flex, Box } from "@chakra-ui/react";

const Container = ({ children }) => {
  return (
    <>
      <Flex mx="auto" w="100%">
        <Box flex="1" w="100%">
          {children}
        </Box>
      </Flex>
    </>
  );
};
export default Container;
