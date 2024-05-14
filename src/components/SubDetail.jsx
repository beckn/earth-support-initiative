import React, { useEffect } from "react";
import { useState } from "react";
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
  Checkbox,
  FormControl,
  FormLabel,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import dataList from "../assets/apiJson/checkoutForm.json";
import { useNavigate } from "react-router-dom";
import { header, buttonCss } from "../styles/branding";

const SubDetail = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const state = location?.state;
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFulfillment, setSelectedFulfillment] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState("one Time");
  const [item, setSItem] = useState(
    state?.item?.message?.catalog?.providers[0]
  );

  const [isTermsAccepted, setIsTermsAccepted] = useState(false); // Add this line
  useEffect(() => {
    // Set the initial checkbox value
    setIsTermsAccepted(
      JSON.parse(localStorage.getItem("dataShare")).isTermsAccepted || false
    );
  }, []);
  const handleRadioChange = (id, type) => {
    console.log("dataShare", id);
    localStorage.setItem("dataShare", JSON.stringify({ id: id, type: type }));
    setSelectedFulfillment(type);
  };

  const handleDurationChange = (tagName, option) => {
    const tagIndex = selectedTags.findIndex(
      (tag) => tag.descriptor.name === tagName
    );
    if (tagIndex !== -1) {
      const newTags = [...selectedTags];
      const optionIndex = newTags[tagIndex].list.findIndex(
        (item) => item.value === option
      );
      newTags[tagIndex].list[0] = { value: option };

      setSelectedTags(newTags);
      localStorage.setItem("selectedData", JSON.stringify(newTags)); // Update local storage after updating state
    } else {
      setSelectedTags([
        ...selectedTags,
        {
          descriptor: {
            name: tagName,
          },
          list: [{ value: option }],
        },
      ]);
    }

    localStorage.setItem(
      "selectedData",
      JSON.stringify([
        ...selectedTags,
        { descriptor: { name: tagName }, list: [{ value: option }] },
      ])
    );
  };

  const handleCheckboxChange = async (tagName, option) => {
    const tagIndex = selectedTags.findIndex(
      (tag) => tag.descriptor.name === tagName
    );
    if (tagIndex !== -1) {
      const newTags = [...selectedTags];
      const optionIndex = newTags[tagIndex].list.findIndex(
        (item) => item.value === option
      );
      if (optionIndex !== -1) {
        newTags[tagIndex].list.splice(optionIndex, 1);
        if (newTags[tagIndex].list.length === 0) {
          newTags.splice(tagIndex, 1);
        }
      } else {
        newTags[tagIndex].list.push({ value: option });
      }
      setSelectedTags(newTags);
      localStorage.setItem("selectedData", JSON.stringify(newTags)); // Update local storage after updating state
    } else {
      setSelectedTags([
        ...selectedTags,
        {
          descriptor: {
            name: tagName,
          },
          list: [{ value: option }],
        },
      ]);

      localStorage.setItem(
        "selectedData",
        JSON.stringify([
          ...selectedTags,
          { descriptor: { name: tagName }, list: [{ value: option }] },
        ])
      );
    }
  };

  const handleTermsChange = () => {
    setIsTermsAccepted(!isTermsAccepted); // Toggle the terms acceptance
    localStorage.setItem(
      "dataShare",
      JSON.stringify({ ...JSON.parse(localStorage.getItem("dataShare")), isTermsAccepted: !isTermsAccepted }) // Update the terms acceptance in local storage
    );
  };

  return (
    <>
      <Card
        mt={5}
        p={5}
        borderRadius="12px"
        border="1px solid rgba(191, 191, 191, 1)"
      >
        <Box>
          <Text fontSize={12} fontWeight={600}>
            {t("ABOUT")} {item?.descriptor?.name}
          </Text>
          <Text fontSize={12} mt={1}>
            {item?.descriptor?.short_desc}
          </Text>
        </Box>
        <Box mt={5}>
          <Text fontSize={12}>
            {" "}
            {t("LICENSE")} {item?.tags[0]?.list[0]?.value} |{" "}
            {item?.tags[0]?.list[1]?.value} {t("YEARS_IN_OPERATION")}{" "}
          </Text>
        </Box>
      </Card>

      <Card
        mt={5}
        p={5}
        borderRadius="12px"
        border="1px solid rgba(191, 191, 191, 1)"
      >
        {item?.items[0]?.tags?.map((tag, index, array) => {
          const isLastItem = index === array.length - 1;
          return (
            tag?.list?.length > 0 &&
            tag.descriptor.name !== "Subscription duration" &&
            tag.descriptor.name !== "Data formats" && (
              <Box key={index} mb={isLastItem ? "0px" : "30px"}>
                <FormLabel fontSize={12} fontWeight={600}>
                  {tag.descriptor.name}
                </FormLabel>
                {tag.list.map((item, i) => (
                  <Checkbox
                    fontSize={12}
                    mr={"40px"}
                    key={i}
                    isChecked={selectedTags.some(
                      (selectedTag) =>
                        selectedTag.descriptor.name === tag.descriptor.name &&
                        selectedTag.list.some(
                          (selectedItem) => selectedItem.value === item.value
                        )
                    )}
                    onChange={() =>
                      handleCheckboxChange(tag.descriptor.name, item.value)
                    }
                  >
                    <Text fontSize={12} mt={1}>
                      {" "}
                      {item.value}
                    </Text>
                  </Checkbox>
                ))}
              </Box>
            )
          );
        })}
      </Card>

      <Card
        mt={5}
        p={5}
        borderRadius="12px"
        border="1px solid rgba(191, 191, 191, 1)"
      >
        <Flex direction="row" wrap="wrap" mb={30}>
          {item?.items[0]?.tags?.map(
            (tag, index) =>
              tag.descriptor.name == "Data formats" && (
                <Box key={index}>
                  <FormLabel fontSize={12} fontWeight={600} display="flex">
                    {tag.descriptor.name}{" "}
                    <Box color="red" ml={1}>
                      *{" "}
                    </Box>
                  </FormLabel>
                  {tag.list.map((item, i) => (
                    <Checkbox
                      fontSize={12}
                      mr={"40px"}
                      key={i}
                      isChecked={selectedTags.some(
                        (selectedTag) =>
                          selectedTag.descriptor.name === tag.descriptor.name &&
                          selectedTag.list.some(
                            (selectedItem) => selectedItem.value === item.value
                          )
                      )}
                      onChange={() =>
                        handleCheckboxChange(tag.descriptor.name, item.value)
                      }
                    >
                      <Text fontSize={12} mt={1}>
                        {" "}
                        {item.value}
                      </Text>
                    </Checkbox>
                  ))}
                </Box>
              )
          )}
        </Flex>
        <FormLabel fontSize={12} fontWeight={600} display="flex">
          Data sharing modes{" "}
          <Box color="red" ml={1}>
            *{" "}
          </Box>
        </FormLabel>

        <Flex direction="row" wrap="wrap" mb={30}>
          {item?.fulfillments?.map((fulfillment) => (
            <Box key={fulfillment.id} mr={3} fontSize={12}>
              <Radio
                mr={"40px"}
                value={fulfillment.type}
                isChecked={selectedFulfillment === fulfillment.type}
                onChange={() =>
                  handleRadioChange(fulfillment.id, fulfillment.type)
                }
              >
                <Text fontSize={12} mt={1}>
                  {" "}
                  {fulfillment.type}
                </Text>
              </Radio>
            </Box>
          ))}
        </Flex>
        <Flex direction="row" wrap="wrap">
          {item?.items[0]?.tags?.map(
            (tag, index) =>
              tag.descriptor.name == "Subscription duration" && (
                <Box key={index}>
                  <FormLabel fontSize={12} fontWeight={600} display="flex">
                    {tag.descriptor.name}{" "}
                    <Box color="red" ml={1}>
                      *{" "}
                    </Box>
                  </FormLabel>
                  {tag.list.map((item, i) => (
                    <Radio
                      mr={"40px"}
                      key={i}
                      value={item.value}
                      // isChecked={selectedDuration === item.value}
                      onChange={() => {
                        handleDurationChange(tag.descriptor.name, item.value);
                      }}
                      isChecked={selectedTags.some(
                        (selectedTag) =>
                          selectedTag.descriptor.name === tag.descriptor.name &&
                          selectedTag.list.some(
                            (selectedItem) => selectedItem.value === item.value
                          )
                      )}
                    >
                      <Text fontSize={12} mt={1}>
                        {" "}
                        {item.value}
                      </Text>
                    </Radio>
                  ))}
                </Box>
              )
          )}
        </Flex>
      </Card>
      <Card
        mt={5}
        p={5}
        borderRadius="12px"
        border="1px solid rgba(191, 191, 191, 1)"
      >
        <Box key="terms">
          <Checkbox
            fontSize={12}
            isChecked={isTermsAccepted}
            onChange={handleTermsChange} // Update the terms change handler
          >
            <Text fontSize={12}>
              {t("I_ACCEPT_THE_TERMS_OF_USE")}
            </Text>
          </Checkbox>
        </Box>
      </Card>
    </>
  );
};

export default SubDetail;
