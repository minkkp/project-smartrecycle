from django.urls import path
from . import views
app_name='detection'

urlpatterns = [
    path('result', views.result,name='result'),
    path('scan', views.scan,name='scan'),
    path('upload', views.upload,name='upload'),
    path('map', views.map,name='map'),
]
