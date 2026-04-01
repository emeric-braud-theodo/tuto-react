import { Pokemon } from "../../../services/PokemonService";
import SubtitleButtonBox from "../../global/SubtitleButton/SubtitleButtonBox";
import styles from "./PokemonListRow.module.css"
import { StringUtils } from "../../../utils/StringUtils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
type PokeListRowProps = { poke?: Pokemon, tabIndex?: number, isLoading?: boolean };
function PokemonListRow({ poke, tabIndex, isLoading = false }: PokeListRowProps) {
    const navigate = useNavigate();
    const [hoverState, hoverStateChange] = useState(false);


    if (isLoading) {
        return (
            <div className={styles.PokeListRow} tabIndex={tabIndex}>
                <div className={`${styles.PokemonListRowPortaitWrapper} ${styles.shimmer}`}>
                    <img src={""} className={styles.PokemonListRowPortait} />
                </div>

                <SubtitleButtonBox text={StringUtils.capitalize("Chargement...")} onClick={() => { }} />
            </div>
        );
    }


    if (!poke) return null;
    const goToDetailsFn = () => navigate(`/pokemon/${poke.name}`)

    return (
        <div className={styles.PokeListRow} tabIndex={tabIndex} onClick={goToDetailsFn} onMouseEnter={() => hoverStateChange(true)} onMouseLeave={() => hoverStateChange(false)}>
            <div className={`${styles.PokemonListRowPortaitWrapper} ${styles.shimmer}`}>
                <img src={poke.sprites.front_default ?? ""} className={`${styles.PokemonListRowPortait} ${hoverState ? styles.hidden : styles.visible}`} />
                <img src={poke.sprites.front_shiny ?? ""} className={`${styles.PokemonListRowPortait} ${hoverState ? styles.visible : styles.hidden}`} />

            </div>

            <SubtitleButtonBox text={StringUtils.capitalize(poke.name ?? "")} onClick={goToDetailsFn} />
        </div>
    );
}

export default PokemonListRow;