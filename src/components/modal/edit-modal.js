import React, { useState } from "react";
import axios from "../../services/index."
import { WhatsappShareButton, WhatsappIcon } from "react-share"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  IconButton,
  Stack,
  Input,
  useDisclosure,
  FormLabel,
} from "@chakra-ui/react";
import DeleteConfirmationModal from "./delete-confirmation-modal";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";

const EditModal = ({ isOpen, onDelete, onClose, guestData }) => {
  const [quantity, setQuantity] = useState(guestData.quantity);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
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

  const handleCopyLink = () => {
    if (guestData.generatedLink) {
      navigator.clipboard.writeText(guestData.generatedLink)
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setQuantity(numericValue);
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
              type="text"
              value={quantity}
              onChange={handleInputChange}
              inputMode="numeric"
            />
            {guestData.generatedLink && (
              <Stack mt={4} direction="row" spacing={2} align="center">
                <Input
                  value={guestData.generatedLink}
                  isReadOnly
                  pr="4.5rem"
                  onClick={handleCopyLink}
                />
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <IconButton
                    aria-label={isLinkCopied ? 1 : 0}
                    icon={isLinkCopied ? <CheckIcon /> : <CopyIcon />}
                    colorScheme={isLinkCopied ? "green" : "blue"}
                    onClick={handleCopyLink}
                    isDisabled={isLinkCopied}
                  />
                  <div style={{ height: "40px", width: "40px", display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: "12px" }}>
                    <WhatsappShareButton url={guestData.generatedLink} title="Convite chá de bebe" separator=": " >
                      <WhatsappIcon borderRadius={8} size={40}></WhatsappIcon>
                    </WhatsappShareButton>
                  </div>
                </div>
              </Stack>
            )}
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
          onClose();
        }}
      />
    </>
  );
};

export default EditModal;
