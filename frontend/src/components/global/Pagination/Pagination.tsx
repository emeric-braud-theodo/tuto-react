import styles from "./Pagination.module.css"

type PaginationProps = {
    currentPage: number;
    maxPage: number;
    onClickBefore: () => void;
    onClickAfter: () => void;
}

function Pagination({ currentPage, maxPage, onClickBefore, onClickAfter }: PaginationProps) {
    return (
        <div className={`FlexSpaced ${styles.Pagination}`}>
            <button onClick={onClickBefore}>
                {"<"}
            </button>
            <p>{currentPage}/{maxPage}</p>
            <button onClick={onClickAfter}>{">"}</button>
        </ div>
    );
}

export default Pagination;