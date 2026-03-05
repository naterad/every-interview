import { useState } from "react";

const COLUMNS = [
  { status: "todo", title: "Todo" },
  { status: "review", title: "Review" },
  { status: "done", title: "Done" },
] as const;

type Status = (typeof COLUMNS)[number]["status"];

type Todo = {
  id: string;
  title: string;
  status: Status;
};

export function ChallengeComponent() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (title: string) => {
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), title, status: COLUMNS[0].status },
    ]);
  };

  const handleMove = (id: string, direction: "left" | "right") => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        const index = COLUMNS.findIndex((col) => col.status === todo.status);
        return {
          ...todo,
          status: COLUMNS[index + (direction === "right" ? 1 : -1)].status,
        };
      }),
    );
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row gap-4">
        {COLUMNS.map((col) => (
          <TodoColumn
            key={col.status}
            title={col.title}
            todos={todos.filter((todo) => todo.status === col.status)}
            onMove={handleMove}
          />
        ))}
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
        aria-label="Add task"
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

function TodoColumn({
  title,
  todos,
  onMove,
}: {
  title: string;
  todos: Todo[];
  onMove: (id: string, direction: "left" | "right") => void;
}) {
  return (
    <div className="flex-1 bg-white rounded-2xl shadow p-4 min-w-0 sm:min-h-[300px]">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        {title}
      </h2>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onMove={onMove} />
        ))}
      </ul>
    </div>
  );
}

function TodoItem({
  todo,
  onMove,
}: {
  todo: Todo;
  onMove: (id: string, direction: "left" | "right") => void;
}) {
  return (
    <div className="flex justify-between border border-gray-200 rounded-lg p-2 shadow-sm items-center">
      <button
        aria-label="Move left"
        onClick={() => onMove(todo.id, "left")}
        disabled={todo.status === COLUMNS[0].status}
        className="bg-red-600 text-white px-2 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <div>{todo.title}</div>
      <button
        aria-label="Move right"
        onClick={() => onMove(todo.id, "right")}
        disabled={todo.status === COLUMNS[COLUMNS.length - 1].status}
        className="bg-green-600 text-white px-2 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
