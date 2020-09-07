import React from 'react';
import {ListaProductos} from './Componentes/ListaProductos'
import {
  Typography
 }  from "@material-ui/core";
  import Titulo from './Componentes/Titulo';
  import {Route, Switch, BrowserRouter as Router } from "react-router-dom";
//import { useState } from 'react';
import ProductoCreate from './Componentes/ProductoCreate';
import Test from './Componentes/Test';

function App() {
 
  return (  
    
      <Router>
          <Typography variant="h5" align="center" style={{fontFamily:"monospace"}}>
              <Titulo/>
          </Typography>
              <Switch>
                <Route path="/" exact>    
                  <ListaProductos/> 
                </Route>
                <Route path="/create" exact>
                  <ProductoCreate/>
                </Route>
                <Route path="/prueba" exact>
                  <Test/>
                </Route>
              </Switch>
      </Router>

    
         
  );
}

export default App;
