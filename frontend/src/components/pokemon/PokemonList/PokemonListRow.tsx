import { Pokemon } from "../../../services/PokemonService";
import SubtitleButtonBox from "../../global/SubtitleButton/SubtitleButtonBox";
import styles from "./PokemonListRow.module.css"
import { StringUtils } from "../../../utils/StringUtils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StarBox from "../../global/StarBox/StarBox";
import { FavoriteService } from "../../../services/FavoriteService";
type PokeListRowProps = { poke?: Pokemon, tabIndex?: number, isLoading?: boolean };
function PokemonListRow({ poke, tabIndex, isLoading = false }: PokeListRowProps) {
    const navigate = useNavigate();
    const [isStarButtonChecked, isStarButtonCheckedChange] = useState(isLoading ? false : !poke ? false : FavoriteService.isFavorite(poke.name ?? ""));

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
        <div className={styles.PokeListRow} tabIndex={tabIndex} onClick={goToDetailsFn}>
            <div className={`${styles.PokemonListRowPortaitWrapper} ${styles.shimmer}`}>
                <StarBox isCheckedState={isStarButtonChecked} isCheckedStateChange={(arg) => { isStarButtonCheckedChange(arg); FavoriteService.setFavorite(poke.name ?? "", arg); }} />
                <img
                    src={poke.sprites.front_default ?? ""}
                    className={`${styles.PokemonListRowPortait} ${styles.baseImage}`}
                    alt={poke.name ?? ""}
                />
                <img
                    src={poke.sprites.front_shiny ?? ""}
                    className={`${styles.PokemonListRowPortait} ${styles.shinyImage}`}
                    alt=""
                />

            </div>

            <SubtitleButtonBox text={StringUtils.capitalize(poke.name ?? "")} onClick={goToDetailsFn} />
        </div>
    );
}

export default PokemonListRow;