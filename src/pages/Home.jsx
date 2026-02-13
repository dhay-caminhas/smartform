import { useEffect, useState } from "react";
import Form from "../components/Form";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(saved);
  }, []);

  function addUser(user) {
    if (editingUser !== null) {
      const updated = users.map((u, i) =>
        i === editingUser ? user : u
      );
      setUsers(updated);
      localStorage.setItem("users", JSON.stringify(updated));
      setEditingUser(null);
    } else {
      const updated = [...users, user];
      setUsers(updated);
      localStorage.setItem("users", JSON.stringify(updated));
    }
  }

  function deleteUser(index) {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  }

  function editUser(index) {
    setEditingUser(index);
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Modo Claro" : "Modo Escuro"}
      </button>

      <h1>Cadastro de Usuários</h1>

      <Form
        onAddUser={addUser}
        editingUser={editingUser !== null ? users[editingUser] : null}
      />

      <ul>
        {users.map((u, index) => (
          <li key={index}>
            {u.name} - {u.email} - {u.age}

            <div>
              <button onClick={() => editUser(index)}>
                Editar
              </button>

              <button onClick={() => deleteUser(index)}>
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
