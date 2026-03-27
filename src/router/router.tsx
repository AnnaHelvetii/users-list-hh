import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { UsersPage } from "../pages/UsersPage/UsersPage";
import { EditUserPage } from "../pages/EditUserPage/EditUserPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <UsersPage />
			},
			{
				path: "/users/:id",
				element: <EditUserPage />
			}
		]
	}
]);
