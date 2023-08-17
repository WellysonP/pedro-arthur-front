import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/spaccing/container";
import PagePadding from "../../components/spaccing/page-padding";
import ContentBody from "../../components/layout/content-body";
import Button from "../../components/button";

const Guest = () => {
  const { guestName } = useParams();
  console.log(guestName);

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
                {guestName}, você está convidado(a) a comemorar este dia espcial
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
                ás{" "}
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
                Pacotes de fraldas P
              </strong>{" "}
            </Text>
            <Flex gap="4">
              <Button className="primary">Confirmar minha presença</Button>
              <Button className="secondary">Mostrar localização</Button>
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
          </ContentBody>
        </PagePadding>
      </Container>
    </Box>
  );
};

export default Guest;
