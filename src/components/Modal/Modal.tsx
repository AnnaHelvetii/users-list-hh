import styles from "./Modal.module.scss";
import cross from "../../img/icons/Cross.svg";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export const Modal = ({ open, onClose, children }: ModalProps) => {
	if (!open) return null;

	return (
		<div
			className={styles.overlay}
			onClick={onClose}
		>
			<div
				className={styles.modal}
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className={styles.close}
					onClick={onClose}
				>
					<img src={cross} />
				</button>
				{children}
			</div>
		</div>
	);
};