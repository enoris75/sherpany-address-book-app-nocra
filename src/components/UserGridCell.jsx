import React, { useState } from "react";
import { UserOverlay } from "./UserOverlay";
import "../styles/UserGridCell.scss";

/**
 * Functional component which generates a cell-view for a single user
 * in the non-detailed view of users.
 * @param {*} props
 */
export const UserGridCell = (props) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      {showOverlay && (
        <UserOverlay user={props.user} callback={() => setShowOverlay(false)} />
      )}
      <div className="card user-grid-cell" onClick={() => setShowOverlay(true)}>
        <img
          className="card-img-top"
          src={props.user.picture.large}
          alt={`Portrait of ${props.user.name.first}`}
        />
        <ul className="list-group list-group-flush">
          <li className="list-group-item user-property-name">
            {props.user.name.first} {props.user.name.last}
          </li>
          <li className="list-group-item user-property-username">
            {props.user.login.username}
          </li>
          <li className="list-group-item user-property-email">
            {props.user.email}
          </li>
        </ul>
      </div>
    </>
  );
};
