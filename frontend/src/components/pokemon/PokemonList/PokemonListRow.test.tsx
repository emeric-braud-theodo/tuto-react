import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PokemonListRow from "./PokemonListRow";
import { FavoriteService } from "../../../services/FavoriteService";

describe("PokemonListRow", () => {
    it("redirige vers la page détail au clic", async () => {
        const poke = {
            name: "Pikachu",
            sprites: {
                front_default: "https://example.com/pikachu.png",
                front_shiny: "https://example.com/pikachu.png",

            },
        };

        render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route
                        path="/"
                        element={<PokemonListRow poke={poke} tabIndex={0} />}
                    />
                    <Route
                        path="/pokemon/:name"
                        element={<div>Page détail Pokémon</div>}
                    />
                </Routes>
            </MemoryRouter>
        );

        userEvent.click(screen.getByText("Pikachu"));

        expect(screen.getByText("Page détail Pokémon")).toBeInTheDocument();
    });
});


jest.mock("../../../services/FavoriteService", () => ({
    FavoriteService: {
        isFavorite: jest.fn(),
        setFavorite: jest.fn(),
    },
}));

it("met à jour visuellement le bouton après ajout en favori", async () => {
    (FavoriteService.isFavorite as jest.Mock).mockReturnValue(false);

    const poke = {
        name: "Pikachu",
        sprites: {
            front_default: "https://example.com/pikachu.png",
            front_shiny: "https://example.com/pikachu-shiny.png",
        },
    };

    render(
        <MemoryRouter>
            <PokemonListRow poke={poke} tabIndex={0} />
        </MemoryRouter>
    );

    const starButton = screen.getByRole("button", {
        name: /ajouter aux favoris/i,
    });

    await userEvent.click(starButton);
    await userEvent.click(screen.getByRole("button", { name: "Oui" }));

    expect(FavoriteService.setFavorite).toHaveBeenCalledWith("Pikachu", true);

    expect(starButton).toHaveAttribute("aria-pressed", "true");
});