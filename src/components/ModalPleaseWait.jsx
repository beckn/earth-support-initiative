import React from 'react';
import { useState } from "react";
import { Box, Button, Icon, Card, Input, Text, Spinner, VStack, Flex, HStack, Checkbox, FormControl, FormLabel, } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Center } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';
import dataList from '../assets/apiJson/checkoutForm.json';
import { header, buttonCss } from "../styles/branding";
import { useNavigate } from 'react-router-dom';
import './SpinnerLoader.css'; // Import the CSS for styling

const ModalPleaseWait = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const state = location?.state;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <Modal isOpen={true} size="md" mt={100}>
      <ModalOverlay />
      <Center>
        <ModalContent>
          <ModalBody textAlign="center" my={10}>
          <Spinner mb={5} size="md" width={'40px'} height={'40px'} fontWeight={600} borderWidth={4} color={buttonCss?.primaryBtnColor} />
          <Text fontSize={20} fontWeight={600}> {t('PLEASE_WAIT')}</Text>
          <Text fontSize={20} mt={1} fontWeight={400}>{t('WE_PROCESS_YOUR_PAYMENT')}</Text>
        </ModalBody>

        </ModalContent>
      </Center>
    </Modal>
  );
};

export default ModalPleaseWait;
