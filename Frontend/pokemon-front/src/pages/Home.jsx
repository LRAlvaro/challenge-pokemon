import { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import { fetchPokemons } from "../services/api";
import BattlePokemon from "../components/battlePokemon/BattlePokemon";
import PokemonList from "../components/pokemonList/PokemonList";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      const data = await fetchPokemons();
      setPokemons(data);
    };

    getPokemons();
  }, []);

  return (
    <Container fixed>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Batalla Pokemon
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <PokemonList
          pokemons={pokemons}
          setSelectedPokemon={setSelectedPokemon}
        ></PokemonList>
      </Box>
      <BattlePokemon
        selectedPokemon={selectedPokemon}
        pokemons={pokemons}
      ></BattlePokemon>
    </Container>
  );
}
