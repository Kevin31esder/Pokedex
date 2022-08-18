import React, { useEffect, useState } from "react";
import axios from 'axios';
import PokemoData from '../components/PokemonData';
import Search from '../components/Search';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { Button, IconButton } from "@mui/material";
import Cards from "../components/Cards";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//necesario para que funcione el snackbar (aviso de pokemon no encontrado)
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function HomePage() {
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarLoading, setSnackBarLoading] = useState(false)

    const [pokemon, setPokemon] = useState();
    const [allPokemon, setAllPokemon] = useState();
    const [loading, setLoading] = useState(false);
    const [prueba, setPrueba] = useState(null);
    const [nextPage, setNextPage] = useState();
    const [previousPage, setPreviousPage] = useState();

    useEffect(() => {
        setTimeout(async () => {
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/bulbasaur`
                );
                setSnackBarLoading(true)
                setOpenSnackbar(true);
            } catch (err) {
                setOpenSnackbar(true);
            }
        }, 1000);
    }, [allPokemon]);

    //función para buscar un pokemón en específico
    const getPokemon = async (query) => {
        if (!query) {
            return;
        }
        setLoading(true);
        setTimeout(async () => {
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${query}`
                );
                const results = await response.data;
                setPokemon(results);
                setLoading(false);
            } catch (err) {
                setSnackBarLoading(false)
                setOpenSnackbar(true);
                setLoading(false);
            }
        }, 1500);
    };

    //función para llamar nombres y links de pokemons de página actual
    const getAllPokemon = async (link) => {
        try {
            const response = await axios.get(
                `${link}`
            );
            const results = await response.data;
            setNextPage(results.next)
            setAllPokemon(results.results);
            if (results.previous) {
                setPreviousPage(results.previous)
            }
        } catch (err) {
            setOpenSnackbar(true);
        }
    };

    //llamar la página número 1 de pokemons en primer render
    useEffect(() => {
        getAllPokemon("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
    }, []);

    //setea los nombres, stats e imagen de los pokemon de la página actual
    useEffect(() => {
        if (allPokemon) {
            let prueba2 = []
            const mapeoPokemons = allPokemon.map((poke) => {
                const pokeURL = poke.url;
                const makeRequest = async () => {
                    try {
                        const response = await axios.get(
                            `${pokeURL}`
                        );
                        const results = await response.data;
                        prueba2.push(
                            {
                                name: results.name,
                                stats: results.stats,
                                sprite: results.sprites.front_default,
                                type1: results.types[0].type.name,
                                type2: results.types[1]?.type.name,
                            })

                    } catch (err) {
                        setOpenSnackbar(true);
                    }
                };
                makeRequest()
                return poke
            })
            setPrueba(prueba2)
        }
    }, [allPokemon]);

    //función para cerrar el popup de aviso de pokemon no encontrado
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ p: 4, height: "100vh", }}>
            <Snackbar open={openSnackbar} autoHideDuration={snackbarLoading ? 0 : 2500} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {snackbarLoading ? "Cargando" : "No se encontró el pokemón!"}
                </Alert>
            </Snackbar>
            <Box
                component="img"
                sx={{
                    height: { xs: "4em", sm: "5em", md: "6em" },
                    width: { xs: "75vw", sm: "55vw", md: "40vw" },
                    maxWidth: "400px"
                }}
                src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokeApi"
            />
            <Search getPokemon={getPokemon} />
            {pokemon ? <Button variant="contained" color="secondary" onClick={() => setPokemon(null)}>Regresar</Button> : null}
            {!loading && pokemon ? (
                <PokemoData
                    sprite={pokemon.sprites.front_default}
                    stats={pokemon.stats}
                    name={pokemon.name}
                />
            ) : prueba ? <Cards
                props={prueba}
            /> : null}
            {!pokemon ? (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton
                        sx={{
                            mb: 1, color: "white",
                            background: "rgba(39, 148, 245, 0.9)",
                            borderRadius: 5,
                            "&:hover": {
                                backgroundColor: "rgba(39, 148, 245, 1)",
                                color: "#fff",
                                transform: "scale(1.07)"
                            }
                        }}
                        onClick={() => getAllPokemon(previousPage)}> <ArrowBackIosIcon /> Anterior </IconButton>
                    <IconButton
                        sx={{
                            mb: 1,
                            color: "white",
                            background: "rgba(39, 148, 245, 0.9)",
                            borderRadius: 5,
                            "&:hover": {
                                backgroundColor: "rgba(39, 148, 245, 1)",
                                color: "#fff",
                                transform: "scale(1.07)"
                            }
                        }}
                        onClick={() => getAllPokemon(nextPage)}> Siguiente <ArrowForwardIosIcon /> </IconButton>
                </Box>
            )
                : null}
        </Box>
    );
}