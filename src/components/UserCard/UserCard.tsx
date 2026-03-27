import { useState, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/user";
import styles from "./UserCard.module.scss";
import avatarImg from "../../img/avatar.png";
import showMoreImg from "../../img/icons/More-desktop.svg";
import showMoreImgMobile from "../../img/icons/More-mobile.svg";

interface Props {
	user: User;
	isArchived?: boolean;
	archiveUser: (id: number) => void;
	restoreUser: (id: number) => void;
	hideUser: (id: number) => void;
}

export const UserCard = ({
	user,
	isArchived,
	archiveUser,
	restoreUser,
	hideUser
}: Props) => {

	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);
	const cardRef = useRef<HTMLDivElement>(null);
	useClickOutside(cardRef, () => setMenuOpen(false));

	return (
		<div ref={cardRef} className={styles.userCard}>
			<img 
				src={avatarImg} 
				alt="avatar" 
				className={`${styles.userImg} ${isArchived ? styles.archivedImg : ''}`}
			/>
			<div className={styles.userInfo}>
				<div className={styles.userInfoTop}>
					<div className={styles.userNameButton}>
						<h3 className={isArchived ? styles.archivedUserName : undefined}>{user.username}</h3>
						<button
							className={styles.moreButton}
							onClick={() => setMenuOpen(prev => !prev)}
						>
							<picture>
								<source srcSet={showMoreImgMobile} media="(max-width: 768px)" />
								<img src={showMoreImg} alt="more" />
							</picture>
						</button>
					</div>
					<p className={isArchived ? styles.archivedCompany : undefined}>{user.company.name}</p>
				</div>
				<span className={isArchived ? styles.archivedAddress : undefined}>{user.address.city}</span>
			</div>

			{menuOpen && (
				<div className={styles.actionContainer}>
					<div className={styles.actionButtons}>
						{isArchived ? (
							<button onClick={() => restoreUser(user.id)}>
								Активировать
							</button>
						) : (
							<>
								<button onClick={() => navigate(`/users/${user.id}`)}>
									Редактировать
								</button>
								<button onClick={() => archiveUser(user.id)}>
									Архивировать
								</button>
								<button onClick={() => hideUser(user.id)}>
									Скрыть
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};