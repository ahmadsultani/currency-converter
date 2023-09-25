import { useState } from "react";

import {
  FormControl,
  HStack,
  Input,
  Button,
  IconButton,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { BsArrowLeftRight } from "react-icons/bs";

interface IFormProps {
  setSourceCurrency: (sourceCurrency: string) => void;
  setTargetCurrency: (targetCurrency: string) => void;
  setAmount: (amount: number) => void;
  setIsReady: (isReady: boolean) => void;
}

function Form({
  setSourceCurrency,
  setTargetCurrency,
  setAmount,
  setIsReady,
}: IFormProps) {
  const [sourceCurrencyForm, setSourceCurrencyForm] = useState("USD");
  const [targetCurrencyForm, setTargetCurrencyForm] = useState("EUR");
  const [amountForm, setAmountForm] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  function handleSourceFormChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSourceCurrencyForm(e.target.value);
  }

  function handleTargetFormChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setTargetCurrencyForm(e.target.value);
  }

  function handleAmountFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmountForm(e.target.value);
  }

  function handleSwitch() {
    setSourceCurrencyForm(targetCurrencyForm);
    setTargetCurrencyForm(sourceCurrencyForm);
  }

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (amountForm === "") {
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 2000);
      return;
    }
    setSourceCurrency(sourceCurrencyForm);
    setTargetCurrency(targetCurrencyForm);
    setAmount(Number(amountForm));
    setIsReady(true);
  }

  return (
    <>
      <Alert
        status="warning"
        variant="left-accent"
        position="absolute"
        top={0}
        p={"30px 50px"}
        left="50%"
        transform="translate(-50%, 0)"
        display={isAlert ? "flex" : "none"}
        transition={"height 0.5s ease-in-out"}
        alignItems={"center"}
        w={"fit"}
        h={isAlert ? "fit" : 0}
        boxSizing={"border-box"}
      >
        <AlertIcon />
        <AlertTitle mr={4}>Warning</AlertTitle>
        <AlertDescription fontSize={16}>Please input amount to exchange</AlertDescription>
      </Alert>

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
            value={amountForm}
            variant="flushed"
            px={2}
            placeholder="Amount"
            bg="transparent"
            borderBottom="2px"
            borderBottomColor={"teal.500"}
            type="number"
            color="whiteAlpha.800"
            mr={3}
            _hover={{ borderBottomColor: "teal.300" }}
            _active={{ borderColor: "teal.300" }}
            _focus={{ borderColor: "teal.300", bg: "transparent" }}
            _focusVisible={{ bg: "transparent" }}
            _grabbed={{ bg: "transparent" }}
            _selected={{ bg: "transparent" }}
            _selection={{ bg: "transparent" }}
          />
          <Button
            size="sm"
            bg={"teal.500"}
            fontSize={10}
            borderRadius={8}
            px={4}
            _hover={{ bg: "teal.600" }}
            _active={{ bg: "teal.600" }}
            _focus={{ bg: "teal.600" }}
            color={"whiteAlpha.800"}
            role="button"
            onClick={handleButtonClick}
          >
            CONVERT
          </Button>
        </HStack>
      </FormControl>
    </>
  );
}

export default Form;
