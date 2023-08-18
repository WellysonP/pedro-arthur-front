import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
} from "@chakra-ui/react";

const ConfirmPresence = ({ isOpen, onClose, openThankYouModal }) => {
  const [numberOfPeople, setNumberOfPeople] = useState(0);

  const handleConfirm = () => {
    onClose();
    openThankYouModal()
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmar Presença</ModalHeader>
        <ModalBody>
          <Input
            type="number"
            placeholder="Quantidade de acompanhantes"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
          />
        </ModalBody>
        <ModalFooter style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Button onClick={handleConfirm} colorScheme="green">
            Confirmar
          </Button>
          <Button onClick={onClose} colorScheme="gray">
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmPresence;