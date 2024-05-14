import React from 'react';
import { Box , Image, Flex } from '@chakra-ui/react';
import { useTranslation } from "react-i18next";
import footerImg from '../assets/images/footer.png'

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box
    as="footer"
    position="fixed"
    bottom="0"
    left="0"
    width="100%"
    backgroundColor="#fff"
    color="#000"
    textAlign="center"
    py="4"
>
<Flex justify="flex-end" alignItems="center">
        {/* Other footer content goes here */}
        {/* <Image src={footerImg} alt="Visa Logo" width="74px" height="23px"  mr={103}/> */}
    </Flex>
    {/* Other footer content goes here */}
</Box>
  );
};

export default Footer;
