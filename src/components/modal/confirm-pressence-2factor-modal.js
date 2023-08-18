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
} from "@chakra-ui/react";

const ConfirmPresence2Factor = ({ isOpen, onClose, openThankYouModal, totalPeoples, guest }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true)
        await axios.put(`confirmed/${guest.id}`, { isConfirmed: 1, quantity: totalPeoples })
        setIsLoading(false)
        onClose();
        openThankYouModal()
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirmar Presença</ModalHeader>
                <ModalBody>
                    Você confirma um total de {totalPeoples} {totalPeoples == 1 ? "pessoa" : "pessoas"} contando com você?
                </ModalBody>
                <ModalFooter style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <Button
                        isLoading={isLoading}
                        loadingText="Confirmando ..."
                        onClick={handleConfirm}
                        colorScheme="green">
                        Confirmar
                    </Button>
                    <Button onClick={onClose} colorScheme="gray">
                        Voltar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmPresence2Factor;