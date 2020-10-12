import React from 'react';
import { Link, Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { AddUser } from './components/AddUser';
import { createBrowserHistory } from 'history';
import styled from 'styled-components'

import { GlobalProvider } from './context/GlobalState';
import { ExpenseTracker } from './components/ExpenseTracker';

const ContentColumn = styled.div`
  top: 200px;
  left: 50px;
  position: absolute;
  width: 100%;
`;

const HeaderColumn = styled.div`
  top: 0px;
  left: 0px;
  position: absolute;
  width:100%;
`;

// Create history object to route with
const history = createBrowserHistory();

function App() {
  return (
    <GlobalProvider>
      <div>
        <Router history={history}>
          <HeaderColumn>
              <ul className="nav">
                <li className="active">
                  <Link to="/AddUser">Add User</Link>
                </li>
                <li>
                  <Link to="/ExpenseTracker">Expense Tracker</Link>
                </li>
              </ul>
          </HeaderColumn>
          <Switch>
            <ContentColumn>
              <Route path="/AddUser" component={AddUser} />
                {/* // <AddUser /> */}
                {/* <AddUser />
                </Route> */}
              <Route path="/ExpenseTracker" component={ExpenseTracker} />
                {/* <ExpenseTracker />
                </Route>*/}
            </ContentColumn>
          </Switch>
        </Router>
      </div >
    </GlobalProvider >
  );
}

export default App;
