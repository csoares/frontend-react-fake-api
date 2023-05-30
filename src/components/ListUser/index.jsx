import { useState, useEffect } from "react";

function ListUser({ newUser, onCreateUser }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const deleteUser = (email) => {
    return async function () {
      try {
        const response = await fetch(`http://localhost:3000/users/${email}`, {
          method: "DELETE",
        });
        const data = await response.json();
        onCreateUser();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
  };

  const updateUser = (user) => {
    return async function () {
      try {
        const response = await fetch(`http://localhost:3000/users/`, {
          method: "PUT",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setEditingId(null);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/users");
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    }
    fetchData();
  }, [newUser]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingId === user.id ? (
                  <input
                    type="text"
                    defaultValue={user.firstName}
                    onChange={(e) => (user.firstName = e.target.value)}
                  />
                ) : (
                  user.firstName
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <input
                    type="text"
                    defaultValue={user.lastName}
                    onChange={(e) => (user.lastName = e.target.value)}
                  />
                ) : (
                  user.lastName
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <input
                    type="text"
                    defaultValue={user.email}
                    onChange={(e) => (user.email = e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <input
                    type="password"
                    defaultValue={user.password}
                    onChange={(e) => (user.password = e.target.value)}
                  />
                ) : (
                  user.password
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <>
                    <button onClick={updateUser(user)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingId(user.id)}>
                      Update
                    </button>
                    <button onClick={deleteUser(user.email)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ListUser;
