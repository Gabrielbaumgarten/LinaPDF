import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from'./Paginas/Home/index.js'
import JuntarPDFPage from './Paginas/JuntarPDF/index.js'
import ComprimirPDFPage from './Paginas/ComprimirPDF/index.js';
import PesquisarPDFPage from './Paginas/PesquisarPDF/index.js';
import PDFtoJPGPage from './Paginas/PDFtoJPG/index.js';
import DividirPDFPage from './Paginas/DividirPDF/index.js';

/* 
  Aqui são definadas as rotas para as outra páginas junto com suas urls

  IMPORTANTE: Lembre de importar a página que você dejesa que ela apareça
*/
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component = {MainPage} />
      <Route exact path='/JuntarPDF' component = {JuntarPDFPage} />
      <Route exact path='/ComprimirPDF' component = {ComprimirPDFPage} />
      <Route exact path='/PesquisarPDF' component = {PesquisarPDFPage} />
      <Route exact path='/PDFtoJPG' component = {PDFtoJPGPage} />
      <Route exact path='/DividirPDF' component = {DividirPDFPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
