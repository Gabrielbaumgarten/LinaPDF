import React from 'react';
import './style.css';

import NavBar from '../../Components/NavBar/'
import InputFileArea from '../../Components/InputFileArea/'


import LoadingPage from '../../Components/LoadingPage/';
import PaineisDeArquivos from '../../Components/PaineisDeArquivo/'
import TelaConclusao from '../../Components/ConclusionPage/'
import BotaoFluanteAdd from '../../Components/FloatButton/'
import CircularProgress from '@material-ui/core/CircularProgress'
import { postJuntarPDF } from '../../Components/HTTPmethods'
import ErrorPage from '../../Components/ErrorPage/'

/* 
  Função que retorna o painel lateral após selecionar alguns arquivos
*/
function PainelLateral(props) {
  var tamanho = 0
  props.arquivos.forEach(arquivo =>{
    tamanho += arquivo.size
  }) 

  tamanho = Math.floor(tamanho/1000)

  if(props.arquivos.length < 2){
    return(
      <React.Fragment>
        <div className='drawer-juntar'>

          <h1>Juntar PDF</h1>
          <hr/>
          <p>Por favor, selecione mais arquivos PDF clicando novamente em <b>Selecionar Arquivos PDF</b>.
                  Selecione vários arquivos, mantendo apertado <b>Ctrl</b>.</p>

          <div className='buttonInativate'>
            <h1>
              Juntar PDF
            </h1>
          </div>

        </div>
      </React.Fragment>
    );
  }
  else {
    return(
      <React.Fragment>
        <div className="drawer-juntar">

        <h1>Juntar PDF</h1>
          <hr/>
          <p>Para alterar a ordem dos seus PDFs, <b>arraste</b> e <b>solte</b> os arquivos como prentender.</p>

          <div className="size-file">
            <p>Tamanho do arquivo final: <b>{tamanho}</b> KB</p>
          </div>
          <div className='button' onClick={() => {props.executar(!props.exibir)}}>
            <h1>
              Juntar PDF
            </h1>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

/* 
  Classe que será exportada,
  Aqui contém todos os componentes que serão renderizados na página
*/
class JuntarPDFPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isUpload: false,
      isButtonMergeClick: false,
      isUploadCompleted: false,
      ready: false, 
      fileInputJuntarPDF: React.createRef(),
      // adicionar order
      data: {files: null, pdf64: [], order: []},
      // adicionar
      resposta: null,
      respostaNome: '',
      uploadProgress: 0,
      error: false,

    };
    this.addFilesInputJuntarPDF = React.createRef();
    this.processOnChange = this.processOnChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMerge = this.handleMerge.bind(this);
    this.setUploadCompleted = this.setUploadCompleted.bind(this);
    this.processChangeFile = this.processChangeFile.bind(this);
    this.processFiles = this.processFiles.bind(this)
    // adicionar
    this.handleResposta = this.handleResposta.bind(this)
    this.setUploadProgress = this.setUploadProgress.bind(this)
    this.setOrder = this.setOrder.bind(this)
    this.setError = this.setError.bind(this)
  }

  /*Setter de variáveis */
  // adicionar
  setError(){
    this.setState({
      error: true
    })
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
      const array = Array.from(this.addFilesInputJuntarPDF.current.files)
      array.forEach(this.processChangeFile);
      data.files = array;
      
  // adicionar
      data.order.push('0')
    } else {
      const { data } = this.state;
      const array = Array.from(this.addFilesInputJuntarPDF.current.files)
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

  handleMerge(){
  // adicionar
    postJuntarPDF(this.state.data.files, 'juntar', this.handleResposta.bind(this),
                   this.setUploadProgress.bind(this), this.state.data.order, this.setError.bind(this))
    this.setState({
      isButtonMergeClick: true,
    })
  }

  // adicionar
  handleResposta(resp){
    var nome ='LinaPDF_Juntar'
    this.state.data.order.forEach(aux => {
      nome += '_' + this.state.data.files[aux].name.split('.pdf')[0]
    })
    nome += '.pdf'
    this.setState({
      respostaNome: nome,
      resposta: window.URL.createObjectURL(resp),
    })
  }


  /* Tratadores ao receber os arquivos */
  processOnChange() {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = Array.from(this.state.fileInputJuntarPDF.current.files);
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
              <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputJuntarPDF} adicionarArquivos={this.handleAdd.bind(this)} />
            </div>
            <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonMergeClick} executar={this.handleMerge.bind(this)} />
          </div>
        </React.Fragment>
      );
    } else if (this.state.ready){
      return(
        <React.Fragment>
          <NavBar/>
          <CircularProgress className='CircularProgress' />
          <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonMergeClick} executar={this.handleMerge.bind(this)} />
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
                Juntar arquivos PDF
              </h1>

              <p>
                Mesclar e juntar PDFs e colocá-los em qualquer ordem que desejar. É tudo muito fácil e rápido!
              </p>

            </div>

            <InputFileArea onDrop={this.onDrop.bind(this)} />

            <div className="button">

              <label htmlFor="files">
                Selecionar arquivos PDF
              </label>

              <input id="files" type="file" accept='application/pdf' ref={this.state.fileInputJuntarPDF} onChange={this.processOnChange} multiple/>
            
            </div>
            
          </div>

        </React.Fragment>
      );
    }
  }

}

export default JuntarPDFPage;


