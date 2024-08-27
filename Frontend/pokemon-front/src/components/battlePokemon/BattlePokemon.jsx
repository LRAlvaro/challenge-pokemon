import { useState, useEffect } from "react";
import { Grid, Box, Typography, Paper, Button } from "@mui/material";
import StatsBar from "./StatsPokemon";
import { styles } from "./BattlePokemon.styles";
import { battlePokemon } from "../../services/api";

export default function BattlePokemon({ selectedPokemon, pokemons }) {
  const [randomPokemon, setRandomPokemon] = useState([]);
  const [winner, setWinner] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [battleStarted, setBattleStarted] = useState(false);

  const handleClick = () => {
    if (selectedPokemon.id) {
      const otherPokemons = pokemons.filter(
        (pokemon) => pokemon.id !== selectedPokemon.id
      );
      const randomIndex = Math.floor(Math.random() * otherPokemons.length);
      const chosenPokemon = otherPokemons[randomIndex];
      setRandomPokemon(chosenPokemon);
      setBattleStarted(true);
      setCountdown(3);
      setWinner("");
    } else {
      alert("Primero escoge un pokemon");
    }
  };

  const fightPokemon = async () => {
    if (randomPokemon && selectedPokemon.id) {
      try {
        const result = await battlePokemon(
          selectedPokemon.id,
          randomPokemon.id
        );

        if (result) {
          setWinner(result.winner.name);
        } else {
          console.error("Error: No se pudo determinar el ganador.");
        }
      } catch (error) {
        console.error("Error en la batalla:", error);
      }
    } else {
      console.error("Error: Pokémon no seleccionado");
    }
  };

  useEffect(() => {
    let timer;
    if (battleStarted && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !winner) {
      fightPokemon();
    }
    return () => clearTimeout(timer);
  }, [battleStarted, countdown, winner]);

  return (
    <>
      {battleStarted && (
        <Box
          sx={{
            ...styles.winnerContainer,
          }}
        >
          <Typography fontWeight={"bold"} variant="h6" sx={{ ml: 3 }}>
            {countdown > 0
              ? `La batalla comenzará en ${countdown}...`
              : winner
              ? `¡${winner} es el ganador!`
              : "Preparando batalla..."}
          </Typography>
        </Box>
      )}

      <Grid
        container
        spacing={3}
        sx={{
          ...styles.pokemonContainer,
        }}
      >
        <Grid item xs={12} md={5} sx={{ ...styles.cardPokemon }}>
          {selectedPokemon.id ? (
            <Paper elevation={5} sx={{ height: "95%" }}>
              <img
                src={selectedPokemon.imageUrl}
                style={{ height: "45%", borderRadius: "8px" }}
              />
              <Grid sx={{ display: "flex", ml: 1.5 }}>
                <Typography variant="h6" fontWeight={"bold"}>
                  {selectedPokemon.name}
                </Typography>
              </Grid>

              <Box
                sx={{
                  ...styles.separativeLine,
                }}
              ></Box>
                <StatsBar statName="HP"statValue={selectedPokemon.hp}></StatsBar>
                <StatsBar statName="Attack" statValue={selectedPokemon.attack}></StatsBar>
                <StatsBar statName="Defense"statValue={selectedPokemon.defense}></StatsBar>
                <StatsBar statName="Speed"statValue={selectedPokemon.speed}></StatsBar>
            </Paper>
          ) : (
            <Paper elevation={5} sx={{ height: "95%" }}>
              <img
                src="././public/images/whothatpokemon.jpg"
                style={{ width: "100%", height: "100%", borderRadius: "8px" }}
              />
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={2} sx={{ ...styles.buttonBattle }}>
          <Button
            onClick={handleClick}
            color="success"
            variant="contained"
            sx={{ width: "100%", textTransform: "none", fontSize: "18px" }}
          >
            Empezar Batalla
          </Button>
        </Grid>

        <Grid item xs={12} md={5} sx={{ ...styles.cardPokemon }}>
          {battleStarted && randomPokemon.id ? (
            <Paper elevation={5} sx={{ height: "95%" }}>
              <img
                src={randomPokemon.imageUrl}
                style={{ height: "45%", borderRadius: "8px" }}
              />
              <Grid sx={{ display: "flex", marginLeft: 1.5 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {randomPokemon.name}{" "}
                </Typography>
              </Grid>

              <Box
                sx={{
                  ...styles.separativeLine,
                }}
              ></Box>

              <StatsBar statName="HP" statValue={randomPokemon.hp}></StatsBar>
              <StatsBar statName="Attack"statValue={randomPokemon.attack}></StatsBar>
              <StatsBar statName="Defense"statValue={randomPokemon.defense}></StatsBar>
              <StatsBar statName="Speed"statValue={randomPokemon.speed}></StatsBar>
            </Paper>
          ) : (
            <Paper elevation={5} sx={{ height: "95%" }}>
              <img
                src="././public/images/whothatpokemon.jpg"
                style={{ width: "100%", height: "100%", borderRadius: "8px" }}
              />
            </Paper>
          )}
        </Grid>
      </Grid>
    </>
  );
}
