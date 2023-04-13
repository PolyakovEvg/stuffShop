import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import AppRouter from "../router/AppRouter";
import Sidebar from './Sidebar/Sidebar'
import styles from "../styles/index.css";


const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Sidebar />
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
};
export default App;
