import { Pokemon } from "../../services/PokemonService";
import SubtitleButtonBox from "../global/SubtitleButton/SubtitleButtonBox";
import styles from "./PokemonListRow.module.css"
import { StringUtils } from "../../utils/StringUtils";
import { useNavigate } from "react-router-dom";

function PokemonListRow({ poke }: { poke: Pokemon }) {
    const navigate = useNavigate();
    return (
        <div className={styles.PokeListRow}>
            <SubtitleButtonBox text={StringUtils.capitalize(poke.name ?? "")} onClick={() => navigate(`/pokemon/${poke.name}`)} />
            <img src={poke.sprites.front_default ?? ""} />
        </div>
    );
}

export default PokemonListRow;