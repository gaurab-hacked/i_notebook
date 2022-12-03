import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aboutus from "./Components/Aboutus";
import Allnotes from "./Components/Allnotes";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navigation from "./Components/Navigation";
import Register from "./Components/Register";
import DarkModeState from "./context/DarkModeState";
import NoteState from "./context/NoteState";
import SearchState from "./context/SearchState";
import UserState from "./context/UserState";


function App() {
  return (
    <BrowserRouter>
      <UserState>
        <NoteState>
          <SearchState>
            <DarkModeState>
              <Navigation />
              <Routes>                  
                <Route path="/" element={<Home />} />
                <Route path="/allnotes" element={<Allnotes />} />
                <Route path="/aboutus" element={<Aboutus />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </DarkModeState>
          </SearchState>
        </NoteState>
      </UserState>
    </BrowserRouter>
  );
}

export default App;
