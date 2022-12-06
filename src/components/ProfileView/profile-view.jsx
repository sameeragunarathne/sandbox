import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "terra-modal";
import Button from "terra-button";
import Dialog from "terra-dialog";
import axios from 'axios';
import store from "../../store/store";


import styles from "./profile-view.css";

const propTypes = {
  /**
   * Callback function to close the ProfileView prompt
   */
  closePrompt: PropTypes.func,
  /**
   * Flag to determine if the modal is open
   */
  isOpen: PropTypes.bool,
  /**
   * The identifier of the current Patient resource in context
   */
  patient: PropTypes.object,
};

export class ProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * Flag to determine if the modal is open
       */
      isOpen: this.props.isOpen,
      practitioner: {}
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
    if (this.props.closePrompt) {
      this.props.closePrompt();
    }
  }

  async componentDidMount() {
    const fhirServer = store.getState().fhirServerState.currentFhirServer;
    const practitionerId = store.getState().patientState.defaultUser;
    console.log("practitioner id: " + practitionerId);
    const headers = {
      Accept: 'application/json+fhir',
    };
    axios({
      method: 'get',
      url: `${fhirServer}Practitioner/${practitionerId}`,
      headers,
    }).then((result) => {
      console.log(result.data);
      this.setState({ practitioner: result.data });
    }).catch((err) => {
      console.log("Error occurred while fetching practitioner details.", err);
    });

    console.log("Practitioner data retrievel method called.");
  }

  render() {
    // const pracId = props.patient.name || "Missing Practitioner ID";
    // const pracName = props.patient.name || "Missing Name";
    // const hName = props.patient.birthDate || "Missing Hospital Name";
    var pracId = this.state.practitioner.id;
    var pracName = "";
    if (this.state.practitioner.name) {
      pracName = this.state.practitioner.name[0].given[0] + " " + this.state.practitioner.name[0].family;
    }
    const hName = "Cape Cod Hospital";

    const headerContainer = (
      <div className={styles["modal-header"]}>
        <h2>Practitioner Info</h2>
      </div>
    );

    const footerContainer = (
      <div className={styles["modal-footer"]}>
        <Button
          text="Close"
          className="modal-close"
          onClick={this.handleCloseModal}
        />
      </div>
    );

    return (
      <div>
        <Modal
          ariaLabel="ProfileInfo"
          isOpen={this.state.isOpen}
          onRequestClose={this.handleCloseModal}
          classNameModal={styles["modal-container"]}
          width={320}
        >
          <Dialog
            header={headerContainer}
            footer={footerContainer}
            onClose={this.handleCloseModal}
          >
            <div className={styles["modal-body"]}>
              <h3 className={styles["modal-text"]}>
                <span>Name:</span> {pracName}
              </h3>
              <h3 className={styles["modal-text"]}>
                <span>ID:</span> {pracId}
              </h3>
              <h3 className={styles["modal-text"]}>
                <span>Hospital:</span> {hName}
              </h3>
            </div>
          </Dialog>
        </Modal>
      </div>
    );
  }
}

ProfileView.propTypes = propTypes;

export default ProfileView;
