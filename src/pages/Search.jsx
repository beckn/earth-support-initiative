import React, { useState } from "react";
import {
  Box,
  Image,
  Center,
  Input,
  InputGroup,
  Select,
  Button,
  VStack,
  HStack,
  Text, // Add missing import
  Card,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import SubHeader from "../components/SubHeader"; // Assuming correct path
import Footer from "../components/Footer"; // Assuming correct path
import { header, buttonCss } from "../styles/branding";
import onSearch from "../assets/apiJson/on_search.json";

const Search = () => {
  const { t } = useTranslation();
  const [searchTxt, setSearchTxt] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("frequentlyData"))
  );
  const navigate = useNavigate();

  const cityLocations = [
    "Balaganj",
    "Beanibazar",
    "Bishwanath",
    "Companiganj",
    "Fenchuganj",
    "Gopalganj",
    "Gowanighat",
    "Jaintiapur",
    "Kanaighat",
    "Sylhetsardar",
    "Zakiganj",
    "Dakshinsurma",
    "Osmaninagar",
  ];

  const searchData = async () => {
    // console.log(searchTxt + " - " + year + " - " + location);
    console.log(searchTxt);
    navigate("/home", {
      // state: { searchTxt: searchTxt, year: year, location: location },
      state: { searchTxt: searchTxt },
    });
  };

  const goTodetailPage = (item) => {
    navigate("/details", {
      state: { item: item },
    });
  };

  return (
    <>
      <Flex
        height="100vh"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        <Box maxW="600px" mx="auto" p="20px">
          <Center mb="20px">
            <Image
              width={"302px"}
              height={"153px"}
              src={header?.headerContent?.logoSrc}
              alt="Logo"
            />
          </Center>
          <InputGroup mb="20px">
            <Input
              type="text"
              width="544px"
              height="56px"
              autoComplete="searchTxt"
              value={searchTxt}
              placeholder={t("SEARCH_FOR")}
              onChange={(e) => setSearchTxt(e.target.value)}
              id="searchTxt"
              fontSize={15}
              boxShadow="0px 10px 24px 0px rgba(0, 0, 0, 0.1)"
              _focus={{
                boxShadow: "0px 10px 24px 0px rgba(0, 0, 0, 0.1)",
              }}
              border="none"
              borderColor="transparent"
              _placeholder={{
                fontFamily: "Poppins",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "15px",
                lineHeight: "22.5px",
              }}
            />
          </InputGroup>
          {/* <Select
          mb="20px"
          id="location"
          width="544px"
          height="56px"
          autoComplete="location"
          value={location}
          placeholder={t("ENTER_LOCATION")}
          onChange={(e) => setLocation(e.target.value)}
          boxShadow="0px 10px 24px 0px rgba(0, 0, 0, 0.1)"
          _focus={{
            boxShadow: "0px 10px 24px 0px rgba(0, 0, 0, 0.1)",
          }}
          border="none"
          borderColor="transparent"
        >
          <option value="" disabled hidden>
            {t("ENTER_LOCATION")}
          </option>
          {cityLocations.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select> */}
          {/* <Select
          defaultValue="1"
          mb="20px"
          id="year"
          width="544px"
          height="56px"
          autoComplete="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          boxShadow="0px 10px 24px 0px rgba(0, 0, 0, 0.1)"
          _focus={{
            boxShadow: "0px 10px 24px 0px rgba(0, 0, 0, 0.1)",
          }}
          border="none"
          borderColor="transparent"
        >
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1} year{index !== 0 && "s"}
            </option>
          ))}
        </Select> */}
          <Button
            width="544px"
            height="48px"
            fontWeight={400}
            borderRadius={"12px"}
            onClick={searchData}
            type="submit"
            variant="solid"
            background={buttonCss?.primaryBtnColor}
            color={buttonCss?.primaryTxtColor}
            _hover={{ bg: buttonCss?.primaryBtnHoverColor }}
          >
            {t("SEARCH")}
          </Button>

          {/* {items != null && items.length && (
          <VStack justifyContent="flex-start" alignItems="flex-start">
            <Text mt={10} mb={2} fontSize={"17px"}>
              {t("FREQUESNTLY_ACCESSED")}
            </Text>

            <HStack
              justifyContent="flex-start"
              flexWrap={{ base: "wrap", md: "nowrap" }}
              spacing={11}
            >
              {items?.map(
                (item, index) =>
                  item?.message?.catalog?.providers.length > 0 &&
                  index < 3 && (
                    <Card
                      background={"#F6F6F6"}
                      display="flex"
                      width={{ base: "full", md: "180px" }}
                      height={234}
                      direction="column"
                      overflow="hidden"
                      borderWidth="1px"
                      borderRadius="lg"
                      borderColor="gray.200"
                      minHeight="270px"
                      _hover={{ borderColor: "blue.400" }}
                      cursor="pointer"
                      boxShadow="rgba(0, 0, 0, 0.1) 7px 14px 17px -6px"
                      mb={6}
                      onClick={() => goTodetailPage(item)}
                      gap={"11px"}
                    >
                      <VStack flex={1}>
                        <Box height="132px">
                          <Image
                            mt={5}
                            height="100px"
                            width="130px"
                            src={
                              item?.message?.catalog?.providers[0]?.descriptor
                                ?.images[0]?.url
                            }
                            alt="The house from the offer."
                            objectFit="contain"
                          />
                        </Box>
                        <Box bg={"#FFF"} borderRadius="lg" height="132px">
                          <Box p={2}>
                            <Text
                              fontSize={15}
                              noOfLines={2}
                              fontWeight="600"
                              mb={2}
                            >
                              {
                                item?.message?.catalog?.providers[0]?.items[0]
                                  ?.descriptor?.name
                              }
                            </Text>
                            <HStack>
                              <Text noOfLines={1} fontSize={12} mb={2}>
                                {" "}
                                {t("PROVIDED_BY")}:{" "}
                                {
                                  item?.message?.catalog?.providers[0]
                                    ?.descriptor?.name
                                }
                              </Text>
                            </HStack>
                            <HStack>
                              <Text fontSize={12} noOfLines={1} mt={2} mb={2}>
                                {" "}
                                {
                                  item?.message?.catalog?.providers[0]?.tags[0]
                                    ?.list[1]?.value
                                }{" "}
                                {t("YEARS_IN_OPERATION")}
                              </Text>
                              <HStack display="flex" alignItems="center">
                                <Icon as={FaStar} color="#F4B73F" />
                                <Box fontSize={12} ml={1}>
                                  {item?.message?.catalog?.providers[0]?.rating}
                                </Box>
                              </HStack>
                            </HStack>
                          </Box>
                        </Box>
                      </VStack>
                    </Card>
                  )
              )}
            </HStack>
          </VStack>
        )} */}
          <Box mt={100}>
            {" "}
            <Footer />{" "}
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Search;
