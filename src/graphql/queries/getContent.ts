import { gql } from '@apollo/client';

export const GET_CONTENT = gql`
  query GetContent {
    news_content{
      id
      title
      description
      image_url
    }
  }
`;