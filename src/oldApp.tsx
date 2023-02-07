import { useEffect, useState } from "react";
import axios from "axios";

import Form from "./components/Form";
import Result from "./components/Result";

import { ChakraProvider, Box, Text, Grid, theme } from "@chakra-ui/react";

export const App = () => {
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amount, setAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [result, setResult] = useState(0);
  const [isloading, setIsLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (sourceCurrency && targetCurrency && amount) {
      setIsLoading(true);
      axios
        .get(
          `https://api.apilayer.com/exchangerates_data/convert?to=${targetCurrency}&from=${sourceCurrency}&amount=${amount}&apikey=${API_KEY}`
        )
        .then((response) => {
          console.log(response.data);
          setExchangeRate(response.data.result);
          setResult(response.data.result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [API_KEY, amount, sourceCurrency, targetCurrency]);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} placeItems={"center"}>
          <Box
            bg="blackAlpha.900"
            justifySelf={"center"}
            w="25%"
            py={8}
            boxShadow={"0px 0px 5px 0px rgba(0,0,0,0.5)"}
          >
            <Text
              as="b"
              fontSize="2xl"
              color={"whiteAlpha.800"}
              letterSpacing={2}
            >
              EXCHANGE
            </Text>
            <Form
              setSourceCurrency={setSourceCurrency}
              setTargetCurrency={setTargetCurrency}
              setAmount={setAmount}
            />
          </Box>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
