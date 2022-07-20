import { gql } from '@apollo/client';

export const GET_CASE_DESIGNS = gql`
  query {
    queryCaseDesign {
      id
      name
      series
      slug
      description
      variants {
        description
        stock
        textureImage
        salePrice
        productImages
        price
        name
        isAvailable
        id
      }
      deviceModel {
        name
      }
    }
  }
`;

export const SINGLE_CASE_DESIGN = gql`
  query ($slug: String) {
    getCaseDesign(slug: $slug) {
      id
      name
      series
      slug
      description
      variants {
        description
        stock
        textureImage
        salePrice
        productImages
        price
        name
        isAvailable
        id
      }
      deviceModel {
        name
      }
    }
  }
`;
