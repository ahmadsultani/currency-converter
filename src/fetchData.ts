import axios from "axios";
import { QueryFunction } from "react-query/types/core";

export interface IDataResponse {
  success: true;
  query: {
    from: string;
    to: string;
    amount: number;
  };
  info: {
    timestamp: 1675755123;
    rate: 1.073722;
  };
  date: "2023-02-07";
  result: 1.073722;
}

const API_KEY = process.env.REACT_APP_API_KEY;

const fetchData: QueryFunction = async ({ queryKey }) => {
  const [key, source, target, amount] = queryKey;
  const url = `https://api.apilayer.com/exchangerates_data/convert?to=${target}&from=${source}&amount=${amount}&apikey=${API_KEY}`;
  console.log(url);
  const { data } = await axios.get(url);

  if (data.success) {
    return data;
  } else {
    throw new Error(`${key}/ Failed to fetch data`);
  }
};

export default fetchData;
