import React, { Component } from "react";
import { connect } from "react-redux";
import { setNationalityFilter } from "../redux/war";

/**
 * Function mapping (part of) the global state to props of this component
 * @param {redux state} state
 */
const mapStateToProps = (state) => {
  return {
    nationalityFilter: state.nationalityFilter,
  };
};

/**
 * Redux Mapping function.
 * @param {string} dispatch
 */
function mapDispatchToProps(dispatch) {
  return {
    setNationalityFilter: (nationalities) =>
      dispatch(setNationalityFilter(nationalities)),
  };
}

/**
 * Compoment managing the settings page.
 */
class SettingPage extends Component {
  constructor(props) {
    super(props);

    const isCHEnabled = this.props.nationalityFilter.includes("CH");
    const isGBEnabled = this.props.nationalityFilter.includes("GB");
    const isESEnabled = this.props.nationalityFilter.includes("ES");
    const isFREnabled = this.props.nationalityFilter.includes("FR");

    this.state = {
      CH: isCHEnabled,
      GB: isGBEnabled,
      ES: isESEnabled,
      FR: isFREnabled,
    };
  }

  /**
   * Update the local state of nationalities (user for rendering) with the entry from the global state.
   */
  updateNationalityLocalState() {
    const isCHEnabled = this.props.nationalityFilter.includes("CH");
    const isGBEnabled = this.props.nationalityFilter.includes("GB");
    const isESEnabled = this.props.nationalityFilter.includes("ES");
    const isFREnabled = this.props.nationalityFilter.includes("FR");

    // Note: even though the value in the local state are derived from the global state, we need them in
    // order to trigger a re-render when these gets updated. The nationalityFilter value in the global state
    // is an array and, hence, changes in it do not trigger a re-render for the simple reason that the value
    // is passed to this component prop as a reference and modifying the content of the array itself doesn't
    // alter the reference (hence is not handled has a prop change).
    // The alternative to keep a local state would be to have a different value (e.g. a boolean) for each country
    // in the global state. I do prefer the other solution tough.
    this.setState({
      CH: isCHEnabled,
      GB: isGBEnabled,
      ES: isESEnabled,
      FR: isFREnabled,
    });
  }

  /**
   * Toggle the selected nationality.
   * @param {String} nationality
   */
  toggleNationalitySelection(nationality) {
    let selectedNationalities = this.props.nationalityFilter;
    if (!this.props.nationalityFilter.includes(nationality)) {
      // The given nationality is not selected, add it to the array.
      selectedNationalities.push(nationality);
    } else {
      // The given nationality is currently selected, remove it from the array.
      const toBeRemovedIndex = selectedNationalities.findIndex(
        (element) => element === nationality
      );
      selectedNationalities.splice(toBeRemovedIndex, 1);
    }
    this.props.setNationalityFilter(selectedNationalities);

    this.updateNationalityLocalState();
  }

  /**
   * Renders the checkbox for the given nationality.
   * @param {string} nationality
   * @param {string} label
   */
  renderCheckBox(nationality, label) {
    const checkboxName = `${nationality}-checkbox`;
    const checkboxId = `${nationality}-checkbox-id`;
    const checked = this.state[nationality] ? "checked" : "";

    const numberOfEnabledCountries =
      this.state["CH"] + this.state["GB"] + this.state["FR"] + this.state["ES"];
    // If this is the checkbox for the only enabled country then disable it:
    // we want to have at least one selectd country at a time
    const isDisabled =
      this.state[nationality] && numberOfEnabledCountries === 1;

    return (
      <>
        <input
          disabled={isDisabled}
          checked={checked}
          onChange={() => this.toggleNationalitySelection(nationality)}
          type="checkbox"
          name={checkboxName}
          id={checkboxId}
        />
        <label htmlFor={checkboxName} className="ml-2">
          {label}
        </label>
      </>
    );
  }

  render() {
    return (
      <div id="page-settings-container" className="container">
        <span>
          Select the nationalities you want the users to be generated from.
        </span>
        <div className="row">
          <div
            className="col-md-3"
            onClick={() => this.toggleNationalitySelection("CH")}
          >
            {this.renderCheckBox("CH", "Switzerland")}
          </div>
          <div
            className="col-md-3"
            onClick={() => this.toggleNationalitySelection("GB")}
          >
            {this.renderCheckBox("GB", "Great Britain")}
          </div>
          <div
            className="col-md-3"
            onClick={() => this.toggleNationalitySelection("ES")}
          >
            {this.renderCheckBox("ES", "Spain")}
          </div>
          <div
            className="col-md-3"
            onClick={() => this.toggleNationalitySelection("FR")}
          >
            {this.renderCheckBox("FR", "France")}
          </div>
        </div>
      </div>
    );
  }
}

export const Settings = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingPage);
