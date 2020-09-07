import React from 'react';
import {ListaProductos} from './Componentes/ListaProductos'
import {Typography}  from "@material-ui/core";
import Titulo from './Componentes/Titulo';
import {Route, Switch, BrowserRouter as Router } from "react-router-dom";
import ProductoCreate from './Componentes/ProductoCreate';
import ProductoUpdate from './Componentes/ProductoUpdate';


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
                <Route path="/edit/:id/" exact>
                  <ProductoUpdate/>
                  </Route>  
              </Switch>
      </Router>     
  );
}

export default App;
