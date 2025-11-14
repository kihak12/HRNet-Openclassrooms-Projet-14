import {createBrowserRouter} from "react-router";
import {Home} from "./pages/home/Home.tsx";
import {Employees} from "./pages/employees/Employees.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/employees',
        element: <Employees />
    },
])
