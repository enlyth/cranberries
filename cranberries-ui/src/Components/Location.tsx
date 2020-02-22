import React, { useState } from "react";
import styled from "@emotion/styled";
import { ILocation } from "../types/location";
import { Zombie } from "./Zombie";
import { Button } from "./Button";
import { useMutation } from "@apollo/react-hooks";
import {
  CLEANSE_LOCATION,
  SPAWN_AT_LOCATION,
  MOVE_ALL_TO_LOCATION,
  MOVE_ZOMBIES_TO_LOCATION
} from "../apollo/queries";
import { IZombie } from "../types/zombie";

const Container = styled.div`
  margin: 32px 8px;
  box-shadow: 0px 0px 4px 0px #0c0c0c;
  border-radius: 4px;
  border-radius: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #2e2e2e;
  border-radius: 4px;
`;

const Title = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ZombieList = styled.div`
  padding: 12px;
  transition: background-color 0.2s ease;
  background-color: #2a2a2a;
  border-top: 1px solid #1e1e1e;
  display: flex;
  flex-wrap: wrap;
  border-radius: 0px 0px 4px 4px;
  align-items: center;
`;

const LocationImage = styled.img`
  width: 172px;
  height: 172px;
  filter: drop-shadow(0px 0px 12px #666) hue-rotate(45deg);
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #1f1f1f;
  padding: 16px;
`;

const LocationLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

interface IProps {
  location: ILocation;
  locations: ILocation[];
}

export const Location: React.FC<IProps> = props => {
  const { location, locations } = props;
  const [cleanseLocation] = useMutation<ILocation>(CLEANSE_LOCATION, {
    variables: {
      name: location.name
    }
  });
  const [moveAllToLocation] = useMutation<ILocation[]>(MOVE_ALL_TO_LOCATION, {
    variables: {
      name: location.name
    }
  });
  const [spawnAtLocation] = useMutation<IZombie>(SPAWN_AT_LOCATION, {
    variables: {
      name: location.name
    }
  });
  const [selected, setSelected] = useState<IZombie[]>([]);
  const [moveToLocation] = useMutation<IZombie[]>(MOVE_ZOMBIES_TO_LOCATION);

  const toggleSelected = (zombie: IZombie) => {
    if (selected.find(x => x.id === zombie.id)) {
      setSelected(selected.filter(x => x.id !== zombie.id));
    } else {
      setSelected([...selected, zombie]);
    }
  };

  const selectAll = () => {
    setSelected(location.zombies);
  };

  const deselectAll = () => {
    setSelected([]);
  };

  return (
    <Container id={location.name}>
      <Title>
        <LocationLabel>
          <h2>{location.name}</h2>
          <span>
            {location.zombies.length ? location.zombies.length : "No"} Zombies
          </span>
        </LocationLabel>
        <LocationImage src={`/${location.image}`} alt="hospital" />
      </Title>
      <Actions>
        <Button onClick={() => moveAllToLocation()}>Move All Here</Button>
        <Button
          onClick={() => {
            cleanseLocation();
            deselectAll();
          }}
        >
          Cleanse Location
        </Button>
        <Button onClick={() => spawnAtLocation()}>Spawn Zombie</Button>
      </Actions>
      <ZombieList>
        {location.zombies.length === 0 && (
          <h3 style={{ marginLeft: 24 }}>This location is empty.</h3>
        )}
        {location.zombies.map((zombie, index) => (
          <Zombie
            key={zombie.id}
            location={location}
            zombie={zombie}
            selected={!!selected.find(x => x.id === zombie.id)}
            onClick={() => toggleSelected(zombie)}
          />
        ))}
      </ZombieList>
      <Actions>
        {locations
          .filter(x => x.name !== location.name)
          .map(x => (
            <Button
              onClick={() => {
                moveToLocation({
                  variables: {
                    zombies: selected.map(z => z.id),
                    name: x.name
                  }
                });
                deselectAll();
              }}
            >
              Move To {x.name}
            </Button>
          ))}
        <Button onClick={() => selectAll()}>Select All</Button>
        <Button onClick={() => deselectAll()} disabled={selected.length === 0}>
          Deselect All {selected.length ? `(${selected.length})` : ""}
        </Button>
      </Actions>
    </Container>
  );
};
