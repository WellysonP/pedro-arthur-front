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
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";
import image from "../../assets/images/pedro.png"
import { WhatsappShareButton, WhatsappIcon } from "react-share"
import { saveAs } from 'file-saver';

const AddModal = ({ isOpen, onClose, onReset }) => {
  const [name, setName] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const baseURLApplication = process.env.REACT_APP_BASE_URL_APPLICATION

  const handleShareImage = () => {
    const blob = fetch(image).then((r) => r.blob());
    blob.then((imageBlob) => {
      const imageUrl = URL.createObjectURL(imageBlob);
      saveAs(imageUrl, 'minha-imagem.jpg');
    });
  };

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
    const responseLink = await axios.put(`confirmed/${id}`, { isconfirmed: 0, quantity: 0, generatedLink: link })
    setIsLoading(false);
  };

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink)
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
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <IconButton
                  aria-label={isLinkCopied ? 1 : 0}
                  icon={isLinkCopied ? <CheckIcon /> : <CopyIcon />}
                  colorScheme={isLinkCopied ? "green" : "blue"}
                  onClick={handleCopyLink}
                  isDisabled={isLinkCopied}
                />
                <div style={{ height: "40px", width: "40px", display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: "12px" }}>
                  <WhatsappShareButton url={generatedLink} title="Convite chá de bebe" separator=": ">
                    <WhatsappIcon borderRadius={8} size={40}></WhatsappIcon>
                  </WhatsappShareButton>
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
  );
};

export default AddModal;
