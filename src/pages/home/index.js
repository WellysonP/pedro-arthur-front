import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import Button from "../../components/button";
import ContentBody from "../../components/layout/content-body";
import Container from "../../components/spaccing/container";
import PagePadding from "../../components/spaccing/page-padding";
import TableGuests from "../../components/table";
import EditModal from "../../components/modal/edit-modal";
import { useEffect, useState } from "react";
import axios from "../../services/index."

const Home = () => {
  // const guests = [
  //   { nome: "francisco", qtd: 2, status: "pendente" },
  //   { nome: "wellyson", qtd: 5, status: "confirmado" },
  //   { nome: "raquel", qtd: 1, status: "confirmado" },
  // ];


  const [selectedGuest, setSelectedGuest] = useState(null);
  const [totalGuest, setTotalGuest] = useState('0')
  const [guests, setGuests] = useState([])

  const handleDeleteGuest = (guestName) => {
    console.log(`Convidado deletado: ${guestName}`);
  };

  const handleEditClick = (guest) => {
    setSelectedGuest(guest);
  };

  const handleCloseModal = () => {
    setSelectedGuest(null);
  };

  const sumPleoples = async () => {
    try {
      const sumPeoples = await axios.get('sumPeoples')
      setTotalGuest(sumPeoples.data.total)

      const allGuests = await axios.get('')
      setGuests(allGuests.data)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      await sumPleoples();
    };

    fetchData();
  })

  return (
    <Box>
      <Container>
        <PagePadding>
          <ContentBody>
            <Text mt="64px" mb="24px" fontSize="20px" fontWeight="bold">
              Temos um total de{" "}
              <strong style={{ color: "#5D862A" }}>{totalGuest} </strong>convidados
            </Text>
            <TableGuests guests={guests} handleEditClick={handleEditClick} />
            {selectedGuest && (
              <EditModal
                isOpen={selectedGuest !== null}
                onClose={handleCloseModal}
                guestData={selectedGuest}
                onDelete={handleDeleteGuest}
              />
            )}
            <Box mt="24px" texAlign="center">
              <Button
                className="primary"
                onClick={sumPleoples}
              >
                Adicionar
              </Button>
            </Box>
          </ContentBody>
        </PagePadding>
      </Container>
    </Box>
  );
};

export default Home;
