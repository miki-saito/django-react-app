import React, { useState, useEffect } from "react";
import axios from "axios";

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [editedTask, setEditedTask] = useState({ id: "", title: "" });
  const [id, setId] = useState(1);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: "Token 936bfb280be911ca8c16dbfb3d848342f5aa8e62",
        },
      })
      .then((res) => {
        setTasks(res.data);
      });
  }, []);

  const getTask = () => {
    axios
      .get(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: "Token 936bfb280be911ca8c16dbfb3d848342f5aa8e62",
        },
      })
      .then((res) => {
        setSelectedTask(res.data);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: "Token 936bfb280be911ca8c16dbfb3d848342f5aa8e62",
        },
      })
      .then((res) => {
        setTasks(tasks.filter((task) => task.id !== id));
        setSelectedTask([]);
        if (editedTask.id === id) {
          setEditedTask({ id: "", title: "" });
        }
      });
  };

  const newTask = (task) => {
    const data = {
      title: task.title,
    };
    axios
      .post(`http://127.0.0.1:8000/api/tasks/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 936bfb280be911ca8c16dbfb3d848342f5aa8e62",
        },
      })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setEditedTask({ id: "", title: "" });
      });
  };

  const editTask = (task) => {
    axios
      .put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, task, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 936bfb280be911ca8c16dbfb3d848342f5aa8e62",
        },
      })
      .then((res) => {
        setTasks(
          tasks.map((task) => (task.id === editedTask.id ? res.data : task))
        );
        setEditedTask({ id: "", title: "" });
      });
  };

  const handleInputChange = () => (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setEditedTask({ ...editedTask, [name]: value });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} : ID {task.id}
            <button onClick={() => deleteTask(task.id)}>
              <i className="fas fa-trash-alt" />
            </button>
            <button onClick={() => setEditedTask(task)}>
              <i className="fas fa-pen" />
            </button>
          </li>
        ))}
      </ul>
      set id <br />
      <input
        type="test"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <button type="button" onClick={() => getTask()}>
        Get task
      </button>
      <br />
      {/* <button type="button" onClick={() => deleteTask()}> */}
      {/* Delete */}
      {/* </button> */}
      <h3>
        {selectedTask.title} {selectedTask.id}
      </h3>
      <input
        type="text"
        name="title"
        value={editedTask.title}
        onChange={handleInputChange()}
        placeholder="new task?"
        required
      />
      {editedTask.id ? (
        <button onClick={() => editTask(editedTask)}>Update</button>
      ) : (
        <button onClick={() => newTask(editedTask)}>Create</button>
      )}
    </div>
  );
};

export default DrfApiFetch;
