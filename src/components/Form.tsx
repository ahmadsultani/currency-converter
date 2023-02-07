import { useState } from "react";

import {
  FormControl,
  HStack,
  Input,
  Button,
  IconButton,
  Select,
} from "@chakra-ui/react";
import { BsArrowLeftRight } from "react-icons/bs";

interface IFormProps {
  setSourceCurrency: (sourceCurrency: string) => void;
  setTargetCurrency: (targetCurrency: string) => void;
  setAmount: (amount: number) => void;
}

function Form({ setSourceCurrency, setTargetCurrency, setAmount }: IFormProps) {
  const [sourceCurrencyForm, setSourceCurrencyForm] = useState("USD");
  const [targetCurrencyForm, setTargetCurrencyForm] = useState("EUR");
  const [amountForm, setAmountForm] = useState(0);

  function handleSourceFormChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSourceCurrencyForm(e.target.value);
  }

  function handleTargetFormChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setTargetCurrencyForm(e.target.value);
  }

  function handleAmountFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmountForm(Number(e.target.value));
  }

  function handleSwitch() {
    setSourceCurrencyForm(targetCurrencyForm);
    setTargetCurrencyForm(sourceCurrencyForm);
  }

  async function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    console.log("clicked", sourceCurrencyForm, targetCurrencyForm, amountForm)
    setSourceCurrency(sourceCurrencyForm);
    setTargetCurrency(targetCurrencyForm);
    setAmount(amountForm);
  }

  return (
    <FormControl mt={3}>
      <HStack mx={"auto"} h={"fit"} w="80%">
        <Select
          size="sm"
          onChange={handleSourceFormChange}
          value={sourceCurrencyForm}
          color="whiteAlpha.700"
          border="2px"
          borderColor={"teal.500"}
          bg="blackAlpha.800"
          borderRadius={8}
          _hover={{ borderColor: "teal.300" }}
          _active={{ borderColor: "teal.300" }}
          _focus={{ borderColor: "teal.300" }}
        >
          {["USD", "EUR", "IDR", "JPY", "CNY", "SGD"].map((cur) => (
            <option key={cur} value={cur} style={{ color: "black" }}>
              {cur}
            </option>
          ))}
        </Select>
        <IconButton
          icon={<BsArrowLeftRight size={25} />}
          aria-label="switch curency"
          bg="transparent"
          color="whiteAlpha.700"
          onClick={handleSwitch}
          _hover={{ bg: "transparent", color: "whiteAlpha.800" }}
          p={0}
        ></IconButton>
        <Select
          size="sm"
          onChange={handleTargetFormChange}
          value={targetCurrencyForm}
          color="whiteAlpha.700"
          border="2px"
          borderColor={"teal.500"}
          borderRadius={8}
          _hover={{ borderColor: "teal.300" }}
          _active={{ borderColor: "teal.300" }}
          _focus={{ borderColor: "teal.300" }}
        >
          {["USD", "EUR", "IDR", "JPY", "CNY", "SGD"].map((cur) => (
            <option key={cur} value={cur} style={{ color: "black" }}>
              {cur}
            </option>
          ))}
        </Select>
      </HStack>
      <HStack w={"80%"} mx={"auto"} mt={2}>
        <Input
          size="sm"
          onChange={handleAmountFormChange}
          value={amountForm ? amountForm : ""}
          variant="flushed"
          px={2}
          placeholder="Amount"
          bg="transparent"
          borderBottom="2px"
          borderBottomColor={"teal.500"}
          color="whiteAlpha.800"
          mr={3}
          _hover={{ borderBottomColor: "teal.300" }}
          _active={{ borderColor: "teal.300" }}
          _focus={{ borderColor: "teal.300" }}
          _after={{ bg: "transparent" }}
          _selected={{ bg: "transparent" }}
          _selection={{ bg: "transparent" }}
        />
        <Button
          size={"sm"}
          fontSize={12}
          bg="teal.500"
          p={4}
          color={"whiteAlpha.700"}
          w="30%"
          _hover={{ bg: "teal.600" }}
          role="button"
          onClick={handleButtonClick}
        >
          Convert
        </Button>
      </HStack>
    </FormControl>
  );
}

export default Form;
