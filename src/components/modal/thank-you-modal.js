import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";

const ThankYouModal = ({ isOpen, onClose, totalPeoples }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agradecemos sua presença!</ModalHeader>
        <ModalBody>
          Obrigado pela confirmação de presença. Estamos ansiosos para vê-lo{totalPeoples == 1 ? "" : "s"}!
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ThankYouModal;
