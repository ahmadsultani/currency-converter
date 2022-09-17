import { useEffect, useState } from 'react';

import Form from './components/Form';
import Result from './components/Result';
import { API_KEY } from './apiKey';

import {
  ChakraProvider,
  Box,
  Text,
  Grid,
  theme,
} from "@chakra-ui/react"

export const App = () => {
  const [sourceCurrency, setSourceCurrency] = useState(null);
  const [targetCurrency, setTargetCurrency] = useState(null);
  const [amount, setAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [result, setResult] = useState(0);

  useEffect(() => {
    if (amount && sourceCurrency && targetCurrency) {
      fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${targetCurrency}&from=${sourceCurrency}&amount=${amount}&apikey=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setExchangeRate(data.info.rate);
          setResult(data.result);
        })
    }
  }, [sourceCurrency, targetCurrency, amount])

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} placeItems={'center'}>
          <Box bg="blackAlpha.300" justifySelf={"center"} h={'55vh'} w={{base: "45%", lg: "30%"}} pt={8} boxShadow={"0px 0px 5px 0px rgba(0,0,0,0.5)"}>
            <Text as='b' fontSize="2xl" color={'whiteAlpha.800'} letterSpacing={2}>
              EXCHANGE
            </Text>
            <Form 
              setSourceCurrency={setSourceCurrency} 
              setTargetCurrency={setTargetCurrency}  
              setAmount={setAmount}
            />
            <Result exchangeRate={exchangeRate} result={result} targetCurrency={targetCurrency}/>
          </Box>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}
