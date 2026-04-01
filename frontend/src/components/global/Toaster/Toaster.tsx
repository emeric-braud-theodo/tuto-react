import { createPortal } from "react-dom";

import Card from "../Card/Card";
import ConfirmButton from "../ConfirmButton/ConfirmButton";

import styles from "./Toaster.module.css"

function Toaster({ displayState, displayStateChange, onConfirmAction, onDeclineAction }: { displayState: boolean, displayStateChange: (arg0: boolean) => void, onConfirmAction: () => void, onDeclineAction: () => void }) {
    if (!displayState) return <></>
    return createPortal(
        <div className={styles.ShadowBackground} onClick={(e) => { e.stopPropagation(); displayStateChange(false); }}>
            <Card className={styles.Toaster}>
                <p className={styles.ToasterText}>Êtes-vous certain de vouloir réaliser cette action ?</p>
                <div className="FlexSpacedArround">
                    <ConfirmButton onClick={(e) => { e.stopPropagation(); onConfirmAction(); displayStateChange(false); }} hoverColor="var(--color-validate)">Oui</ConfirmButton>
                    <ConfirmButton onClick={(e) => { e.stopPropagation(); onDeclineAction(); displayStateChange(false); }} hoverColor="var(--color-refuse)">Non</ConfirmButton>
                </div>
            </Card>
        </div>, document.body
    )
}

export default Toaster;