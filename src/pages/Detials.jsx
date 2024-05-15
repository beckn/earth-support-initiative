import {
  Box,
  Button,
  Icon,
  Card,
  Input,
  Text,
  Image,
  VStack,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";

import React, { useEffect, useState } from "react";
import { getseletedData, getconfirmdata } from "../services/Apicall";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loader from "../components/Loader";
const env = import.meta.env;
import { FaStar } from "react-icons/fa";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import SubDetail from "../components/SubDetail";
import { header, buttonCss } from "../styles/branding";
import SubHeader from "../components/SubHeader";
import Footer from "../components/Footer";
import ModalPleaseWait from "../components/ModalPleaseWait";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Details = () => {
  const location = useLocation();
  const state = location?.state;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [story, setStory] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactionId, setTransactionId] = useState(
    state?.transactionId || uuidv4()
  );
  const [filledStars, setFilledStars] = useState("");
  const [hasHalfStar, setHasHalfStar] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [item, setSItem] = useState(
    state?.item?.message?.catalog?.providers[0]
  );

  localStorage.setItem("selectedData", JSON.stringify([]));
  localStorage.setItem("dataShare", JSON.stringify({}));

  const messageId = uuidv4();
  const { itemId } = useParams();

  useEffect(() => {
    if (state && state.item) {
      // fetchSelectedCourseData();
      const rating = item?.rating == undefined ? 0 : item?.rating;
      setFilledStars(Math.floor(rating)); // Number of filled stars
      setHasHalfStar(rating - filledStars >= 0.5); // Check if there is a half star
    }
  }, [state]);

  const fetchSelectedCourseData = async () => {
    try {
      setIsLoading(true);

      let bodyData = {
        context: {
          domain: env?.VITE_DOMAIN,
          action: "select",
          version: "1.1.0",
          bap_id: env?.VITE_BAP_ID,
          bap_uri: env?.VITE_BAP_URI,
          bpp_id: state?.item?.context?.bpp_id,
          bpp_uri: state?.item?.context?.bpp_uri,
          transaction_id: transactionId,
          // "message_id":messageId,
          message_id: "06974a96-e996-4e22-9265-230f69f22f57",
          timestamp: new Date().toISOString(),
        },
        message: {
          order: {
            provider: {
              id: item?.provider_id,
            },
            items: [
              {
                id: item?.item_id,
              },
            ],
          },
        },
      };

      let response = await getseletedData(bodyData);

      // console.log("resp", response);
      if (response && response.responses && response.responses.length > 0) {
        // console.log("Entered 1");
        let arrayOfObjects = [];
        let uniqueItemIds = new Set();

        for (const responses of response.responses) {
          const provider = responses.message.order;
          for (const item of provider.items) {
            if (!uniqueItemIds.has(item.id)) {
              let obj = {
                item_id: item.id,
                title: state.item.title,
                description: state.item.description
                  ? state.item.description
                  : "",
                long_desc: item.descriptor.long_desc,
                provider_id: state.item.provider_id,
                provider_name: state.item.provider_name,
                bpp_id: state.item.bpp_id,
                bpp_uri: state.item.bpp_uri,
                icon: state.item.icon ? state.item.icon : "",
                descriptionshort: state.item.shortDescription
                  ? state.item.shortDescription
                  : "",
              };
              arrayOfObjects.push(obj);
              uniqueItemIds.add(item.id);
            }
          }
        }

        setStory(arrayOfObjects[0]);
        // console.log("arrayOfObjects", arrayOfObjects);

        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError("No data found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching details:", error);
      setIsLoading(false);
      setError("Error fetching details. Please try again.");
    }
  };
  console.log("itemId:", state.item?.id);

  const handleBack = () => {
    navigate("/");
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const Submit = () => {
    let selectedData = JSON.parse(localStorage.getItem("selectedData"));

    const dataFormats = selectedData.find(
      (item) => item.descriptor.name === "Data formats"
    );
    const isDataFormatsSet =
      dataFormats !== undefined && dataFormats.list.length > 0;

    // Check if "Subscription duration" value is set
    const subscriptionDuration = selectedData.find(
      (item) => item.descriptor.name === "Subscription duration"
    );
    const isSubscriptionDurationSet =
      subscriptionDuration !== undefined &&
      subscriptionDuration.list.length > 0;

    const isTermsAccepted = JSON.parse(
      localStorage.getItem("dataShare")
    ).isTermsAccepted; // Add this line

    console.log("Is Data formats set:", isDataFormatsSet);
    console.log("Is Subscription duration set:", isSubscriptionDurationSet);

    const dataShare = localStorage.getItem("dataShare");
    const isDataShareSet = dataShare != "{}";

    console.log("Is dataShare key set:", isDataShareSet);
    console.log("Is Terms of Use accepted:", isTermsAccepted); // Add this line

    if (
      isDataFormatsSet &&
      isSubscriptionDurationSet &&
      isDataShareSet &&
      isTermsAccepted
    ) {
      navigate("/requestoverview", {
        state: { item: state?.item },
      });
    } else {
      toast.dismiss();
      errorMessage(t("ENTER_MANDATORY_OPTION_PROCEED"));
    }

    function errorMessage(message) {
      toast.error(message, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        // theme: "colored",
        pauseOnHover: true,
        toastClassName: "full-width-toast",
        style: {
          border: "1px solid #bfbfbf38",
          color: "#c63535b8",
          margin: "0 21px",
          width: "96%", // Set width to 100% to make the toast full-width
        },
      });
    }

    /* setShowSuccessModal(true);

    let bodyData = {

      "context": {
        "domain": env?.VITE_DOMAIN,
        "action": "confirm",
        "version": "1.1.0",
        "bap_id": env?.VITE_BAP_ID,
        "bap_uri": env?.VITE_BAP_URI,
        "bpp_id": state?.resContext?.bpp_id ? state?.resContext?.bpp_id : 'flood-case-bpp',
        "bpp_uri": state?.resContext?.bpp_uri ? state?.resContext?.bpp_uri: 'http://35.154.84.36:6004/',
        "transaction_id": transactionId,
        "message_id": uuidv4(),
        "timestamp": new Date().toISOString()
      },
      "message": {
        "order": {
          "items": [
            {
              "id": item?.items[0]?.id,
              "tags": JSON.parse(localStorage.getItem('selectedData')),
            },
          ],
          "fulfillments": [
            {
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
      navigate('/success', {
          state: { item: response?.responses[0].message },
         });

    }
*/

    // setTimeout(() => {
    //   setShowSuccessModal(false);
    //   navigate('/success');

    // }, 5000);
  };

  return (
    <>
      <SubHeader title={item?.descriptor?.name} cartItemCount={2} />

      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <Box textAlign="center">
            <Loader />
          </Box>
        </div>
      ) : (
        <>
          <Card
            mx={"100px"}
            mt={30}
            p={5}
            boxShadow="0px 8px 10px 0px #0000001A"
          >
            <HStack>
              <Box
                background="rgba(255, 255, 255, 1)"
                alignItems="stretch"
                justifyContent="center"
                borderRadius="12px"
                border="1px solid rgba(191, 191, 191, 1)"
                width="150px"
                height={150}
              >
                <Image
                  p={4}
                  src={item?.descriptor?.images[0].url}
                  width={200}
                  height={150}
                  objectFit="contain"
                />
              </Box>
              <Box m={3}>
                <Text fontSize={17} noOfLines={1} fontWeight="600" mb={2}>
                  {item?.items[0]?.descriptor?.name}
                </Text>
                <HStack mb={2}>
                  <Text fontSize={15} fontWeight={600}>
                    {t("PROVIDED_BY")}{" "}
                  </Text>
                  <Text fontSize={15}>{item?.descriptor?.name} </Text>
                </HStack>
                {/* {item?.rating && (
                  <HStack>
                    <HStack>
                      {[...Array(filledStars)].map((_, index) => (
                        <Icon
                          key={index}
                          as={BsStarFill}
                          ml={1}
                          color="yellow.400"
                        />
                      ))}
                      {hasHalfStar && (
                        <Icon as={BsStarHalf} color="yellow.400" />
                      )}{" "}
                      {[...Array(5 - filledStars - (hasHalfStar ? 1 : 0))].map(
                        (_, index) => (
                          <Icon
                            key={index + filledStars + 1}
                            as={BsStarFill}
                            ml={1}
                            color="gray.300"
                          />
                        )
                      )}
                      <Text mt={1} fontSize={12}>
                        {item?.rating} {t("STARS")}
                      </Text>
                    </HStack>
                  </HStack>
                )} */}
              </Box>
            </HStack>
            <Box>
              <SubDetail items={item} />
            </Box>

            <Card
              mt={5}
              p={5}
              borderRadius="12px"
              border="1px solid rgba(191, 191, 191, 1)"
            >
              <HStack>
                <Button
                  type="submit"
                  onClick={Submit}
                  fontWeight={400}
                  borderRadius={"12px"}
                  width="20rem"
                  variant="solid"
                  background={buttonCss?.primaryBtnColor}
                  color={buttonCss?.primaryTxtColor}
                  _hover={{ bg: buttonCss?.primaryBtnHoverColor }}
                >
                  {t("PROCEED")}
                </Button>
                {/* <Text fontSize={12} ml={4}>
                  {t("PRICE_WILL_VARY")}
                </Text> */}
              </HStack>
            </Card>
          </Card>
        </>
      )}

      <Box mt={100}>
        {" "}
        <Footer />{" "}
      </Box>
    </>
  );
};

export default Details;
