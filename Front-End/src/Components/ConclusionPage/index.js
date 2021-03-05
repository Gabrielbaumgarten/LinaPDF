import React from 'react';
import './style.css';

import NavBar from '../NavBar';
import BackgroudDecoration from '../../assets/Background.svg'
import IconDownload from '../../assets/icon_download.svg'
import HappyPDF from '../../assets/happyPDF.png'

import Tilt from 'react-tilt'

function TelaConclusao(props) {
    return (
      <React.Fragment>
         <div className="nav-bar">
            <NavBar/>
         </div>
         <div className="background">
            <img src={BackgroudDecoration} alt="" onLoad='SVGInject(this)'/>
         </div>  


        <div className='conclusionPage'>
          <div className="main-content">
            <h1>{props.title}</h1>
            <Tilt>
              <img src={HappyPDF} alt="Happy PDF"/>
            </Tilt>
          </div>
          <div className="button-content">
            
            <a href={props.arquivo} download={props.nome}>
              <img src={IconDownload} alt="download" onLoad='SVGInject(this)'/>
              <h1>Baixar o PDF {props.modo}</h1>  
            </a>


          </div>

          
          <link rel="stylesheet" type="text/css" href="loading-bar.css"/>
          <script type="text/javascript" src="loading-bar.js"></script>
          <div class="ldBar"></div>
        </div>
        </React.Fragment>
      );
}

export default TelaConclusao;