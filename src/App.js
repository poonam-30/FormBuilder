import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { Provider } from "react-redux";
import routes from './routes/routes';
import "./style/css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import configureStore, { history } from './appRedux/store';

const store = configureStore(/ provide initial state if any /);


function App() {
  return (
    <div>
    <Provider store={store}>
    <Router>
        <Switch>
            {routes.map(({path,Component},index)=>{
              return (
                <Route path={path} key={index} exact>
                  <Component/>
                </Route>
              )
            })}
        </Switch>
    </Router>
    </Provider>
    </div>
  );
}

export default App;
