import type { User } from "../types/user";

export const fetchUsers = async (): Promise<User[]> => {
	const res = await fetch("https://jsonplaceholder.typicode.com/users");

	if (!res.ok) {
		throw new Error("Не удалось загрузить пользователей");
	}

	const data = await res.json();

	return data.slice(0, 6);
}

export const fetchUser = async (id: string): Promise<User> => {
	const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

	if (!res.ok) {
		throw new Error("Не удалось загрузить пользователей");
	}

	return res.json();
}