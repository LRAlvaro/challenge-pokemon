import {
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  Container
} from "@mui/material";

export default function PokemonList({
  pokemons,
  setSelectedPokemon
}) {
  const selectPokemon = (id) => {
    const selected = pokemons.find((pokemon) => pokemon.id === id);
    setSelectedPokemon(selected)
  };

  return (
    <Container>
    <Typography textAlign='initial' variant="h5" sx={{ml: 2}}>
      Selecciona tu Pokémon
    </Typography>

    <List>
      <Grid container>
        {pokemons.map((pokemon) => (
          <Grid item xs={12} sm={6} md={2.4} key={pokemon.id}>
            <ListItem onClick={() => selectPokemon(pokemon.id)}>
              <Paper elevation={5} sx={{ padding: 2 }}>
                <Grid container>
                  <img
                    src={pokemon.imageUrl}
                    alt={pokemon.name}
                    style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                  />
                </Grid>

                <Typography fontWeight= 'bold' sx={{ mt: 1 }}>
                  {pokemon.name}
                </Typography>
              </Paper>
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </List>
  </Container>
  );
}
