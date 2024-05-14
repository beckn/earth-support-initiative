import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import {
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from "@chakra-ui/icons";
import logo from "../assets/images/logo.svg";
import config from "../services/config.json";
import { useTranslation } from "react-i18next";
import { header, buttonCss } from "../styles/branding";
import appConfig from "../assets/ui-config/homeConfig.json";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineHistory } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import orderhistory from "../assets/images/orderhistory.svg";

function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current path is "/"
  const isHomePage = location.pathname === "/";

  const handleOrderHistoryClick = () => {
    navigate("/orderhistory");
  };

  return (
    <Box>
      <Flex
        bg={header?.headerContent?.headerBgColor}
        w="100%"
        p={6}
        height={15}
        alignItems="center"
        boxShadow="md"
        position="fixed"
        fontFamily="system-ui"
        justifyContent="space-between"
        zIndex={999}
      >
        {/* Left-hand side */}
        <Flex alignItems="center">
          {appConfig?.isLogoInHeader && (
            <Image
              src={header?.headerContent?.logoSrc}
              alt="Forum Logo"
              marginRight="2"
              boxSize="60px"
            />
          )}
          <Image
            src={header?.headerContent?.headerLogo}
            alt="Forum Logo"
            marginRight="2"
          />
        </Flex>

        {/* Right-hand side */}
        {!isHomePage && ( // Conditionally render the Menu
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              rightIcon={<BsThreeDotsVertical />}
              variant="unstyled"
              _hover={{
                bg: "none",
                border: "none",
                color: "#000",
                padding: "0",
              }}
              _active={{
                bg: "none",
                border: "none",
                color: "#000",
                padding: "0",
              }}
            />
            <MenuList>
              <MenuItem
                onClick={handleOrderHistoryClick}
                _hover={{
                  bg: "none",
                  color: "#000",
                }}
                _active={{
                  bg: "none",
                  color: "#000",
                }}
              >
                <img
                  src={orderhistory}
                  alt="Order History"
                  width="24"
                  height="24"
                  style={{ marginRight: "10px" }}
                />
                {t("ORDER_HISTORY")}
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
      {/* Add padding to the top to prevent content from being hidden */}
      <Box paddingTop="4rem" />
    </Box>
  );
}

export default Header;
