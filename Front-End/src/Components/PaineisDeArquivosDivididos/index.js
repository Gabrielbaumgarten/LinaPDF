import React from 'react';
import '../Css/Padrao.css'
import './style.css'
import Paper from "@material-ui/core/Paper"
import { SortablePane, Pane } from 'react-sortable-pane';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import PDFViewer from 'pdf-viewer-reactjs'
import GIF from '../../assets/ellipses.gif'

// TODO: ajustar as para mostrar as páginas no momento certo
// Lembrando que o page utiliza a página no carregamento do arquivo
class PaineisDeArquivosDividir extends React.Component{
    constructor(props) {
      super(props);
      this.Paineis = this.Paineis.bind(this);
    }
  
    Paineis(arquivo,index,pdf, inicio, fim, modo) {
      if(modo === 1){
        return(
          <Pane key={index} className='Pane'>
            <Paper elevation={3} className="Paper">
              <Paper variant="outlined" elevation={3} >
                <h1>{this.props.inicio}</h1>
                <PDFViewer document={{ base64: pdf[index] }} css='Pdf' canvasCss='Canvas' scale={0.3} page={inicio} hideNavbar/>
              </Paper>
            </Paper>
          </Pane>
        );
      }else{
        return(
          <Pane key={index} className='PaneDividir'>
            <Paper elevation='3' className="PaperDividir">
              <Paper variant="outlined" elevation='3' >
              <h1>{this.props.inicio}</h1>
                <PDFViewer document={{ base64: pdf[index] }} css='Pdf' canvasCss='Canvas' scale={0.3} page={inicio} hideNavbar/>
              </Paper>
              <img src={GIF} alt="" className='GIF'/>
              <Paper variant="outlined" elevation='3' >
              <h1>{this.props.fim}</h1>
                <PDFViewer document={{ base64: pdf[index] }} css='Pdf' canvasCss='Canvas' scale={0.3} page={fim} hideNavbar/>
              </Paper>
            </Paper>
          </Pane>
        );
      }
    }
  
    render() {
    if (Array.isArray(this.props.data.files)){
      
      var panes = this.Paineis(this.props.data.files[0], 0, this.props.data.pdf64,
                     this.props.data.startPage, this.props.data.endPage, this.props.data.modo);
      
      return (
        <React.Fragment>
          <SortablePane direction="horizontal" margin={30} className='PanesDividir'>
            <h1></h1>
            {panes}
          </SortablePane>
        </React.Fragment>
      );
      }
      else {
        return (
          <React.Fragment>
              <p className='Centralizar'>
                Nenhum arquivo selecionado
              </p>
          </React.Fragment>
        );
      }
    }
  }
  
    export default PaineisDeArquivosDividir;

