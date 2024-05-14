import React, { useState } from "react";
import { Box, Flex, Image, Text, Icon, Link } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';

const CourseCard = ({ item }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const[sItem, setSItem] = useState(item?.message?.catalog?.providers[0]);

  const goToDetailPage = (item) => {
    navigate("/details", {
        state: { item: item },
    });
  }

  return (
    (item?.message?.catalog?.providers?.length > 0 && 
    <Box
      onClick={() => goToDetailPage(item)}
      display="flex"
      alignItems="center"
      borderRadius={12}
            boxShadow="0px 20px 25px 0px rgba(0, 0, 0, 0.1), 0px 8px 10px 0px rgba(0, 0, 0, 0.1)"
     // backgroundColor="#ffffff"
      marginBottom="20px"
      backgroundColor={'#F6F6F6'}
    >
      <Box >
      <Image
        flex="1"
        maxWidth="100px"
        height="100px"
        src={sItem?.descriptor.images[0]?.url || "path/to/dummy-image.jpg"}
        alt={sItem?.items[0]?.descriptor.name}
        borderRadius="10px"
        marginRight="25px"
        marginLeft="25px"
        objectFit="contain" 
        // padding="20px"
      />
      </Box>
      <Flex flex="2" flexDirection="column" padding="20px" backgroundColor="#ffffff" borderRadius="0 12px 12px 0" >
        <Text
          fontSize="15px"
          fontWeight="600"
          lineHeight="22.5px"
          textAlign="left"
          marginBottom="10px"
        >
          {sItem?.items[0]?.descriptor.name}
        </Text>
        <Text
          fontSize="12px"
          fontWeight="400"
          lineHeight="18px"
          marginBottom="10px"
          noOfLines={2}
          dangerouslySetInnerHTML={{ __html: sItem?.descriptor.short_desc }}
        />
        <Text
          fontSize="12px"
          marginBottom="10px"
          fontWeight="600"
          lineHeight="18px"
        >
          {t('PROVIDED_BY')}: {sItem?.descriptor.name}
        </Text>
        <Flex alignItems="center" justifyContent="space-between" marginBottom="10px">
          <Text
            fontSize="12px"
            fontWeight="400"
            lineHeight="18px"
            marginRight="10px"
          >
           {t('LICENSE')}  {sItem?.tags[0]?.list[0]?.value} | {sItem?.tags[0]?.list[1]?.value} {t('YEARS_IN_OPERATION')}
          </Text>
          {/* <Flex alignItems="center">
            <Icon as={FaStar} color="yellow.400" />
            <Text fontSize="12px" fontWeight="400" lineHeight="18px" marginLeft="5px">
              {sItem?.rating || "4.5"}
            </Text>
          </Flex> */}
        </Flex>
      </Flex>
    </Box>)
    
  );
};

export default CourseCard;
