import { combineReducers } from 'redux';
import studiesReducer from '../components/studies/studies.reducer';


const rootReducer = combineReducers({
  studies: studiesReducer,
});

export default rootReducer;