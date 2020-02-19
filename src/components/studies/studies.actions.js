import { SET_STUDIES, SET_STUDY, SET_MATCHES } from '../../store/constants/studies.const';
import { PENDING } from '../../store/constants/general.const';


export function setStudies(arr) {
  return (dispatch) => {
    dispatch({
      payload: arr,
      type: SET_STUDIES
    });
  }
}

export function setStudy(study) {
  return (dispatch) => {
    dispatch({
      payload: study,
      type: SET_STUDY
    });
  }
}

export function setPending(val) {
  return (dispatch) => {
    dispatch({
      payload: val,
      type: PENDING
    });
  }
}

export function addMatches(arr) {
  return (dispatch) => {
    dispatch({
      payload: arr,
      type: SET_MATCHES
    });
  }
}