import React from 'react';
import './style.css';

import NavBar from '../../Components/NavBar/'
import InputFileArea from '../../Components/InputFileArea/'


import LoadingPage from '../../Components/LoadingPage/';
import PaineisDeArquivos from '../../Components/PaineisDeArquivo/'
import TelaConclusao from '../../Components/ConclusionPage/'
import BotaoFluanteAdd from '../../Components/FloatButton/'
import CircularProgress from '@material-ui/core/CircularProgress'
import { postPDFtoXSLX } from '../../Components/HTTPmethods'
import ErrorPage from '../../Components/ErrorPage/'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles} from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

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
            <div className="pages">
                <h2>Selecione a página da tabela que você quer extrair:</h2>
                <Input value={props.pages} margin="none" onChange={props.handlePage}
                    color="primary" startAdornment='Página:' variant="outlined" className="inputSlider"
                    inputProps={{ step: 1, min: 0, max: 100,
                    type: 'number', 'aria-labelledby': 'input-slider', }} />
            </div>
          </form>
        </React.Fragment>
      );
    }
  }




  if(props.arquivos.length < 1){
    return(
      <React.Fragment>
        <div className='drawer-PDFtoXLSX'>

          <h1>Converter PDF para Excel</h1>
          <hr/>
          <p>Por favor, selecione mais arquivos PDF clicando novamente em <b>Selecionar Arquivos PDF</b>.
                  Selecione vários arquivos, mantendo apertado <b>Ctrl</b>.</p>

          <div className='buttonInativate'>
            <h1>
              Converter PDF
            </h1>
          </div>

        </div>
      </React.Fragment>
    );
  }
  else {
    return(
      <React.Fragment>
        <div className="drawer-PDFtoXLSX">

        <h1>Converter PDF para Excel</h1>
          <hr/>
          <ThemeProvider theme={theme}>
          
          <h2> Modo de Extração</h2>
                <ToggleButtonGroup value={props.data.tipoExtracao} exclusive onChange={props.mudarExtracao} className='toggleButton' >
                  <ToggleButton value="all" classes={{ root: classes.nonSelected, selected: classes.selected }}>
                    <p>Extrair de todas as páginas</p>
                  </ToggleButton>
                  <ToggleButton value="select" classes={{ root: classes.nonSelected, selected: classes.selected }}>
                    <p>Selecionar a página</p>
                  </ToggleButton>
                </ToggleButtonGroup>
                  <OptionsToggleButton option={props.data.tipoExtracao} handlePage={props.handlePage} pages={props.data.pages} />
              


          <div className='button' onClick={() => {props.executar(!props.exibir)}}>
            <h1>
              Converter PDF
            </h1>
          </div>

          </ThemeProvider>
        </div>
      </React.Fragment>
    );
  }
}

