import { graphql } from 'react-relay'

export const MessageRoomQuery = graphql`
  query MessageRoomQuery($roomId: ID!) {
    chatRoom(id: $roomId) {
      id
      participants {
        edges {
          node {
            profile {
              id
              __typename
              name
              image(width: 100, height: 100) {
                url
              }
            }
          }
        }
      }
      ...MessagesListFragment
    }
  }
`
