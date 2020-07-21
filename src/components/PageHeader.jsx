import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/PageHeader.scss";
import logo from "../resources/logo.png";
import { setFilter } from "../redux/";
import { connect } from "react-redux";

/**
 * Redux Mapping function.
 * @param {string} dispatch
 */
function mapDispatchToProps(dispatch) {
  return {
    setFilter: (filter) => dispatch(setFilter(filter)),
  };
}

/**
 * List of the pages supported by the PageHeader component.
 */
export const pages = {
  usersGrid: "usersGrid",
  settings: "settings",
};

/**
 * Class managing the header of the application.
 */
class PageHeader extends Component {
  currentPage;

  constructor(props) {
    super(props);
    // If no page is passed as prop then the usersGrid is shown
    this.currentPage = props.page || pages.usersGrid;
  }

  /**
   * Manages the set filter changed event.
   * @param {*} event
   */
  handleFilterChange(event) {
    event.preventDefault();
    this.props.setFilter(event.target.value);
  }

  /**
   * Renders the navigation button depending on the page.
   */
  renderNavigationButton() {
    if (this.props.page === pages.settings) {
      return (
        <Link title="click to go to settings" to="/">
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            className="bi bi-sliders"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M14 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM11.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM7 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM4.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9.5 3.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM11.5 15a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
            />
            <path
              fillRule="evenodd"
              d="M9.5 4H0V3h9.5v1zM16 4h-2.5V3H16v1zM9.5 14H0v-1h9.5v1zm6.5 0h-2.5v-1H16v1zM6.5 9H16V8H6.5v1zM0 9h2.5V8H0v1z"
            />
          </svg>
        </Link>
      );
    } else if (this.props.page === pages.usersGrid) {
      return (
        <Link title="click to go to settings" to="/settings">
          <svg
            width="2em"
            height="2em"
            viewBox="0 0 16 16"
            className="bi bi-grid"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
            />
          </svg>
        </Link>
      );
    }
  }

  render() {
    return (
      <div id="page-header-container" className="navbar navbar-nav container">
        <div className="row">
          <div className="col-md-8">
            <img
              src={logo}
              width="100%"
              alt="React Code Challenge for Sherpany!"
            />
          </div>
          <div id="page-header-search-button" className="col-md-3">
            <input
              disabled={this.page === pages.settings}
              name="filter"
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              onChange={(event) => this.handleFilterChange(event)}
            />
            <label htmlFor="filter">Filter by fist and last name</label>
          </div>
          <div id="page-header-settings-switch" className="col-md-1">
            {this.renderNavigationButton()}
          </div>
        </div>
      </div>
    );
  }
}

export const Header = connect(null, mapDispatchToProps)(PageHeader);
