import { useState } from "react";
import styles from "./ProfileMenu.module.scss";

const categories = [
	"Данные профиля",
	"Рабочее пространство",
	"Приватность",
	"Безопасность"
];

export const ProfileMenu = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<ul className={styles.profileCategories}>
			{categories.map((category, index) => (
				<li
					key={index}
					className={activeIndex === index ? styles.active : undefined}
					onClick={() => setActiveIndex(index)}
				>
					{category}
				</li>
			))}
		</ul>
	);
};
