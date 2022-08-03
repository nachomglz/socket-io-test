import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

function Login() {
   const navigate = useNavigate();
   const { username, setUsername } = useContext(UserContext);

   const [usernameToSignin, setUsernameToSignin] = useState("");

   const join = () => {
      setUsername(usernameToSignin);
      navigate("/chat");
   };

   return (
      <>
         <h1>Introduce tu nombre</h1>
         <input
            type="text"
            placeholder="introduce tu nombre aqui..."
            onChange={(event) => setUsernameToSignin(event.target.value)}
         />
         <button onClick={join}>Confirmar</button>
      </>
   );
}

export default Login;
