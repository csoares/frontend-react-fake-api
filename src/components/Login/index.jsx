import { useState } from "react";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("abc@def.com");
  const [password, setPassword] = useState("12345");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("object", JSON.stringify(data));
        setOk(true);
        setToken(true);
        setError("");
      } else if (response.status === 401) {
        sessionStorage.removeItem("token");
        setError("Incorrect email or password.");
        setOk(false);
      } else {
        sessionStorage.removeItem("token");
        setError("An error occurred. Please try again.");
        setOk(false);
      }
    } catch (error) {
      sessionStorage.removeItem("token");

      setError("An error occurred. Please try again.");
      setOk(false);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div>{error}</div>}
        {ok && <div>Login OK</div>}
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
