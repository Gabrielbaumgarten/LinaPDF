import React from 'react';
import './style.css';
import LoadingPage from '../../Components/LoadingPage/';
import PaineisDeArquivos from '../../Components/PaineisDeArquivo/'
import InputFileArea from '../../Components/InputFileArea/'
import TelaConclusao from '../../Components/ConclusionPage/'
import BotaoFluanteAdd from '../../Components/FloatButton/'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress'
import ErrorPage from '../../Components/ErrorPage/'

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import NavBar from '../../Components/NavBar';

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

const linguas = ['Africâner', 'Albanês', "Alemão", 'Árabe', 'Azerbaijano', 'Basco', 'Bielorrusso', 'Bengali',
      "Búlgaro", "Catalão", "Cherokee", "Chinês (simplificado)", "Chinês (tradicional)", "Croata", 'Coreano',
       "Dinamarquês", 'Eslovaco', 'Esloveno', 'Espanhol',"Esperanto", "Estoniano", "Finlandês", "Franco", "Francês",
       "Galego",  "Grego", "Hebraico", "Holandês", 'Hindi', 'Húngaro', 'Islandês', 'Indonésio', 'Italiano', 'Italiano (Antigo)',
        'Japonês', 'Kannada', 'Letão', 'Lituano', 'Macedônio', 'Malaio', 'Malaiala', 'Maltês', 'Norueguês', 'Polonês', 'Português',
         'Romeno','Sérvio (latino)', 'Suaíli', 'Sueco', 'Tagalo', 'Tamil', 'Telugu',"Tcheco"]

function PainelLateral(props) {
    var chaves = Array.from(Array(linguas.length).keys());
    const opcoesLinguas = chaves.map(chaves => (
      <option>{linguas[chaves]}</option>
    ))  

    if(props.arquivos.length === 0){
      return(
        // Utilizando classes podemos utlizar o userStyle para sobreescrever styles já presentes do componente 
        <div className="drawer-pesquisar">
          <h1>Pesquisar no PDF</h1>
          <hr/>
          <div className='box'>
            <p>Por favor, selecione mais arquivos PDF clicando novamente em <b>Selecionar Arquivos PDF</b>.
                Selecione vários arquivos, mantendo apertado <b>Ctrl</b></p>
          </div>
          
          <div className='buttonInativate'>
            <h1>
             Pesquisar no PDF
            </h1>
          </div>
        </div>
      );
    }
    else {
      return(
        <div className="drawer-pesquisar">
            
          <ThemeProvider theme={theme}>
          <h1>Pesquisar no PDF</h1>
          <hr/>
          <div className='box'>
            <p>Tornar um arquivo PDF pesquisável ajuda muito quando se deseja encontrar rapidamente alguma palavra chave.<br/> 
                <br/>
                Selecione a lingua que deseja para a pesquisa no documento.
            </p>
          </div>
          {/* TODO: Adicionar Value nas linguas */}
          <FormControl variant="outlined" className='select-language' color='primary'>
            <InputLabel htmlFor="outlined-age-native-simple" style={{fontFamily: 'Poppins', fontWeight: '600', fontSize: '1.5rem'}}>Língua da pesquisa</InputLabel>
            <Select native label="Língua da pesquisa" value='Português' color='primary' className='options'>
              <option aria-label="None" value="" />
              {opcoesLinguas}
            </Select>
          </FormControl>

          <div className='button' onClick={() => {props.executar(!props.exibir)}}>
            <h1>
            Pesquisar no PDF
            </h1>
          </div>

          </ThemeProvider>
        </div>
      );
    }
  }
  

