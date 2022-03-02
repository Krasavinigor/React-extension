import React from "react";
import "./app.css";
import Copyright from "./components/copyright/Copyright";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import MainContent from "./components/mainContent/MainContent";

function App(): JSX.Element {
  return (
    <div className="app">
      <Header />
      <MainContent />
      <Footer />
      <Copyright />
    </div>
  );
}

export default App;
