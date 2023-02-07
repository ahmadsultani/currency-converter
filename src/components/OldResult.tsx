import { VStack, Text } from "@chakra-ui/react";

interface IResultProps {
  exchangeRate: number;
  result: number;
  targetCurrency: string;
}


function Result({ exchangeRate, result, targetCurrency } : IResultProps) {
  const displayResult = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (  
    <VStack pt={8} spacing={0}>
      <Text m={0} fontSize="lg" color={'whiteAlpha.800'} letterSpacing={1}> Result: </Text>
      <Text fontWeight={500} p={0} m={0} letterSpacing={1} color={'teal.400'} fontSize="2xl">{targetCurrency} {displayResult}</Text>
      <Text fontSize="xs" p={1} letterSpacing={0.5} color={'whiteAlpha.800'} >Rate: {exchangeRate}</Text>
    </VStack> 
  );
}

export default Result;