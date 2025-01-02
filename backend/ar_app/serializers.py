from rest_framework import serializers
from .models import ARModel

class ARModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ARModel
        fields = '__all__'
