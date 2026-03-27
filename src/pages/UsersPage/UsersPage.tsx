import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/usersApi";
import { useUsersStore } from "../../store/usersStore";
import { UserCard } from "../../components/UserCard/UserCard";
import styles from "./UsersPage.module.scss";

export const UsersPage = () => {
	const { archived, hidden, archiveUser, restoreUser, hideUser } =
		useUsersStore();

	const { data: users, isLoading, error } = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers
	});

	if (isLoading) return <p>Загрузка...</p>;

	if (error) return <p>Ошибка загрузки</p>;

	const visibleUsers =
		users?.filter((user) => !hidden.includes(user.id)) || [];

	const activeUsers = visibleUsers.filter(
		(user) => !archived.includes(user.id)
	);

	const archivedUsers = visibleUsers.filter((user) =>
		archived.includes(user.id)
	);

	return (
		<div className="container">
			<section className={styles.section}>
				<h2 className={styles.title}>Активные</h2>
				<div className={styles.usersList}>
					{activeUsers.map((user) => (
						<UserCard
							key={user.id}
							user={user}
							archiveUser={archiveUser}
							restoreUser={restoreUser}
							hideUser={hideUser}
						/>
					))}
				</div>
			</section>

			<section className={styles.section}>
				<h2 className={styles.title}>Архив</h2>
				<div className={styles.usersList}>
					{archivedUsers.map((user) => (
						<UserCard
							key={user.id}
							user={user}
							isArchived
							archiveUser={archiveUser}
							restoreUser={restoreUser}
							hideUser={hideUser}
						/>
					))}
				</div>
			</section>
		</div>
	);
};