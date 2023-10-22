import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetch = (queryKey: [string], url: string) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
  });
};

export default useFetch;
