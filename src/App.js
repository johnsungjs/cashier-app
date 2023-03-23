import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home";
import Sidenav from "./components/Sidenav";
import TransactionHistory from "./page/TransactionHistory";
import Settings from "./page/Settings";

function App() {
  const [expand, setExpand] = useState(false);
  const [margin, setMargin] = useState(64);

  const childToParent = (childData) => {
    setExpand(childData);
    marginSettings()
  };

  const marginSettings = () => {
    if(expand){
      setMargin(64)
    }else{
      setMargin(240)
    }
  }

  return (
    <>
      <Sidenav childToParent={childToParent}></Sidenav>
      <div style={{ marginLeft: `${margin}px` }}>
        <div>
          <Routes>
            <Route path='/' element={<Navigate replace to='/home' />} />
            <Route path='/home' element={<Home />}></Route>
            <Route path='/settings' element={<Settings />}></Route>
            <Route path='/history' element={<TransactionHistory />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
