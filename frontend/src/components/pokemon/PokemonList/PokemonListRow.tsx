import { Pokemon } from "../../../services/PokemonService";
import SubtitleButtonBox from "../../global/SubtitleButton/SubtitleButtonBox";
import styles from "./PokemonListRow.module.css";
import { StringUtils } from "../../../utils/StringUtils";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/react";
import StarBox from "../../global/StarBox/StarBox";
import { FavoriteService } from "../../../services/FavoriteService";

type PokeListRowProps = {
    poke?: Pokemon;
    tabIndex?: number;
    isLoading?: boolean;
};

function PokemonListRow({
    poke,
    tabIndex,
    isLoading = false,
}: PokeListRowProps) {
    const navigate = useNavigate();
    const { getToken, isSignedIn } = useAuth();

    const [isStarButtonChecked, setIsStarButtonChecked] = useState(false);
    const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

    useEffect(() => {
        async function loadFavoriteState() {
            if (isLoading || !poke?.name || !isSignedIn) {
                setIsStarButtonChecked(false);
                return;
            }

            setIsFavoriteLoading(true);

            try {
                const token = await getToken();

                if (!token) {
                    setIsStarButtonChecked(false);
                    return;
                }

                const favorites = await FavoriteService.getAll(token);
                setIsStarButtonChecked(favorites.includes(poke.name));
            } catch (error) {
                console.error(error);
                setIsStarButtonChecked(false);
            } finally {
                setIsFavoriteLoading(false);
            }
        }

        loadFavoriteState();
    }, [poke?.name, isLoading, isSignedIn, getToken]);

    if (isLoading) {
        return (
            <div className={styles.PokeListRow} tabIndex={tabIndex}>
                <div className={`${styles.PokemonListRowPortaitWrapper} ${styles.shimmer}`}>
                    <img
                        src=""
                        className={styles.PokemonListRowPortait}
                        alt=""
                    />
                </div>

                <SubtitleButtonBox
                    text={StringUtils.capitalize("Chargement...")}
                    onClick={() => { }}
                />
            </div>
        );
    }

    if (!poke) return null;

    const goToDetailsFn = () => navigate(`/pokemon/${poke.name}`);

    const onFavoriteChange = async (value: boolean) => {
        if (!poke.name || !isSignedIn) return;

        try {
            setIsStarButtonChecked(value);

            const token = await getToken();

            if (!token) {
                setIsStarButtonChecked(false);
                return;
            }

            await FavoriteService.setFavorite(token, poke.name, value);
        } catch (error) {
            console.error(error);
            setIsStarButtonChecked((prev) => !prev);
        }
    };

    return (
        <div
            className={styles.PokeListRow}
            tabIndex={tabIndex}
            onClick={goToDetailsFn}
        >
            <div className={`${styles.PokemonListRowPortaitWrapper} ${styles.shimmer}`}>
                {!isFavoriteLoading && (
                    <StarBox
                        isCheckedState={isStarButtonChecked}
                        isCheckedStateChange={onFavoriteChange}
                    />
                )}

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

            <SubtitleButtonBox
                text={StringUtils.capitalize(poke.name ?? "")}
                onClick={goToDetailsFn}
            />
        </div>
    );
}

export default PokemonListRow;