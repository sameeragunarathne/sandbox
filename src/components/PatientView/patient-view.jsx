/* eslint-disable react/forbid-prop-types */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import cx from "classnames";

import CardList from "../CardList/card-list";
import styles from "./patient-view.css";
import cdsExecution from "../../middleware/cds-execution";
import { add } from "lodash";

const propTypes = {
  /**
   * The Patient resource in context
   */
  patient: PropTypes.object,
  /**
   * Flag to determine if the CDS Developer Panel is displayed or not
   */
  isContextVisible: PropTypes.bool.isRequired,
};

cdsExecution.registerTriggerHandler("face-sheet/patient-view", {
  needExplicitTrigger: false,
  onSystemActions: () => {},
  onMessage: () => {},
  generateContext: () => ({}), // no special context
});

/**
 * Left-hand side on the mock-EHR view that displays the cards and relevant UI for the patient-view hook
 */
export const PatientView = (props) => {
  const name = props.patient.name || "Missing Name";
  const dob = props.patient.birthDate || "Missing DOB";
  const pid = props.patient.id || "Missing Patient ID";
  var addr = "N/A";
  var tel = "N/A";
  if (props.patient.patientResource.address !== undefined) {
    addr = props.patient.patientResource.address[0].line[0] + "," +
      props.patient.patientResource.address[0].city + "," +
      props.patient.patientResource.address[0].country;
  }

  if (props.patient.patientResource.telecom !== undefined) {
    tel = props.patient.patientResource.telecom[0].value;
  }
  // const addr =
  //   props.patient.patientResource.address[0].line[0] +
  //     "," +
  //     props.patient.patientResource.address[0].city +
  //     "," +
  //     props.patient.patientResource.address[0].country || "Missing Address";
  const gender = props.patient.patientResource.gender || "Missing Gender";
  // const tel = props.patient.patientResource.telecom.value || "Missing Telecom";

  const isHalfView = props.isContextVisible ? styles["half-view"] : "";

  console.log(props);

  return (
    <>
    <div className={cx(styles["patient-view"], isHalfView)}>
      <h1 className={styles["view-title"]}>Practitioner View</h1>
      <div className={styles["patient-info"]}>
        <h2><span>Patient: </span>{name}</h2>
        <div className={styles["patient-data-text"]}>
          <p>
            <span>ID:</span> {pid}
          </p>
          <p>
            <span>Name:</span> {name}
          </p>
          <p>
            <span>Birthdate:</span> {dob}
          </p>
          <p>
            <span>Gender:</span> {gender}
          </p>
          <p>
            <span>Telecom:</span> {tel}
          </p>
          <p>
            <span>Address:</span> {addr}
          </p>
        </div>
      </div>
      {/* <CardList takeSuggestion={() => {}} /> */}
      {/* <div className={styles["patient-info"]}>
        <h2><span>Practitioner: </span>Dr. Sara Angulo</h2>
        <div className={styles["patient-data-text"]}>
          <p>
            <span>ID:</span> e443ac58-8ece-4385-8d55-775c1b8f3a37
          </p>
          <p>
            <span>Address:</span> 243 CHARLES STREET, BOSTON, US
          </p>
        </div>
      </div> */}
    </div>
    </>
  );
};

PatientView.propTypes = propTypes;

const mapStateToProps = (state) => ({
  isContextVisible: state.hookState.isContextVisible,
  patient: state.patientState.currentPatient,
});

export default connect(mapStateToProps)(PatientView);
