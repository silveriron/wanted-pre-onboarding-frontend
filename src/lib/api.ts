import axios from "axios";
import { UserDto } from "../types/user";
import { CreateTodoDto, Todo, updateTodoDto } from "../types/todo";

if (process.env.API_URL === undefined) {
  throw new Error("API_URL이 필요합니다.");
}

export const instance = axios.create({
  baseURL: process.env.API_URL,
});

export const signUp = async (data: UserDto) => {
  try {
    const res = await instance.post("/auth/signup", data);

    if (res.status === 201) {
      return;
    }
  } catch (error) {
    throw new Error();
  }
};

export const signIn = async (data: UserDto) => {
  try {
    const res = await instance.post("/auth/signin", data);

    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {
    throw new Error();
  }
};

export const createTodo = async (data: CreateTodoDto) => {
  try {
    const res = await instance.post<Todo>("/todo", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {
    throw new Error();
  }
};

export const getTodos = async () => {
  try {
    const res = await instance.get<Todo[]>("/todos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw new Error();
  }
};

export const updataTodo = async (id: number, data: updateTodoDto) => {
  try {
    const res = await instance.put<Todo>(`/todos/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw new Error();
  }
};

export const deleteTodo = async (id: number) => {
  try {
    const res = await instance.delete(`/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.status === 204) {
      return;
    }
  } catch (error) {
    throw new Error();
  }
};
