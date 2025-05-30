import "./App.css";
import Task from "./components/tasks";
function App() {
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h3>Create Async Thunk - Fetch API</h3>
      <Task />
    </div>
  );
}

export default App;
