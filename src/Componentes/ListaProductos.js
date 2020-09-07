import React, { useState, useEffect } from 'react';
import DataTable            from "../Componentes/DataTable"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddBox';
import { Link} from "react-router-dom";
//import { confirmAlert } from 'react-confirm-alert';
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
    Fab,
    IconButton
} from "@material-ui/core";


    //import { Link } from 'react-router-dom';

export const ListaProductos = () =>
{
    const [productos, setProductos] = useState([])
    //const [loading, setLoading] = useState (false)

   

    const columns = [
                    { 
                        id: "id",
                        label: "",
                        type: "component",
                        event: registro  => <ComponenteAcciones row={registro} />
                    },
                    { id: "nombre", label: "Nombre", type: "text" },
                    { id: "marca", label: "Marca", type: "text" },
                    { id: "costo", label: "Costo", type: "text" },
                    { id: "precio", label: "Precio", type: "text" }
            ];

            const ComponenteAcciones = props => {
                return (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >   
                    
                        <Tooltip title="Editar" placement="top">
                            <Link to={{pathname: `/Productos/${props.row.id}/Edit`}} style={{ paddingTop: 5 }}>
                                <EditIcon style={{ color: "black" }}/>
                            </Link>
                        </Tooltip>
                    
                        <Tooltip title="Eliminar" placement="top">
                                <IconButton onClick={()=> deleteProducto(props.row.id)} 
                                style={{color:"red"}}>
                                    <DeleteIcon />
                               </IconButton>     
                        </Tooltip>  
                    </div>
                );
            };
    
            // const Eliminar = (id) => {
            //     confirmAlert({
            //         title: 'Eliminar',
            //         message: '¿Desea eliminar el Producto?',
            //         buttons: [
            //             {
            //                 label: 'Si',
            //                 onClick: () => Alery(id)
            //             },
            //             {
            //                 label: 'No'
            //             }
            //         ]
            //     })
            // };

            const deleteProducto = (id) => {    
                console.log('id: ' + id)
            window.fetch('https://localhost:44355/api/Productos/'+id, {
                method: "DELETE"
                // headers: {
                //   Accept: "application/json",
                //   "Content-Type": "application/json"
                // }
              })
              .then(res => res.json())
              .then(response => {console.log('response: '+response)})
            }

            // const deleteProducto = (id) => {
            //     setMensaje("")
            //     setLoading(true)
            //     let url = `${URL_API_CONFIGURACION}/api/config/${config.idConfigCab}`;
            //     deleteApi(url)
            //         .then(([statusCode, response]) => {
            //             if (statusCode === 200) {
            //                 setMensaje("Configuracion eliminada correctamente")
            //                 setTipoLabel("ok")
            //                 let copy = [...objconfiguracion]
            //                 let index = copy.indexOf(config);
            //                 copy.splice(index, 1);
            //                 if (index !== 0) {
            //                     for (let i = 0, length = copy.length; i < length; i++) {
            //                         copy[i].numero = length - i;
            //                     }
            //                 }
            //                 setObjconfiguracion(copy)
            //             } else if (statusCode === 404) {
            //                 setMensaje(response.mensaje)
            //                 setTipoLabel("error")
            //             }
            //         })
            //         .catch((error) => {
            //             setLoading(false)
            //             setMensaje(error);
            //             setTipoLabel("error");
            //         })
            //     setLoading(false)
            // }        
        
    useEffect(function ()
        {
            window.fetch('https://localhost:44355/api/Productos')
            .then(res => res.json())
            .then(response => {setProductos(response)})
        },[])
  
    return(
        <Container>
        <Link to="/create">
                                <Tooltip title="Nuevo" placement="right" aria-label="add">
                                    <Fab style={{ color: "white", backgroundColor: "black", height: "40px", width: "40px" }}>
                                        <AddIcon />
                                    </Fab>
                                </Tooltip>
        </Link>    
            {productos &&
                productos.length > 0 ? (
                    <DataTable pagination="true" dataRows={productos} columns={columns} />
            ) : null}    
        </Container> 
        )
}