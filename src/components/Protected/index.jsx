import { useEffect, useState } from "react";

function Protected() {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/protected", {
        headers: {
          Authorization: `${sessionStorage.getItem("token")}`,
        },
      });
      const jsonData = await response.json();
      setData(jsonData.msg);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>Protected route</h1>
      <div>print the info:{data}</div>
    </>
  );
}

export default Protected;
