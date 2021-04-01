import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer, { rootSaga } from './modules'
// import loggerMiddleware from './libs/loggerMiddleware'
// import { createLogger } from 'redux-logger'
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'


// const logger = createLogger();
// const store = createStore(rootReducer, applyMiddleware(loggerMiddleware))
// const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk))
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer, 
  applyMiddleware(ReduxThunk, sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
