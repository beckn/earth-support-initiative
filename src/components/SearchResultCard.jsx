import React from 'react';
import { Box, Image, Stack, Heading, Text, Button, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import dummyImageUrl from '../assets/dummyimage.png'
import { useTranslation } from "react-i18next";

function SearchResultCard({ title, imageUrl, publishedBy, description, bpp_id, bpp_uri,item }) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleCardClick = () => {
        navigate("/details", { state: { product: item } });
    };
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box
            maxWidth="1300px"
            mx="auto"
            px={4}
            pb={6}
            borderRadius="10px"
            border="1px solid #EFEFEF"
            background="#FFF"
            boxShadow="3px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            marginTop={5}
            onClick={handleCardClick} 
            style={{ cursor: 'pointer' }} 
        >
            <Heading size='md' pt={4} pb={4} color={'#101828;'} fontSize="1rem">{title}</Heading>
            <Box display="flex" alignItems="flex-start">
                {imageUrl ? (
                    <Image
                        maxW={{ base: '20%', md: '150px' }}
                        src={imageUrl}
                        alt={title}
                        width={{ base: '50%', md: '20%' }}
                    />
                ) : (
                    <Image
                        maxW={{ base: '20%', md: '150px' }}
                        src={dummyImageUrl}
                        alt="Dummy Image"
                        width={{ base: '50%', md: '20%' }}
                    />
                )}
                <Stack px={4} spacing={2} flex="1">
                    <Text size='md' color={'#3E6139'}><strong>Published By:</strong> {publishedBy}</Text>
                    {/* Underline effect */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="111" height="3" viewBox="0 0 111 3" fill="none">
                        <path d="M1 1.5H110" stroke="url(#paint0_linear_509_514)" strokeWidth="2" strokeLinecap="round" />
                        <defs>
                            {/* Gradient for the underline */}
                            <linearGradient id="paint0_linear_509_514" x1="1" y1="1.99991" x2="111" y2="1.49991" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#3E6139" />
                                <stop offset="1" stopColor="#3E6139" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <Text fontSize={{ base: 'sm', md: 'md' }}>{description}</Text>
                    {!isMobile && ( // Render the button only if it's not mobile view
                        <Button
                            onClick={() => {
                                // navigate("/details", { state: { product: { ...product, bpp_id: product.bpp_id, bpp_uri: product.bpp_uri } } });  
                                navigate("/details", { state: { product: item } });
                                                      }}
                            paddingTop={1}
                            marginTop={1}
                            size="md"
                            className='custom-button'
                            style={{ width: "150px" }} 
                        >
                            View Details
                        </Button>
                    )}
                </Stack>
            </Box>
        </Box>
    );
}

export default SearchResultCard;