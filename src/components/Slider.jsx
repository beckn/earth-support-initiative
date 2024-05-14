import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Text,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getallContent } from '../services/Apicall';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";
const env = import.meta.env;

const Slider = ({transactionId }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const messageId = uuidv4();

  useEffect(() => {
    const searchResponse = async () => {
      try {
        let bodyData = {
          context: {
            domain: env?.VITE_DOMAIN,
            action: "search",
            version: "1.1.0",
            bap_id: env?.VITE_BAP_ID,
            bap_uri: env?.VITE_BAP_URI,
            bpp_id: "apurva.dev.bpp",
            bpp_uri: "https://bpp-dev.apurva.ai",
            transaction_id: transactionId,
            message_id: messageId,
            timestamp: "2023-02-06T09:55:41.161Z",
          },
          message: {
            intent: {
              item: {
                descriptor: {
                  name: "agriculture",
                },
              },
            },
          },
        };

        let response = await getallContent(bodyData);
        console.log(response);

        if (
          response &&
          response.data &&
          response.data[env?.VITE_DB_CACHE] &&
          Array.isArray(response.data[env?.VITE_DB_CACHE])
        ) {
          // Filter results here
          const filteredData = response.data[env?.VITE_DB_CACHE].filter(item => item.bpp_id === 'apurva.dev.bpp');
          setFilteredResults(filteredData);
          setIsLoading(false);
        } else {
          console.error("Invalid response format");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    searchResponse();
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((currentTestimonial + 1) % filteredResults.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((currentTestimonial - 1 + filteredResults.length) % filteredResults.length);
  };

  const handleCardClick = () => {
    navigate("/details", { state: { product: filteredResults[currentTestimonial] } });
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  if (isLoading || filteredResults.length === 0) {
    return null; // Don't render anything if loading or no filtered results
  }

  return (
    <Container maxW="container.xl">
      <Heading as="h2" size="md" mt="0" marginTop="3">AI Suggestions</Heading>
      <Flex alignItems="center" justifyContent="center">
        <Button
          onClick={prevTestimonial}
          bg="#FFFFFF"
          border="1px solid #CFCFCF"
          borderRadius="50%"
          p="0"
          style={{
            fill: '#3E6139',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            width: '40px',
            height: '40px',
            marginRight: '10px',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M5.99997 12L7.40997 10.59L2.82997 6L7.40997 1.41L5.99997 0L-2.67029e-05 6L5.99997 12Z" fill="#3E6139" />
          </svg>
        </Button>

        <Box onClick={handleCardClick} style={{ cursor: 'pointer', width: '100%' }}>
          <Box bg="white" p="4" borderRadius="md" w="full" position="relative">
            <Text style={{ overflow: 'hidden' }}>
              {filteredResults[currentTestimonial]?.description
                ? truncateDescription(filteredResults[currentTestimonial].description, 250)
                : "Description Not Available"}
            </Text>

            <Box mt="4">
              <svg xmlns="http://www.w3.org/2000/svg" width="111" height="3" viewBox="0 0 111 3" fill="none">
                <path d="M1 1.5H110" stroke="url(#paint0_linear_509_514)" strokeWidth="2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="paint0_linear_509_514" x1="1" y1="1.99991" x2="111" y2="1.49991" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3E6139" />
                    <stop offset="1" stopColor="#3E6139" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <Heading as="h4" size="md" mt="0" marginTop="3" fontSize="1rem">
                Via {filteredResults[currentTestimonial].provider_name}
              </Heading>
            </Box>
          </Box>
        </Box>

        <Button
          onClick={nextTestimonial}
          bg="#FFFFFF"
          border="1px solid #CFCFCF"
          borderRadius="50%"
          p="0"
          style={{
            fill: '#3E6139',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            width: '40px',
            height: '40px',
            marginLeft: '10px',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
            <path d="M2 0L0.590027 1.41L5.17003 6L0.590027 10.59L2 12L8 6L2 0Z" fill="#3E6139" />
          </svg>
        </Button>
      </Flex>
    </Container>
  );
};

export default Slider;
