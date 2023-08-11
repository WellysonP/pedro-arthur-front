import { Box, Image } from "@chakra-ui/react";
import BgUp from "../../assets/images/bgup.png";
import BgDown from "../../assets/images/bgdown.png";

const ContentBody = ({ children }) => {
  return (
    <>
      <Box>
        <Image src={BgUp} />

        {children}
        <Image src={BgDown} />
      </Box>
    </>
  );
};

export default ContentBody;
