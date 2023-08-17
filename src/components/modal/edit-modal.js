import React, { useState } from "react";
import axios from "../../services/index."
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  useDisclosure,
  FormLabel,
} from "@chakra-ui/react";
import DeleteConfirmationModal from "./delete-confirmation-modal";

const EditModal = ({ isOpen, onDelete, onClose, guestData }) => {
  const [quantity, setQuantity] = useState(guestData.quantity);
  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();

  const handleDelete = () => {
    openDeleteModal();
  };

  const handleSave = async () => {
    const response = await axios.put(`confirmed/${guestData.id}`, { isConfirmed: guestData.isConfirmed, quantity: quantity })
    console.log(`Quantidade atualizada - ${guestData.name}: ${quantity}`);
    onClose();
  };



  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar convidado: {guestData.name}</ModalHeader>
          <ModalBody>
            <FormLabel>Quantidade de acompanhantes:</FormLabel>
            <Input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </ModalBody>
          <ModalFooter gap="8px">
            <Button colorScheme="red" onClick={() => handleDelete()}>
              Excluir
            </Button>
            <Button colorScheme="green" onClick={() => handleSave()}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        guestData={guestData}
        onConfirm={async () => {
          onDelete(guestData.name);
          closeDeleteModal();
          onClose(); // Fechar o modal de edição após a exclusão
        }}
      />
    </>
  );
};

export default EditModal;
