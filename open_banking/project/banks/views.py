from rest_framework.generics import RetrieveAPIView

from .models import Banks
from .serializers import BankSerializer


class BankRetrieveAPIView(RetrieveAPIView):

    queryset = Banks.objects.all()
    lookup_url_kwarg = 'bank_id'
    lookup_field = 'id'
    serializer_class = BankSerializer

