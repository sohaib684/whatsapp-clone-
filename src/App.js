import React from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
function App() {
  return (
    <div>
      <div className="background_box"></div>
      <div className ="app">
        <div className="app__body">
          <Sidebar /> 
          <Chat />
        </div>
      </div>
     </div>
  );
}
export default App;