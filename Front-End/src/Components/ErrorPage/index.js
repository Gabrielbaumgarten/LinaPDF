import React from 'react'
import './style.css'
import sadPDF from '../../assets/sadPDF.png'
import Tilt from 'react-tilt'
import NavBar from '../NavBar';
import BackgroudDecoration from '../../assets/Background.svg'

const ErrorPage = () => {
    return(
        <React.Fragment >
            <div className="nav-bar">
              <NavBar/>
            </div>
            <div className="background">
              <img src={BackgroudDecoration} alt="" onLoad='SVGInject(this)'/>
            </div>
            <div className='errorPage'>
                <div className="main-text">
                    <div>
                        <h1>OPSSS!</h1>
                        <h1>Tivemos um problema ao trabalhar com seu PDF</h1>
                    </div>

                    <h2>Por favor, tente novamente.
                        Caso o problema persista entre
                        em contato com o Lina
                    </h2>
                </div>
                <div className="main-image">
                    <Tilt>
                        <img src={sadPDF} alt="sadPDF.png" className='ImageError'/> 
                    </Tilt>
                </div>




                {/* 
                <div className='TextError'>
                    <Typography variant='h4' className='TitleError'>
                        Ops! Tivemos um problema ao trabalhar com seu PDF.
                    </Typography>
                    <Typography variant='subtitle1' className='MensageError'>
                        Por favor, tente novamente. Caso o problema persista, entre em contato com o Lina.
                    </Typography>
                </div> */}
            </div>
        </React.Fragment>
    );
}

export default ErrorPage;