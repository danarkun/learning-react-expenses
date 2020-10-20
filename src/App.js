import React, { useEffect } from 'react';
import { NavLink, Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import styled from 'styled-components'

import { GlobalProvider } from './context/GlobalState';
import { Home } from './components/Home';
import { AddUser } from './components/AddUser';
import { TransactionViewer } from './components/TransactionViewer';
import { UserViewer } from './components/UserViewer';

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

  // useEffect(() => {
  //   SetActive();
  // })

  var clicked;

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
                <NavLink to="TransactionViewer?list">TransactionViewer</NavLink>
              </li>
            </ul>
          </HeaderColumn>
          <Switch>
            <ContentColumn>
              <Route exact path="/" render={() => (
                <Redirect exact from="/" to="/Home" />
              )} />
              <Route path="/AddUser" component={AddUser} />
              <Route path="/Home" component={Home} />
              <Route path="/TransactionViewer" component={TransactionViewer} />
              <Route path="/UserViewer" component={UserViewer} />
            </ContentColumn>
          </Switch>
        </Router>
      </div >
    </GlobalProvider >
  );
}

function SetActive()
{
  var btnList = document.getElementById("navButtons");
  var btns = btnList.getElementsByTagName('li');
}

export default App;
