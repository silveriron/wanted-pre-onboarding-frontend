import { createBrowserRouter } from "react-router-dom";
import Main from "./Main/Main";
import Signin from "./SignIn/SignIn";
import Signup from "./SignUp/SignUp";
import Todo from "./Todo/Todo";

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
