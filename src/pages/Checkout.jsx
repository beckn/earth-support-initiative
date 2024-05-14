import React from 'react';
import { useState } from "react";
import { Box, Button, Icon, Card, Input, Text, Image, VStack, Flex, HStack, Checkbox, FormControl, FormLabel, } from '@chakra-ui/react';
import { InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';
import dataList from '../assets/apiJson/checkoutForm.json';
import { header, buttonCss } from "../styles/branding";
import { useNavigate } from 'react-router-dom';
import  SubHeader from '../components/SubHeader';
import  Footer from '../components/Footer';
import onSelect from '../assets/apiJson/on_select.json';

const Checkout = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const state = location?.state;
    const navigate = useNavigate();
    const [name, setName] = useState('Jon Doe');
    const [email, setEmail] = useState('jondoe@gmail.com');
   const [item, setItem] = useState(onSelect);



    const doPayment = async() =>{
        navigate('/payment', {
            state: { item: item},
          });
    }

    return (
        <>
        <SubHeader title={t('CHECKOUT')} cartItemCount={2} />

        <Box mx={'100px'} mt={10}>
            <Box>
                <Text mb={5} fontSize={17} fontWeight={400} >{t('ORDER_OVERVIEW')}</Text>
                <Card p={5} boxShadow="0px 4px 20px rgba(0, 0, 0, 0.08)" >
                    <Flex justifyContent="space-between" alignItems="center">
                        <Text fontSize={15} fontWeight={600} >{item?.message?.order?.items[0]?.descriptor?.name}</Text>
                        <Text fontSize={15} fontWeight={600} >$ {item?.message?.order?.quote?.price?.value}</Text> {/* Example amount */}
                    </Flex>
                    <Text mt={2} fontSize={12} fontWeight={400} >{t('PROVIDED_BY')} {item?.message?.order?.provider?.descriptor?.name}</Text>

                </Card>
            </Box>

            <Box mt={5}>
                <Flex justifyContent="space-between" alignItems="center">
                    <Text mb={5} fontSize={17} fontWeight={400} >{t('BILLING_DETAILS')}</Text>
                    <Text mb={5} fontSize={15} fontWeight={400} color={buttonCss?.primaryBtnColor} >{t('CHANGE')}</Text>
                </Flex>
                <Card p={5} boxShadow="0px 4px 20px rgba(0, 0, 0, 0.08)" >
                    <InputGroup>
                        <InputLeftElement pointerEvents="none" children={<FaUser color="gray.300" />} />
                        <Input id="name" type="text" placeholder={t('NAME')} fontSize={15} value={name} onChange={(e) => setName(e.target.value)} borderTop="none" borderLeft="none" borderRight="none" borderColor="gray.300" />
                    </InputGroup>
                    <InputGroup mt={4}>
                        <InputLeftElement pointerEvents="none" children={<FaEnvelope color="gray.300" />} />
                        <Input id="email" type="email" placeholder={t('EMAIL')} fontSize={15} value={email} onChange={(e) => setEmail(e.target.value)} borderTop="none" borderLeft="none" borderRight="none" borderColor="gray.300" />
                    </InputGroup>

                </Card>
            </Box>

            <Box mt={5}>
                <Text mb={5} fontSize={17} fontWeight={400} >{t('PAYMENT')}</Text>
                <Card p={5} boxShadow="0px 4px 20px rgba(0, 0, 0, 0.08)" >
                    <Flex justifyContent="space-between" alignItems="center">
                        <Text fontSize={15} fontWeight={400} >{t('SUBTOTAL')}</Text>
                        <Text fontSize={15} fontWeight={400} >$ {item?.message?.order?.quote?.breakup[0]?.price?.value}</Text> {/* Example amount */}
                    </Flex>
                    <Flex mt={4} justifyContent="space-between" alignItems="center">
                        <Text fontSize={15} fontWeight={400} >{t('TAXES')}</Text>
                        <Text fontSize={15} fontWeight={400} >$ {item?.message?.order?.quote?.breakup[1]?.price?.value}</Text> {/* Example amount */}
                    </Flex>
                    <Box my={2} borderBottom="0.5px solid #BFBFBF" mb={4} />

                    <Flex  justifyContent="space-between" alignItems="center">
                        <Text fontSize={15} fontWeight={600} >{t('TOTAL')}</Text>
                        <Text fontSize={15} fontWeight={600} >$  {item?.message?.order?.quote?.price?.value}</Text> {/* Example amount */}
                    </Flex>
                </Card>
            </Box>

                    <Button  mt={5} type="submit" onClick={doPayment} width='20rem' variant="solid" background={buttonCss?.primaryBtnColor} color={buttonCss?.primaryTxtColor}>
                        {t('PROCEED_TO_PAYMENT')}
                    </Button>
        </Box>
        <Box mt={100}> <Footer /> </Box>

        </>
    );
};

export default Checkout;
