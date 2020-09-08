import React, { useState, useEffect } from 'react';
import DataTable            from "../Componentes/DataTable"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddBox';
import { Link} from "react-router-dom";
import {
    Container,
    Tooltip,
    Fab,
    IconButton
} from "@material-ui/core";
import Message from '../Componentes/Message';


export const ListaProductos = () =>
{

    const [mensaje, setMensaje] = useState(false);
    const [tipoLabel, setTipoLabel] = useState("info");
    const [openCollapse, setOpenCollapse] = useState(false);

    const [productos, setProductos] = useState([])
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
                    <Link to={{pathname: `/edit/${props.row.id}`}} style={{ paddingTop: 5 }}>
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
    
    const deleteProducto = (id) => {    
        
        window.fetch('https://localhost:44355/api/Productos/'+id, {
        method: "DELETE"
        })
        .then(response => {console.log('response: '+JSON.stringify(response))})
        .finally(function()
            {
                setMensaje('Eliminado correctamente');
                setOpenCollapse(true)
                setTipoLabel("success");
                setTimeout(() => obtenerDatos(), 3000);
            }
        )
    }

               
    useEffect(function () {
            obtenerDatos();
    },[])
        

     const obtenerDatos = async () => {  
        setMensaje(false);  
        fetch('https://localhost:44355/api/Productos')
        .then(res => res.json())
        .then(response => {
                            setProductos(response)
                            if(response.length === 0)
                            {
                                setMensaje('No existen datos');
                                setOpenCollapse(true)
                                setTipoLabel("info");     
                            }
                                
                        })
     }
       

    return(
        <Container>
        <Link to="/create">
                        <Tooltip title="Nuevo" placement="right" aria-label="add">
                            <Fab style={{ color: "white", backgroundColor: "black", height: "40px", width: "40px" }}>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
        </Link>
        {mensaje && (
                        <Message tipoLabel={tipoLabel} openCollapse={openCollapse} mensaje={mensaje} setOpenCollapse={setOpenCollapse} />
                    )}        

            {productos &&
                productos.length > 0 ? (
                    <DataTable pagination="true" dataRows={productos} columns={columns} />
            ) : null}    
        </Container> 
        )
}