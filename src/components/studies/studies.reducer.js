import {
  SET_STUDIES,
  SET_STUDY,
  GET_STUDIES_ERROR, SET_MATCHES
} from '../../store/constants/studies.const';
import { PENDING } from '../../store/constants/general.const';

export default function (state={
  error: '',
  matches: [],
  pending: false,
  studies: [],
  study: {}
}, action) {
  switch (action.type) {
    case SET_STUDIES:
      return { ...state, studies: action.payload };
    case SET_STUDY:
      return { ...state, study: action.payload };
    case SET_MATCHES:
      return { ...state, matches: action.payload };
    case GET_STUDIES_ERROR:
      return { ...state, error: action.payload };
    case PENDING:
      return { ...state, pending: action.payload };
    default:
      return state;
  }
}