import React from "react";
import "./SpinnerLoader.css"; // Import the CSS for styling
import {
  Box,
  Button,
  Icon,
  Card,
  Input,
  Text,
  Spinner,
  VStack,
  Flex,
  HStack,
  Checkbox,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Center,
} from "@chakra-ui/react";
import { header, buttonCss } from "../styles/branding";
import { useTranslation } from "react-i18next";

const Loader = () => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={true} size="md" mt={100}>
      <ModalOverlay />
      <Center>
        <ModalContent>
          <ModalBody textAlign="center" my={10}>
            <Spinner
              mb={5}
              size="md"
              width={"40px"}
              height={"40px"}
              fontWeight={600}
              borderWidth={4}
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color={buttonCss?.primaryBtnColor}
            />
            <Text fontSize={20} mt={1} fontWeight={400}>
              {t("SEARCH_CLIMATE_RESILIENCE")}
            </Text>
          </ModalBody>
        </ModalContent>
      </Center>
    </Modal>
  );
};

export default Loader;
