import React, { useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Search(props) {
  const [search, setSearch] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.getPokemon(search.toLocaleLowerCase())
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", width: "50vw", ml: "25%" }} >
      <TextField
        InputLabelProps={{ required: false }}
        margin="normal"

        fullWidth
        id="code"
        label="Nombre de Pokemón"
        name="code"
        type="text"
        inputProps={{ maxLength: 16 }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        color="primary"
        type="submit"
        variant="contained"
        disableElevation
        sx={{ mb: 1, ml: 1, mt: 2, height: "55px" }}
      >
        Buscar
      </Button>
    </Box>
  );
}