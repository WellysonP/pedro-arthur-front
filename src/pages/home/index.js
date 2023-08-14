import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import Button from "../../components/button";
import ContentBody from "../../components/layout/content-body";
import Container from "../../components/spaccing/container";
import PagePadding from "../../components/spaccing/page-padding";
import TableGuests from "../../components/table";
import EditModal from "../../components/modal/edit-modal";
import { useState } from "react";

const Home = () => {
  const guests = [
    { nome: "francisco", qtd: 2, status: "pendente" },
    { nome: "wellyson", qtd: 5, status: "confirmado" },
    { nome: "raquel", qtd: 1, status: "confirmado" },
  ];


  const [selectedGuest, setSelectedGuest] = useState(null);

  const handleDeleteGuest = (guestName) => {
    console.log(`Convidado deletado: ${guestName}`);
  };
  
  const handleEditClick = (guest) => {
    setSelectedGuest(guest);
  };

  const handleCloseModal = () => {
    setSelectedGuest(null);
  };
  
  return (
    <Box>
      <Container>
        <PagePadding>
          <ContentBody>
            <Text mt="64px" mb="24px" fontSize="20px" fontWeight="bold">
              Temos um total de{" "}
              <strong style={{ color: "#5D862A" }}>50 </strong>convidados
            </Text>
            <TableGuests guests={guests} handleEditClick={handleEditClick} />
            {selectedGuest && (
          <EditModal
          isOpen={selectedGuest !== null}
          onClose={handleCloseModal}
          guestData={selectedGuest}
          onDelete={handleDeleteGuest}  // Passando a função onDelete
        />
        )}
            <Box mt="24px" texAlign="center">
              <Button className="primary">Adicionar</Button>
            </Box>
          </ContentBody>
        </PagePadding>
      </Container>
    </Box>
  );
};

export default Home;
