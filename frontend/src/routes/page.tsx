import { Link } from "react-router-dom";
import pokemonGif from "../assets/images/pokemon.gif";

function AccueilPage() {
    return (
        <div className="flex flex-col items-center justify-center text-center gap-6 mt-12">

            {/* Titre */}
            <h1 className="text-4xl font-extrabold">
                Bienvenue dans ton <span className="text-yellow-400">Pokedex</span> ⚡
            </h1>

            {/* Description */}
            <p className="text-gray-600 max-w-md">
                Explore les Pokémons, consulte leurs détails et crée ta liste de favoris.
            </p>

            {/* Boutons */}
            <div className="flex gap-4">
                <Link
                    to="/pokelist"
                    className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition"
                >
                    Voir les Pokémons
                </Link>

                <Link
                    to="/favorites"
                    className="px-6 py-3 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition"
                >
                    Mes favoris
                </Link>
            </div>

            {/* Petite touche visuelle */}
            <img src={pokemonGif} alt="pokemon" className="rounded-xl shadow-xl transition transform hover:scale-105 hover:shadow-2xl" />
        </div>
    );
}

export default AccueilPage;