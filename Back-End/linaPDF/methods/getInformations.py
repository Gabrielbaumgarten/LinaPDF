from PyPDF2 import PdfFileReader

def getInformations(arquivo):

    file  = PdfFileReader(arquivo)

    data = {
        'numPages': file.getNumPages(),
        'info': file.getDocumentInfo()
    }
    
    return data