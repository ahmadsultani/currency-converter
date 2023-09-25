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
    retry: 0,
    enabled: isReady,
    keepPreviousData: true,
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
          {0}
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

  if (isFetching) {
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

  const displayResult = result.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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
        {`${source} 1 = ${target} ${rate.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 4,
        })}`}
      </Text>
    </VStack>
  );
}

export default Result;
