import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: "RATING_AVERAGE",
      orderDirection: "ASC",
    },
  });

  return [data, loading];
};

export default useRepositories;
