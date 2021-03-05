import os
from PyPDF2 import PdfFileMerger
from django.core.files.storage import FileSystemStorage

def merge(arquivos):

    merger = PdfFileMerger()
    
    for index in range(len(arquivos)-1):
        merger.append(fileobj=arquivos[index])
        
    merger.merge(position= index+1, fileobj=arquivos[index+1])

    fs = FileSystemStorage()
    if fs.exists("document-output.pdf"):
        os.remove("document-output.pdf")
    output = open("document-output.pdf", "wb")
    merger.write(output)
    output.close()
    merger.close()
    return output