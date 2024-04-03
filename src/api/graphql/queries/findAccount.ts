import { gql } from '@apollo/client'

export const queryFindAccount = gql`
  query accounts($email: String) {
    accounts(filter: { emails: [$email] }) {
      _id
      name
      email
    }
  }
`
