import logo from './logo.svg';
import './App.css';
import { useRoutes } from "react-router-dom";
import AppRoute from './config/app-route.jsx';


function App() {
  let element = useRoutes(AppRoute);
  return element;
}

export default App;
