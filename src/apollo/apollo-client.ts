import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const customFetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  return fetch(input, {
    ...init,
  });
};

const apiKey=import.meta.env.VITE_API_KEY
const endPointUrl = import.meta.env.VITE_END_POINT_URL

const client = new ApolloClient({
  link: createHttpLink({
    // Graphql end point
    // uri: "https://awxpaiztcbfjwzyvfyup.supabase.co/graphql/v1", 
    uri:endPointUrl,
    fetch:customFetch,
    headers: {
      "Content-Type": "application/json",
      // Api key
      apiKey:apiKey
      // apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3eHBhaXp0Y2Jmand6eXZmeXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxOTUyNDYsImV4cCI6MjA0OTc3MTI0Nn0.WQvPpbs_jWa36jYVJPYu_PnLgqdXyxooXQawK2MsQRc", // Replace with your Supabase API Key
    },
  }),
  cache: new InMemoryCache(),
});

export default client;


