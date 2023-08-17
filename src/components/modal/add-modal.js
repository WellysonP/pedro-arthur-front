import React, { useEffect, useState } from "react";
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
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";
import { color } from "framer-motion";

const AddModal = ({ isOpen, onClose, onReset }) => {
  const [name, setName] = useState("");
  const [suggestion, setSuggestion] = useState("");
  let [id, setId] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const baseURLApplication = process.env.REACT_APP_BASE_URL_APPLICATION

  const handleGenerateLink = async () => {
    if (name.trim() === "") {
      alert("Por favor, preencha o campo Nome da pessoa");
      return;
    }

    setIsLoading(true);
    const response = await axios.post('register', { name: name, suggestion: suggestion })
    let id = response.data.id
    const link = `${baseURLApplication}/${id}`;
    setGeneratedLink(link);
    setIsLoading(false);
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
          <Input
            marginTop={5}
            placeholder="Sugestão do tamanho da fralda"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
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
                aria-label={isLinkCopied ? 1 : 0}
                icon={isLinkCopied ? <CheckIcon /> : <CopyIcon />}
                colorScheme={isLinkCopied ? "green" : "blue"}
                onClick={handleCopyLink}
                isDisabled={isLinkCopied}
              />
            </Stack>
          )}
        </ModalBody>
        <ModalFooter style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={
            () => {
              setName("")
              setSuggestion("")
              setGeneratedLink("")
              setIsLinkCopied(0)
            }
          }
            colorScheme="teal"
          >Resetar</Button>
          <Button onClick={
            () => {
              setName("")
              setSuggestion("")
              setGeneratedLink("")
              setIsLinkCopied(0)
              onClose()
            }
          }
            colorScheme="red"
          >Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddModal;
