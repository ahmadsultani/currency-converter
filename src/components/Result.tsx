import { VStack, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import fetchData, { IDataResponse } from "../fetchData";

interface IResultProps {
  source: string;
  target: string;
  amount: number;
}

function Result({ source, target, amount }: IResultProps) {
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
  });

  const { data, isError, isPreviousData, isFetching } = query;


  if (isError) {
    return (
      <VStack pt={8} spacing={0}>
        <Text m={0} fontSize="lg" color={"whiteAlpha.800"} letterSpacing={1}>
          {" "}
          Result:{" "}
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

  if (isFetching && !isPreviousData) {
    return (
      <VStack pt={8} spacing={0}>
        <Text m={0} fontSize="lg" color={"whiteAlpha.800"} letterSpacing={1}>
          {" "}
          Result:{" "}
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
    <VStack pt={8} spacing={0}>
      <Text m={0} fontSize="lg" color={"whiteAlpha.800"} letterSpacing={1}>
        {" "}
        Result:{" "}
      </Text>
      <Text
        fontWeight={500}
        p={0}
        m={0}
        letterSpacing={1}
        color={"teal.400"}
        fontSize="2xl"
      >
        {source} {displayResult}
      </Text>
      <Text fontSize="xs" p={1} letterSpacing={0.5} color={"whiteAlpha.800"}>
        {`Rate: ${rate}`}
      </Text>
    </VStack>
  );
}

export default Result;
