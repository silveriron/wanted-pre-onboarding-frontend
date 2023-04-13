import { createBrowserRouter } from "react-router-dom";
import Main from "./main/Main";
import Signin from "./signin/SignIn";
import Signup from "./signup/SignUp";
import Todo from "./todo/Todo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
]);

export default router;
