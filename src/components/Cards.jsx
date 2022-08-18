import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Card, Fab, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';

//columnas de tabla de stats
const columns = [
  {
    field: 'stat',
    headerName: 'Estadística',
    minWidth: 60,
    flex: 1,
    sortable: false,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => <p>{params.value}</p>,
  },
  {
    field: 'value',
    headerName: 'Valor',
    minWidth: 60,
    align: 'left',
    headerAlign: 'left',
    type: 'number',
    flex: 1,
  },
];

export default function Cards(props) {
  //información de pokemon seleccionado.
  //se pusieron valores por defecto para evitar errores
  const [clickedCard, setClickedCard] = useState({
    name: 'charmander',
    stats: [
      {
        base_stat: 39,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/',
        },
      },
    ],
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  });
  //array con stats para mapear y representar en tabla
  const [statsGrid, setStatsGrid] = React.useState([{ id: 1, hp: 1 }]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  function clickOnCardAction(cardInfo) {
    setClickedCard(cardInfo);
    setOpen(true);
  }

  //cada que se clickea en nueva carta setea los datos de pokemon seleccionado
  useEffect(() => {
    let idNumber = 1;
    const statsTable = clickedCard.stats.map((stat) => {
      let increment = idNumber++;
      switch (stat.stat.name) {
        case 'hp':
          return { id: increment, stat: 'HP', value: stat.base_stat };
        case 'attack':
          return { id: increment, stat: 'Ataque', value: stat.base_stat };
        case 'defense':
          return { id: increment, stat: 'Defensa', value: stat.base_stat };
        case 'special-attack':
          return {
            id: increment,
            stat: 'Ataque Especial',
            value: stat.base_stat,
          };
        case 'special-defense':
          return {
            id: increment,
            stat: 'Defensa Especial',
            value: stat.base_stat,
          };
        case 'speed':
          return { id: increment, stat: 'Velocidad', value: stat.base_stat };
        default:
          return { id: increment, stat: stat.stat.name, value: stat.base_stat };
      }
    });
    setStatsGrid(statsTable);
  }, [clickedCard]);

  //mapeo para renderizar las cartas de pokemons en página actual
  const tarjetas = props.props.map((cardInfo) => {
    var typeColor = '';
    var typeColor2 = '';

    //setea el color de el primer tipo del pokemon
    switch (cardInfo.type1) {
      case 'grass':
        var typeColor = '#04c410';
        break;
      case 'fire':
        var typeColor = 'red';
        break;
      case 'water':
        var typeColor = '#0e87cc';
        break;
      case 'bug':
        var typeColor = 'green';
        break;
      case 'poison':
        var typeColor = 'purple';
        break;
      case 'electric':
        var typeColor = '#ffbf00';
        break;
      case 'ground':
        var typeColor = '#b69f66';
        break;
      case 'fairy':
        var typeColor = 'pink';
        break;
      case 'fighting':
        var typeColor = '#b30805';
        break;
      case 'psychic':
        var typeColor = '#fc03f0';
        break;
      case 'rock':
        var typeColor = '#591e01';
        break;
      case 'ghost':
        var typeColor = 'purple';
        break;
    }

    //setea el color del segundo pokemon
    switch (cardInfo.type2) {
      case 'grass':
        var typeColor2 = '#04c410';
        break;
      case 'fire':
        var typeColor2 = 'red';
        break;
      case 'water':
        var typeColor2 = '#0e87cc';
        break;
      case 'bug':
        var typeColor2 = 'green';
        break;
      case 'poison':
        var typeColor2 = 'purple';
        break;
      case 'electric':
        var typeColor2 = '#ffbf00';
        break;
      case 'ground':
        var typeColor2 = '#b69f66';
        break;
      case 'fairy':
        var typeColor2 = 'pink';
        break;
      case 'fighting':
        var typeColor2 = '#b30805';
        break;
      case 'psychic':
        var typeColor2 = '#fc03f0';
        break;
      case 'rock':
        var typeColor2 = '#591e01';
        break;
      case 'ghost':
        var typeColor2 = 'purple';
        break;
    }
    return (
      <Card
        key={cardInfo.name}
        sx={{
          flex: 1,
          backgroundColor: 'rgba(240,240,240, 0.92)',
          minWidth: '220px',
          transition: 'background 0.7s, transform 0.8s, color 0.7s',
          '&:hover': {
            backgroundColor: '#808080',
            color: '#fff',
            transform: 'scale(1.07)',
          },
        }}
        onClick={() => clickOnCardAction(cardInfo)}
      >
        <Typography variant="h5" component="div">
          {cardInfo.name.charAt(0).toUpperCase() + cardInfo.name.slice(1)}
        </Typography>
        <Box
          component="img"
          sx={{
            height: '10em',
            width: { xs: '200px' },
          }}
          src={cardInfo.sprite}
          alt={cardInfo.name}
        />
        <Fab
          variant="extended"
          sx={{
            background: typeColor,
            m: 1,
            '&:hover': {
              backgroundColor: typeColor,
              color: '#fff',
              transform: 'scale(1.07)',
            },
          }}
        >
          {cardInfo.type1}
        </Fab>
        {cardInfo.type2 ? (
          <Fab
            variant="extended"
            sx={{
              background: typeColor2,
              m: 1,
              '&:hover': {
                backgroundColor: typeColor2,
                color: '#fff',
                transform: 'scale(1.07)',
              },
            }}
          >
            {cardInfo.type2}
          </Fab>
        ) : null}
      </Card>
    );
  });

  return (
    <Box>
      <Box sx={{ my: 2, display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {tarjetas}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" component="div">
            {clickedCard.name.charAt(0).toUpperCase() +
              clickedCard.name.slice(1)}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Box component="img" src={clickedCard.sprite} alt={'image'} />

          <DialogContentText id="alert-dialog-description">
            <DataGrid
              rows={statsGrid}
              columns={columns}
              autoHeight
              hideFooter={true}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
