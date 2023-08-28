from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import RetrieveUpdateAPIView

from .models import User
from .serializers import UserSerializer


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):

    queryset = User.objects.all()
    lookup_url_kwarg = 'user_id'
    lookup_field = 'id'
    serializer_class = UserSerializer

    def perform_update(self, serializer):
        if serializer.instance == self.request.user:
            serializer.save()
        else:
            raise PermissionDenied('You can only update your own profile.')

