import { useState } from "react";

import Toaster from "../Toaster/Toaster";
import styles from "./StarBox.module.css";

type StarBoxProps = {
    isCheckedState: boolean;
    isCheckedStateChange: (checked: boolean) => void;
};

function StarBox({ isCheckedState, isCheckedStateChange }: StarBoxProps) {

    const [showToasterState, showToasterStateChange] = useState(false);
    const onClickFn = (e: React.MouseEvent) => {
        e.stopPropagation();
        showToasterStateChange(true);
    }

    const onConfirmAction = () => {
        isCheckedStateChange(!isCheckedState);
    }
    const onDeclineAction = () => {
        showToasterStateChange(false);
    }
    return (
        <>
            <button
                type="button"
                className={styles.starButton}
                onClick={(e) => onClickFn(e)}
                aria-pressed={isCheckedState}
                aria-label={isCheckedState ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
                <svg
                    className={isCheckedState ? styles.starChecked : styles.starUnchecked}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52 6.12 20.61l1.12-6.55L2.48 9.42l6.58-.96L12 2.5z" />
                </svg>
            </button>
            <Toaster displayState={showToasterState} displayStateChange={showToasterStateChange} onConfirmAction={onConfirmAction} onDeclineAction={onDeclineAction} />
        </>
    );
}

export default StarBox;