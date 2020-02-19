import React from 'react';
import PropTypes from 'prop-types';
import Spinner from "react-bootstrap/Spinner";
import './SpinnerItem.scss';
import {connect} from "react-redux";

function SpinnerItem(props) {
  return (
    props.pending ?
    <div className='spinner-wrap'>
      <Spinner animation="border" role="status" variant="light">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div> : ''
  );
}

function mapStateToProps(state) {
  return {
    pending: state.studies.pending,
  };
}

SpinnerItem.propTypes = {
  pending: PropTypes.bool
};

export default connect(mapStateToProps, null)(SpinnerItem);
