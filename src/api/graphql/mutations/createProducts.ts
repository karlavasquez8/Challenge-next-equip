import { gql } from '@apollo/client'

export const mutationCreateProducts = gql`
  mutation createProducts($name: String!, $sku: String, $id: ID!) {
    createProducts(
      input: { products: [{ name: $name, sku: $sku, accountId: $id }] }
    ) {
      _id
      name
      sku
      account {
        _id
        name
        email
      }
    }
  }
`
