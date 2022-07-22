import { gql } from '@apollo/client';
import client from '../../apollo-client';

export const GET_SLUGS = gql`
  query querySlugs {
    queryCaseDesign {
      slug
    }
  }
`;
