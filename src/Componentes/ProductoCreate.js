import React, { useState, useEffect, useRef } from "react";
import {
    Container,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Icon,
    Grid,
    Box,    
    Select,
    MenuItem,
    Typography,
    Breadcrumbs,
    withStyles,
    Tooltip,
    Fab
} from "@material-ui/core";
//import LabelInformacion from "../Common/LabelInformation";
//import { infoCookies, cookieControl, putApi, getApi, ID_SISTEMA_PEDENV, URL_API_SEGURIDADWEB,URL_API_CORE,URL_API_CONFIGURACION, postApi } from "../HttpHelper";
//import Loading from "../Common/Loading";
import { Link } from 'react-router-dom';
//import {connect} from 'react-redux'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const ProductoCreate = props => {

    const { pages } = props; 
    
    //const idProductoProps = JSON.stringify(props.match.params.id);
    const [nombre, setNombre] = useState(null);
    const [marca, setMarca] = useState(null);
    const [costo, setCosto] = useState(null);
    const [precio, setPrecio] = useState(null);
    //const [idProductoP, setidProductoP] = useState(idProductoP);
    
    //const [mensaje, setMensaje] = useState(false);
    const [tipoLabel, setTipoLabel] = useState("info");
    //const [loading, setLoading] = useState(false)
    

     const createProducto = () => {    
    
    if(nombre){    
                if (nombre === null || nombre === undefined || nombre.trim().length === 0) {
                    alert("Debe ingresar un nombre");
                    return false;
                }   
    } 
    else{
        alert("Debe ingresar un nombre");
        return false;
    }

    if(marca){    
        if (marca === null || marca === undefined || marca.trim().length === 0) {
            alert("Debe ingresar una marca");
            return false;
        }   
    }
    else{
        alert("Debe ingresar una marca");
            return false;
        }
    
    if(precio){    
            if (precio === null || precio === undefined || precio.trim().length === 0) {
                alert("Debe ingresar un precio");
                return false;
            }   
    }
    else{
        alert("Debe ingresar un precio");
        return false;
    }
    
    if(costo){    
                if (costo === null || costo === undefined || costo.trim().length === 0) {
                    alert("Debe ingresar un costo");
                    return false;
                }   
    }
    else{
        alert("Debe ingresar un costo");
        return false;
    }
  

    if(parseFloat(precio) < parseFloat(costo)){
        alert("El precio no puede ser menor que el costo");
        return false;
            
    }
    

    let body = JSON.stringify({
        Id: 0,
        Nombre: nombre.trim(),
        Marca: marca.trim(),
        IdMarca: 0,
        Costo: costo? parseFloat(costo) : 0,
        Precio: precio? parseFloat(precio) : 0,
    })

    console.log('body: '+ body)
   
    window.fetch('https://localhost:44355/api/Productos', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: body
      })
      .then(res => res.json())
      .then(response => {console.log('response: '+JSON.stringify(response))})
    }


    return (
        <Container>
            <Breadcrumbs separator={<Icon fontSize="small"></Icon>}>
            <Typography variant="h6" style={{fontFamily:"cursive"}} color="textPrimary">{" "} 
                Nuevo Producto 
            </Typography>
            <Link to="/">
                        <Tooltip title="Volver" placement="right" aria-label="add">
                            <Fab style={{ color: "white", backgroundColor: "black", height: "40px", width: "40px" }}>
                                <ArrowBackIcon />
                            </Fab>
                        </Tooltip>
                    </Link>            
            </Breadcrumbs>
                <Grid container spacing={0} direction="row"
                    style={{
                        marginTop: 15
                    }}>
                    {/* {mensaje && (
                    <Grid container direction="row" justify="center" alignItems="center" >
                        <LabelInformacion tipoLabel={tipoLabel} openCollapse={openCollapse} mensaje={mensaje} setOpenCollapse={setOpenCollapse} />
                    </Grid>
                    )}         */}
                    <Grid style={{ marginTop: 15 }} container xs={12} justify="center" alignItems="center" >
                        <Grid item sm={12} style={{ paddingLeft: 40,paddingRight: 40 }}>
                            <TextField
                                label="Nombre"
                                style={{
                                    width: "100%"
                                }}
                                value={nombre}
                                onChange={event => setNombre(event.target.value)}
                                inputMode="text"
                                required
                            />
                        </Grid>

                        <Grid item sm={12} style={{ paddingLeft: 40,paddingRight: 40 }}>
                            <TextField
                                label="Marca"
                                style={{
                                    width: "100%"
                                }}
                                value={marca}
                                onChange={event => setMarca(event.target.value)}
                                inputMode="text"
                                required
                            />
                        </Grid>

                        <Grid item sm={12} style={{ paddingLeft: 40,paddingRight: 40 }}>
                            <TextField
                                label="Costo"
                                style={{
                                    width: "100%"
                                }}
                                value={costo}
                                onChange={event => setCosto(event.target.value)}
                                inputMode="numeric"
                                required
                            />
                        </Grid>

                        <Grid item sm={12} style={{ paddingLeft: 40,paddingRight: 40 }}>
                            <TextField
                                label="Precio"
                                style={{
                                    width: "100%"
                                }}
                                value={precio}
                                onChange={event => setPrecio(event.target.value)}
                                inputMode="numeric"
                                required
                            />
                        </Grid>
                        
                        <Grid container item xs={12} direction="row" alignItems="center" justify="center" style={{paddingTop: 50 }}>
                            <Button
                                    color="primary"
                                    style={{width: "92%" }}
                                    //disabled={loading}
                                    variant="contained"
                                    type="submit"
                                    onClick={() => { createProducto()}}
                            >
                             GRABAR
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
        </Container>
    )
}
export default ProductoCreate; 