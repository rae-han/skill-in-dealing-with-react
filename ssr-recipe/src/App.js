import React from 'react'
import { Route } from 'react-router-dom'
import Menu from './components/Menu';
import RedPage from './pages/RedPage'
import BluePage from './pages/BluePage'
import UsersPage from './pages/UsersPage'

function App() {
  return (
    <div className="App">
     <Menu></Menu>
     <hr/>
     <Route path="/red" component={RedPage}></Route>
     <Route path="/blue" component={BluePage}></Route>
     <Route path="/users" component={UsersPage}></Route>
    </div>
  );
}

export default App;
