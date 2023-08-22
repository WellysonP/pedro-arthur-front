import React, { useState } from "react";
import axios from "../../services/index."
import { CopyIcon, CheckIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  IconButton,
  Stack,
} from "@chakra-ui/react";

const AddModal = ({ isOpen, onClose, onDownload, onId, onClickDownload }) => {
  const [name, setName] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [id, setId] = useState("");
  const baseURLApplication = process.env.REACT_APP_BASE_URL_APPLICATION

  const handleGenerateLink = async () => {
    if (name.trim() === "") {
      alert("Por favor, preencha o campo Nome da pessoa");
      return;
    }

    setIsLoading(true);
    const response = await axios.post('register', { name: name, suggestion: suggestion })
    let id = response.data.id
    setId(id)
    const link = `${baseURLApplication}/${id}`;
    setGeneratedLink(link);
    const responseLink = await axios.put(`confirmed/${id}`, { isconfirmed: 0, quantity: 0, generatedLink: link })
    setIsLoading(false);
    onDownload(true)
    onId(id)
  };

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink)
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} onClickDownload={onClickDownload}>
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
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <IconButton
                    aria-label={isLinkCopied ? 1 : 0}
                    icon={isLinkCopied ? <CheckIcon /> : <CopyIcon />}
                    colorScheme={isLinkCopied ? "green" : "blue"}
                    onClick={handleCopyLink}
                    isDisabled={isLinkCopied}
                  />
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: "12px" }}>
                    <Button onClick={
                      () => {
                        onClickDownload()
                      }
                    }>
                      <DownloadIcon />
                    </Button>
                  </div>
                </div>
              </Stack>
            )}
          </ModalBody>
          <ModalFooter style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <Button onClick={
              () => {
                setName("")
                setSuggestion("")
                setGeneratedLink("")
                setIsLinkCopied(0)
                onDownload(false)
              }
            }
              colorScheme="gray"
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
              colorScheme="gray"
            >Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddModal;
