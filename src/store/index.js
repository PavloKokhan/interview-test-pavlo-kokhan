import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import reduxThunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

export default store;