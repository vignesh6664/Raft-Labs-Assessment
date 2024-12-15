import { gql } from '@apollo/client';

export const ADD_CONTENT = gql`
  mutation AddContent($title: String!, $description: String!, $image_url: String) {
    insert_content(objects: { title: $title, description: $description, image_url: $image_url }) {
      returning {
        id
        title
        description
        image_url
      }
    }
  }
`;
