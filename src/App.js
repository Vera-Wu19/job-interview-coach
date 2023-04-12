import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import ResumeService from "./components/ResumeService";
import InterviewService from "./components/InterviewService";
import RegisterLogin from "./components/RegisterLogin";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/resume-service" component={ResumeService} />
        <Route path="/interview-service" component={InterviewService} />
        <Route path="/register-login" component={RegisterLogin} />
      </Switch>
    </div>
  );
}

export default App;
