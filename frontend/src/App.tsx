import { Routes, Route, Link } from 'react-router-dom';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/react';
import FavoritesPage from './routes/favorites/page';
import AccueilPage from './routes/page';
import PokemonDetailsPage from './routes/pokemon/id/page';
import PokemonListPage from './routes/pokemon/page';
import SignInPage from './routes/sign-in/page';
import ProtectedRoute from './components/global/ProtectedRoute/ProtectedRoute';

function App() {
  const { isSignedIn } = useAuth();

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md">
        <div className="text-xl font-bold">
          <Link to="/">Pokedex</Link>
        </div>

        <nav className="flex gap-6">
          <Link className="hover:text-yellow-400 transition" to="/">
            Accueil
          </Link>
          <Link className="hover:text-yellow-400 transition" to="/pokelist">
            Pokelist
          </Link>
          <Link className="hover:text-yellow-400 transition" to="/favorites">
            Favoris
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button className="px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition">
                  Se connecter
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="px-4 py-2 border border-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition">
                  S'inscrire
                </button>
              </SignUpButton>
            </>
          ) : (
            <UserButton />
          )}
        </div>
      </header>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<AccueilPage />} />
          <Route path="/sign-in" element={<SignInPage />} />

          <Route
            path="/pokelist"
            element={
              <ProtectedRoute>
                <PokemonListPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pokemon/:name"
            element={
              <ProtectedRoute>
                <PokemonDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;