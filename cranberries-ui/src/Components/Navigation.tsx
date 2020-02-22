import React from "react";
import styled from "@emotion/styled";
import { Logo } from "./Logo";

const StyledNavidation = styled.div`
  width: 100%;
  color: white;
  background-color: rgba(105, 78, 255, 0.8);
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 8px 0px #111;
  position: sticky;
  top: 0;
  z-index: 1;
  margin-bottom: 16px;
  backdrop-filter: blur(4px);
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 960px;
`;

export const Navigation = () => {
  return (
    <StyledNavidation>
      <NavigationContainer>
        <Logo />
      </NavigationContainer>
    </StyledNavidation>
  );
};
