import React from "react";
import styled from "@emotion/styled";
import { IZombie } from "../types/zombie";
import { ILocation } from "../types/location";

interface IContainerProps {
  selected?: boolean;
}

const Container = styled.div<IContainerProps>`
  border-radius: 2px;
  cursor: pointer;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  color: #ccc;
  flex-direction: column;
  background-color: ${props => (props.selected ? "#5b45d3" : "#363636")};
  width: 54px;
  height: 64px;
  border: none;
  margin: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color:  ${props => (props.selected ? "#5b45d3" : "#3e3e3e")};
  }
`;

const ZombieName = styled.div`
  font-size: 11px;
  padding: 4px;
`;

interface IProps {
  zombie: IZombie;
  location: ILocation;
  onClick: () => void;
  selected: boolean;
}

const ZombieImage = styled.img`
  filter: drop-shadow(0px 0px 4px #1e1e1e);
`;

export const Zombie: React.FC<IProps> = props => {
  const { zombie, onClick, selected } = props;

  return (
    <Container
      data-tip={`${zombie.name}`}
      onClick={onClick}
      selected={selected}
    >
      <ZombieImage
        height={32}
        width={32}
        src={`/zombies/${zombie.appearance}.png`}
      />
      <ZombieName>{zombie.name}</ZombieName>
    </Container>
  );
};
