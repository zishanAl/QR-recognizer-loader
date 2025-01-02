from django.contrib import admin
from .models import ARModel

@admin.register(ARModel)
class ARModelAdmin(admin.ModelAdmin):
    list_display = ('modelId', 'name', 'qrurl', 'url')
    search_fields = ('name',)
