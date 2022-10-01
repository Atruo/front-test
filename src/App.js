import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import DetailsPage from "./Details/details";
import HomePage from "./Index/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route
            path="/:id"
            element={<DetailsPage />}
          /> 
        <Route
            path="/"
            element={<HomePage />}
          />        
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
