import { useState } from "react";
import "./App.css";
import ListUser from "./components/ListUser";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import Protected from "./components/Protected";

function App() {
  const [newUser, setNewUser] = useState(false);
  const [token, setToken] = useState(null);
  // get token from sessionStorage
  // const token = sessionStorage.getItem("token");

  function handleCreateUser() {
    setNewUser(!newUser);
  }

  return (
    <>
      <ListUser newUser={newUser} onCreateUser={handleCreateUser} />
      <CreateUser onCreateUser={handleCreateUser} />
      {token != null ? <Protected /> : <Login setToken={setToken} />}
    </>
  );
}

export default App;
