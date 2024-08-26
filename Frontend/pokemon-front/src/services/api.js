const BASE_URL = "http://localhost:3000/pokemon";

export const fetchPokemons = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error('Error fetching Pokémon data');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const battlePokemon = async (pokemon1Id, pokemon2Id) => {
    try {
        const response = await fetch("http://localhost:3000/pokemon/battle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pokemon1Id,
                pokemon2Id,
            }),
        });
        if (!response.ok) {
            throw new Error('Error en la batalla');
        }
        return await response.json();
    } catch (error) {
        console.error("Error en la batalla:", error);
        return null;
    }
};