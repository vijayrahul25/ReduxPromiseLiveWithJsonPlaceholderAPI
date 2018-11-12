import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import App from "./component/App";
import reducer from "./reducers/allReducer";
import { showPosts } from "./actions/postActions";
import { loadAuthors } from "./actions/authorActions";

import { BrowserRouter } from "react-router-dom";
import ReduxPromise from "redux-promise";

import thunk from "redux-thunk";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
//const store = createStore(reducer);
const store = createStoreWithMiddleware(reducer);
store.dispatch(showPosts());
store.dispatch(loadAuthors());

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);
