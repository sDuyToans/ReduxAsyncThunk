import type { ReactElement } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTasks } from "../store/taskStore";

interface ITaskForm {
  task: string;
}

export default function task_form(): ReactElement {
  const { register, handleSubmit } = useForm<ITaskForm>();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<ITaskForm> = (data) => dispatch(addTasks(data));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="task">Task:</label>
      <input
        {...register("task")}
        placeholder="Enter tasks"
        style={{ width: "100%", padding: "10px" }}
        name="task"
        id="task"
      />
      <input type="submit" value={"Add Task"} />
    </form>
  );
}
