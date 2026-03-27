import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../api/usersApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../schemas/userSchema";
import type { UserFormValues } from "../../schemas/userSchema";
import { useEffect, useState } from "react";
import styles from './EditUserPage.module.scss';
import avatarBig from './../../img/avatarBig.png';
import cross from './../../img/icons/Cross.svg'

export const EditUserPage = () => {
	const { id } = useParams()

	const { data: user, isLoading } = useQuery({
		queryKey: ["user", id],
		queryFn: () => fetchUser(id!)
	})

	const [isModalOpen, setModalOpen] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<UserFormValues>({
		resolver: zodResolver(userSchema)
	})

	useEffect(() => {
		if (user) {
			reset({
				name: user.name,
				username: user.username,
				email: user.email,
				city: user.address.city,
				phone: user.phone.replace(/\D/g, ""),
				company: user.company.name
			})
		}
	}, [user, reset])

	if (isLoading) return <p>Loading user...</p>

	const onSubmit = (data: UserFormValues) => {
		console.log("Saved data", data)

		setModalOpen(true)

		setTimeout(() => {
			setModalOpen(false)
		}, 4000)
	}

	return (
		<div className={`container ${styles.pageWrapper}`}>
			<div className={`${styles.section} ${styles.sectionLeft}`}>
				<img
					src={avatarBig}
					className={styles.userAvatar}
				/>
				<ul className={styles.profileChapters}>
					<li>Данные профиля</li>
					<li>Рабочее пространство</li>
					<li>Приватность</li>
					<li>Безопасность</li>
				</ul>
			</div>

			<div className={`${styles.section} ${styles.sectionRight}`}>
				<p className={styles.mainTitle}>Данные профиля</p>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.formField}>
						<label>Имя</label>
						<input placeholder="Name" {...register("name")} />
						<p>{errors.name?.message}</p>
					</div>
					<div className={styles.formField}>
						<label>Никнейм</label>
						<input placeholder="Username" {...register("username")} />
						<p>{errors.username?.message}</p>
					</div>
					<div className={styles.formField}>
						<label>Почта</label>
						<input placeholder="Email" {...register("email")} />
						<p>{errors.email?.message}</p>
					</div>
					<div className={styles.formField}>
						<label>Город</label>
						<input placeholder="City" {...register("city")} />
						<p>{errors.city?.message}</p>
					</div>
					<div className={styles.formField}>
						<label>Телефон</label>
						<input
							placeholder="Phone"
							{...register("phone")}
							onInput={(e) => {
								e.currentTarget.value =
									e.currentTarget.value.replace(/\D/g, "")
							}}
						/>
						<p>{errors.phone?.message}</p>
					</div>
					<div className={styles.formField}>
						<label>Название компании</label>
						<input
							placeholder="Company"
							{...register("company")}
						/>
						<p>{errors.company?.message}</p>
					</div>

					<button type="submit">Сохранить</button>
				</form>
			</div>

			{isModalOpen && (
				<div
					className="modalOverlay"
					onClick={() => setModalOpen(false)}
				>
					<div
						className="modal"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="close"
							onClick={() => setModalOpen(false)}
						>
							<img src={cross} />
						</button>

						<p>Изменения сохранены!</p>
					</div>
				</div>
			)}
		</div>
	)
}