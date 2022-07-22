import { gql } from '@apollo/client';

export const GET_SINGLE_DEVICE = gql`
  query queryDevice($id: ID!) {
    getDeviceModel(id: $id) {
      id
      name
      icon
      caseDesign {
        id
        name
        slug
        variants {
          name
          price
          salePrice
          productImages
          textureImage
          id
        }
      }
    }
  }
`;

export const GET_ALL_DEVICES = gql`
  query queryAllDevices {
    queryDeviceModel {
      name
      id
      icon
    }
  }
`;