/* 
  Classe que será exportada,
  Aqui contém todos os componentes que serão renderizados na página
*/
class PDFtoXLSXPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isUpload: false,
      isButtonMergeClick: false,
      isUploadCompleted: false,
      ready: false, 
      fileInputPDFtoXLSX: React.createRef(),
      // adicionar order
      data: {files: null, pdf64: [], order: [], pages: 1, tipoExtracao: 'all'},
      // adicionar
      resposta: null,
      respostaNome: '',
      uploadProgress: 0,
      error: false,

    };
    this.addFilesInputPDFtoXLSX = React.createRef();
    this.processOnChange = this.processOnChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleConvert = this.handleConvert.bind(this);
    this.setUploadCompleted = this.setUploadCompleted.bind(this);
    this.processChangeFile = this.processChangeFile.bind(this);
    this.processFiles = this.processFiles.bind(this)
    // adicionar
    this.handleResposta = this.handleResposta.bind(this)
    this.setUploadProgress = this.setUploadProgress.bind(this)
    this.setOrder = this.setOrder.bind(this)
    this.setError = this.setError.bind(this)
    this.setPages = this.setPages.bind(this)
    this.setExtracao = this.setExtracao.bind(this)
  }

  /*Setter de variáveis */
  // adicionar
  setError(){
    this.setState({
      error: true
    })
  }

  setPages(event){
    const { data } = this.state
    data.pages = (event.target.value === '' ? '' : Number(event.target.value))
    this.setState({});
  }

  setExtracao(event, newValue){
    const { data } = this.state;
    data.tipoExtracao = newValue;
    this.setState({});
  }

  // adicionar
  setUploadProgress(progress){
    this.setState({
      uploadProgress: progress,
    })
  }

  setUploadCompleted(){
    this.setState({
      isUploadCompleted: true,
    })
  }

  // adicionar
  setOrder(order){
    const { data } = this.state
    data.order = order
  }

  /*Manipuladores dos arquivos */
  handleAdd() {
    if(this.state.data.files === null){
      const { data } = this.state;
      const array = Array.from(this.addFilesInputPDFtoXLSX.current.files)
      array.forEach(this.processChangeFile);
      data.files = array;
      
  // adicionar
      data.order.push('0')
    } else {
      const { data } = this.state;
      const array = Array.from(this.addFilesInputPDFtoXLSX.current.files)
      array.forEach(this.processChangeFile);
      data.files = data.files.concat(array);
      
  // adicionar
      data.order.push(data.files.length)
    }
    this.setState({
      isUpload: false,
      ready: true,
    });
  }

  handleDelete(index){
    const { data } = this.state;
    if((data.files.length - 1) !== index){
     data.files[index] = data.files[data.files.length - 1];
    }
    // Deletar
    data.files.pop();
    data.order.pop();
    data.pdf64.pop();
    this.setState({});
  }

  handleConvert(){
  // adicionar
    postPDFtoXSLX(this.state.data.files, 'PDFtoXLSX', this.handleResposta.bind(this), this.state.data.tipoExtracao,
                    this.state.data.pages, this.setUploadProgress.bind(this), this.state.data.order, this.setError.bind(this))
    this.setState({
      isButtonMergeClick: true,
    })
  }

  // adicionar
  handleResposta(resp){
    var nome ='LinaPDF_PDFparaExcel'
    this.state.data.order.forEach(aux => {
      nome += '_' + this.state.data.files[aux].name.split('.pdf')[0]
    })
    nome += '.xlsx'

    this.setState({
      respostaNome: nome,
      resposta: window.URL.createObjectURL(resp),
    })
    this.setUploadCompleted()
  }


  /* Tratadores ao receber os arquivos */
  processOnChange() {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = Array.from(this.state.fileInputPDFtoXLSX.current.files);
      // adicionar
      var i;
      for(i= 0; i< data.files.length; i++){
        data.order.push(i.toString())
      }
    }
    this.state.data.files.forEach(this.processChangeFile);
  }

  onDrop = acceptedFiles => {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = acceptedFiles;
      
  // adicionar
      var i;
      for(i= 0; i< acceptedFiles.length; i++){
        data.order.push(i.toString())
      }
    }
    this.state.data.files.forEach(this.processChangeFile);
    this.setState({
      fileInputDividirPDF: acceptedFiles,
    });
  };

  processFiles = (e) => {
    const content = e.target.result;
    this.state.data.pdf64.push(content.split(',')[1]);

    if(this.state.data.pdf64.length === this.state.data.files.length){
        this.setState({
        isUpload: true,
      });
    }
  }

   processChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onload = this.processFiles;
    fileData.readAsDataURL(file);
    this.setState({});
  }

  /* Renderização da página  */
  render() {
    if(this.state.error){
      return(
        <ErrorPage />
      )
    }
    else if(this.state.isUploadCompleted){
      return (
        // adicionar campos apos modo
          <TelaConclusao title='Os PDFs foram combinados' modo='combinado' arquivo={this.state.resposta} nome={this.state.respostaNome} />
      );
    } else if(this.state.isButtonMergeClick) {
      return(
        <React.Fragment>
          <LoadingPage executar={this.setUploadCompleted.bind(this)} exibir={this.state.isUploadCompleted} porcentagem={this.state.uploadProgress} />
       </React.Fragment>
      );
    } else if(this.state.isUpload) {
      return(
        <React.Fragment>
          <NavBar/>
          <div className='pageContainer-stage-02'>
            <PaineisDeArquivos arquivos={this.state.data.files} removerArquivo={this.handleDelete.bind(this)} pdf64={this.state.data.pdf64} ordemDosArquivos={this.setOrder.bind(this)} />
            <div className='float-button'>
              <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputPDFtoXLSX} adicionarArquivos={this.handleAdd.bind(this)} />
            </div>
            <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonMergeClick} executar={this.handleConvert.bind(this)}
                 handlePage={this.setPages.bind(this)} mudarExtracao={this.setExtracao.bind(this)}
                 data={this.state.data}  />
          </div>
        </React.Fragment>
      );
    } else if (this.state.ready){
      return(
        <React.Fragment>
          <NavBar/>
          <CircularProgress className='CircularProgress' />
          <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonMergeClick} executar={this.handleConvert.bind(this)} />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>

          <div className="nav-bar">
            <NavBar/>
          </div>

          <div className="pageContainer-stage-01">

            <div className="title">

              <h1>
                Converter PDF para Planilhas Excel
              </h1>

              <p>
                Retire dados direto de PDF's para planilhas do Excel em poucos segundos
              </p>

            </div>

            <InputFileArea onDrop={this.onDrop.bind(this)} />

            <div className="button">

              <label htmlFor="files">
                Selecionar arquivos PDF
              </label>

              <input id="files" type="file" accept='application/pdf' ref={this.state.fileInputPDFtoXLSX} onChange={this.processOnChange}/>
            
            </div>
            
          </div>

        </React.Fragment>
      );
    }
  }

}

export default PDFtoXLSXPage;


