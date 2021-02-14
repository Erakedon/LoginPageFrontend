import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import LoginPage from './pages/LoginPage/LoginPage';
import UserDataPage from './pages/UserDataPage/UserDataPage';

function App() {
  const [userLoginKey, setUserLoginKey] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ userLoginKey, setUserLoginKey }}>
          <Route path="/" exact component={UserDataPage} />
          <Route path="/login" component={LoginPage} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
