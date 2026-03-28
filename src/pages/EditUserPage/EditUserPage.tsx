import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../api/usersApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../schemas/userSchema";
import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Loader } from "../../components/Loader/Loader";
import type { UserFormValues } from "../../schemas/userSchema";
import styles from './EditUserPage.module.scss';
import avatarBig from './../../img/avatarBig.png';
import checkBox from './../../img/Checked-box.svg';
import arrow from './../../img/icons/Backarrow.svg';
import arrowMobile from './../../img/icons/Backarrow-mobile.svg';

export const EditUserPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

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

	if (isLoading) {
		return (
			<Loader />
		)
	}

	const onSubmit = (data: UserFormValues) => {
		console.log("Saved data", data)

		setModalOpen(true)

		setTimeout(() => {
			setModalOpen(false)
		}, 3000)
	}

	return (
		<div className={`container ${styles.pageWrapper}`}>
			<div className={styles.returnBlock}>
				<button
					className={styles.moreButton}
					onClick={() => navigate(`/`)}
				>
					<picture>
						<source srcSet={arrowMobile} media="(max-width: 768px)" />
						<img src={arrow} />
					</picture>
				</button>
				<span>Назад</span>
			</div>
			<div className={styles.sections}>
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
						<button className={styles.closeButton} type="submit">Сохранить</button>
					</form>
				</div>
			</div>

			<Modal
				open={isModalOpen}
				onClose={() => setModalOpen(false)}
			>
				<div className={styles.modalContent}>
					<img className={styles.modalImg} src={checkBox} />
					<p className={styles.closeMessage}>Изменения сохранены!</p>
				</div>
			</Modal>
		</div>
	)
}