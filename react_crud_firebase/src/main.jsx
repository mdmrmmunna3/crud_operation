import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './components/Layouts/Main';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import AuthProvider from './providers/AuthProvider';
import Login from './components/Login/Login';
import PrivateRoute from './routes/PrivateRoute';
import AddCoffe from './components/AddCoffe/AddCoffe';
import ViewCoffee from './components/ViewCoffee/ViewCoffee';
import UpdateCoffee from './components/UpdateCoffee/UpdateCoffee';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <PrivateRoute><Home></Home></PrivateRoute>,
        loader: () => fetch('http://localhost:5000/coffee')
      },
      {
        path: "register",
        element: <Register></Register>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "addCoffe",
        element: <PrivateRoute><AddCoffe></AddCoffe></PrivateRoute>
      },
      {
        path: "viewCoffee/:id",
        element: <PrivateRoute><ViewCoffee></ViewCoffee></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/coffee/${params.id}`)
      },
      {
        path: "updateCoffee/:id",
        element: <PrivateRoute><UpdateCoffee></UpdateCoffee></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/coffee/${params.id}`)
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
