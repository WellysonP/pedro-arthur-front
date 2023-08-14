import { Flex, Image } from "@chakra-ui/react";
import BgUp from "../../assets/images/bgup.png";
import BgDown from "../../assets/images/bgdown.png";
import PedroArthur  from "../../assets/images/pedro.png";

const ContentBody = ({ children }) => {
  return (
    <Flex bg="white" direction="column" alignItems="center" pos="relative" maxW="650px" minH="100vh" h="100%"  m="0 auto" padding="32px 24px">
      <Image width="100%" pos="absolute" top="0" src={BgUp} />
      <Image width="100%" pos="absolute" bottom="0"  src={BgDown} />
      <Flex direction="column" width="100%" h="100%" padding="96px 16px 40px 16px" alignItems="center" justify="flex-start" border="12px solid #7E7935" borderRadius="999px 999px 0px 0px" h="100%" >
      <Image width="280px" src={PedroArthur} />
        {children}
      </Flex>
    </Flex>
  );
};

export default ContentBody;
