import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from 'terra-modal';
import Button from 'terra-button';
import Dialog from 'terra-dialog';
import Text from 'terra-text';

import styles from './prescribe-modal.css';

const propTypes = {
  /**
   * Callback function to close the PrescribeModal prompt
   */
  closePrompt: PropTypes.func,
  /**
   * Flag to determine if the modal is open
   */
  isOpen: PropTypes.bool,
};

export class PrescribeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * Flag to determine if the modal is open
       */
      isOpen: this.props.isOpen,
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
    if (this.props.closePrompt) { this.props.closePrompt(); }
  }

  render() {
    const headerContainer = (
      <div className={styles['modal-header']}>
        
      </div>
    );

    const footerContainer = (
      <div className={styles['modal-footer']}>
        <Button text="Close" className='modal-close' onClick={this.handleCloseModal} />
      </div>
    );

    return (
      <div>
        <Modal
          ariaLabel="PrescribeModal"
          isOpen={this.state.isOpen}
          onRequestClose={this.handleCloseModal}
          classNameModal={styles['modal-body']}
          width={320}
        >
          <Dialog
            header={headerContainer}
            footer={footerContainer}
            onClose={this.handleCloseModal}
          >
            <h3 className={styles['modal-text']}>Patient Medication Has Been Prescribed!</h3>
          </Dialog>
        </Modal>
      </div>
    );
  }
}

PrescribeModal.propTypes = propTypes;


export default PrescribeModal;
