import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Image,
  VStack,
  useTheme,
  HStack,
} from "@chakra-ui/react";
import { header, buttonCss } from "../styles/branding";
import { useTranslation } from "react-i18next";
import poweredBy from "../assets/images/poweredby.png";
import beckn from "../assets/images/footer.png";
import welcometitle from "../assets/images/welcometitle.png";

import { useNavigate } from "react-router-dom";
const env = import.meta.env;
import { v4 as uuidv4 } from "uuid";
import { getallContent } from "../services/Apicall";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);

  const handleLogin = async () => {
    if (username && password === "12345") {
      setIsValid(true);
      console.log({ username, password });
      navigate("/search");
    } else {
      setIsValid(false);
    }
  };
  useEffect(() => {
    frequentSearch();
  }, []);

  const frequentSearch = async () => {
    if (
      localStorage.getItem("frequentlyData") == null ||
      localStorage.getItem("frequentlyData") == "undefined"
    ) {
      let bodyData = {
        context: {
          domain: env?.VITE_DOMAIN,
          action: "search",
          version: "1.1.0",
          bap_id: env?.VITE_BAP_ID,
          bap_uri: env?.VITE_BAP_URI,
          transaction_id: uuidv4(),
          message_id: uuidv4(),
          timestamp: new Date().toISOString(),
        },
        message: {
          intent: {},
        },
      };

      let response = await getallContent(bodyData);
      console.log("i am getting data outside :", response);
      if (response.responses.length) {
        console.log("i am getting data :", response);
        localStorage.setItem(
          "frequentlyData",
          JSON.stringify(response?.responses)
        );
        // Set a timeout to clear the frequentData after 30 minutes
        setTimeout(() => {
          localStorage.removeItem("frequentlyData");
        }, 30 * 60 * 1000);
      }
    }
  };

  return (
    <>
      <HStack display="flex" justifyContent="center" height="100vh" mt={1}>
        <VStack textAlign="center" maxW="600px" width="100%" bg="white">
          <Image
            height="200px"
            width="395px"
            src={header?.headerContent?.logoSrc}
            alt="The house from the offer."
          />
          {/* <Text fontSize={50} fontWeight={700} color={header?.headerContent?.appTitleColor}>{header?.headerContent?.title1}</Text> */}
          <Text color="rgba(28, 28, 28, 1)" fontWeight={600} fontSize={17}>
            {header?.headerContent?.title2}
          </Text>
        </VStack>

        <Box maxW="500px" width="100%" bg="white" p={8}>
          {/* Application Title Section */}
          <Box mb={8} lineHeight="taller">
            {/* <Text fontSize="4xl" fontWeight="bold">
                            {t('WELCOME_BACK')}
                        </Text> */}
            <Image
              src={welcometitle}
              height={"25px"}
              width={"190px"}
              alt="title"
            />
            {/* <Text fontSize="1xl">
                        {t('LET_MAKE_EASY')}
                    </Text> */}
          </Box>

          {/* Login Details Section */}
          <Box>
            <form>
              <VStack spacing={4}>
                <FormControl>
                  {/* <FormLabel color="purple.500">Username</FormLabel> */}
                  {/* <Input
                                    variant="filled"
                                    id="outlined-username-input"
                                    type="text"
                                    autoComplete="current-username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                /> */}
                  <Input
                    id="username"
                    type="text"
                    placeholder={t("NAME")}
                    fontSize={15}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    borderTop="none"
                    borderLeft="none"
                    borderRight="none"
                    borderColor="gray.300"
                  />
                </FormControl>
                <FormControl marginTop={5}>
                  <Input
                    id="password"
                    type="password"
                    fontSize={15}
                    placeholder={t("PASSWORD")}
                    autoComplete="current-password"
                    value={password}
                    borderTop="none"
                    borderLeft="none"
                    borderRight="none"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                {!isValid && (
                  <Text fontSize={12} width={"93%"} color={"#ff0000ad"}>
                    {t("AUTHENTICATION_FAILED")}
                  </Text>
                )}
                <Button
                  marginTop={5}
                  fontWeight={400}
                  borderRadius={"12px"}
                  type="button"
                  onClick={handleLogin}
                  variant="solid"
                  width="100%"
                  background={buttonCss?.primaryBtnColor}
                  color={buttonCss?.primaryTxtColor}
                  _hover={{ bg: buttonCss?.primaryBtnHoverColor }}
                >
                  {t("SIGN_IN")}
                </Button>

                {/* <Box display={'flex'}>
                                <Text>{t('DONT_HAVE_ACCOUNT')}</Text>
                                <Text color={buttonCss?.primaryBtnColor} ml={1}> {t('SIGN_UP')}</Text>
                            </Box> */}
                {/* <HStack my={4} mt={"50px"} mx={20}>
                  <Image src={poweredBy} height={"21px"} alt="Forum Logo" />
                  <Image
                    height={"17px"}
                    marginBottom={1}
                    src={beckn}
                    alt="Forum Logo"
                  />
                </HStack> */}
              </VStack>
            </form>
          </Box>
        </Box>
      </HStack>
    </>
  );
}
