from rest_framework import serializers
from .models import Arquivos

class ArquivosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Arquivos
        fields = ['nome', 'metodo']
