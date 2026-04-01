import { Routes, Route, Link } from 'react-router-dom';
import PokeList from './components/pokemon/PokemonList';
import PokemonPage from './components/pokemon/PokemonPage';

function Home() {
  return <div><h1>Accueil</h1><p>Bienvenue dans l'almanach des Pokemons !</p></div>;
}

function App() {
  return (
    <main>
      <nav>
        <Link to="/">Accueil</Link> | <Link to="/pokelist">Pokelist</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokelist" element={<PokeList />} />
        <Route path="/pokemon/:name" element={<PokemonPage />} />
      </Routes>
    </main>
  );
}

export default App;