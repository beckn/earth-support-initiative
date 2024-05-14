import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import SearchResultCard from '../components/SearchResultCard';
import Slider from '../components/Slider';
import { useTranslation } from "react-i18next";
import  Footer from '../components/Footer';

function SearchScreen({ searchText }) {
  const { t } = useTranslation();
  console.log("searchText", searchText);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [searchText]);

  return (
    <Box>
      <Box marginTop={1} p={4} marginBottom={20}>
        <Box marginTop={35}>
          <Slider 
          />
          {isLoading ? (
            <p>Loading...</p>
          ) : searchText.length === 0 ? (
            <p>No data found</p>
          ) : (
            searchText.map((item, index) => (
              <SearchResultCard
                key={index}
                title={item.title ? item.title : ""}
                imageUrl={item.image_url ? item.image_url : ""}
                publishedBy={item.provider_name ? item.provider_name : ""}
                description={item.description ? `${item.description.slice(0, 200)}${item.description.length > 100 ? '...' : ''}` : ""}
                bpp_id={item.bpp_id}
                bpp_uri={item.bpp_uri}
                item={item}
              />
            ))
          )}
        </Box>
      </Box>
      <Box mt={100}> <Footer /> </Box>

    </Box>
  );
}

export default SearchScreen;
