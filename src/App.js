import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import DetailsPage from "./Details/details";
import HeaderComponent from "./Index/header";
import HomePage from "./Index/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route
            path="/:id"
            element={
              <>
                <HeaderComponent />
                <DetailsPage />
              </>
            }
          /> 
        <Route
            path="/"
            element={
              <>
                <HeaderComponent />
                <HomePage />
              </>
            }
          />        
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
