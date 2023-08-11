import Button from "../../components/button";
import ContentBody from "../../components/layout/content-body";
import Container from "../../components/spaccing/container";
import PagePadding from "../../components/spaccing/page-padding";
import TableGuests from "../../components/table";

const Home = () => {
  return (
    <>
      <Container>
        <PagePadding>
          <ContentBody>
            <TableGuests />
            <>Home</>
            <Button className="primary">Adicionar</Button>
          </ContentBody>
        </PagePadding>
      </Container>
    </>
  );
};

export default Home;
