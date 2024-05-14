import React from 'react';
import { useState } from "react";
import { Box, Button, Icon, Card, Input, Text, Image, VStack, Flex, HStack, Checkbox, FormControl, FormLabel, } from '@chakra-ui/react';
import { RadioGroup, Radio } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';
import dataList from '../assets/apiJson/checkoutForm.json';
import { header, buttonCss } from "../styles/branding";
import { useNavigate } from 'react-router-dom';
import visa from '../assets/images/visa.png';
import master from '../assets/images/master.png';
import netBank from '../assets/images/netBank.png';
import paypal from '../assets/images/paypal.png';
import ModalPleaseWait from '../components/ModalPleaseWait';
import  SubHeader from '../components/SubHeader';
import  Footer from '../components/Footer';


const Payment = (item) => {
  const { t } = useTranslation();
  const location = useLocation();
  const state = location?.state;
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('paypal');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCardSelection = (value) => {
    setSelectedPaymentMethod(''); // Deselect payment method when card is selected
    setSelectedCard(value);
  };

  const handlePaymentMethodSelection = (value) => {
    setSelectedCard(''); // Deselect card when payment method is selected
    setSelectedPaymentMethod(value);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };


  const submitPayment = async () => {
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
       navigate('/success', {
      state: { item: state?.item },
    });
      
    }, 2000);

   
  }

  return (
    <>       
     <SubHeader title={t('SELECT_PAYMENT_METHOD')} cartItemCount={2} />

    <Box mx={'100px'} mb={20}>
      <Box>
        <Text mb={5} mt={5} fontSize={17} fontWeight={400}>{t('SAVE_CARDS')}</Text>
        <Flex justifyContent="space-between" alignItems="flex-start">
          <Flex flexDirection="column" flex={1}>
            <Card p={5} boxShadow="0px 4px 20px rgba(0, 0, 0, 0.08)" mb={3}>
              <Flex justifyContent="space-between" alignItems="center">
                <RadioGroup value={selectedCard} onChange={handleCardSelection}>
                  <Flex align="center">
                    <Radio value="visa">
                      <Flex align="center">
                        <Image mr={4} src={visa} alt="Visa Logo" width="62px" height="35px" />
                        <Text fontSize={15} color="#B5B5B5" fontWeight={400}>
                          **** **** **** 1234
                        </Text>
                      </Flex>
                    </Radio>
                  </Flex>
                  <Flex align="center" mt={2}>
                    <Radio value="master">
                      <Flex align="center">
                        <Image mr={4} src={master} alt="MasterCard Logo" width="62px" height="35px" />
                        <Text fontSize={15} color="#B5B5B5" fontWeight={400}>
                          **** **** **** 1234
                        </Text>
                      </Flex>
                    </Radio>
                  </Flex>
                </RadioGroup>
              </Flex>
            </Card>
            <Text mb={5} fontSize={17} fontWeight={400}>
              {t('OTHER_PAYMENT_METHOD')}
            </Text>
            <Card p={5} boxShadow="0px 4px 20px rgba(0, 0, 0, 0.08)} mb={3}">
              <Flex justifyContent="space-between" alignItems="center">
                <RadioGroup defaultValue="netBank" value={selectedPaymentMethod} onChange={handlePaymentMethodSelection}>
                  <Flex align="center">
                    <Radio value="netBank" className={selectedPaymentMethod == 'netBank' ? 'checkedRadioButton' : ''}>
                      <Flex align="center">
                        <Image mr={4} src={netBank} alt="NetBank Logo" width="62px" height="35px" />
                        <Text fontSize={15} fontWeight={400}>
                          {t('NET_BACKING')}
                        </Text>
                      </Flex>
                    </Radio>
                  </Flex>
                  <Flex align="center" mt={2}>
                    <Radio value="paypal" className={selectedPaymentMethod == 'paypal' ? 'checkedRadioButton' : ''}>
                      <Flex align="center">
                        <Image mr={4} src={paypal} alt="PayPal Logo" width="62px" height="35px" />
                        <Text fontSize={15} fontWeight={400}>
                          {t('PAYPAL')}
                        </Text>
                        <Text fontSize={10} ml={3} fontWeight={500} color={buttonCss?.primaryBtnColor}>
                          {t('VIEW_BALANCE')}
                        </Text>
                      </Flex>
                    </Radio>
                  </Flex>
                </RadioGroup>
              </Flex>
            </Card>
          </Flex>
          <Flex mx={4} flexDirection="column" flex={1} alignItems="flex-start">
            <Text mb={5} fontSize={17} fontWeight={400}>{t('ORDER_TOTAL_SUMMARY')}</Text>

            <Card p={5} boxShadow="0px 4px 20px rgba(0, 0, 0, 0.08)" height="250px" width='400px'>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize={15} fontWeight={600} >{state?.item?.message?.order?.items[0]?.descriptor?.name}</Text>
                {/* <Text fontSize={15} fontWeight={600} >$ {state?.item?.message?.order?.quote?.price?.value}</Text> Example amount */}
              </Flex>
              <Text mt={2} fontSize={12} fontWeight={400} >{t('PROVIDED_BY')} {state?.item?.message?.order?.provider?.descriptor?.name} </Text>
              <Box my={2} borderBottom="0.5px solid #BFBFBF" mb={4} />

              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize={15} fontWeight={400} >{t('SUBTOTAL')}</Text>
                <Text fontSize={15} fontWeight={400} >$ {state?.item?.message?.order?.quote?.breakup[0]?.price?.value}</Text> {/* Example amount */}
              </Flex>
              <Flex mt={4} justifyContent="space-between" alignItems="center">
                <Text fontSize={15} fontWeight={400} >{t('TAXES')}</Text>
                <Text fontSize={15} fontWeight={400} >$ {state?.item?.message?.order?.quote?.breakup[1]?.price?.value}</Text> {/* Example amount */}
              </Flex>
              <Box my={2} borderBottom="0.5px solid #BFBFBF" mb={4} />

              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize={15} fontWeight={600} >{t('TOTAL')}</Text>
                <Text fontSize={15} fontWeight={600} >$ {state?.item?.message?.order?.quote?.price?.value}</Text> {/* Example amount */}
              </Flex>
            </Card>
          </Flex>
        </Flex>
      </Box>
      <Button mt={5} type="submit" onClick={submitPayment} width='20rem' variant="solid" background={buttonCss?.primaryBtnColor} color={buttonCss?.primaryTxtColor}>
        {t('CONTINUE')}
      </Button>

      {showSuccessModal && (
        <ModalPleaseWait
          message="Your success message goes here!"
          onClose={handleCloseSuccessModal}
        />
      )}
    </Box>
    <Box mt={100}> <Footer /> </Box>

    </>
  );
};

export default Payment;
