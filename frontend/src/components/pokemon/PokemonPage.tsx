import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { PokemonService } from "../../services/PokemonService";
import { FavoriteService } from "../../services/FavoriteService";
import { StringUtils } from "../../utils/StringUtils";
import StarBox from "../global/StarBox/StarBox";
import Card from "../global/Card/Card";
import ImageFrame from "../global/ImageFrame/ImageFrame";

function getStatBarColor(stat: number) {
    const thresholds = [
        { max: 30, color: "bg-green-400" },
        { max: 50, color: "bg-green-500" },
        { max: 70, color: "bg-lime-500" },
        { max: 90, color: "bg-yellow-400" },
        { max: 110, color: "bg-yellow-500" },
        { max: 130, color: "bg-orange-400" },
        { max: 150, color: "bg-orange-500" },
        { max: 180, color: "bg-red-500" },
    ];

    return thresholds.find(t => stat < t.max)?.color ?? "bg-red-700";
}
function PokemonPage() {
    const { name } = useParams();
    const { getToken, isSignedIn } = useAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["pokemon", name],
        queryFn: () => PokemonService.getByName(name!),
        enabled: !!name,
    });

    const [isFavState, setIsFavState] = useState(false);
    const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

    useEffect(() => {
        async function loadFavoriteState() {
            if (!name || !isSignedIn) {
                setIsFavState(false);
                return;
            }

            setIsFavoriteLoading(true);

            try {
                const token = await getToken();

                if (!token) {
                    setIsFavState(false);
                    return;
                }

                const favorites = await FavoriteService.getAll(token);
                setIsFavState(favorites.includes(name));
            } catch (error) {
                console.error(error);
                setIsFavState(false);
            } finally {
                setIsFavoriteLoading(false);
            }
        }

        loadFavoriteState();
    }, [name, isSignedIn, getToken]);

    const toggle = async (value: boolean) => {
        if (!name || !isSignedIn) return;

        try {
            setIsFavState(value);

            const token = await getToken();

            if (!token) {
                setIsFavState(false);
                return;
            }

            await FavoriteService.setFavorite(token, name, value);
        } catch (error) {
            console.error(error);
            setIsFavState((prev) => !prev);
        }
    };

    if (isLoading) return <div className="p-6">Chargement...</div>;
    if (isError || !data) return <div className="p-6">Erreur</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <Card className="p-6 rounded-2xl shadow-lg">
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                        <p className="text-sm text-gray-500">#{data.id}</p>
                        <h1 className="text-4xl font-extrabold">
                            {StringUtils.capitalize(name)}
                        </h1>
                    </div>

                    {!isFavoriteLoading && (
                        <StarBox
                            isCheckedState={isFavState}
                            isCheckedStateChange={toggle}
                        />
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <ImageFrame src={data.sprites.front_default ?? ""} />
                        {data.sprites.front_shiny && (
                            <div className="text-center">
                                <p className="text-sm text-gray-500 mb-2">Version shiny</p>
                                <ImageFrame src={data.sprites.front_shiny} />
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <section>
                            <h2 className="text-xl font-bold mb-2">Types</h2>
                            <div className="flex gap-2 flex-wrap">
                                {data.types?.map((typeItem: any) => (
                                    <span
                                        key={typeItem.type.name}
                                        className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 font-semibold"
                                    >
                                        {StringUtils.capitalize(typeItem.type.name)}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section>

                            <h2 className="text-xl font-bold mb-2">Informations</h2>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="p-3 rounded-xl bg-gray-50">
                                    <p className="text-gray-500">Taille</p>
                                    <p className="font-semibold text-black">{(data.height ?? 0) / 10} m</p>
                                </div>

                                <div className="p-3 rounded-xl bg-gray-50">
                                    <p className="text-gray-500">Poids</p>
                                    <p className="font-semibold text-black">{(data.weight ?? 0) / 10} kg</p>
                                </div>

                                <div className="p-3 rounded-xl bg-gray-50 col-span-2">
                                    <p className="text-gray-500">Capacités</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {data.abilities?.map((abilityItem: any) => (
                                            <span
                                                key={abilityItem.ability.name}
                                                className="px-2 py-1 rounded-lg bg-blue-100 text-blue-900"
                                            >
                                                {StringUtils.capitalize(
                                                    abilityItem.ability.name.replace("-", " "),
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <section className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Statistiques</h2>

                    <div className="space-y-3">
                        {data.stats?.map((statItem: any) => (
                            <div key={statItem.stat.name}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium">
                                        {StringUtils.capitalize(statItem.stat.name.replace("-", " "))}
                                    </span>
                                    <span>{statItem.base_stat}</span>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <div
                                        className={`h-3 rounded-full ${getStatBarColor(statItem.base_stat)}`}
                                        style={{ width: `${Math.min(statItem.base_stat / 1.5, 100)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </Card>
        </div>
    );
}

export default PokemonPage;