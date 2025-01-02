from django.db import models

class ARModel(models.Model):
    modelId = models.AutoField(primary_key=True)  # Unique ID
    name = models.CharField(max_length=255)       # Name of the model
    qrurl = models.URLField()                     # URL for the QR code
    url = models.URLField()                       # URL for the 3D model

    def __str__(self):
        return self.name
