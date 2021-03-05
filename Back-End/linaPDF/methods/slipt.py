import os, glob
from PyPDF2 import PdfFileWriter, PdfFileReader
from django.core.files.storage import FileSystemStorage

# ajustar esse método para dividir os arquivos não cortar
def IntervalSplit(arquivo, inicio, fim, onlyOne):
    pasta = checkPath()

    cleanner()

    filename ='document-output.pdf'
    outputName = 'document-output'
    outputStream = open(os.path.join(pasta, filename), "wb")
    output = PdfFileWriter()
    input = PdfFileReader(arquivo)


    if onlyOne == 'true':
        for index in range(inicio, fim):
            output.addPage(input.getPage(index))
        output.write(outputStream)
        outputStream.close()
    else:
        for index in range(inicio, input.getNumPages()):
            if index == fim:
                # Fechando o arquivo
                output.write(outputStream)
                outputStream.close()

                # Limpando o writer
                output = PdfFileWriter()

                # Abre um novo arquivo
                filename = outputName + '_1' + '.pdf'
                outputStream = open(os.path.join(pasta, filename), 'wb')

            output.addPage(input.getPage(index))
        output.write(outputStream)
        outputStream.close()

def SizeSplit(arquivo, size):
    pasta = checkPath()

    cleanner()

    # Inicializando variáveis
    filename ='document-output.pdf'
    files = []
    outputName = 'document-output'
    outputStream = open(os.path.join(pasta, filename), "wb")
    temp = open('auxiliar.pdf', "wb")
    output = PdfFileWriter()
    input = PdfFileReader(arquivo)

    #Preenchendo array de arquivos gerados 
    files.append(outputStream)

    for index in range(0, input.getNumPages()):
        output.addPage(input.getPage(index))
        output.write(temp)

        # verificando se o tamanho do arquivo provisório é menor que o 
        # tamanho delimitado pelo usuário
        # Se for, então é gerado um novo arquivo
        if os.stat('auxiliar.pdf').st_size > size:

            # Fechando o arquivo atual
            outputStream.close()

            # Limpando o temp
            temp.seek(0)
            temp.truncate()

            # Limpando o writer
            output = PdfFileWriter()

            # Inserindo os dados em temp para fazer a comparação do tamanho correto
            output.addPage(input.getPage(index))
            output.write(temp)

            # Abrindo um novo arquivo
            filename = outputName + '_' +  str(len(files)) + '.pdf'
            outputStream = open(os.path.join(pasta, filename), 'wb')
            files.append(outputStream)
        
        # Inserindo os dados no arquivo final
        output.write(outputStream)

    # Removendo o arquivo temp
    temp.close()
    os.remove(os.path.join(os.path.dirname(os.path.abspath(__package__)), 'auxiliar.pdf'))

def SplitAll(arquivo):
    pasta = checkPath()

    cleanner()

    files = []
    filename ='document-output.pdf'
    outputName = 'document-output'
    outputStream = open(os.path.join(pasta, filename), "wb")
    output = PdfFileWriter()
    input = PdfFileReader(arquivo)

    
    #Preenchendo array de arquivos gerados 
    files.append(outputStream)

    for index in range(input.getNumPages()):
        output.addPage(input.getPage(index))
        # Fechando o arquivo
        output.write(outputStream)
        outputStream.close()

        # Limpando o writer
        output = PdfFileWriter()

        # Abrindo um novo arquivo
        filename = outputName + '_' +  str(len(files)) + '.pdf'
        outputStream = open(os.path.join(pasta, filename), 'wb')
        files.append(outputStream)

def SelectSplit(arquivo, pages):
    # verificando a existencia da pasta
    pasta = checkPath()

    cleanner()

    # inicilizando as variáveis
    files = []
    filename ='document-output.pdf'
    outputName = 'document-output'
    output = PdfFileWriter()
    input = PdfFileReader(arquivo)

    # Ajustando o array
    pages = pages.split(',')

    for index in range(len(pages)):
        
        # Abrindo um novo arquivo
        outputStream = open(os.path.join(pasta, filename), 'wb')
        files.append(outputStream)

        if '-' in pages[index]:
            PageSplited = pages[index].split('-')

            # adicionando as páginas no intervalo
            for aux in range(int(PageSplited[0])-1, int(PageSplited[1])): 
                output.addPage(input.getPage(aux))

            # Fechando o arquivo
            output.write(outputStream)
            outputStream.close()

            # Limpando o writer
            output = PdfFileWriter()

            # Alterando o nome para o novo arquivo
            filename = outputName + '_' +  str(len(files)) + '.pdf'

        else:
            output.addPage(input.getPage(int(pages[index])-1))
            # Fechando o arquivo
            output.write(outputStream)
            outputStream.close()

            # Limpando o writer
            output = PdfFileWriter()

            # Alterando o nome para o novo arquivo
            filename = outputName + '_' +  str(len(files)) + '.pdf'

def checkPath():
    # verificando a existencia da pasta
    fs = FileSystemStorage()
    pasta = os.path.join(os.path.dirname(os.path.abspath(__package__)), 'documentosDividos')
    if fs.exists(pasta) == False:
        os.mkdir('documentosDividos')
    return pasta


def cleanner():
    # Limpando qualquer resquício de trabalhos anteriores
    for f in glob.glob(os.path.join(os.path.join(os.path.dirname(os.path.abspath(__package__)), 'documentosDividos'), "document-output*.pdf")):
        os.remove(f)