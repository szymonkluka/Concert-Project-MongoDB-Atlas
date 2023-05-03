import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import concerts from './concertsRedux';
import seats from './seatsRedux';

// combine reducers
const rootReducer = combineReducers({
  concerts,
  seats,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
  )
);

export default store;
