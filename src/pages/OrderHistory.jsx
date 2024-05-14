import React, { useState } from "react";
import { Box, Text, Heading, Flex } from "@chakra-ui/react";
import SubHeader from "../components/SubHeader";
import { useTranslation } from "react-i18next";
import onConfirm from "../assets/apiJson/on_confirm.json";

const OrderHistory = () => {
  const { t } = useTranslation();
  // const [items, setItems] = useState(onConfirm.message.order);
  // const data = localStorage.getItem('requestHistory')? JSON.parse(localStorage.getItem('requestHistory')) : onConfirm.message.order;
  const data = JSON.parse(localStorage.getItem("requestHistory"));
  const [oItem, setItem] = useState(data);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const suffix = (day) => {
      if (day === 1 || day === 21 || day === 31) return "st";
      if (day === 2 || day === 22) return "nd";
      if (day === 3 || day === 23) return "rd";
      return "th";
    };

    return `${day}${suffix(day)} ${month} ${year}, ${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes} ${hours >= 12 ? "pm" : "am"}`;
  };

  return (
    <Box>
      <SubHeader title={t("ORDER_HISTORY")} cartItemCount={2} />
      <Box maxWidth="1200px" mx="auto" px={4}>
        {oItem?.items && oItem.items.length > 0 ? (
          oItem.items.map((item, index) => (
            <Box
              key={index}
              boxShadow="0px 20px 25px 0px rgba(0, 0, 0, 0.1), 0px 8px 10px 0px rgba(0, 0, 0, 0.1)"
              p={6}
              borderRadius="md"
              bg="white"
              width="100%"
              my={4}
              px={4}
            >
              <Heading as="h2" size="md" mb={3} fontSize={15} fontWeight={600}>
                {item?.descriptor?.name}{" "}
              </Heading>
              <Flex direction="column">
                <Text fontSize={12} fontWeight={400} mb={3}>
                  {t("PROVIDED_BY")}: {oItem?.provider?.descriptor?.name}
                </Text>
                <Text fontSize={12} fontWeight={400} mb={3} noOfLines={2}>
                  {item?.descriptor?.short_desc}
                </Text>
                {oItem?.fulfillments && (
                  <Text fontSize={12} fontWeight={400}>
                    {t("Placed at")}{" "}
                    {formatDate(oItem?.fulfillments[0]?.state?.updated_at)}
                  </Text>
                )}
              </Flex>
            </Box>
          ))
        ) : (
          <Text textAlign="center" fontSize={16} mt={10}>
            {t("No History Available")}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default OrderHistory;
