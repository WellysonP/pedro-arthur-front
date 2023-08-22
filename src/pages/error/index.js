import { Box, Text } from '@chakra-ui/react';
import Container from "../../components/spaccing/container";
import PagePadding from '../../components/spaccing/page-padding';
import ContentBody from '../../components/layout/content-body';

const Error = () => {
  return (
    <Box>
      <Container>
        <PagePadding>
          <ContentBody>
            <Text textAlign="center" fontSize="24px" mt="40px" p="0 8px">Olá amiguinho(a), você tentou acessar uma página que não existe ;( Fale com Mamãe e Papai!</Text>
          </ContentBody>
        </PagePadding>
      </Container>
    </Box>
  )
}

export default Error

