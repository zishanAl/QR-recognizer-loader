from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ARModel
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import qrcode
import io

class ARModelInfoView(APIView):
    """
    API endpoint to retrieve information about a specific AR Model using modelId.
    """
    def get(self, request, modelId):
        try:
            # Fetch the ARModel object by modelId
            model = ARModel.objects.get(modelId=modelId)
            # Return the model's information
            return Response(
                {
                    "modelId": model.modelId,
                    "name": model.name,
                    "qrurl": model.qrurl,
                    "url": model.url,
                },
                status=status.HTTP_200_OK,
            )
        except ARModel.DoesNotExist:
            # If the modelId does not exist, return a 404 error
            return Response({"error": "Model not found"}, status=status.HTTP_404_NOT_FOUND)

class Upload3DModelView(APIView):
    """
    API endpoint to upload a 3D model file and generate a QR code.
    """
    def post(self, request):
        try:
            file = request.FILES['model']
            name = request.data.get('name')

            # Save the 3D model file
            filepath = default_storage.save(f"models/{file.name}", file)
            model_url = f"https://qr-recogniser.onrender.com/media/{filepath}"

            # Create the ARModel instance first to get the modelId
            model = ARModel.objects.create(
                name=name,
                url=model_url,
                qrurl=''  # Temporary placeholder
            )

            # Generate QR Code that links to the model's info endpoint
            qr_value = f"https://qr-recogniser.onrender.com/arinfo/{model.modelId}/"
            qr_img = qrcode.make(qr_value)

            # Save QR code to in-memory file
            qr_buffer = io.BytesIO()
            qr_img.save(qr_buffer, format='PNG')
            qr_buffer.seek(0)  # Reset buffer pointer to the beginning
            qr_filename = f"qr/{model.modelId}.png"
            qr_path = default_storage.save(qr_filename, ContentFile(qr_buffer.read()))

            # Update the ARModel instance with the correct qrurl
            model.qrurl = f"https://qr-recogniser.onrender.com/media/{qr_filename}"
            model.save()

            return Response(
                {"qr_value": qr_value, "qr_image": model.qrurl},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            # Handle unexpected errors
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)