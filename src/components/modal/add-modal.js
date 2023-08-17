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
  useDisclosure,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";

const AddModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleGenerateLink = () => {
    if (name.trim() === "") {
      alert("Por favor, preencha o campo Nome da pessoa");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const link = `http://localhost:3000/convidado/${encodeURIComponent(name)}`;
      setGeneratedLink(link);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopyLink = () => {
    if (generatedLink) {
      const input = document.createElement("input");
      input.value = generatedLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setIsLinkCopied(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Gerar Link Personalizado</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Nome do convidado"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            mt={4}
            colorScheme="blue"
            isLoading={isLoading}
            loadingText="Gerando..."
            onClick={handleGenerateLink}
          >
            Gerar Link
          </Button>
          {generatedLink && (
            <Stack mt={4} direction="row" spacing={2} align="center">
              <Input
                value={generatedLink}
                isReadOnly
                pr="4.5rem"
                onClick={handleCopyLink}
              />
              <IconButton
                aria-label={isLinkCopied ? "Link Copiado" : "Copiar Link"}
                icon={isLinkCopied ? <CheckIcon /> : <CopyIcon />}
                colorScheme={isLinkCopied ? "green" : "blue"}
                onClick={handleCopyLink}
                isDisabled={isLinkCopied}
              />
            </Stack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddModal;
