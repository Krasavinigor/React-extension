import React from "react";
import {
  Avatar, List, ListItem, ListItemAvatar,
} from "@material-ui/core";
import IPerson from "@/interfaces/IPerson";
import Person from "../person/Person";

interface IPersonCard {
  person: IPerson;
}

function PersonCard({ person }: IPersonCard): JSX.Element {
  const { name, status, imageUrl } = person;
  return (
    <List disablePadding>
      <ListItem disableGutters>
        <ListItemAvatar>
          <Avatar alt={name} src={imageUrl} />
        </ListItemAvatar>
        <Person name={name} status={status} />
      </ListItem>
    </List>
  );
}

export default PersonCard;
