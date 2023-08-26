import { Box, Text } from "@chakra-ui/react";
import Button from "../../components/button";
import ContentBody from "../../components/layout/content-body";
import Container from "../../components/spaccing/container";
import PagePadding from "../../components/spaccing/page-padding";
import TableGuests from "../../components/table";
import EditModal from "../../components/modal/edit-modal";
import { useEffect, useState, useRef } from "react";
import axios from "../../services/index.";
import AddModal from "../../components/modal/add-modal";
import iconDown from "../../assets/icon/down.png"
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

const Home = () => {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [totalGuest, setTotalGuest] = useState("0");
  const [isDownload, setIsDownload] = useState(false);
  const [guests, setGuests] = useState([]);
  const [guest, setGuest] = useState("")
  const [id, setId] = useState("")
  const pdfComponentRef = useRef(null);


  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = async () => {
    await sumPeoples();
    setIsDownload(false)
    setIsAddModalOpen(false);
  };

  const handleDeleteGuest = (guestName) => {
    console.log(`Convidado deletado: ${guestName}`);
  };

  const handleEditClick = (guest) => {
    setSelectedGuest(guest);
  };

  const handleCloseModal = async () => {
    setSelectedGuest(null);
    await sumPeoples();
    setIsDownload(false)
  };

  const sumPeoples = async () => {
    try {
      const sumPeoples = await axios.get("sumPeoples");
      setTotalGuest(sumPeoples.data.total);

      const allGuests = await axios.get("");
      setGuests(allGuests.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = (option) => {
    setIsDownload(option)
  }
  const handleId = (option) => {
    setId(option)
  }
  const handleClickDownload = async () => {
    if (pdfComponentRef.current) {
      const canvas = await html2canvas(pdfComponentRef.current);
      const imgDataUrl = canvas.toDataURL("image/jpeg");
      saveAs(imgDataUrl, `${guest.name}-${guest.suggestion}.jpg`);
    } else {
      console.error("pdfComponentRef.current is null or undefined");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await sumPeoples();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const guest = await axios.get(`people/${id}`)
        setGuest(guest.data)
      } catch (error) {

      }
    };
    fetchData();
  }, [id]);

  return (
    <Box ref={pdfComponentRef}>
      <Container>
        <PagePadding>
          <ContentBody>
            {isDownload === false ?
              <>
                <Text textAlign="center" mt="64px" mb="24px" fontSize="20px" fontWeight="bold">
                  Temos um total de{" "}
                  <strong style={{ color: "#5D862A", fontFamily: "Gluten, cursive" }}>{totalGuest} </strong>
                  convidados
                </Text>
                <TableGuests guests={guests} handleEditClick={handleEditClick} />
                <Box mt="24px" texAlign="center" onClick={handleOpenAddModal}>
                  <Button className="primary" onClick={handleOpenAddModal}>
                    Adicionar
                  </Button>
                </Box>
                <Box style={{ height: "100px" }}></Box>
              </>
              : <>
                <Box
                  mt="24px"
                  borderBottom="1px solid #000"
                  borderTop="1px solid #000"
                  style={{ borderStyle: "dashed" }}
                  py="16px"
                >
                  <Text
                    textAlign="center"
                    fontSize="19px"
                    fontWeight="semibold"
                    style={{ fontFamily: "Gluten, cursive" }}
                  >
                    Olá{" "}
                    <strong style={{ fontWeight: "black", fontSize: "24px" }}>
                      {guest.name}
                    </strong>
                    , estamos te convidando para comemorar esse dia especial
                    conosco, contamos com sua presença.
                  </Text>
                  <Text
                    mt="8px"
                    textAlign="center"
                    fontSize="20px"
                    fontWeight="bold"
                  >
                    <div style={{ fontFamily: "Gluten, cursive" }}>
                      <strong style={{ color: "#5D862A", fontSize: "38px" }}>
                        24/09
                      </strong>{" "}
                      às{" "}
                      <strong style={{ color: "#5D862A", fontSize: "38px" }}>
                        15:00h
                      </strong>
                    </div>
                  </Text>
                  <Text
                    mt="8px"
                    textAlign="center"
                    fontSize="20px"
                    fontWeight="semibold"
                    style={{ fontFamily: "Gluten, cursive" }}
                  >
                    SÍTIO NOVO HORIZONTE (NA SAÍDA PARA PIRPIRITUBA, EM FRENTE AO
                    GRUPO CENTRY)
                  </Text>
                </Box>

                <Text
                  mt="8px"
                  textAlign="center"
                  fontSize="20px"
                  fontWeight="bold"
                >
                  <strong
                    style={{
                      color: "#D88000",
                      fontSize: "26px",
                      fontFamily: "Gluten, cursive",
                    }}
                  >
                    Sugestão de presente:
                  </strong>{" "}
                </Text>
                <strong style={{
                  color: "#5D862A",
                  fontSize: "38px",
                  fontFamily: "Gluten, cursive",

                }}>
                  Pacote de fraldas {guest.suggestion}
                </strong>
                <Text
                  mt="24px"
                  mb="40px"
                  textAlign="center"
                  fontSize="24px"
                  fontWeight="bold"
                >
                  <div style={{ fontFamily: "Gluten, cursive" }}>
                    CLICK NO LINK{" "}
                  </div>
                  <div
                    style={{
                      fontFamily: "Gluten, cursive",
                      display: "flex",
                      gap: "12px",
                    }}
                  >
                    ABAIXO
                    <img src={iconDown} />
                  </div>
                </Text>
              </>
            }
            {selectedGuest && (
              <EditModal
                isOpen={selectedGuest !== null}
                onClose={handleCloseModal}
                guestData={selectedGuest}
                onDelete={handleDeleteGuest}
                onDownload={handleDownload}
                onId={handleId}
                onClickDownload={handleClickDownload}
              />
            )}
            <AddModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} onDownload={handleDownload} onId={handleId} onClickDownload={handleClickDownload} />
          </ContentBody>
        </PagePadding>
      </Container>
    </Box>
  )
};

export default Home;
