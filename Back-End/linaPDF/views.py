import sys
import os, shutil

from .serializers import ArquivosSerializer
from .models import Arquivos

from rest_framework import generics
from rest_framework.views import APIView
from django.http import HttpResponse
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage

from .methods.merge import merge
from .methods.getInformations import getInformations
from .methods.slipt import IntervalSplit, SizeSplit, SplitAll, SelectSplit



class JuntarPDF(APIView):

    def post(self, request, format=None):
        arquivos = []
        for index in range(len(request.data)):
            aux = 'arquivo' + str(index)
            arquivos.append(request.data.get(aux)) 
        output = merge(arquivos)
        
        fs = FileSystemStorage()
        # Buscando o arquivo que foi criado
        filename = os.path.join(os.path.dirname(os.path.abspath(__package__)), 'document-output.pdf')
        if fs.exists(filename):
            with fs.open(filename) as pdf:
                response = HttpResponse(pdf, content_type='application/pdf')
                response['Content-Disposition'] = 'attachment; filename="mypdf.pdf"'
                return response



class DividirPDF(APIView):

    def post(self, request, format=None):
        arquivo = request.data.get('arquivo0')
        if request.data.get('getInformation') == 'true':
            data = getInformations(arquivo)
            return JsonResponse(data)
        else:
            modo = int(request.data.get('modo'))
            onlyOne = request.data.get('onlyOne') 
            
            # modo 0: Por intervalo
            if modo == 0:
                start = int(request.data.get('start')) -1
                end = int(request.data.get('end'))
                IntervalSplit(arquivo, start, end, onlyOne)
            # modo 1: Por tamanho
            elif modo == 1:
                size = int(request.data.get('size')) * 1000
                SizeSplit(arquivo, size)
            # modo 2: Selecionar páginas
            else:
                extractType = request.data.get('tipoExtracao')
                if extractType == 'select':
                    pages = request.data.get('pages')
                    SelectSplit(arquivo, pages)
                else:
                    SplitAll(arquivo)


            fs = FileSystemStorage()
            # Enviando como PDF
            if onlyOne == 'true':
                filename = os.path.join(os.path.join(os.path.dirname(os.path.abspath(__package__)), 'documentosDividos'), "document-output.pdf")
                if fs.exists(filename):
                    with fs.open(filename) as pdf:
                        response = HttpResponse(pdf, content_type='application/pdf')
                        response['Content-Disposition'] = 'attachment; filename="mypdf.pdf"'
                        return response

            # Enviando como zip
            else:    
                shutil.make_archive("output_filename", 'zip', 'documentosDividos')
                # Buscando o arquivo que foi criado
                filename = os.path.join(os.path.dirname(os.path.abspath(__package__)), 'output_filename.zip')
                if fs.exists(filename):
                    with fs.open(filename) as pdf:
                        response = HttpResponse(pdf, content_type='application/octet-stream')
                        response['Content-Disposition'] = 'attachment; filename=my_file.zip'
                        return response
            

class ComprimirPDF(generics.ListCreateAPIView):
    queryset = Arquivos.objects.all()
    serializer_class = ArquivosSerializer

class PDFtoJPG(generics.ListCreateAPIView):
    queryset = Arquivos.objects.all()
    serializer_class = ArquivosSerializer

class PesquisarPDF(generics.ListCreateAPIView):
    queryset = Arquivos.objects.all()
    serializer_class = ArquivosSerializer

class Singleton(object):

    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(Singleton, cls).__new__(
                                      cls, *args, **kwargs)
        return cls._instance