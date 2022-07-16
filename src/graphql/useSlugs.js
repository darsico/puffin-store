import { gql } from '@apollo/client';
const GET_SLUGS = gql`
  query querySlugs {
    queryCaseDesign {
      slug
    }
  }
`;
