
import React from 'react';
import './style.css';
import NavBar from "../../Components/NavBar";
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingPage from '../../Components/LoadingPage/';
import BotaoFluanteAdd from '../../Components/FloatButton/'
import { postDividirPDF, postGetInformation } from '../../Components/HTTPmethods';
import InputFileArea from '../../Components/InputFileArea/';
import PaineisDeArquivos from '../../Components/PaineisDeArquivo/'
import TelaConclusao from '../../Components/ConclusionPage/'
import ErrorPage from '../../Components/ErrorPage/'
import PainelLateral from './DrawerDividirPDF.js';

/* 
  Classe que será exportada,
  Aqui contém todos os componentes que serão renderizados na página
*/
class DividirPDFPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isUpload: false,
      isButtonMergeClick: false,
      isUploadCompleted: false, 
      ready: false, 
      fileInputDividirPDF: React.createRef(),
      respostaNome: '',
      resposta: null,
      uploadProgress: 0,
      onlyOne: false,
      // modo 0: Por intervalo
      // modo 1: Por tamanho
      // modo 2: Selecionar páginas
      data: {files: null, pdf64: [], pages: null, order: [],
             modo: 0, tipoExtracao: 'all', size: 0, startPage:1, endPage:2},
      numPage: 0,
      error: false,
    };
    this.addFilesInputDividirPDF = React.createRef();
    this.processOnChange = this.processOnChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDivide = this.handleDivide.bind(this);
    this.setUploadCompleted = this.setUploadCompleted.bind(this);
    this.processChangeFile = this.processChangeFile.bind(this);
    this.processFiles = this.processFiles.bind(this);
    this.setStartPage = this.setStartPage.bind(this);
    this.setEndPage = this.setEndPage.bind(this);
    this.setSize = this.setSize.bind(this);
    this.setInputSize = this.setInputSize.bind(this);
    this.setModo = this.setModo.bind(this);
    this.setExtracao = this.setExtracao.bind(this);
    this.handleResposta = this.handleResposta.bind(this)
    this.setUploadProgress = this.setUploadProgress.bind(this)
    this.setOrder = this.setOrder.bind(this)
    this.setInformation = this.setInformation.bind(this)
    this.setOnlyOne = this.setOnlyOne.bind(this)
    this.setPages = this.setPages.bind(this)
    this.setError = this.setError.bind(this)
  }

  /*Setter de variáveis */
  setError(){
    this.setState({
      error: true
    })
  }
  
  setPages(pages){
    const { data } = this.state
    data.pages = pages
  }

  setOnlyOne(checked){
    this.setState({
      onlyOne: checked,
    })
  }

  setOrder(order){
    const { data } = this.state
    data.order = order
  }

  setInformation(info){
    const { data } = this.state;
    data.endPage = info.numPages
    this.setState({
      numPage: info.numPages,
      isUpload: true,
    })
  }

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
  
  setStartPage(event) {
    const { data } = this.state;
    data.startPage = (event.target.value === '' ? '' : Number(event.target.value));
    this.setState({});
  }

  setEndPage(event) {
    const { data } = this.state;
    data.endPage = (event.target.value === '' ? '' : Number(event.target.value));
    this.setState({});
  }

  setSize(event, newValue){
    const { data } = this.state;
    data.size = newValue;
    this.setState({});
  }

  setInputSize(event){
    const { data } = this.state;
    let value = (event.target.value === '' ? '' : Number(event.target.value));
    if(value < 0){
      data.size = 0;
    }else if(value > (data.files[0].size/1000)){
      data.size = (data.files[0].size/1000);
    } else{
      data.size = value;
    }
    this.setState({});
  }

  setModo(event, newValue){
    const { data } = this.state;
    data.modo = newValue;
    this.setState({});
  }

  setExtracao(event, newValue){
    const { data } = this.state;
    data.tipoExtracao = newValue;
    this.setState({});
  }

  /*Manipuladores dos arquivos */
  handleAdd() {
    if(this.state.data.files === null){
      const { data } = this.state;
      const array = Array.from(this.addFilesInputDividirPDF.current.files)
      array.forEach(this.processChangeFile);
      data.files = array;
      data.order.push('0');
    } else {
      const { data } = this.state;
      const array = Array.from(this.addFilesInputDividirPDF.current.files);
      array.forEach(this.processChangeFile);
      data.files = data.files.concat(array);
      data.order.push(data.files.length);
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

  handleDivide(){
    postDividirPDF(this.state.data, 'dividir', this.handleResposta.bind(this),
                    this.setUploadProgress.bind(this), this.state.onlyOne, this.setError.bind(this))

    this.setState({
      isButtonMergeClick: true,
    })
  }

  handleResposta(resp){
    var nome ='LinaPDF_Dividir'
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

  /* Tratadores ao receber os arquivos */
  processOnChange() {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = Array.from(this.state.fileInputDividirPDF.current.files);
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
        postGetInformation(this.state.data.files, 'dividir', this.setInformation.bind(this),
                            this.setUploadProgress.bind(this), this.state.data.order, this.setError.bind(this))
    }
  }

  processChangeFile = (file) => {
    let fileData = new FileReader();
    fileData.onload = this.processFiles;
    fileData.readAsDataURL(file);
    this.setState({});
  }

  render() {
    if(this.state.error){
      return(
        <ErrorPage />
      )
    }
    else if(this.state.isUploadCompleted){
      return (
          <TelaConclusao title='Os PDFs foram divididos' modo='dividido' arquivo={this.state.resposta} nome={this.state.respostaNome} />
      );
    } else if(this.state.isButtonMergeClick) {
      return(
          <LoadingPage executar={this.setUploadCompleted.bind(this)} exibir={this.state.isUploadCompleted} porcentagem={this.state.uploadProgress} />
      );
    } else if(this.state.isUpload) {
      return(
        <React.Fragment>
          <NavBar/>
          <div className="page-container-stage-02">
            <PaineisDeArquivos arquivos={this.state.data.files} removerArquivo={this.handleDelete.bind(this)} pdf64={this.state.data.pdf64} ordemDosArquivos={this.setOrder.bind(this)}/>
            <div className='float-button-split'>
              <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputDividirPDF} adicionarArquivos={this.handleAdd.bind(this)} />
            </div>
            <PainelLateral exibir={this.state.isButtonMergeClick} executar={this.handleDivide.bind(this)} arquivos={this.state.data.files}
            inicio={this.state.data.startPage} fim={this.state.data.endPage} handleInicioIntervalo={this.setStartPage.bind(this)}
            handleFimIntervalo={this.setEndPage.bind(this)} mudarModo={this.setModo.bind(this)} mudarExtracao={this.setExtracao.bind(this)}
            data={this.state.data} definirTamanho={this.setSize.bind(this)} definirTamanhoInput={this.setInputSize.bind(this)}
            handleCheck={this.setOnlyOne.bind(this)} check={this.state.onlyOne} setPages={this.setPages.bind(this)} />
          </div>
          
        </React.Fragment>
      );
    }else if (this.state.ready){
      return(
        <React.Fragment>
          <CircularProgress className='CircularProgress' />
          <PainelLateral exibir={this.state.isButtonMergeClick} executar={this.handleDivide.bind(this)} arquivos={this.state.data.files}
           inicio={this.state.data.startPage} fim={this.state.data.endPage} handleInicioIntervalo={this.setStartPage.bind(this)}
           handleFimIntervalo={this.setEndPage.bind(this)} mudarModo={this.setModo.bind(this)} mudarExtracao={this.setExtracao.bind(this)}
           data={this.state.data} definirTamanho={this.setSize.bind(this)} definirTamanhoInput={this.setInputSize.bind(this)} />
        </React.Fragment>
      );
    }  else { 
      return (
        <React.Fragment>

        <div className="nav-bar">
          <NavBar/>
        </div>

        <div className="pageContainer-stage-01">

          <div className="title">

            <h1>
              Dividir arquivo PDF
            </h1>

            <p>
            Selecione um intervalo de páginas, separe uma página, divida em um tamanho específico, 
            ou converta cada página do documento em arquivo PDF independente. 
            </p>

          </div>

          <InputFileArea onDrop={this.onDrop.bind(this)} />

          <div className="button">

            <label htmlFor="files">
              Selecionar arquivos PDF
            </label>

            <input id="files" type="file" accept='application/pdf' ref={this.state.fileInputDividirPDF} onChange={this.processOnChange} multiple/>
          
          </div>
          
        </div>

        </React.Fragment>
      );
    }
  }
}

export default DividirPDFPage;


