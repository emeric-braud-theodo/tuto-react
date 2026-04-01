import styles from "./SubtitleButtonBox.module.css"

function SubtitleButtonBox({ text, onClick }: { text: string, onClick: () => any }) {
    return (
        <button className={styles.SubtitleButtonBox} onClick={onClick}>
            {text}
        </button>
    );
};

export default SubtitleButtonBox;