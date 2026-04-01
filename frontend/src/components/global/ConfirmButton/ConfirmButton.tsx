import { useState } from "react";

import styles from "./ConfirmButton.module.css"

type ConfirmButtonProps = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
    className?: string;
    hoverColor?: string;
}

function ConfirmButton({ onClick, children, className, hoverColor }: ConfirmButtonProps) {
    const bgColor = "white";
    const hoverBGColor = hoverColor ?? bgColor;
    const [isHover, setIsHover] = useState(false);

    return (
        <button className={`${styles.ConfirmButton} ${className ?? ""}`} onClick={onClick}
            style={{
                backgroundColor: isHover ? hoverBGColor : bgColor
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            {children}
        </button>
    );
}

export default ConfirmButton;