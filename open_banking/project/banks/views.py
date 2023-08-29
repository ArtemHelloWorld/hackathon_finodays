from rest_framework.generics import ListAPIView

from .models import Banks
from .serializers import BankSerializer


class BanksListAPIView(ListAPIView):

    queryset = Banks.objects.all()
    serializer_class = BankSerializer

