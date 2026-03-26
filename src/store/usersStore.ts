import { create } from "zustand";

interface UsersState {
	archived: number[]
	hidden: number[]

	archiveUser: (id: number) => void
	restoreUser: (id: number) => void
	hideUser: (id: number) => void
}

export const useUsersStore = create<UsersState>((set) => ({
	archived: [],
	hidden: [],

	archiveUser: (id) =>
		set((state) => ({
			archived: [...state.archived, id]
		})),

	restoreUser: (id) =>
		set((state) => ({
			archived: state.archived.filter((i) => i !== id)
		})),

	hideUser: (id) =>
		set((state) => ({
			hidden: [...state.hidden, id]
		}))
}))