import { createBrowserRouter } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage/UsersPage";
import { EditUserPage } from "../pages/EditUserPage/EditUserPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <UsersPage />
	},
	{
		path: "/users/:id",
		element: <EditUserPage />
	}
])