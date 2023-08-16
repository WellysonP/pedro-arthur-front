import React from 'react';
import axios from "../../services/index."
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

const DeleteConfirmationModal = ({ isOpen, onClose, guestData, onConfirm }) => {
  const confirmDelete = async () => {
    await axios.delete(`deletePeople/${guestData.id}`)


    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmar exclusão</ModalHeader>
        <ModalBody>
          Tem certeza de que deseja excluir o convidado: {guestData.name}?
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="red" onClick={confirmDelete}>
            Excluir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;