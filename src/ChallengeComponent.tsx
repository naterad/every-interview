import { useState } from "react";

type Status = "todo" | "in-progress" | "done";

type Todo = {
  id: string;
  title: string;
  status: Status;
};

const testTodos: Todo[] = [
  { id: crypto.randomUUID(), title: "Todo 1", status: "todo" },
  { id: crypto.randomUUID(), title: "Todo 2", status: "in-progress" },
  { id: crypto.randomUUID(), title: "Todo 3", status: "done" },
  { id: crypto.randomUUID(), title: "Todo 4", status: "todo" },
  { id: crypto.randomUUID(), title: "Todo 5", status: "in-progress" },
  { id: crypto.randomUUID(), title: "Todo 6", status: "done" },
  { id: crypto.randomUUID(), title: "Todo 7", status: "todo" },
  { id: crypto.randomUUID(), title: "Todo 8", status: "in-progress" },
  { id: crypto.randomUUID(), title: "Todo 9", status: "done" },
  { id: crypto.randomUUID(), title: "Todo 10", status: "todo" },
  { id: crypto.randomUUID(), title: "Todo 11", status: "in-progress" },
  { id: crypto.randomUUID(), title: "Todo 12", status: "done" },
  { id: crypto.randomUUID(), title: "Todo 13", status: "todo" },
  { id: crypto.randomUUID(), title: "Todo 14", status: "todo" },
  { id: crypto.randomUUID(), title: "Todo 15", status: "todo" },
  { id: crypto.randomUUID(), title: "Todo 16", status: "todo" },
  { id: crypto.randomUUID(), title: "Todo 17", status: "todo" },
  { id: crypto.randomUUID(), title: "Todo 18", status: "todo" },
  { id: crypto.randomUUID(), title: "Todo 19", status: "todo" },
  { id: crypto.randomUUID(), title: "Todo 20", status: "todo" },
];

export function ChallengeComponent() {
  const [todos, setTodos] = useState<Todo[]>(testTodos);

  const handleAddTodo = (title: string) => {
    setTodos([...todos, { id: crypto.randomUUID(), title, status: "todo" }]);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <TodoColumn
          title="Todo"
          todos={todos.filter((todo) => todo.status === "todo")}
        />
        <TodoColumn
          title="In Progress"
          todos={todos.filter((todo) => todo.status === "in-progress")}
        />
        <TodoColumn
          title="Done"
          todos={todos.filter((todo) => todo.status === "done")}
        />
      </div>

      <AddTodoForm onAdd={handleAddTodo} />
    </div>
  );
}

function AddTodoForm({ onAdd }: { onAdd: (title: string) => void }) {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    onAdd(newTodo.trim());
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex gap-3 justify-start">
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
  );
}

function TodoColumn({ title, todos }: { title: string; todos: Todo[] }) {
  return (
    <div className="flex-1 bg-white rounded-2xl shadow p-4 min-w-0 sm:min-h-[300px]">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        {title}
      </h2>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
