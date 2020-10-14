import React from 'react';
import { Link, Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import styled from 'styled-components'

import { GlobalProvider } from './context/GlobalState';
import { ExpenseTracker } from './components/ExpenseTracker';
import { AddUser } from './components/AddUser';
import { TransactionViewer } from './components/TransactionViewer';
import history from './history'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const ContentColumn = styled.div`
  top: 100px;
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
              <Route exact path="/" component={ExpenseTracker} />
              <Route path="/AddUser" component={AddUser} />
              <Route path="/ExpenseTracker" component={ExpenseTracker} />
              <Route path="/TransactionViewer" component={TransactionViewer} />
            </ContentColumn>
          </Switch>
        </Router>
      </div >
    </GlobalProvider >
  );
}

export default App;
