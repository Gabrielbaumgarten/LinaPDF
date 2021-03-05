import React from 'react';
import './style.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles} from "@material-ui/core/styles";
import NavBar from '../NavBar';
import LoadingPDF from '../../assets/LoadingPDF.gif'

import BackgroudDecoration from '../../assets/Background.svg'

const useStyles = makeStyles(theme => ({
    barColorPrimary: {
      backgroundColor: '#BF0E0A',
    }
  }));

const LoadingPage = (props) => {

    const classes = useStyles();
  
    /* 
      Efeito que faz com que a barra de progresso se mova.
      Ao chegar no valor de 100% é feita a transição para a página de concluído
    */
    React.useEffect(
      () => {
      if(props.porcentagem === 100){
        const time = setTimeout(() => {props.executar(!props.exibir)}, 1000);
        const timeout = () => clearTimeout(time);
        console.log(timeout)
      }
    });
  
  
    return(
        <React.Fragment>
            
            <div className="nav-bar">
              <NavBar/>
            </div>
            <div className="background">
              <img src={BackgroudDecoration} alt="" onLoad='SVGInject(this)'/>
            </div>

            <div className="loadingPage">

              <img src={LoadingPDF} alt=""/>
              
              <div className='progress-bar'>
                
                <h1>{props.porcentagem}%</h1>

                <LinearProgress variant="determinate" value={props.porcentagem} onCompositionEnd={() => {props.executar(!props.exibir)}} classes={{ barColorPrimary: classes.barColorPrimary }} className='bar' />

              </div>

            </div>
        </React.Fragment>
    );
  }

  export default LoadingPage