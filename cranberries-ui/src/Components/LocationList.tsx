import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_LOCATIONS } from "../apollo/queries";
import { ILocation } from "../types/location";
import { Location } from "./Location";

export const LocationList: React.FC = () => {
  const { error, data, loading } = useQuery<{ locations: ILocation[] }>(
    GET_LOCATIONS
  );

  if (error) {
    return <div>{error.message}</div>;
  }

  if (loading || !data) {
    return <div>Loading..</div>;
  }

  const { locations } = data;

  return (
    <>
      {locations.map(location => {
        return (
          <Location
            key={location.id}
            location={location}
            locations={locations}
          />
        );
      })}
    </>
  );
};
