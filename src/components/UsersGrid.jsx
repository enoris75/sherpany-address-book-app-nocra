import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/UserGrid.scss";
import { UserGridCell } from "./UserGridCell";
import { isBottomOfElementOnScreen } from "../shared/Utils";
import { loadNextBatch } from "../services/UserService";
import { NUMBER_OF_COLUMNS, CATALOG_SIZE } from "../shared/Constants";

/**
 * Function mapping (part of) the global state to props of this component
 * @param {redux state} state
 */
const mapStateToProps = (state) => {
  return {
    users: state.users,
    isLoading: state.isLoading,
    filter: state.filter,
  };
};

/**
 * Component managint the grid of users.
 */
class UsersGrid extends Component {
  /**
   * ID of the root element of the component. Used e.g. to track the scrolling
   */
  rootElementId = "userGrid";
  /**
   * Data structure containing the uesers after the filter has been applied.
   */
  fileredUsers = [];
  /**
   * Data structure containing the Users subdivided by row.
   */
  rowsOfUsers = {};

  componentDidMount() {
    document.addEventListener("scroll", this.detectScrollToTheBottom);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.detectScrollToTheBottom);
  }

  detectScrollToTheBottom = () => {
    const wrappedElement = document.getElementById(this.rootElementId);
    if (isBottomOfElementOnScreen(wrappedElement)) {
      if (this.props.users.length < CATALOG_SIZE) {
        loadNextBatch();
      }
    }
  };

  /**
   * Filter the users based on the given filter (if any).
   */
  filterUsers() {
    // Verify whether a filter has been set.
    if (!this.props.filter) {
      // No filter is set, pass all the users through.
      this.fileredUsers = this.props.users;
      return;
    }

    this.fileredUsers = this.props.users.filter((user) => {
      return (
        user.name.first
          .toLowerCase()
          .includes(this.props.filter.toLowerCase()) ||
        user.name.last.toLowerCase().includes(this.props.filter.toLowerCase())
      );
    });
  }

  /**
   * Split the users into rows whose length is according to the NUMBER_OF_COLUMNS value.
   */
  splitIntoRows() {
    this.rowsOfUsers = {};
    for (let index = 0; index < this.fileredUsers.length; index++) {
      let row = Math.floor(index / NUMBER_OF_COLUMNS);
      if (!this.rowsOfUsers[row]) {
        this.rowsOfUsers[row] = [this.fileredUsers[index]];
      } else {
        this.rowsOfUsers[row].push(this.fileredUsers[index]);
      }
    }
  }

  render() {
    return (
      <div id="userGrid" className="container">
        {this.renderGrid()}
        {this.props.isLoading && (
          <div id="spinners">
            <div className="spinner-grow text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-light" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-dark" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="text">Loading...</div>
          </div>
        )}
        {this.props.users.length >= CATALOG_SIZE && (
          <div className="user-grid-catalog-end">End of users catalog.</div>
        )}
      </div>
    );
  }

  renderGrid() {
    this.filterUsers();
    this.splitIntoRows();
    return Object.keys(this.rowsOfUsers).map((r, index) =>
      this.renderRow(this.rowsOfUsers[r], index)
    );
  }

  /**
   * Renders a row of users.
   * @param {users[]} users
   * @param {number} rowKey
   */
  renderRow(users, rowKey) {
    const cells = [];

    // Note: as we don't want the last row to have resized tiles
    // we need to add empty cells to have a complete row.
    // At the core the issue is that we're using col-sm and

    for (let index = 0; index < NUMBER_OF_COLUMNS; index++) {
      if (users[index]) {
        let u = users[index];
        cells.push(
          <div className="col-sm" key={index}>
            <UserGridCell user={u} />
          </div>
        );
      } else {
        cells.push(<div className="col-sm" key={index} />);
      }
    }

    return (
      <div className="row" key={rowKey}>
        {cells}
      </div>
    );
  }
}

export const Grid = connect(mapStateToProps)(UsersGrid);
