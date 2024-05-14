import React, { useState, useEffect } from 'react';
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Select, VStack } from '@chakra-ui/react';
import  uiConfig  from '../services/config.json';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const env = import.meta.env;
import { useTranslation } from "react-i18next";


function FilterButton({ states, SelectedFilterOption, ResetSearch }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [filterValues, setFilterValues] = useState({});
    const [dependentOptions, setDependentOptions] = useState({});
    const { t } = useTranslation();

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleFilterChange1 = (event) => {
        setSelectedFilter(event.target.value);
    };

    const handleApplyFilters = () => {
        handleSearch();
        // SelectedFilterOption(selectedFilter);
        handleClose();
    };

    const handleResetFilters = () => {
        // Reset the selected filter
        setSelectedFilter('');
        // Call the function to reset the API
        SelectedFilterOption('All'); // Assuming 'All' resets the API
        handleClose();
    };

    const handleSearch = async () => {
        // Perform API call with filter values
        try {
          for (const key in filterValues) {
            if (filterValues[key] === "" || filterValues[key] === "") {
              delete filterValues[key];
            }
          }
          const response = await axios.post(`${baseUrl}/${env?.VITE_API_ROUTE}/search`, filterValues);
          setStory(response.data?.data[db_cache]);
          onClose();
        } catch (error) {
          console.error('Error performing search:', error);
        }
      };

  useEffect(() => {
    // Fetch initial data for all filters
    fetchFilterData();
  }, []);

  const fetchFilterData = async () => {
    try {
      const fetchDataPromises = uiConfig.advFilters.map(async (filter) => {
        let response = {};
        if (filter.call === 'post') {
          response = await axios.post(`${baseUrl}${filter.apiEndpoint}`, filter.body);
        } else if (filter.apiEndpoint) {
          response = await axios.get(`${baseUrl}${filter.apiEndpoint}`);
        } else {
          // Assuming filter.options is an array
          response.data = filter.options;
        }
        // Ensure response.data is an array before attempting to map
        const res = Array.isArray(response.data) ? response.data.map((job) => job[filter.field]) : [];
        return { [filter.field]: res };
      });
  
      const fetchedData = await Promise.all(fetchDataPromises);
      const mergedData = fetchedData.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  
      setDependentOptions(mergedData);
    } catch (error) {
      console.error('Error fetching filter data:', error);
    }
  };
  
    

    const handleFilterChange = async (filterField, value) => {
        // Update filter values
        setFilterValues((prevValues) => ({ ...prevValues, [filterField]: value }));
    
        // Check if the selected filter has a dependent field
        const dependentFilter = uiConfig.advFilters.find((filter) => filter.dependentOn === filterField);
    
        if (dependentFilter) {
          // Fetch options for the dependent field based on the selected value
          try {
            const response = await axios.get(`${baseUrl}${dependentFilter.apiEndpoint}?${filterField}=${value}`);
            const res = response?.data?.data[db_cache].map((job) => job[dependentFilter.field]);
    
            setDependentOptions((prevOptions) => ({ ...prevOptions, [dependentFilter.field]: res }));
          } catch (error) {
            console.error('Error fetching dependent filter options:', error);
          }
        }
      };
    

    return (
        <Box>
            <Button onClick={handleOpen} className="custom-button">
                {t('FILTER')}
            </Button>

            <Modal isOpen={isOpen} onClose={handleClose} size="md">
                <ModalOverlay backdropFilter="auto" backdropBlur="3px" />
                <ModalContent mt="20vh" ml={5} mr={5}>
                    <ModalHeader>  {t('FILTER_OPTIONS')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                        {uiConfig.advFilters.map((filter) => (
                      <div key={filter.field}>
                        <Select
                          value={filterValues[filter.field] || ''}
                          style={{ backgroundColor: "#e7e7f152", color: "black", fontFamily: 'Arial' }}
                          className="filters"
                          onChange={(e) => handleFilterChange(filter.field, e.target.value)}
                        >
                          <option value="">Select {filter?.label}</option>
                          {dependentOptions[filter.field]?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Select>
                        <br />

                      </div>
                    ))}

                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleResetFilters} _hover={{ background: '#4f6f4a', color: '#fff' }}
                            _active={{ background: '#4f6f4a', color: '#fff' }}
                            color='#4f6f4a' variant='outline' borderColor='#4f6f4a' mr={4}>
                            Reset
                        </Button>
                        <Button onClick={handleApplyFilters} className="custom-button">
                            Apply Filter
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default FilterButton;
