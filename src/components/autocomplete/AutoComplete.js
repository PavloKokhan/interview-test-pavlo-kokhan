import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {addActive} from '../func/functions';
import {addMatches} from '../../components/studies/studies.actions';
import './AutoComplete.scss';


class AutoComplete extends Component {

  constructor(props) {
    super(props);
    this.counter = -1;
    this.addActive = addActive;
  }

  handleChange(e) {
    const { target } = e;
    const val = target.value.toLowerCase();
    const matches = [];
    this.counter = -1;
    if (val) {
      this.props.studies.forEach((item) => {
        const pos = item.name.toLowerCase().indexOf(val);
        if (~pos) {
          item.leng = val.length;
          item.pos = pos;
          matches.push(item);
        } else {
          this.props.addMatches([]);
        }
      });
    } else {
      this.props.addMatches([]);
    }

    if (matches.length) {
      this.props.addMatches(matches);
    }
  }

  handleKeyDown(e) {
    const { target } = e;
    let items = target.nextElementSibling;
    if (items) items = items.children;

    if (e.keyCode === 40) {
      this.counter++;
      this.addActive(items);
    } else if (e.keyCode === 38) {
      this.counter--;
      this.addActive(items);
    } else if (e.keyCode === 13) {
      e.preventDefault();

      if (this.counter > -1) {
        if (items) items[this.counter].children[0].click();
      } else {
        this.controlField(e);
      }
    }
  }

  handleBlur(e) {
    if (e.relatedTarget && e.relatedTarget.classList.contains('autoSelectItem')) {
      return null;
    }
    this.props.addMatches([]);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.addMatches([]);
    this.props.history.push(`/${e.target.dataset.id}`);
  }

  render() {
    return (
      <div className='autocomplete'>
        <input
          autocomplete="off"
          className='form-control'
          id='autoComplete'
          onChange={e => this.handleChange(e)}
          onBlur={e => this.handleBlur(e)}
          onKeyDown={e => this.handleKeyDown(e)}
          type='text'
        />
        {
          this.props.matches.length ?
            <ul className='matches'>
              {
                this.props.matches.map((match) =>
                  <li key={match.id} className="autoSelectItem">
                    <a
                        className='autoSelectItem'
                        data-id={match.id}
                        href='/'
                        onClick={e => this.handleClick(e)}
                    >
                      {match.name.substring(0, match.pos)}
                      <b>
                        {match.name.substr(match.pos, match.leng)}
                      </b>
                      {match.name.substr(match.pos + match.leng)}
                    </a>
                  </li>
                )
              }
            </ul> : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    matches: state.studies.matches,
    studies: state.studies.studies,
  };
}

AutoComplete.propTypes = {
  matches: PropTypes.array,
};

export default connect(mapStateToProps, {addMatches})(withRouter(AutoComplete));
