import { useState } from "react";

type Status = "todo" | "in-progress" | "done";

type Todo = {
  title: string;
  status: Status;
};

export function ChallengeComponent() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { title: newTodo.trim(), status: "todo" }]);
    setNewTodo("");
  };

  return (
    <div className="p-8">
      <div>
        {todos.map((todo, index) => (
          <div key={index}>{todo.title}</div>
        ))}
      </div>

      <form onSubmit={handleAddTodo} className="mt-8 flex gap-3 justify-left">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add Task"
          className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
