import React from "react";
import "./person.css";

interface IPerson {
  name: string;
  status: string;
}

function Person({ name, status }: IPerson): JSX.Element {
  return (
    <div>
      <div className="person-primary-text">{name}</div>
      <div className="person-secondary-text">{status}</div>
    </div>
  );
}

export default Person;
