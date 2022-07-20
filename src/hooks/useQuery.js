import client from '../../apollo-client';

export const useQuery = async (QUERY, VARIABLES) => {
  const response = await client.query({
    query: QUERY,
    ...(VARIABLES && { variables: VARIABLES }),
  });
  return response;
};
