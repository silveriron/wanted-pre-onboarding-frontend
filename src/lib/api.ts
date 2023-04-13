import axios from "axios";
import { UserDto } from "../types/user";
import { CreateTodoDto, Todo, updateTodoDto } from "../types/todo";

if (process.env.REACT_APP_API_URL === undefined) {
  throw new Error("API_URL이 필요합니다.");
}

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const signUp = async (data: UserDto) => {
  return await instance.post("/auth/signup", data);
};

export const signIn = async (data: UserDto) => {
  return await instance.post("/auth/signin", data);
};

export const createTodo = async (data: CreateTodoDto) => {
  return await instance.post<Todo>("/todo", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getTodos = async () => {
  return await instance.get<Todo[]>("/todos", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const updataTodo = async (id: number, data: updateTodoDto) => {
  return await instance.put<Todo>(`/todos/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteTodo = async (id: number) => {
  return await instance.delete(`/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
