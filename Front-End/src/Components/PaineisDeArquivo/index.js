import React from 'react';
import '../Css/Padrao.css';
import './style.css';
import Paper from "@material-ui/core/Paper"
import { SortablePane, Pane } from 'react-sortable-pane';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import PDFViewer from 'pdf-viewer-reactjs'
import Hidden from '@material-ui/core/Hidden'

// TODO: Verificar se está mudando a ordem do arquivo no array
// TODO: Ajustar a margin left para que os paineis fiquem no centro
class PaineisDeArquivos extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      order: [1,2,3]
    }
    this.Paineis = this.Paineis.bind(this);
    
  }

  Paineis(arquivo,index,pdf) {
    return(
      <Pane key={index} maxHeight='350px' className='Pane'>
        <Paper elevation={3} className="Paper">
          <IconButton onClick={this.props.removerArquivo.bind(this,index)} className='IconDelete'> 
            <HighlightOffRoundedIcon />
          </IconButton>
          <PDFViewer document={{ base64: pdf[index] }} css='Pdf' canvasCss='Canvas' scale={0.3} hideNavbar/>
          <p>{arquivo.name}</p>
        </Paper>
      </Pane>
    );
  }

  render() {
  if (Array.isArray(this.props.arquivos)){
    // Utilizando o array acima para criar vários paineis que irão simbolizar os arquivos
    const panes = this.props.arquivos.map(arquivo => this.Paineis(arquivo, this.props.arquivos.indexOf(arquivo), this.props.pdf64));

    return (
      <React.Fragment>
        <Hidden xsDown>
          <SortablePane direction="horizontal" margin={30} className='Panes' onOrderChange={order => this.props.ordemDosArquivos(order) } >
            {panes}
          </SortablePane>
        </Hidden>
        <Hidden smUp>
          <SortablePane direction="vertical" margin={30} className='Panes' onOrderChange={order => this.props.ordemDosArquivos(order) } >
            {panes}
          </SortablePane>
        </Hidden>
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

  export default PaineisDeArquivos;