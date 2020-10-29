import React from 'react';
import { NavLink, Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import styled from 'styled-components'

import { GlobalProvider } from './context/GlobalState';
import { Home } from './components/Home';
import { AddUser } from './components/AddUser';
import { TransactionViewer } from './components/TransactionViewer';
import { UserViewer } from './components/UserViewer';
import { ClearForm } from './components/ClearForm';
import { AddTransaction } from './components/AddTransaction';

const ContentColumn = styled.div`
position: absolute;
top: 100px;
left: 35%;
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
        <Router>
          <HeaderColumn>
            <ul className="nav" id="navButtons">
              <li>
                <NavLink exact to="/Home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/AddUser">Add User</NavLink>
              </li>
              <li>
                <NavLink to="/AddTransaction">Add Transaction</NavLink>
              </li>
              <li>
                <NavLink to="/TransactionViewer?list">TransactionViewer</NavLink>
              </li>
              <li>
                <NavLink to="/ClearForm">Clear Form</NavLink>
              </li>
            </ul>
          </HeaderColumn>
          <Switch>
            <ContentColumn>
              <Route exact path="/" render={() => (
                <Redirect exact from="/" to="/Home" />
              )} />
              <Route render={() => <Redirect to={{ pathname: "/Home" }} />} />
              <Route path="/AddUser" component={AddUser} />
              <Route path="/Home" component={Home} />
              <Route path="/TransactionViewer" component={TransactionViewer} />
              <Route path="/UserViewer" component={UserViewer} />
              <Route path="/ClearForm" component={ClearForm} />
              <Route path="/AddTransaction" component={AddTransaction} />
            </ContentColumn>
          </Switch>
        </Router>
      </div >
    </GlobalProvider >
  );
}

export default App;
