from django.urls import path
from . import views

urlpatterns = [
    path('juntarPDF/', views.JuntarPDF.as_view() ),
    # path('juntarPDF/', views.JuntarPDF ),
    path('dividirPDF/', views.DividirPDF.as_view() ),
    path('comprimirPDF/', views.ComprimirPDF.as_view() ),
    path('PDFtoJPG/', views.PDFtoJPG.as_view() ),
    path('pesquisarPDF/', views.PesquisarPDF.as_view() ),
]