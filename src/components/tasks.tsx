import { useEffect, type ReactElement } from "react";
import { fetchTasks } from "../store/taskStore";
import { useDispatch, useSelector } from "react-redux";

export default function tasks(): ReactElement {
  const {tasks, isLoading} = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  return (
    <div>
      {
        isLoading && <h5>Loading..............</h5>
      }
      {!tasks || tasks.length === 0 ? (
        <p>Empty Tasks</p>
      ) : (
        <ol>
          {tasks.map((t) => (
            <li key={t.id}>
              {t.task}, isCompleted: {t.completed.toString()}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
