import { gql } from '@apollo/client'

export const queryFilterProducts = gql`
  query Products($accountId: String, $page: Int) {
    products(filter: { accountIds: [$accountId] }, page: $page, limit: 1000) {
      name
      sku
      _id
    }
  }
`
