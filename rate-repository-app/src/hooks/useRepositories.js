import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
    },
  });

  return [data, loading, refetch];
};

export default useRepositories;
