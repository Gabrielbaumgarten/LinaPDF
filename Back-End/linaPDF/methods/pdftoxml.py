# Necessita de Java
# pip install openpyxl
import os, glob
import tabula
import pandas
from django.core.files.storage import FileSystemStorage

def ExtracTables(arquivo, modoExtracao, pagina):

    #Remoção de apenas uma tabela em uma página específica
    if modoExtracao == 'select':
        df = tabula.read_pdf(arquivo[0], pages=pagina)[0]
        # Removendo as quebras de linha nas colunas
        df.columns = df.columns.str.replace('\r', '')
        # Removendo os campos sem dados
        data = df.dropna()
        # Exportando para .xlsx
        document = data.to_excel('data1.xlsx')  

    # Removendo todas as tabelas do PDF
    else:
        df =  tabula.read_pdf(arquivo[0], pages='all')
        index = 1
        # Abrindo o arquivo
        with pandas.ExcelWriter('data1.xlsx') as writer:  
            # Percorrendo todas as tebelas da extraídas
            for tables in df:
                # Removendo as quebras de linha nas colunas
                tables.columns = tables.columns.str.replace('\r', '')
                # Removendo os campos sem dados
                data = tables.dropna()
                # Inserindo as tabelas no arquivo
                name_sheet = 'Sheet_name_' + str(index) 
                document = data.to_excel(writer, sheet_name=name_sheet)
                index += 1

    return document