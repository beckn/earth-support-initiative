import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { useTranslation } from "react-i18next";

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const { t } = useTranslation();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleClear = () => {
    setInputValue('');
  };

  return (
    <InputGroup>
      <Input
        type="text"
        placeholder={t('SEARCH')}
        value={inputValue}
        onChange={handleChange}
      />
      <InputRightElement onClick={handleClear} cursor="pointer">
        {inputValue ? (
          <RxCrossCircled color="gray.300" />
        ) : (
          <IoIosSearch color="gray.300" />
        )}
      </InputRightElement>
    </InputGroup>
  );
}

export default SearchBar;