class PesquisarPDFPage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          // mudar para false
          isUpload: false,
          isButtonCompressClick: false,
          isUploadCompleted: false, 
          ready: false, 
          fileInputPesquisarPDF: React.createRef(),
          data: {files: null, path: null, pdf64: []},
          error: false,
      };
      this.addFilesInputPesquisarPDF = React.createRef();
      this.handleOnChange = this.handleOnChange.bind(this);
      this.onClickCompress = this.onClickCompress.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleChangeFile = this.handleChangeFile.bind(this);
      this.handleFile = this.handleFile.bind(this)
      this.handleError = this.handleError.bind(this)
  }

  // TODO: melhorar essa função quando desccobrir como serão passados os arquivos
  handleAdd() {
    
    if(this.state.data.files === null){
      const { data } = this.state;
      const array = Array.from(this.addFilesInputPesquisarPDF.current.files)
      array.forEach(this.handleChangeFile);
      data.files = array;
      // TODO:Corrigir para mais de um elemento, está pegando o valor de apenas 1
      data.path = [this.addFilesInputPesquisarPDF.current.value];
    } else {
      const { data } = this.state;
      const array = Array.from(this.addFilesInputPesquisarPDF.current.files);
      array.forEach(this.handleChangeFile);
      data.files = data.files.concat(array);
      // TODO: Ajustar os path em todas as páginas
      // data.path = data.path.concat([this.addFilesInputDividirPDF.current.value]);
    }
    this.setState({
      isUpload: false,
      ready: true,
    });
  }

  handleError(){
    this.setState({
      error: true
    })
  }

  handleDelete(index){
    const { data } = this.state;
    if((data.files.length - 1) !== index){
      data.files[index] = data.files[data.files.length - 1];
    }
    // TODO:Ajustar isso ao corrigir o problema do path
    // delete data.path[index];  
    data.files.pop();
    this.forceUpdate()
  }

  onClickCompress(){
      this.setState({
          isButtonCompressClick: true,
        })
  }
  
  handleOnChange() {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = Array.from(this.state.fileInputPesquisarPDF.current.files);
      // TODO:Corrigir para mais de um elemento, está pegando o valor de apenas 1
      data.path = [this.state.fileInputPesquisarPDF.current.value];
    }
    this.state.data.files.forEach(this.handleChangeFile);
  } 

  onDrop = acceptedFiles => {
    if(this.state.data.files === null){
      const { data } = this.state;
      data.files = acceptedFiles;
      // TODO: Verificar como passar o path que está dentro de cada arquivo para fora
      // data.path = [this.state.fileInputJuntarPDF.current.value];
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
    this.forceUpdate();
  }
  
  handleUploadCompleted(){
    this.setState({
      isUploadCompleted: true,
    })
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
              <PaineisDeArquivos arquivos={this.state.data.files} removerArquivo={this.handleDelete.bind(this)} pdf64={this.state.data.pdf64}/>
              <div className='float-button-search'>
                <BotaoFluanteAdd arquivosAdicionados={this.addFilesInputPesquisarPDF} adicionarArquivos={this.handleAdd.bind(this)} />
              </div>
              <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonCompressClick} executar={this.onClickCompress.bind(this)} />
            </div>
          </React.Fragment>
        );
      }else if (this.state.ready){
        return(
          <React.Fragment>
            <NavBar/>
            <div className='pageContainer-stage-02'>
              <CircularProgress className='CircularProgress' />
              <PainelLateral arquivos={this.state.data.files} exibir={this.state.isButtonCompressClick} executar={this.onClickCompress.bind(this)} />
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
                  Pesquisar em um arquivo PDF
                </h1>

                <p>
                Torne arquivos PDF pesquisáveis para deixar sua busca mais fácil e rápida. Otimize suas buscas em seus arquivos PDF.
                </p>

              </div>

              <InputFileArea onDrop={this.onDrop.bind(this)} />

              <div className="button">

                <label htmlFor="files">
                  Selecionar arquivos PDF
                </label>

                <input id="files" type="file" accept='application/pdf' ref={this.state.fileInputPesquisarPDF} onChange={this.handleOnChange} multiple/>
              
              </div>
              
            </div>

          </React.Fragment>
        );
      }
    }
  }
  
  export default PesquisarPDFPage;