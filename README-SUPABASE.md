# Supabase Integration with T3 App

This project integrates Supabase authentication and Row-Level Security (RLS) with a T3 app.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and create a new project
2. Note your project URL and API keys (both anon key and service role key)
3. Add these keys to your `.env` file:

```
NEXT_PUBLIC_SUPABASE_URL="your-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
SUPABASE_URL="your-project-url"
```

### 2. Setting Up Row-Level Security (RLS)

Here's an example SQL script to create a simple todos table with RLS policies:

```sql
-- Create a table for todos
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to select only their own todos
CREATE POLICY "Users can view their own todos" ON todos
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own todos
CREATE POLICY "Users can insert their own todos" ON todos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own todos
CREATE POLICY "Users can update their own todos" ON todos
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own todos
CREATE POLICY "Users can delete their own todos" ON todos
  FOR DELETE USING (auth.uid() = user_id);
```

### 3. Creating a Todo Component

After setting up the table with RLS in Supabase, you can create a client-side component to interact with it:

```tsx
// src/app/_components/TodoList.tsx
"use client";

import { createClient } from "~/utils/supabase-browser";
import { useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  user_id: string;
  created_at: string;
};

export default function TodoList() {
  const supabase = createClient();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching todos:", error);
      } else {
        setTodos(data || []);
      }

      setLoading(false);
    };

    void fetchTodos();

    // Subscribe to changes
    const channel = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "todos",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setTodos((prev) => [payload.new as Todo, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setTodos((prev) =>
              prev.map((todo) =>
                todo.id === payload.new.id ? (payload.new as Todo) : todo,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setTodos((prev) =>
              prev.filter((todo) => todo.id !== payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Add a new todo
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTodo.trim()) return;

    const { error } = await supabase
      .from("todos")
      .insert([{ title: newTodo.trim() }]);

    if (error) {
      console.error("Error adding todo:", error);
    } else {
      setNewTodo("");
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from("todos")
      .update({ completed: !completed })
      .eq("id", id);

    if (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      console.error("Error deleting todo:", error);
    }
  };

  if (loading) {
    return <div>Loading todos...</div>;
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="mb-4 text-xl font-bold">Your Todos</h2>

      <form onSubmit={handleAddTodo} className="mb-4 flex">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 rounded-l border p-2 text-black"
        />
        <button
          type="submit"
          className="rounded-r bg-blue-500 px-4 py-2 text-white"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {todos.length === 0 ? (
          <li className="py-4 text-center">No todos yet! Add one above.</li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between rounded bg-white/10 p-3"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                  className="mr-3 h-5 w-5"
                />
                <span
                  className={todo.completed ? "line-through opacity-60" : ""}
                >
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
```

### 4. Using the Todo Component

You can add the TodoList component to your page like this:

```tsx
// In a page component
import TodoList from "~/app/_components/TodoList";

// Inside your component's return statement
{
  session && <TodoList />;
}
```

### 5. Understanding RLS

With Row-Level Security:

1. Users can only see their own todos thanks to the `"Users can view their own todos"` policy
2. Users can only create todos for themselves with the `"Users can insert their own todos"` policy
3. Users can only update or delete their own todos

This creates a fully secure multi-tenant application where data is isolated by user.

### 6. Supabase Authentication Types

You can extend TypeScript with Supabase Auth types:

```tsx
// src/types/supabase.ts
import { Database } from "./supabase-types";
import { Session, User } from "@supabase/supabase-js";

export type TypedSupabaseUser = User;
export type TypedSession = Session;
```

You'll need to generate types from your database schema using Supabase CLI's `gen types` command.
