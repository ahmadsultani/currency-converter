import { VStack, Text } from "@chakra-ui/react";

function Result({ exchangeRate, result, targetCurrency } : any) {
  result = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (  
    <VStack mt={10} spacing={0}>
      <Text as='b' m={0} fontSize="lg" color={'whiteAlpha.700'} letterSpacing={1}> Result: </Text>
      <Text p={0} m={0} letterSpacing={2} fontSize="3xl">{targetCurrency} {result}</Text>
      <Text fontSize="xs" p={1} letterSpacing={1} color={'whiteAlpha.700'} >Rate: {exchangeRate}</Text>
    </VStack> 
  );
}

export default Result;