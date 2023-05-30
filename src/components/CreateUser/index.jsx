import { useState } from "react";

const CreateUser = ({ onCreateUser }) => {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    console.table(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      onCreateUser();
    } catch (error) {
      console.log(error);
    }
  };

  const { id, firstName, lastName, email, password } = user;

  return (
    <>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          value={id}
          onChange={handleChange}
          placeholder="Id"
        />
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Create User</button>
      </form>
    </>
  );
};

export default CreateUser;
