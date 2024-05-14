import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const iconStyle = {
  fontSize: '1.2rem',
  color: 'rgba(0, 0, 0, 0.87)',
  backgroundColor: 'white',
  borderRadius: '4px'
};
const activeColor = 'rgba(0, 0, 0, 0.08)';
const hoverColor = 'rgba(0, 0, 0, 0.08)';
const borderColor = 'rgba(0, 0, 0, 0.23)';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    const generatePaginationItems = () => {
        const items = [];
        const maxPagesToShow = 5;
        const maxPagesWithDots = maxPagesToShow - 2;
        if (totalPages <= maxPagesToShow) {
          for (let i = 1; i <= totalPages; i++) {
            items.push(
              <Button
                ml={1}
                mr={1}
                key={i}
                onClick={() => handlePageChange(i)}
                colorScheme="customInactive"
                _hover={{ bg: hoverColor }}
                style={{
                  backgroundColor: currentPage === i ? activeColor : 'white',
                  color: 'rgba(0, 0, 0, 0.87)',
                  border: `1px solid ${currentPage === i ? activeColor : borderColor}`,
                  fontWeight: 400,
                  fontSize: '0.875rem',
                  minWidth: '30px',
                  height: '32px',
                  padding: '0px 6px',
                  borderRadius: '4px'
                }}
              >
                {i}
              </Button>
            );
          }
        } else {
          const leftEllipsis = currentPage > maxPagesWithDots;
          const rightEllipsis = currentPage < totalPages - maxPagesWithDots + 1;
      
          let startPage, endPage;
      
          if (leftEllipsis && rightEllipsis) {
            startPage = currentPage - Math.floor(maxPagesWithDots / 2);
            endPage = currentPage + Math.floor(maxPagesWithDots / 2);
          } else if (leftEllipsis && !rightEllipsis) {
            startPage = totalPages - maxPagesWithDots + 1;
            endPage = totalPages;
          } else {
            startPage = 1;
            endPage = maxPagesWithDots;
          }
      
          for (let i = startPage; i <= endPage; i++) {
            items.push(
              <Button
                ml={1}
                mr={1}
                key={i}
                onClick={() => handlePageChange(i)}
                colorScheme="customInactive"
                _hover={{ bg: hoverColor }}
                style={{
                  backgroundColor: currentPage === i ? activeColor : 'white',
                  color: 'rgba(0, 0, 0, 0.87)',
                  border: `1px solid ${currentPage === i ? activeColor : borderColor}`,
                  fontWeight: 400,
                  fontSize: '0.875rem',
                  minWidth: '30px',
                  height: '32px',
                  padding: '0px 6px',
                  borderRadius: '4px'
                }}
              >
                {i}
              </Button>
            );
          }
      
          if (leftEllipsis) {
            items.unshift(
              <Button key="leftEllipsis" isDisabled>
                ...
              </Button>
            );
          }
      
          if (rightEllipsis) {
            items.push(
              <Button key="rightEllipsis" isDisabled>
                ...
              </Button>
            );
          }
        }
      
        return items;
      };
      
      
  return (
    <Flex justify="center" mt={4} >
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        isDisabled={currentPage <= 1}
        mr={2}
        colorScheme="teal"
        _hover={{ bg: 'teal.500' }}
        style={{...iconStyle, border: `1px solid ${borderColor}`, fontWeight: 400, fontSize: '0.875rem', minWidth: '30px', height: '32px', padding: '0px 6px', marginRight: '0.25rem'}}
      >
        <MdOutlineKeyboardArrowLeft />
      </Button>
      {generatePaginationItems()}
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
        ml={2}
        colorScheme="teal"
        _hover={{ bg: 'teal.500' }}
        style={{...iconStyle, border: `1px solid ${borderColor}`, fontWeight: 400, fontSize: '0.875rem', minWidth: '30px', height: '32px', padding: '0px 6px', marginLeft: '0.25rem'}}
      >
        <MdOutlineKeyboardArrowRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
