import { Pokemon } from "../../services/PokemonService";
import SubtitleButtonBox from "../global/SubtitleButton/SubtitleButtonBox";
import styles from "./PokemonListRow.module.css"
import { StringUtils } from "../../utils/StringUtils";
import { useNavigate } from "react-router-dom";

function PokemonListRow({ poke, tabIndex }: { poke: Pokemon, tabIndex?: number }) {
    const navigate = useNavigate();

    const goToDetailsFn = () => navigate(`/pokemon/${poke.name}`)
    return (
        <div className={styles.PokeListRow} tabIndex={tabIndex} onClick={goToDetailsFn}>
            <SubtitleButtonBox text={StringUtils.capitalize(poke.name ?? "")} onClick={goToDetailsFn} />
            <img src={poke.sprites.front_default ?? ""} />
        </div>
    );
}

export default PokemonListRow;