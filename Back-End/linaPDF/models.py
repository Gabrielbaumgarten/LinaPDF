from django.db import models

class Arquivos(models.Model):
    nome = models.CharField(max_length=100)
    metodo = models.CharField(max_length=100)