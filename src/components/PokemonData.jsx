import React from "react";
import { useEffect } from "react";
import { Card, Typography } from "@mui/material";
import {
    DataGrid,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";

//columnas de stats
const columns = [
    {
        field: "stat",
        headerName: "Estadística",
        minWidth: 60,
        flex: 1,
        sortable: false,
        headerAlign: "left",
        align: "left",
        renderCell: (params) => (
            <p>{params.value}</p>
        ),
    },
    {
        field: "value",
        headerName: "Valor",
        minWidth: 60,
        headerAlign: "left",
        align: "left",
        type: "number",
        flex: 1,
    },
];

export default function PokemonData(props) {
    const { stats, name, sprite } = props;
    const [statsGrid, setStatsGrid] = React.useState([{ id: 1, hp: 1 }])

    //Asigna id y carga fila de stat con su valor
    useEffect(() => {
        let idNumber = 1
        const statsTable = stats.map((stat) => {
            let increment = idNumber++
            switch (stat.stat.name) {
                case ("hp"):
                    return ({ id: increment, stat: "HP", value: stat.base_stat });
                case ("attack"):
                    return ({ id: increment, stat: "Ataque", value: stat.base_stat });
                case ("defense"):
                    return ({ id: increment, stat: "Defensa", value: stat.base_stat });
                case ("special-attack"):
                    return ({ id: increment, stat: "Ataque Especial", value: stat.base_stat });
                case ("special-defense"):
                    return ({ id: increment, stat: "Defensa Especial", value: stat.base_stat });
                case ("speed"):
                    return ({ id: increment, stat: "Velocidad", value: stat.base_stat });
                default: return ({ id: increment, stat: stat.stat.name, value: stat.base_stat });
            }
        });
        setStatsGrid(statsTable)
    }, []);

    return (
        <Card sx={{
            width: '50vw', maxWidth: "500px", mt: 2, backgroundColor: '#f7f7f7', position: "absolute",
            ml: "auto",
            mr: "auto",
            left: 0,
            right: 0,
            textAlign: "center"
        }}>
            <Typography variant="h5" >
                {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
            </Typography>
            <Box
                component="img"
                sx={{
                    height: "10em",
                    width: { xs: "90%", sm: "70%", md: "60%" },
                }}
                src={sprite} alt={name}
            />
            <DataGrid
                rows={statsGrid}
                columns={columns}
                autoHeight
                hideFooter={true}
            />
        </Card>
    );
}