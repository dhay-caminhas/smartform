import { useEffect, useState } from "react";
import Form from "../components/Form";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(saved);
  }, []);

  function addUser(user) {
    const updated = [...users, user];
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  }

  function deleteUser(index) {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  }

  return (
    <div>
      <h1>Cadastro de Usuários</h1>
      <Form onAddUser={addUser} />

      <ul>
        {users.map((u, index) => (
          <li key={index}>
            {u.name} - {u.email} - {u.age}
            <button onClick={() => deleteUser(index)}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
