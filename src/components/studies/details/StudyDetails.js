import React from 'react';
import './StudyDetails.scss';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getStudy} from "../../../services/studiesServices";
import {setStudy, setPending} from "../studies.actions";
import Button from "react-bootstrap/Button";
import {formatDate} from '../../func/functions';
import Carousel from "react-bootstrap/Carousel";

class StudyDetails extends React.Component {
  componentDidMount() {
    // console.log(getStudies);
    this.props.setPending(true);
    getStudy().then(
        (res) => {
          this.props.setStudy(res.data);
          this.props.setPending(false);
        }
    );
  }

  returnBack() {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="studies study">
        <h1 className="studies__header">Studies List</h1>

        <div className="studies__card">
          <div className="studies__panel studies__panel_right">
            <Button variant="secondary" size="sm" onClick={() => this.returnBack()}>Back to list</Button>
          </div>
          {
            Object.keys(this.props.study).length ?
              <div className="study__content">
                <div className="studies__slider-wrapper">
                  <div className="studies__slider slider">
                    <Carousel>
                      {this.props.study.gallery.map((image) =>
                          <Carousel.Item key={image.resourceId}>
                            <img
                                className="slider__image"
                                src={image.original}
                                alt="Slide"
                            />
                            <Carousel.Caption>
                              <h3 className="slider__header">{image.name}</h3>
                            </Carousel.Caption>
                          </Carousel.Item>
                      )}
                    </Carousel>
                  </div>
                </div>
                <div className="study__info">
                  <h2 className="study__header">{this.props.study.name}</h2>
                  <p className="study__description">{this.props.study.description}</p>
                  <div className="study__dates">
                    <span className="study__created">Created: {formatDate(this.props.study.createdAt)}</span>
                    <span className="study__updated">Last update: {formatDate(this.props.study.updatedAt)}</span>
                  </div>
                </div>
              </div> : null
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    study: state.studies.study,
  };
}

StudyDetails.propTypes = {
  study: PropTypes.object
};

export default connect(mapStateToProps, {setStudy, setPending})(StudyDetails);
