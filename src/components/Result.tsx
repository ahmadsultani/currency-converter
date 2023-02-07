import { VStack, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import fetchData, { IDataResponse } from "../fetchData";

interface IResultProps {
  source: string;
  target: string;
  amount: number;
  isReady: boolean;
}

function Result({ source, target, amount, isReady }: IResultProps) {
  const query = useQuery(["exchange", source, target, amount], fetchData, {
    onSuccess: (data) => {
      console.log(data);
    },
    placeholderData: {
      info: {
        rate: 0,
      },
      result: 0,
    },
    enabled: isReady,
    retry: 0,
  });

  const { data, isError, isFetching, isPlaceholderData } = query;

  if (isPlaceholderData && !isReady) {
    return (
      <VStack pt={9} pb={2} spacing={0}>
        <Text
          mb={0}
          fontSize="md"
          fontWeight={600}
          color={"whiteAlpha.800"}
          letterSpacing={1}
        >
          {" "}
          RESULT:{" "}
        </Text>
        <Text
          fontWeight={500}
          p={0}
          m={0}
          letterSpacing={1}
          color={"teal.400"}
          fontSize="2xl"
        >
          0
        </Text>
      </VStack>
    );
  }

  if (isError) {
    return (
      <VStack pt={9} pb={2} spacing={0}>
        <Text
          mb={0}
          fontSize="md"
          fontWeight={600}
          color={"whiteAlpha.800"}
          letterSpacing={1}
        >
          {" "}
          RESULT:{" "}
        </Text>
        <Text
          fontWeight={500}
          p={0}
          m={0}
          letterSpacing={1}
          color={"teal.400"}
          fontSize="2xl"
        >
          Error
        </Text>
      </VStack>
    );
  }

  if (isFetching ) {
    return (
      <VStack pt={9} pb={2} spacing={0}>
        <Text
          mb={0}
          fontSize="md"
          fontWeight={600}
          color={"whiteAlpha.800"}
          letterSpacing={1}
        >
          {" "}
          RESULT:{" "}
        </Text>
        <Text
          fontWeight={500}
          p={0}
          m={0}
          letterSpacing={1}
          color={"teal.400"}
          fontSize="2xl"
        >
          Loading...
        </Text>
      </VStack>
    );
  }

  const {
    info: { rate },
    result,
  } = data as IDataResponse;

  const displayResult = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <VStack pt={9} pb={2} spacing={0}>
      <Text
        mb={0}
        fontSize="md"
        fontWeight={600}
        color={"whiteAlpha.800"}
        letterSpacing={1}
      >
        {" "}
        RESULT:{" "}
      </Text>
      <Text
        fontWeight={500}
        p={0}
        m={0}
        letterSpacing={1}
        color={"teal.400"}
        fontSize="2xl"
      >
        {target} {displayResult}
      </Text>
      <Text fontSize={10} p={1} letterSpacing={0.5} color={"whiteAlpha.800"}>
        {`${source} 1 = ${target} ${rate}`}
      </Text>
    </VStack>
  );
}

export default Result;
