import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PokemonListRow from "./PokemonListRow";

describe("PokemonListRow", () => {
    it("redirige vers la page détail au clic", async () => {
        const poke = {
            name: "pikachu",
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

        userEvent.click(screen.getByText("pikachu"));

        expect(screen.getByText("Page détail Pokémon")).toBeInTheDocument();
    });
});