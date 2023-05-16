import { useState } from "react";
import "./App.css";
import ListUser from "./components/ListUser";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";

function App() {
  const [newUser, setNewUser] = useState(false);
  function handleCreateUser() {
    setNewUser(!newUser);
  }

  return (
    <>
      <ListUser newUser={newUser} />
      <CreateUser onCreateUser={handleCreateUser} />
      <Login />
    </>
  );
}

export default App;
