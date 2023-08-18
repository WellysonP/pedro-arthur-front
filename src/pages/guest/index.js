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


const Guest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirmModal2FactorOpen, setIsConfirmModal2FactorOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [guest, setGuest] = useState("")
  const [totalPeoples, setTotalPeoples] = useState(0)


  useEffect(() => {
    const fetchData = async () => {
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
    fetchData()
  }, [])

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

  useEffect(() => { }, [totalPeoples])

  return (
    <Box>
      <Container>
        <PagePadding>
          <ContentBody>
            <Box
              mt="64px"
              borderBottom="1px solid #000"
              borderTop="1px solid #000"
              style={{ borderStyle: "dashed" }}
              py="16px"
            >
              <Text textAlign="center" fontSize="20px" fontWeight="bold">
                {guest.name}, estamos te convidando para comemorar esse dia especial conosco, contamos com sua presença.
              </Text>
              <Text
                mt="8px"
                textAlign="center"
                fontSize="20px"
                fontWeight="bold"
              >
                <strong style={{ color: "#5D862A", fontSize: "32px" }}>
                  24/09
                </strong>{" "}
                às{" "}
                <strong style={{ color: "#5D862A", fontSize: "32px" }}>
                  15:00h
                </strong>
              </Text>
              <Text
                mt="8px"
                textAlign="center"
                fontSize="20px"
                fontWeight="bold"
              >
                SÍTIO NOVO HORIZONTE (NA SAÍDA PARA PIRPIRITUBA, EM FRENTE AO
                GRUPO CENTRO CENTRY)
              </Text>
            </Box>

            <Text mt="8px" textAlign="center" fontSize="20px" fontWeight="bold">
              <strong style={{ color: "#D88000", fontSize: "24px" }}>
                Sugestão de presente
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
              <strong style={{ color: "#5D862A", fontSize: "32px" }}>
                Pacote de fraldas {guest.suggestion}
              </strong>{" "}
            </Text>
            <Flex gap="4">
              <Button className={guest.isConfirmed == 0 ? "primary" : "secondary"} onClick={openConfirmModal}>
                {guest.isConfirmed === 0 ? (
                  <>
                    <div>Confirmar </div>
                    <div>presença!</div>
                  </>
                ) : (
                  <>
                    <div>Disponível</div>
                    <div>{guest.quantity} senhas</div>
                  </>
                )}
              </Button>
              <Button
                className="secondary">
                <div>Mostrar</div>
                <div>localização!</div>
              </Button>
            </Flex>
            <Text
              mt="24px"
              mb="40px"
              textAlign="center"
              fontSize="20px"
              fontWeight="bold"
            >
              EU, MAMÃE E PAPAI CONTAMOS COM A SUA PRESENÇA
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
