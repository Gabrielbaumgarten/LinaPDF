import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { makeStyles} from "@material-ui/core/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slider from '@material-ui/core/Slider'
import Input from '@material-ui/core/Input';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles(() => ({
    abas : {
        fontSize: '1rem',
        height: 60,
    },
    selected: {
      backgroundColor: '#BF0E0A !important',
      color: '#FFFF !important',
    },
    nonSelected:{
      backgroundColor: '#FFF' ,
      color: '#555E69' ,
    },

  }));
  
  const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#BF0E0A',
        },
        secondary: {
          main: '#555E69',
        },
      },
    });
  
  /* 
    Função que retorna o painel lateral após selecionar alguns arquivos
  */
  function PainelLateral(props) {
    const classes = useStyles();
  
  
    function OptionsToggleButton(props){
      if(props.option === 'all'){
        return(
          <React.Fragment>
            <div className='box'>
              <p>Todas as páginas selecionadas 
              desse PDF serão convertidas em <b>(Total de paginas)</b> PDFs individuais.</p>
            </div>
          </React.Fragment>
        );
      }else{
        return(
          <React.Fragment>
            <form action="">
              <h2>Páginas para extrair:</h2>
              <TextField label="Páginas" placeholder='exemplo: 1,5-8' value={props.pages} 
                className='TextField' margin="normal" variant="outlined" onChange={(event) => props.handlePages(event.target.value)} />
            </form>
          </React.Fragment>
        );
      }
    }
  
    if(props.arquivos.length === 0){
      return(
        // Utilizando classes podemos utlizar o userStyle para sobreescrever styles já presentes do componente 
        <div className="drawer-dividir">
          <h1>Dividir PDF</h1>
          <hr/>
          <div className='box'>
            <p>Por favor, selecione mais arquivos PDF clicando novamente em <b>Selecionar Arquivos PDF</b>.
                Selecione vários arquivos, mantendo apertado <b>Ctrl</b></p>
          </div>
          
          <div className='buttonInativate'>
            <h1>
              Dividir PDF 
            </h1>
          </div>
        </div>
      );
    }
    else{
      const tamArquivo = props.data.files[0].size/1000;
      return(
        <React.Fragment>
          <div className="drawer-dividir">
            <h1>Dividir PDF</h1>
            <hr/>
            <ThemeProvider theme={theme}>
              <Tabs
              value={props.data.modo}
              onChange={props.mudarModo}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="secondary"
              >
                <Tab label="Dividir por intervalo" classes={{ root: classes.abas }} />
                <Tab label="Dividir por tamanho" classes={{ root: classes.abas }} />
                <Tab label="Extrair páginas" classes={{ root: classes.abas }} />
              </Tabs>
      
              <TabPanel value={props.data.modo} index={0}>

                <h2> Modo por intervalo</h2>

                <div className='box'>
                  <p>Na divisão por intervalo, o seu PDF será divido de acordo
                  com o intevalo de páginas que você desejar.</p>
                </div>

                <h3> Defina o intervalo:</h3>

                <div className='interval'>
                  <Input value={props.inicio} margin="none" onChange={props.handleInicioIntervalo}
                  color="primary" startAdornment='De:' variant="outlined" 
                  inputProps={{ step: 1, min: 0, max: 100, type: 'number', 'aria-labelledby': 'input-slider', }}
                  className='intervalInput'/>
                  <Input value={props.fim} margin="none" onChange={props.handleFimIntervalo}
                  color="primary" startAdornment='Até:' variant="outlined"
                  inputProps={{ step: 1, min: 0, max: 100, type: 'number', 'aria-labelledby': 'input-slider', }}
                  className='intervalInput'/>
                </div>

                <FormControlLabel
                  control={<Checkbox checked={props.check} onChange={(event)=> props.handleCheck(event.target.checked)} name="checkedA" color="primary"/>}
                  label="Enviar apenas o arquivo no intervalo." className='checkbox'
                />
              </TabPanel>
              <TabPanel value={props.data.modo} index={1}>

                <h2> Modo por tamanho</h2>

                <div className='box'>
                  <p>Na divisão por tamanho, o seu PDF será divido em vários arquivos PDF
                  com o tamanho máximo que você desejar.</p>
                </div>

                <h3> Defina o tamanho máximo:</h3>

                <Slider value={props.data.size} onChange={props.definirTamanho} max={tamArquivo}
                aria-labelledby="input-slider" valueLabelDisplay="auto" className='slider-dividirPDF'/>
                <Input value={props.data.size} margin="none" onChange={props.definirTamanhoInput}
                color="primary" endAdornment='KB' variant="outlined" className="inputSlider"
                inputProps={{ step: 10, min: 0, max: tamArquivo,
                  type: 'number', 'aria-labelledby': 'input-slider', }} />

              </TabPanel>

              <TabPanel value={props.data.modo} index={2}>
                <h2> Modo de Extração</h2>
                <ToggleButtonGroup value={props.data.tipoExtracao} exclusive onChange={props.mudarExtracao} className='toggleButton' >
                  <ToggleButton value="all" classes={{ root: classes.nonSelected, selected: classes.selected }}>
                    <p>Extrair todas as páginas</p>
                  </ToggleButton>
                  <ToggleButton value="select" classes={{ root: classes.nonSelected, selected: classes.selected }}>
                    <p>Selecionar as páginas</p>
                  </ToggleButton>
                </ToggleButtonGroup>
                  <OptionsToggleButton option={props.data.tipoExtracao} handlePages={props.handlePages} pages={props.data.pages} />
              </TabPanel>
      
            </ThemeProvider>

            <div className="button" onClick={() => {props.executar(!props.exibir)}}>
              <h1>  
                Dividir PDF
              </h1>
            </div>
            
          </div>
          
        </React.Fragment>
      );
   }
  }
  
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  export default PainelLateral;