import React from "react";
import styled from "@emotion/styled";

const StyledLogo = styled.div`
  border: none;
  padding: 16px;
  width: auto;
`;
export const Logo = () => {
  return (
    <StyledLogo>
      <span role="img" aria-label="Zombie">
        🧟{" "}
      </span>
      Zombie Manager
    </StyledLogo>
  );
};
