import React from "react";
import "../styles/UserOverlay.scss";

export const UserOverlay = (props) => {
  return (
    <div className="card user-overlay container">
      <div className="row">
        <div className="col-md-5">
          <img
            className="card-img-top"
            src={props.user.picture.large}
            alt={`Portrait of ${props.user.name.first}`}
          />
        </div>
        <div className="col-md-7">
          <ul className="list-group list-group-flush">
            <li className="list-group-item user-property-name">
              <span style={{ fontWeight: "bold" }} className="mr-2">
                Name:
              </span>
              {props.user.name.first} {props.user.name.last}
            </li>
            <li className="list-group-item user-property-username">
              <span style={{ fontWeight: "bold" }} className="mr-2">
                Username:
              </span>
              {props.user.login.username}
            </li>
            <li className="list-group-item user-property-email">
              <span style={{ fontWeight: "bold" }} className="mr-2">
                Email:
              </span>
              {props.user.email}
            </li>
            <li className="list-group-item user-property-street">
              <span style={{ fontWeight: "bold" }} className="mr-2">
                Street:
              </span>
              {props.user.location.street.number}{" "}
              {props.user.location.street.name}
            </li>
            <li className="list-group-item user-property-city">
              <span style={{ fontWeight: "bold" }} className="mr-2">
                City:
              </span>
              {props.user.location.city}
            </li>
            <li className="list-group-item user-property-state">
              <span style={{ fontWeight: "bold" }} className="mr-2">
                State:
              </span>
              {props.user.location.state}
            </li>
            <li className="list-group-item user-property-postcode">
              <span style={{ fontWeight: "bold" }} className="mr-2">
                Post Code:
              </span>
              {props.user.location.postcode}
            </li>
            <li className="list-group-item user-property-phone">
              <span style={{ fontWeight: "bold" }} className="mr-2">
                Phone:
              </span>
              {props.user.phone}
            </li>
            <li className="list-group-item user-property-cellphone">
              <span style={{ fontWeight: "bold" }} className="mr-2">
                Cellphone:
              </span>
              {props.user.cell}
            </li>
          </ul>
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => props.callback()}>
        close
      </button>
    </div>
  );
};
