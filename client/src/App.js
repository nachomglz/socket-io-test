import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import UserContext from "./components/UserContext";

function App() {
   const [username, setUsername] = useState("");

   return (
      <BrowserRouter>
         <UserContext.Provider value={{ username, setUsername }}>
            <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/chat" element={<Chat />} />
            </Routes>
         </UserContext.Provider>
      </BrowserRouter>
   );
}

export default App;
