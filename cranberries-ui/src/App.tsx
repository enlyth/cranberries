import React from "react";
import "./App.css";
import { LocationList } from "./Components/LocationList";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./apollo/client";
import { Navigation } from "./Components/Navigation";
import styled from "@emotion/styled";

const AppContainer = styled.div`
  background-color: #212121;
  min-height: 100vh;
  color: white;
  margin: auto;
`;

const AppBody = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 960px;
  padding: 16px;
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <AppContainer>
        <Navigation />
        <AppBody>
          <LocationList />
        </AppBody>
      </AppContainer>
    </ApolloProvider>
  );
}

export default App;
