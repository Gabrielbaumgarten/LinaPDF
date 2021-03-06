import React from 'react';
import './style.css';
import Tilt from 'react-tilt'
import { Link } from 'react-router-dom'
// import init from './liquid'

import NavBar from '../../Components/NavBar/'
import BackgroudDecoration from '../../assets/Background.svg'
import HappyPDF from '../../assets/happyPDF.png'


// Icons
import IconJoin from '../../assets/icon_arrows-join-2.svg'
import IconSplit from '../../assets/icon_arrows-split-2.svg'
import IconCompress from '../../assets/icon_compress.svg'
import IconSearch from '../../assets/icon_search.svg'
import IconPDFtoJPG from '../../assets/PDFtoJPG.svg'



const MainPage = () =>{
  
  function clickOnButton(id){
    const button = document.getElementById(id);
    if(button != null){
        // ChangePage()
        setTimeout(()=>{button.click()},500)
        clearInterval()
    }
  }
   
  return(
    <React.Fragment>
      


      <div className="nav-bar">
        <NavBar/>
      </div>
        <div className="background">
          <div className="complementBackground"/>
          <img src={BackgroudDecoration} alt="" onLoad='SVGInject(this)'/>
        </div>

      <div className="container">
        <div className="main-text">
          <p>Um novo cuidado ao manipular seus PDF’s</p>
          <Tilt scale={1.05}>
            <img src={HappyPDF} alt="Happy PDF"/>
          </Tilt>
        </div>

        <div className="options">
          <div className='first-line'>
            <Tilt  className='tilt' scale={1.05}>
              
                <div className="main-button" onClick={() => clickOnButton('link-join')} >
                  <div className='main-text-button'>
                    <img src={IconJoin} alt="Icone Juntar" onLoad='SVGInject(this)'/>
                    <h3>Juntar PDF</h3>
                  </div>
                  <div className='description-button'>
                    Mesclar e juntar PDFs e colocá-los em qualquer ordem que desejar.
                    É tudo muito fácil e rápido
                  </div>
                </div>
              </Tilt>
              
              <Tilt  className='tilt' scale={1.05}>
                  <div className="main-button" onClick={() => clickOnButton('link-split')}>
                    <div className='main-text-button'>
                      <img src={IconSplit} alt="Icone Dividir" onLoad='SVGInject(this)'/>
                      <h3>Dividir PDF</h3>
                    </div>
                    <div className='description-button'>
                      Selecione um intervalo de páginas, separe uma página, 
                      ou converta cada página do documento em um arquivo PDF independente.
                    </div>
                  </div>
              </Tilt>

            <Tilt  className='tilt' scale={1.05}>
                <div className="main-button" onClick={() => clickOnButton('link-compress')}>
                  <div className='main-text-button'>
                    <img src={IconCompress} alt="Icone Comprimir" onLoad='SVGInject(this)'/>    
                    <h3>Comprimir PDF</h3>
                  </div>
                  <div className='description-button'>
                    Diminua o tamanho do seu arquivo PDF, mantendo a melhor qualidade possível.
                    Otimize seus arquivos PDF.
                  </div>
                </div>
            </Tilt>
          </div>

          <div className='second-line'>
           <Tilt  className='tilt' scale={1.05}>
                  <div className="main-button" onClick={() => clickOnButton('link-search')}>
                    <div className='main-text-button'>
                      <img src={IconSearch} alt="Icone Comprimir" onLoad='SVGInject(this)'/>
                      <h3>Pesquisar no PDF</h3>
                    </div>
                    <div className='description-button'>
                      Extraia todas as imagens contidas em um arquivo PDF
                      ou converta cada página em um arquivo JPG.
                    </div>
                  </div>
            </Tilt>

            <Tilt  className='tilt' scale={1.05}>
                <div className="main-button" onClick={() => clickOnButton('link-PDFtoJPG')}>
                  <div className='main-text-button'>
                    <img src={IconPDFtoJPG} alt="Icone Comprimir" onLoad='SVGInject(this)'/>
                    <h3>PDF para JPG</h3>
                  </div>
                  <div className='description-button'>
                    Torne o PDF um arquivo pesquisável para encontrar mais
                    facilmente as palavras chaves.
                  </div>
                </div>
            </Tilt>

          </div>

        </div>

        {/* links */}
        <Link id='link-join'to='/JuntarPDF'></Link>
        <Link id='link-split'to='/DividirPDF'></Link>
        <Link id='link-compress'to='/ComprimirPDF'></Link>
        <Link id='link-search'to='/PesquisarPDF'></Link>
        <Link id='link-PDFtoJPG'to='/PDFtoJPG'></Link>

      </div>
    </React.Fragment>
)};

export default MainPage; 
