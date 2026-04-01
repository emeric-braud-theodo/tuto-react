import styles from "./Card.module.css"

type CardProps = {
    children?: React.ReactNode;
    className?: string;
}

function Card({ children, className }: CardProps) {
    return (
        <div className={`${styles.Card} ${className ?? ""}`}>
            {children}
        </div>
    );
}

export default Card;