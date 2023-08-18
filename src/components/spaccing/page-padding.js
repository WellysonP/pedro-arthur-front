import { Box, Flex } from "@chakra-ui/react";

const PagePadding = ({ children }) => {
  return (
    <>
      <Flex
        mx="auto"
        w="100%"
        maxWidth="1920px"
      >
        <Box flex="1" w="100%">
          {children}
        </Box>
      </Flex>
    </>
  );
};

export default PagePadding;
