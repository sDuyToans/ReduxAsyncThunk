import { useEffect, type ReactElement } from "react";
import { deleteTask, fetchTasks, setCompletedTask } from "../store/taskStore";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "./task_form";

export default function tasks(): ReactElement {
  const { tasks, isLoading } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  function setCompleted(taskId: number): void {
    dispatch(setCompletedTask(taskId));
  }

  function handleDeleleTask(taskId: number): void {
    dispatch(deleteTask(taskId));
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        {isLoading && <h5>Loading..............</h5>}
        {!tasks || tasks.length === 0 ? (
          <p>Empty Tasks</p>
        ) : (
          <ol style={{ border: "1px solid black", padding: "20px" }}>
            {tasks.map((t) => (
              <li
                key={t.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "1px solid green",
                  marginBottom: "10px",
                  padding: "3px",
                }}
              >
                <div style={{ width: "60%" }}>
                  {t.task}, isCompleted: {t.completed.toString()}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  {t.completed === false && <button onClick={() => setCompleted(t.id)}>Completed</button>}
                  <button onClick={() => handleDeleleTask(t.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
      <TaskForm />
    </div>
  );
}
