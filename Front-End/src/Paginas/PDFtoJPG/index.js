import React from 'react';
import './style.css';
import { makeStyles} from "@material-ui/core/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LoadingPage from '../../Components/LoadingPage/';
import PaineisDeArquivos from '../../Components/PaineisDeArquivo/'
import InputFileArea from '../../Components/InputFileArea/'
import TelaConclusao from '../../Components/ConclusionPage/'
import BotaoFluanteAdd from '../../Components/FloatButton/'
import CircularProgress from '@material-ui/core/CircularProgress'
import ErrorPage from '../../Components/ErrorPage/'

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

// Icons
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import ImageIcon from '@material-ui/icons/Image';
import NavBar from '../../Components/NavBar';

const useStyles = makeStyles(theme => ({
  selected: {
    backgroundColor: '#BF0E0A !important',
    color: '#FFFF !important',
    display: 'block',
  },
  nonSelected:{
    backgroundColor: '#FFF' ,
    color: '#555E69' ,
    display: 'block',
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

function PainelLateral(props) {
    const classes = useStyles();
    
    // TODO: Verificar a possibilidade de comprimir mais de um arquivo
    if(props.arquivos.length === 0){
      return(
        // Utilizando classes podemos utlizar o userStyle para sobreescrever styles já presentes do componente 
        <div className="drawer-PDFtoJPG">
          <h1>Opções de PDF para JPG</h1>
          <hr/>
          <div className='box'>
            <p>Por favor, selecione mais arquivos PDF clicando novamente em <b>Selecionar Arquivos PDF</b>.
                Selecione vários arquivos, mantendo apertado <b>Ctrl</b></p>
          </div>
          
          <div className='buttonInativate'>
            <h1>
              Converter em JPG
            </h1>
          </div>
        </div>
      );
    }
    else{
      return(  
        // Utilizando classes podemos utlizar o userStyle para sobreescrever styles já presentes do componente 
        <div className="drawer-PDFtoJPG">
          
          <h1>Opções de PDF para JPG</h1>
          <hr/>

          <ThemeProvider theme={theme}>

          <ToggleButtonGroup value={props.modoExtracao} onChange={props.selecionarExtracao}
                            orientation="vertical" exclusive className='toggleGroup'>
            
            <ToggleButton value='PageToJPG' classes={{ root: classes.nonSelected, selected: classes.selected }} className='toggleButton'>
              <MenuBookRoundedIcon fontSize="large" className='icons'/>
              <div>
                <h2>
                  Página para PDF
                </h2>
                <p>
                Todas as páginas desse PDF serão convertidas em arquivos JPG.
                </p>
              </div>
            </ToggleButton>

            <ToggleButton value='OnlyImage' classes={{ root: classes.nonSelected, selected: classes.selected }} className='toggleButton'>
              <ImageIcon fontSize="large" className='icons'/> 
              <div>
                <h2>
                    Extrair imagens
                </h2>
                <p>
                    Todas as imagens incoporadas no PDF serão extraídas como imagens JPG.
                </p>
              </div> 
            </ToggleButton>

          </ToggleButtonGroup>
          </ThemeProvider>


          <div className='button' onClick={() => {props.executar(!props.exibir)}}>
            <h1>
              Converter em JPG
            </h1>
          </div>
        </div>
      );
    }
  }

class PDFtoJPGPage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          // mudar para false
          isUpload: false,
          isButtonCompressClick: false,
          isUploadCompleted: false, 
          fileInputPDFtoJPG: React.createRef(),
          ready: false, 
          data: {files: null, pdf64: [], order: [], modoExtracao: 'PageToJPG'},
          resposta: null,
          respostaNome: '',
          uploadProgress: 0,
          error: false,
      };
      this.addFilesInputPDFtoJPG = React.createRef();
      this.handleOnChange = this.handleOnChange.bind(this);
      this.handleExtract = this.handleExtract.bind(this);
      this.onClickCompress = this.onClickCompress.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleChangeFile = this.handleChangeFile.bind(this);
      this.handleFile = this.handleFile.bind(this)
      this.handleResposta = this.handleResposta.bind(this)
      this.uploadProgress = this.uploadProgress.bind(this)
      this.handleOrder = this.handleOrder.bind(this)
      this.handleError = this.handleError.bind(this)
  }

  handleError(){
    this.setState({
      error: true
    })
  }

  handleOrder(order){
    const { data } = this.state
    data.order = order
  }
  
  handleAdd() {
    if(this.state.data.files === null){
      const { data } = this.state;
      const array = Array.from(this.addFilesInputPDFtoJPG.current.files)
      array.forEach(this.handleChangeFile);
      data.files = array;
      data.order.push('0')
    } else {
      const { data } = this.state;
      const array = Array.from(this.addFilesInputPDFtoJPG.current.files)
      array.forEach(this.handleChangeFile);
      data.files = data.files.concat(array);
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
    data.files.pop();
    this.forceUpdate()
  }
    
  
  handleExtract(event, modo){
    const { data } = this.state;
    data.modoExtracao = modo
    this.setState({})
  }
  
  handleOnChange() {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = Array.from(this.state.fileInputPDFtoJPG.current.files);
      var i;
      for(i= 0; i< data.files.length; i++){
        data.order.push(i.toString())
      }
    }
    this.state.data.files.forEach(this.handleChangeFile);
  } 
    
  onClickCompress(){
    this.setState({
      isButtonCompressClick: true,
    })
  }

  handleResposta(resp){
    var nome ='LinaPDF_PDF_para_JPG'
    this.state.data.order.forEach(aux => {
      nome += '_' + this.state.data.files[aux].name.split('.pdf')[0]
    })

    if(this.state.onlyOne){
      nome += '.pdf'
    } else {
      nome += '.zip'
    }

    this.setState({
      respostaNome: nome,
      resposta: window.URL.createObjectURL(resp),
    })
  }

  uploadProgress(progress){
    this.setState({
      uploadProgress: progress,
    })
  }

handleUploadCompleted(){
  this.setState({
    isUploadCompleted: true,
  })
}
onDrop = acceptedFiles => {
  if(this.state.data.files === null){
      const { data } = this.state;
      data.files = acceptedFiles;
      var i;
      for(i= 0; i< acceptedFiles.length; i++){
        data.order.push(i.toString())
      }
    }
    this.state.data.files.forEach(this.handleChangeFile);
    this.setState({
      fileInputDividirPDF: acceptedFiles,
    });
};

handleFile = (e) => {
  const content = e.target.result;
  this.state.data.pdf64.push(content.split(',')[1]);

  if(this.state.data.pdf64.length === this.state.data.files.length){
      this.setState({
      isUpload: true,
    });
  }
}

handleChangeFile = (file) => {
  let fileData = new FileReader();
  fileData.onload = this.handleFile;
  fileData.readAsDataURL(file);
  this.setState({})
}


  render() {
    if(this.state.error){
      return(
        <ErrorPage />
      )
    }
    else if(this.state.isUploadCompleted) {
      return (
          <TelaConclusao title='Os PDFs se tornaram pesquisáveis' modo='pesquisáveis' />
      );
    } else if(this.state.isButtonCompressClick){
      return (
          <LoadingPage executar={this.handleUploadCompleted.bind(this)} exibir={this.state.isUploadCompleted} />
      );
    } else if(this.state.isUpload){
          return(
            <React.Fragment>
              <NavBar/>
              <div className='pageContainer-stage-02'>
                <PaineisDeArquivos arquivos={this.state.data.files}  removerArquivo={this.handleDelete.bind(this)} pdf64={this.state.data.pdf64}/>
                <div className='float-button-PDF-to-JPG'>
                  <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputPDFtoJPG} adicionarArquivos={this.handleAdd.bind(this)} />
                </div>
                <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonCompressClick} executar={this.onClickCompress.bind(this)} 
                  modoExtracao={this.state.data.modoExtracao} selecionarExtracao={this.handleExtract.bind(this)}/>
              </div>
            </React.Fragment>
          );
      }else if (this.state.ready){
        return(
          <React.Fragment>
            <NavBar/>
            <div className='pageContainer-stage-02'>
              <CircularProgress className='CircularProgress' />
              <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonCompressClick} executar={this.onClickCompress.bind(this)} 
                  modoExtracao={this.state.modoExtracao} selecionarExtracao={this.handleExtract.bind(this)}/>
            </div>
            </React.Fragment>
        );
      } else{
          return(
          <React.Fragment>

            <div className="nav-bar">
              <NavBar/>
            </div>

            <div className="pageContainer-stage-01">

              <div className="title">

                <h1>
                  PDF para JPG
                </h1>

                <p>
                  Extraia todas as imagens contidas em um arquivo PDF ou converta cada página em um arquivo JPG.
                </p>

              </div>

              <InputFileArea onDrop={this.onDrop.bind(this)} />

              <div className="button">

                <label htmlFor="files">
                  Selecionar arquivos PDF
                </label>

                <input id="files" type="file" accept='application/pdf' ref={this.state.fileInputPDFtoJPG} onChange={this.handleOnChange} multiple/>
              
              </div>
              
            </div>

          </React.Fragment>
          );
      }
    }
  }
  
  export default PDFtoJPGPage;