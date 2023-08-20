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

const ConfirmPresence = ({ isOpen, onClose, openConfirmModal2Factor }) => {
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const parsedNumber = parseInt(numberOfPeople);

  const handleConfirm = () => {

    if (isNaN(parsedNumber) || parsedNumber <= 0) {

    } else {
      onClose();
      setNumberOfPeople("")
      openConfirmModal2Factor(parsedNumber);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setNumberOfPeople(inputValue);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmar Presença</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="Total de pessoas"
            value={numberOfPeople}
            onChange={handleInputChange}
            inputMode="numeric"
          />
        </ModalBody>
        <ModalFooter style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Button onClick={handleConfirm} colorScheme={(isNaN(parsedNumber) || parsedNumber <= 0) ? "gray" : "green"}>
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
