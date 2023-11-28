import Navbar from "./components/Navbar.jsx";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
    </BrowserRouter>
  );
}