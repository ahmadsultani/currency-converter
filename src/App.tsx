import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import Form from "./components/Form";
import Result from "./components/Result";

import { ChakraProvider, Box, Text, Grid, theme } from "@chakra-ui/react";

export const App = () => {
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amount, setAmount] = useState(0);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: Infinity,
        staleTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
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
              <Result 
                source={sourceCurrency}
                target={targetCurrency}
                amount={amount}
              />
            </Box>
          </Grid>
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
};
