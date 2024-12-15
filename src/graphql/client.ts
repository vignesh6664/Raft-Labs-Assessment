import { ApolloClient, InMemoryCache } from '@apollo/client';
const VITE_SUPABASE_URL="https://awxpaiztcbfjwzyvfyup.supabase.co/graphql/v1";
const VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3eHBhaXp0Y2Jmand6eXZmeXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxOTUyNDYsImV4cCI6MjA0OTc3MTI0Nn0.WQvPpbs_jWa36jYVJPYu_PnLgqdXyxooXQawK2MsQRc"

const client = new ApolloClient({
  uri: VITE_SUPABASE_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: VITE_SUPABASE_ANON_KEY,
  },
});

export default client;
