import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PokemonService } from "../../services/PokemonService";
import { FavoriteService } from "../../services/FavoriteService";
import { StringUtils } from "../../utils/StringUtils";
import StarBox from "../global/StarBox/StarBox";
import Card from "../global/Card/Card";
import ImageFrame from "../global/ImageFrame/ImageFrame";
import styles from "./PokemonPage.module.css";

function PokemonPage() {
    const { name } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["pokemon", name],
        queryFn: () => PokemonService.getByName(name!),
        enabled: !!name,
    });

    const [isFavState, setIsFavState] = useState(false);

    useEffect(() => {
        if (!name) return;
        setIsFavState(FavoriteService.isFavorite(name));
    }, [name]);

    const toggle = (value: boolean) => {
        if (!name) return;
        setIsFavState(value);
        FavoriteService.setFavorite(name, value);
    };

    if (isLoading) return <div>Chargement...</div>;
    if (isError) return <div>Erreur</div>;

    return (
        <Card className={styles.PokemonPage}>
            <div className="FlexSpaced">
                <h1>{StringUtils.capitalize(name)}</h1>
                <StarBox isCheckedState={isFavState} isCheckedStateChange={toggle} />
            </div>
            <ImageFrame src={data?.sprites.front_default ?? ""} />
        </Card>
    );
}

export default PokemonPage;