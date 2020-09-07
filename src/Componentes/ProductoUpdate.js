import React, { useState, useEffect} from "react";
import {
    Container,
    TextField,
    Button,
    Icon,
    Grid,
    Typography,
    Breadcrumbs,
    Tooltip,
    Fab
} from "@material-ui/core";

import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Message from '../Componentes/Message';



const ProductoUpdate = props => {
    
    const {id} = useParams()
    const [mensaje, setMensaje] = useState(false);
    const [tipoLabel, setTipoLabel] = useState("info");
    const [openCollapse, setOpenCollapse] = useState(false); 
    const [nombre, setNombre] = useState(null);
    const [marca, setMarca] = useState(null);
    const [costo, setCosto] = useState(null);
    const [precio, setPrecio] = useState(null);
    //const [productos, setProductos] = useState([]);
    

    useEffect(function ()
    {
        obtenerDatos();
    },[])
    

    const obtenerDatos = async () => {    
        fetch(`https://localhost:44355/api/Productos/${id}`)
        .then(res => res.json())
        .then(response => {
                            //setProductos(response);

                            let objResponse = {
                                id:     response.id,
                                nombre: response.nombre,
                                marca:  response.marca,
                                costo:  response.costo,
                                precio: response.precio  
                            }

                            setNombre(objResponse.nombre)
                            setMarca(objResponse.marca)
                            setCosto(objResponse.costo)
                            setPrecio(objResponse.precio)
                            
                          })
        .catch(error => {
                         console.log(error)
                        });                     
    }

   
    
    const updateProducto = async () => {    
    
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
    
    if(costo){    
            if (costo === null || costo === undefined) {
                alert("Debe ingresar un costo");
                return false;
            }   
    }
    else{
        alert("Debe ingresar un costo");
        return false;
    }    
    
    if(precio){    
            if (precio === null || precio === undefined) {
                alert("Debe ingresar un precio");
                return false;
            }   
    }
    else{
        alert("Debe ingresar un precio");
        return false;
    }
    
    if(parseFloat(precio) < parseFloat(costo)){
        alert("El precio no puede ser menor que el costo");
        return false;
            
    }
    

    let body = JSON.stringify({
        Id: parseInt(id) ,
        Nombre: nombre.trim(),
        Marca: marca.trim(),
        IdMarca: 0,
        Costo: costo? parseFloat(costo) : 0,
        Precio: precio? parseFloat(precio) : 0,
    })


   
    await fetch('https://localhost:44355/api/Productos', {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: body
      })
      .then(response => {console.log('response: '+JSON.stringify(response))})
      .finally(function()
            {
                setMensaje('Modificado correctamente');
                setOpenCollapse(true)
                setTipoLabel("success");    
            }
        )
    }


    return (
        <Container>
            <Breadcrumbs separator={<Icon fontSize="small"></Icon>}>
            <Typography variant="h6" style={{fontFamily:"cursive"}} color="textPrimary">{" "} 
                Editar Producto 
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
                    {mensaje && (
                    <Grid container direction="row" justify="center" alignItems="center" >
                        <Message tipoLabel={tipoLabel} openCollapse={openCollapse} mensaje={mensaje} setOpenCollapse={setOpenCollapse} />
                    </Grid>
                    )}      
                    <Grid style={{ marginTop: 15 }} container xs={12} justify="center" alignItems="center" >
                        <Grid item={true} sm={12} style={{ paddingLeft: 40,paddingRight: 40 }}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
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

                        <Grid item={true} sm={12} style={{ paddingLeft: 40,paddingRight: 40 }}>
                            <TextField
                            InputLabelProps={{ shrink: true }}
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

                        <Grid item={true} sm={12} style={{ paddingLeft: 40,paddingRight: 40 }}>
                            <TextField
                            InputLabelProps={{ shrink: true }}
                                label="Costo"
                                style={{
                                    width: "100%"
                                }}
                                value={costo}
                                onChange={event => setCosto(event.target.value)}
                                inputMode="numeric"
                                type="number"
                                required
                            />
                        </Grid>

                        <Grid item={true} sm={12} style={{ paddingLeft: 40,paddingRight: 40 }}>
                            <TextField
                            InputLabelProps={{ shrink: true }}
                                label="Precio"
                                style={{
                                    width: "100%"
                                }}
                                value={precio}
                                onChange={event => setPrecio(event.target.value)}
                                inputMode="numeric"
                                type="number"
                                required
                            />
                        </Grid>
                        
                        <Grid container item={true} xs={12} direction="row" alignItems="center" justify="center" style={{paddingTop: 50 }}>
                            <Button
                                    color="primary"
                                    style={{width: "92%" }}
                                    variant="contained"
                                    type="submit"
                                    onClick={() => { updateProducto()}}
                            >
                             GRABAR
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
        </Container>
    )
}
export default ProductoUpdate; 