import { Flex, Image } from "@chakra-ui/react";
import BgUp from "../../assets/images/bgup.png";
import BgDown from "../../assets/images/bgdown.png";

const ContentBody = ({ children }) => {
  return (
    <Flex bg={"white"} direction="column" alignItems="center">
      <Image width="200vh" src={BgUp} />
      <Flex direction="column" alignItems="center" justify="center">
        {children}
      </Flex>
      <Image src={BgDown} />
    </Flex>
  );
};

export default ContentBody;
