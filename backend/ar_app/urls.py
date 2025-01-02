from django.urls import path
from .views import ARModelInfoView, Upload3DModelView

urlpatterns = [
    path('arinfo/<int:modelId>/', ARModelInfoView.as_view(), name='arinfo'),
    path('upload/', Upload3DModelView.as_view(), name='upload'),
]
