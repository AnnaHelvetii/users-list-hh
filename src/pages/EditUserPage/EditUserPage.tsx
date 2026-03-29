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
import crossIcon from './../../img/icons/Cross.svg';
import { ProfileMenu } from "../../components/ProfileMenu/ProfileMenu";

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
		resetField,
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
		}, 4000)
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
					<ProfileMenu />
				</div>

				<div className={`${styles.section} ${styles.sectionRight}`}>
					<p className={styles.mainTitle}>Данные профиля</p>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.formField}>
							<label>Имя</label>
							<div className={styles.inputWrapper}>
								<input placeholder="Name" {...register("name")} />
								<button
									type="button"
									className={styles.clearBtn}
									onMouseDown={(e) => {
										e.preventDefault();
										resetField("name");
									}}
								>
									<img src={crossIcon} alt="clear" />
								</button>
							</div>
							<p>{errors.name?.message}</p>
						</div>
						<div className={styles.formField}>
							<label>Никнейм</label>
							<div className={styles.inputWrapper}>
								<input placeholder="Username" {...register("username")} />
								<button
									type="button"
									className={styles.clearBtn}
									onMouseDown={(e) => {
										e.preventDefault();
										resetField("username");
									}}
								>
									<img src={crossIcon} alt="clear" />
								</button>
							</div>
							<p>{errors.username?.message}</p>
						</div>
						<div className={styles.formField}>
							<label>Почта</label>
							<div className={styles.inputWrapper}>
								<input placeholder="Email" {...register("email")} />
								<button
									type="button"
									className={styles.clearBtn}
									onMouseDown={(e) => {
										e.preventDefault();
										resetField("email");
									}}
								>
									<img src={crossIcon} alt="clear" />
								</button>
							</div>
							<p>{errors.email?.message}</p>
						</div>
						<div className={styles.formField}>
							<label>Город</label>
							<div className={styles.inputWrapper}>
								<input placeholder="City" {...register("city")} />
								<button
									type="button"
									className={styles.clearBtn}
									onMouseDown={(e) => {
										e.preventDefault();
										resetField("city");
									}}
								>
									<img src={crossIcon} alt="clear" />
								</button>
							</div>
							<p>{errors.city?.message}</p>
						</div>
						<div className={styles.formField}>
							<label>Телефон</label>
							<div className={styles.inputWrapper}>
								<input
									placeholder="Phone"
									{...register("phone")}
									onInput={(e) => {
										e.currentTarget.value =
											e.currentTarget.value.replace(/\D/g, "")
									}}
								/>
								<button
									type="button"
									className={styles.clearBtn}
									onMouseDown={(e) => {
										e.preventDefault();
										resetField("phone");
									}}
								>
									<img src={crossIcon} alt="clear" />
								</button>
							</div>
							<p>{errors.phone?.message}</p>
						</div>
						<div className={styles.formField}>
							<label>Название компании</label>
							<div className={styles.inputWrapper}>
								<input placeholder="Company" {...register("company")} />
								<button
									type="button"
									className={styles.clearBtn}
									onMouseDown={(e) => {
										e.preventDefault();
										resetField("company");
									}}
								>
									<img src={crossIcon} alt="clear" />
								</button>
							</div>
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
