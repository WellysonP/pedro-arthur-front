import { Flex, Box } from "@chakra-ui/react";
import Button from "../../components/button";
import ContentBody from "../../components/layout/content-body";
import Container from "../../components/spaccing/container";
import PagePadding from "../../components/spaccing/page-padding";
import TableGuests from "../../components/table";

const Home = () => {
  return (
    <Flex height="100vh" >
      <Box width="50vw"></Box>
      <Container>
        <PagePadding>
          <ContentBody>
            <TableGuests />
            <>Home</>
            <Button className="primary">Adicionar</Button>
          </ContentBody>
        </PagePadding>
      </Container>
      <Box width="50vw" ></Box>
    </Flex>
  );
};

export default Home;