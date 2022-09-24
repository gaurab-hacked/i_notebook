import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navigation from "./Components/Navigation";
import Register from "./Components/Register";
import NoteState from "./context/NoteState";
import UserState from "./context/UserState";



function App() {
  return (
    <BrowserRouter>
      <UserState>
        <NoteState>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </NoteState>
      </UserState>
    </BrowserRouter>
  );
}

export default App;
