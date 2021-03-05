import axios from 'axios'


function BuscarURL(action){
    var url
    switch (action) {
        case 'juntar':
            url = 'http://localhost:8000/linaPDF/juntarPDF/'
            break;

        case 'dividir':
            url = 'http://localhost:8000/linaPDF/dividirPDF/'
            break;

        case 'comprimir':
            url = 'http://localhost:8000/linaPDF/comprimirPDF/'
            break;

        case 'PDFtoJPG':
            url = 'http://localhost:8000/linaPDF/PDFtoJPG/'
            break;

        case 'Pesquisar':
            url = 'http://localhost:8000/linaPDF/pesquisarPDF/'
            break;
    
        default:
            break;
    }
    return url
}

async function getDataAxios(){
    const response =
    await axios.get("http://localhost:8000/linaPDF/juntarPDF/",
    )
    console.log(response.data)
}

async function postJuntarPDF(arquivos, acao, funcao, atualizaProgresso, ordem, error){

    var url = BuscarURL(acao)

    var data = new FormData()
    var index = 0
    ordem.forEach(aux => {
        data.append('arquivo'+ index, arquivos[aux])
        index += 1
    })

    try{
        const response = await axios.post( url,
            data, 
            { 
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: progressEvent => {
                    var percent = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
                    percent -= 50
                    percent = Math.max(0, percent)
                    atualizaProgresso(percent);
                    },
                onDownloadProgress: progressEvent => {
                    var percent = Math.floor((progressEvent.loaded * 100) / progressEvent.total)-50
                    percent = Math.max(0, percent)
                    atualizaProgresso(50 + percent)
                },
                responseType: 'blob',
            }
         )
        if(response.status !== 200){
            error();
            console.log("Erro ao tentar juntar dois arquivos!! Verificar o método postJuntarPDF")    
        }
        funcao(response.data)
    } catch{
        error();
    }
}

async function postGetInformation(arquivos, acao, funcao, progresso, ordem, error){
    var url = BuscarURL(acao)
    var data = new FormData()
    var index = 0
    ordem.forEach(aux => {
        data.append('arquivo'+ index, arquivos[aux])
        index += 1
    })
    data.append('getInformation', true)

    try{
        const response = await axios.post( url,
            data, 
            { 
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'json',
            }
        )
        if(response.status !== 200){
            error();    
            console.log("Erro ao buscar informações sobre o arquivo!! Verificar o método getInformation")    
        }
        funcao(response.data)
    }catch(e){
        console.log(e)
        error()
    }
}

async function postDividirPDF(dados, acao, funcao,  atualizaProgresso, onlyOne, error){

    var url = BuscarURL(acao)

    var data = new FormData()
    var index = 0
    dados.order.forEach(aux => {
        data.append('arquivo'+ index, dados.files[aux])
        index += 1
    })
    data.append('getInformation', false)
    data.append('start', dados.startPage)
    data.append('end', dados.endPage)
    data.append('modo', dados.modo)
    data.append('size', dados.size)
    data.append('onlyOne', onlyOne)
    data.append('tipoExtracao', dados.tipoExtracao)
    data.append('pages', dados.pages)

    try{
        const response = await axios.post( url,
            data, 
            { 
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: progressEvent => {
                    var percent = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
                    percent -= 50
                    percent = Math.max(0, percent)
                    atualizaProgresso(percent);
                    },
                onDownloadProgress: progressEvent => {
                    var percent = Math.floor((progressEvent.loaded * 100) / progressEvent.total)-50
                    percent = Math.max(0, percent)
                    atualizaProgresso(50 + percent)
                },
                responseType: 'blob',
            }
        )
        if(response.status !== 200){
            error();   
            console.log("Erro ao tentar dividir o arquivos!! Verificar o método postDividirPDF")   
        }
        funcao(response.data)
    } catch{
        error()
    }
}

export{getDataAxios, postJuntarPDF, postGetInformation, postDividirPDF}
