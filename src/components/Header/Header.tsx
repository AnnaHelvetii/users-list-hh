import styles from './Header.module.scss';
import logo from './../../img/logo.svg';
import avatar from './../../img/avatar.png';
import heart from './../../img/icons/Favorite.svg';
import bell from './../../img/icons/Notification.svg'

export const Header = () => {
	return (
		<div className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<img src={logo} alt="logo" />
				<div className={styles.headerMenu}>
					<div className={styles.userActions}>
						<img src={heart} alt="" />
						<img src={bell} alt="" />
					</div>
					<div className={styles.userInfo}>
						<img src={avatar} alt="" />
						<span>UserName</span>
					</div>
				</div>
			</div>
		</div>
	)
};