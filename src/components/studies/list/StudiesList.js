import React from 'react';
import './StudiesList.scss';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getStudies} from "../../../services/studiesServices";
import {setStudies, setPending} from "../studies.actions";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import AutoComplete from "../../autocomplete/AutoComplete";
import {formatDate} from '../../func/functions';

class StudiesList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // console.log(getStudies);
    this.props.setPending(true);
    getStudies().then(
      (res) => {
        this.props.setStudies(res.data);
        this.props.setPending(false);
      }
    );
  }

  filterStudies(e) {
    this.props.setPending(true);
    getStudies(e.target.dataset.query).then(
        (res) => {
          this.props.setStudies(res.data);
          this.props.setPending(false);
        }
    )
  }

  seeDetails(e) {
    this.props.history.push(`/${e.target.dataset.id}`);
  }

  render() {
    return (
      <div className="studies">
        <h1 className="studies__header">Studies List</h1>

        <div className="studies__card">
          <div className="studies__panel">
            <AutoComplete />
            <ButtonGroup aria-label="filter">
              <Button variant="secondary" data-query="finished" size="sm" onClick={(e) => this.filterStudies(e)}>Finished</Button>
              <Button variant="secondary" data-query="draft" size="sm" onClick={(e) => this.filterStudies(e)}>Draft</Button>
              <Button variant="secondary" data-query="pending" size="sm" onClick={(e) => this.filterStudies(e)}>Pending</Button>
            </ButtonGroup>
          </div>

          <ul className="studies__list">
            {
              this.props.studies.map((study, i) =>
                <li
                    key={study.id}
                    className="studies__item item"
                >
                  <div className="item__description">
                    <div className="item__image" style={{background: `url(${study.studyThumbnail ?
                          study.studyThumbnail:
                          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxWoVU-bXqIeCIvnzkbplZCCCvdFBkYpkaKHPVMsfkXd4xUZvx'
                      }) no-repeat center/cover`}} />
                    <div className="item__wrapper">
                      <h3 className='item__header'>{study.name}</h3>
                      <p className="item__created">{formatDate(study.createdAt)}</p>
                    </div>
                  </div>

                  <div className="item__info">
                    <div className="item__status">{study.statusKey}</div>
                    <div className="item__updated">Last update: {formatDate(study.updatedAt)}</div>
                  </div>

                  <div className="item__details">
                    <Button variant="light" data-id={study.id} size="sm" onClick={(e) => this.seeDetails(e)}>See details</Button>
                  </div>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    studies: state.studies.studies,
  };
}

StudiesList.propTypes = {
  studies: PropTypes.array
};

export default connect(mapStateToProps, {setStudies, setPending})(StudiesList);
