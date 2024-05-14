import React, { useState } from "react";
import { Box, Text, Heading, Flex, Button } from "@chakra-ui/react";
import SubHeader from "../components/SubHeader";
import { useTranslation } from "react-i18next";
import { buttonCss } from "../styles/branding";
import { useLocation } from 'react-router-dom';


import { getconfirmdata } from '../services/Apicall';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
const env = import.meta.env;
import Footer from '../components/Footer';
import ModalPleaseWait from '../components/ModalPleaseWait';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestOverview = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [items, setItems] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const location = useLocation();
  const state = location?.state;
  const[item, setSItem] = useState(state?.item?.message?.catalog?.providers[0]);


  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  function errorMessage(message) {
    toast.error(message, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      theme: "colored",
      pauseOnHover: true,
      toastClassName: 'full-width-toast',
      style: {
        width: "100%", // Set width to 100% to make the toast full-width
      }
    });
  }


  const Submit = async () => {
    try {
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
      }, 40000);

      let bodyData = {

        "context": {
          "domain": env?.VITE_DOMAIN,
          "action": "confirm",
          "version": "1.1.0",
          "bap_id": env?.VITE_BAP_ID,
          "bap_uri": env?.VITE_BAP_URI,
          "bpp_id": state?.item?.context?.bpp_id, //? state?.resContext?.bpp_id : 'flood-case-bpp',
          "bpp_uri": state?.item?.context?.bpp_uri,// ? state?.resContext?.bpp_uri: 'http://35.154.84.36:6004/',
          "transaction_id": uuidv4(),
          "message_id": uuidv4(),
          "timestamp": new Date().toISOString()
        },
        "message": {
          "order": {
            "items": [
              {
                "id": item?.items[0]?.id,
                "fulfillment_ids": localStorage.getItem('dataShare') ? [JSON.parse(localStorage.getItem('dataShare')).id] : '',
                "tags": JSON.parse(localStorage.getItem('selectedData')),
              },
            ],
            "fulfillments": [
              {
                "id": localStorage.getItem('dataShare') ? JSON.parse(localStorage.getItem('dataShare')).id : '',
                "customer": {
                  "person": {
                    "name": "John Doe",
                    "age": "25"
                  },
                  "contact": {
                    "phone": "8789111111",
                    "email": "john@gmail.com"
                  }
                }
              }
            ]
          }

        }
      }



      let response = await getconfirmdata(bodyData);

      if (response && response.responses && response.responses.length > 0) {
        setShowSuccessModal(false);
        localStorage.setItem('requestHistory', JSON.stringify(response?.responses[0]?.message?.order));
        navigate('/success', {
          state: { item: response?.responses[0].message },
        });

      } else {
        toast.dismiss();
        errorMessage(t("Delay_in_fetching_the_details"));
        setShowSuccessModal(false);
      }
    }
    catch (error) {
      console.error('Error in Process request:', error);
      setShowSuccessModal(false);
    }
  }

  return (
    <Box>
      <SubHeader title={t("REQUEST_OVERVIEW")} cartItemCount={2} />
      <Box maxWidth="1200px" mx="auto" px={4} >
        <Text mt={9}>{t("REQUEST_OVERVIEW")}</Text>
        {/* {item?.items.map((item, index) => ( */}
          <Box
            // key={index}
            boxShadow="0px 20px 25px 0px rgba(0, 0, 0, 0.1), 0px 8px 10px 0px rgba(0, 0, 0, 0.1)"
            p="15px 20px"
            borderRadius="10px"
            bg="white"
            width="100%"
            my={4}
            px={4}
            mb={25}
          >
            <Heading as="h2" size="md" mb={2} fontSize={15} fontWeight={600}>
              {item?.items[0]?.descriptor?.name}{" "}
            </Heading>
            <Flex direction="column">
              <Text fontSize={12} fontWeight={400}>
                {t("PROVIDED_BY")}: {item?.descriptor?.name}
              </Text>
            </Flex>
          </Box>
        {/* ))} */}
        <Button
          mt={3}
          type="submit"
          onClick={Submit}
          fontWeight={400} 
          borderRadius={'12px'}
          width="20rem"
          variant="solid"
          background={buttonCss?.primaryBtnColor}
          color={buttonCss?.primaryTxtColor}
          _hover={{ bg: buttonCss?.primaryBtnHoverColor }}
        >
          {t("SEND_REQUEST")}
        </Button>
      </Box>
      {showSuccessModal && (
        <ModalPleaseWait
          message="Your success message goes here!"
          onClose={handleCloseSuccessModal}
        />
      )}
      <Box mt={100}> <Footer /> </Box>
    </Box>
  );
};

export default RequestOverview;
