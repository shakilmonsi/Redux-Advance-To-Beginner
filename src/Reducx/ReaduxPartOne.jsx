import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ReduxPartOne = () => {
  const count = useSelector((state) => state.count);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");

  const handleAddUser = () => {

    if (userInput.trim() !== "") {
      dispatch({ type: "ADDUSER", payload: userInput });
      setUserInput("");
    }
  };

  return (
    <div style={styles.container} className="p-24 bg-green-600">
      <h1>Redux Counter & User List</h1>

      <div style={styles.section}>
        <h2>Counter: {count}</h2>
        <button
          className="btn bg-amber-500 p-2"
          style={styles.button}
          onClick={() => dispatch({ type: "INCREMENT" })}
        >
          Increment
        </button>
        <button
          className="btn bg-amber-500 p-2"
          style={styles.button}
          onClick={() => dispatch({ type: "DECREMENT" })}
        >
          Decrement
        </button>
      </div>

      <div style={styles.section}>
        <h2>User List</h2>
        <ul>
          {users.map((u, i) => (
            <li key={i}>{u.name}</li>
          ))}
        </ul>
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter name"
        />
        <button
          className="btn bg-amber-500 p-2"
          style={styles.button}
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: 600, margin: "auto", padding: 20 },
  section: { marginBottom: 30 },
  button: { margin: 5, padding: "8px 16px", fontSize: 16 },
};

export default ReduxPartOne;
