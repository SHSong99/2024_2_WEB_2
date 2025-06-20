import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProjectDetailForm from "./components/ProjectDetail/ProjectDetailForm";
import MainPage from "./pages/MainPage";
import CommentsList from "./components/ProjectDetail/Comments/CommentsList";
import Comments from "./components/ProjectDetail/Comments/Comments";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <Comments /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
