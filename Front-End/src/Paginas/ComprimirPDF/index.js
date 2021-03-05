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

    if(props.arquivos.length === 0){
      return(
        // Utilizando classes podemos utlizar o userStyle para sobreescrever styles já presentes do componente 
        <div className="drawer-comprimir">
          <h1>Nível de Compressão</h1>
          <hr/>
          <div className='box'>
            <p>Por favor, selecione mais arquivos PDF clicando novamente em <b>Selecionar Arquivos PDF</b>.
                Selecione vários arquivos, mantendo apertado <b>Ctrl</b></p>
          </div>
          
          <div className='buttonInativate'>
            <h1>
              Comprimir PDF
            </h1>
          </div>
        </div>
      );
    }
    else{
      return(
        // Utilizando classes podemos utlizar o userStyle para sobreescrever styles já presentes do componente 
        <div className="drawer-comprimir">
          <h1>Nível de Compressão</h1>
          <hr/>

          <ThemeProvider theme={theme}>

          <ToggleButtonGroup value={props.nivelCompressao} onChange={props.selecionarCompressao}
                            orientation="vertical" exclusive className='toggleGroup'>
            <ToggleButton value='alta' classes={{ root: classes.nonSelected, selected: classes.selected }}>
              <h2>
                Extrema Compressão
              </h2>
              <p>
                  Menos qualidade, alta compressão.
              </p>
            </ToggleButton>
            <ToggleButton value='normal' classes={{ root: classes.nonSelected, selected: classes.selected }}>
              <h2>
                Compressão Recomendada
              </h2>
              <p>
                Boa qualidade, boa compressão.
              </p>
            </ToggleButton>
            <ToggleButton value='baixa' classes={{ root: classes.nonSelected, selected: classes.selected }}>
              <h2>
                Baixa Compressão
              </h2>
              <p>
                Alta qualidade, baixa compressão.
              </p>
            </ToggleButton>

          </ToggleButtonGroup>

          <div className='button' onClick={() => {props.executar(!props.exibir)}}>
            <h1>
             Comprimir PDF
            </h1>
          </div>
          </ThemeProvider>
        </div>
      );
    }
  }

class ComprimirPDFPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        isUpload: false,
        isButtonCompressClick: false,
        isUploadCompleted: false, 
        fileInputComprimirPDF: React.createRef(),
        ready: false, 
        data: {files: null, pdf64: [], order: [], nivelCompressao: 'alta',},
        resposta: null,
        respostaNome: '',
        uploadProgress: 0,
        error: false,
    };
    this.addFilesInputComprimirPDF = React.createRef();
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleCompress = this.handleCompress.bind(this);
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

  /*Setter de variáveis */
  handleError(){
    this.setState({
      error: true
    })
  }

  uploadProgress(progress){
    this.setState({
      uploadProgress: progress,
    })
  }

  handleCompress(event, nivel){
    const { data } = this.state
    data.nivelCompressao = nivel
    this.setState({})
  }

  handleUploadCompleted(){
    this.setState({
      isUploadCompleted: true,
    })
  }

  /*Manipuladores dos arquivos */
  handleAdd() {
    if(this.state.data.files === null){
      const { data } = this.state;
      const array = Array.from(this.addFilesInputComprimirPDF.current.files)
      array.forEach(this.handleChangeFile);
      data.files = array;
      data.order.push('0')
    } else {
      const { data } = this.state;
      const array = Array.from(this.addFilesInputComprimirPDF.current.files)
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
    this.setState({});
  }

  onClickCompress(){
    // postJuntarPDF(this.state.data.files, 'juntar', this.handleResposta.bind(this),
    //                this.uploadProgress.bind(this), this.state.data.order, this.handleError.bind(this))
    
      this.setState({
          isButtonCompressClick: true,
        })
  }

  handleResposta(resp){
    var nome ='LinaPDF_Comprimir'
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

  handleOrder(order){
    const { data } = this.state
    data.order = order
  }

  /* Tratadores ao receber os arquivos */
  handleOnChange() {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = Array.from(this.state.fileInputComprimirPDF.current.files);
    
      var i;
      for(i= 0; i< data.files.length; i++){
        data.order.push(i.toString())
      }
    }
    this.state.data.files.forEach(this.handleChangeFile);
  } 

  onDrop = acceptedFiles => {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = acceptedFiles;
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
    this.setState({});
  }

  /* Renderização da página  */
  render() {
    if(this.state.error){
      return(
        <ErrorPage />
      )
    }
    else if(this.state.isUploadCompleted) {
      return (
          <TelaConclusao title='Os PDFs foram comprimidos' modo='comprimido'
           arquivo={this.state.resposta} nome={this.state.respostaNome} porcentagem={this.state.uploadProgress} />
      );
    } else if(this.state.isButtonCompressClick){
      return (
          <LoadingPage executar={this.handleUploadCompleted.bind(this)} exibir={this.state.isUploadCompleted} 
           ordemDosArquivos={this.handleOrder.bind(this)}/>
      );
   } else if(this.state.isUpload){    
          return(
            <React.Fragment>
              <NavBar/>
              <div className='pageContainer-stage-02'>
                <PaineisDeArquivos arquivos={this.state.data.files} removerArquivo={this.handleDelete.bind(this)} pdf64={this.state.data.pdf64}/>
                <div className='float-button-comprimir'>
                  <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputComprimirPDF} adicionarArquivos={this.handleAdd.bind(this)} />
                </div>
                <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonCompressClick} executar={this.onClickCompress.bind(this)} 
                nivelCompressao={this.state.data.nivelCompressao} selecionarCompressao={this.handleCompress.bind(this)} />
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
                nivelCompressao={this.state.nivelCompressao} selecionarCompressao={this.handleCompress.bind(this)} />
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
                  Comprimir arquivo PDF
                </h1>

                <p>
                  Diminua o tamanho do seu arquivo PDF, mantendo a melhor qualidade possível. Otimize seus arquivos PDF.
                </p>

              </div>

              <InputFileArea onDrop={this.onDrop.bind(this)} />

              <div className="button">

                <label htmlFor="files">
                  Selecionar arquivos PDF
                </label>

                <input id="files" type="file" accept='application/pdf' ref={this.state.fileInputComprimirPDF} onChange={this.handleOnChange} multiple/>
              
              </div>
              
            </div>

            </React.Fragment>
          );
      }
    }
}

export default ComprimirPDFPage;