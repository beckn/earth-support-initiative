import React from 'react';
import { useState } from "react";
import { Box, Button, Icon, Card, Input, Text, Image, VStack, Flex, HStack, Checkbox, FormControl, Center, } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';
import dataList from '../assets/apiJson/checkoutForm.json';
import { header, buttonCss } from "../styles/branding";
import { useNavigate } from 'react-router-dom';
import successImg from '../assets/images/SuccessMessage.png'
import Footer from '../components/Footer';

const SuccessPayment = (item, items) => {
  const { t } = useTranslation();
  const location = useLocation();
  const state = location?.state;
  const navigate = useNavigate();
  let dataShareVia = JSON.parse(localStorage.getItem('dataShare')).type;

  let displayValue = '';
  let subType = 'ID';


  switch (dataShareVia) {
    case 'Email':
      displayValue = `john******@`+ t('APP_ID_COM');
      subType = 'ID';
      break;
    case 'FTP':
      displayValue = 'ftp://****' + t('APP_ID_COM');
      subType = 'Link';
      break;
    case 'SFTP':
      displayValue = 'sftp://****' + t('APP_ID_COM');
      subType = 'Link';
      break;
    case 'SOAP API':
      displayValue = `https://****`+  t('APP_ID_COM') +`/soap`;
      subType = 'Link';
      break;
    case 'REST API':
      displayValue = 'https://api.****.'+ t('APP_ID_COM') + '/rest';
      subType = 'Link';
      break;
    case 'Cloud Storage':
      displayValue = 'https://cloud.****.'+ t('APP_ID_COM');
      subType = 'Link';
      break;
    default:{
      dataShareVia = 'Email';
      displayValue = `john******@`+ t('APP_ID_COM');
    }
  }

  const goToHome = () => {

    navigate("/search",);
  }

  return (
    <>
      <VStack mt={15} mb={20} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
        <Image
          height={{ base: '170px', md: '170px' }}
          width={{ base: '192px', md: '192px' }}
          src={successImg}
          mb={10}
        />

        <Text fontSize={24} color="#23262F" fontWeight={400}> {t('ORDER_CONFIRMED')} </Text>
        <Text fontSize={16} color="#353945" fontWeight={400}> {t('SENT_YOUR_DATA_REPORT')} </Text>
       
        <HStack>
          <Text fontSize={16} color="#23262F" fontWeight={400}> {dataShareVia} {subType}:</Text>
          <Text fontSize={16} color="#353945" fontWeight={400}>{displayValue}</Text>
        </HStack>

        <Button mt={5} type="submit" fontSize={15} fontWeight={400} borderRadius={'12px'} onClick={goToHome} width='20rem' variant="solid" background={buttonCss?.primaryBtnColor} color={buttonCss?.primaryTxtColor} _hover={{ bg: buttonCss?.primaryBtnHoverColor }}>
          {t('GO_BACK_HOME')}
        </Button>
      </VStack>
      <Box mt={100}> <Footer /> </Box>

    </>
  );
};

export default SuccessPayment;
