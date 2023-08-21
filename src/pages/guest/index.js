import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/spaccing/container";
import PagePadding from "../../components/spaccing/page-padding";
import ContentBody from "../../components/layout/content-body";
import Button from "../../components/button";
import axios from "../../services/index."
import ConfirmPresence from "../../components/modal/confirm-pressence-modal";
import ThankYouModal from "../../components/modal/thank-you-modal";
import ConfirmPresence2Factor from "../../components/modal/confirm-pressence-2factor-modal";
import { Helmet } from "react-helmet";


const Guest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmModal2FactorOpen, setIsConfirmModal2FactorOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [guest, setGuest] = useState("")
  const [totalPeoples, setTotalPeoples] = useState(0)


  const getGuest = async () => {
    try {
      const guest = await axios.get(`people/${id}`)
      if (guest.data == null || guest.data == undefined) {
        navigate("/")
      } else {
        setGuest(guest.data)
      }
    } catch (error) {
      navigate("/")
    }
  }

  const openThankYouModal = () => {
    setIsThankYouModalOpen(true);
  };

  const closeThankYouModal = () => {
    setIsThankYouModalOpen(false)
    setIsConfirmModalOpen(false)
    setTotalPeoples("")
  };

  const openConfirmModal = () => {
    if (guest.isConfirmed == 0) {
      setIsConfirmModalOpen(true);
    }
  };

  const openLocation = () => {
    window.location.replace("https://www.google.com/maps/place/6%C2%B049'22.8%22S+35%C2%B028'27.8%22W/@-6.823005,-35.474377,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-6.823005!4d-35.474377?entry=ttu")
  }

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const openConfirmModal2Factor = (numberOfPeople) => {
    setIsConfirmModalOpen(false);
    setTotalPeoples(numberOfPeople)
    setIsConfirmModal2FactorOpen(true);
  };

  const closeConfirmModal2Factor = () => {
    setIsConfirmModal2FactorOpen(false);
    setIsConfirmModalOpen(true);
  };

  useEffect(() => { getGuest() }, [isThankYouModalOpen])

  return (
    <Box>
      <Helmet>
        <title>Sobre - React Router com Helmet</title>
        <meta property="og:image" content="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r5.png" />
        <meta property="twitter:image" content="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r5.png" />
      </Helmet>
      <Container>
        <PagePadding>
          <ContentBody>
            <Box
              mt="24px"
              borderBottom="1px solid #000"
              borderTop="1px solid #000"
              style={{ borderStyle: "dashed" }}
              py="16px"
            >
              <Text textAlign="center" fontSize="19px" fontWeight="semibold" style={{ fontFamily: "Gluten, cursive" }}>
                Olá <strong style={{ fontWeight: "black", fontSize: "24px" }}>{guest.name}</strong>, estamos te convidando para comemorar esse dia especial conosco, contamos com sua presença.
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

            <Text mt="8px" textAlign="center" fontSize="20px" fontWeight="bold">
              <strong style={{ color: "#D88000", fontSize: "26px", fontFamily: "Gluten, cursive" }}>
                Sugestão de presente:
              </strong>{" "}
            </Text>
            <Text
              mt="8px"
              textAlign="center"
              fontSize="20px"
              fontWeight="bold"
              p="8px 16px"
              borderRadius="9999px"
              bg="#f1f2f3"
            >
              <strong style={{ color: "#5D862A", fontSize: "38px", fontFamily: "Gluten, cursive" }}>
                Pacote de fraldas {guest.suggestion}
              </strong>{" "}
            </Text>
            <Flex gap="4">
              <Button className={guest.isConfirmed == 0 ? "primary" : "secondary"} onClick={openConfirmModal}>
                {guest.isConfirmed === 0 ? (
                  <div style={{ fontWeight: "bold" }}>
                    <div >Confirmar </div>
                    <div>presença!</div>
                  </div>

                ) : (
                  <div style={{ fontWeight: "bold" }}>
                    <div>Disponível</div>
                    <div>{guest.quantity} senhas</div>
                  </div>

                )}
              </Button>
              <Button className="secondary" onClick={openLocation}>
                <div style={{ fontWeight: "bold" }}>
                  <div>Mostrar</div>
                  <div>localização!</div>
                </div>
              </Button>
            </Flex>
            <Text
              mt="24px"
              mb="40px"
              textAlign="center"
              fontSize="18px"
              fontWeight="bold"
            >
              <div style={{ fontFamily: "Gluten, cursive" }}>EU, MAMÃE E PAPAI CONTAMOS </div>
              <div style={{ fontFamily: "Gluten, cursive" }}>COM A SUA PRESENÇA</div>
            </Text>
            <ConfirmPresence isOpen={isConfirmModalOpen} onClose={closeConfirmModal} openConfirmModal2Factor={openConfirmModal2Factor} />
            <ConfirmPresence2Factor isOpen={isConfirmModal2FactorOpen} onClose={closeConfirmModal2Factor} openThankYouModal={openThankYouModal} totalPeoples={totalPeoples} guest={guest} />
            <ThankYouModal isOpen={isThankYouModalOpen} onClose={closeThankYouModal} totalPeoples={totalPeoples} />
          </ContentBody>
        </PagePadding>
      </Container>
    </Box>
  );
};


export default Guest;
