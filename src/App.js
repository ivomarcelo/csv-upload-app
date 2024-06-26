import React from "react";
import "./App.css";
import UploadAndDisplayCSV from "./UploadAndDisplayCSV";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CARREGAR E EXIBIR CSV </h1>
      </header>
      <main>
        <UploadAndDisplayCSV />
      </main>
    </div>
  );
};

export default App;
