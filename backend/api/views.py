from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.permissions import  AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
#UserSerializer,TapeSerializer, TapeTypeSerializer, BackupSerializer
from .serializers import *
from django.contrib.auth.models import User
from .models import Tape,TapeType,Backup, Frecuency, Element, SupportedServiced, CopiedInformation,CustodyTape, sendHistory, recoverHistory, Cloud, CloudBackup
# Create your views here.
from rest_framework.response import Response
from .permissions import IsReadOnly, IsReadWrite
from django.contrib.auth.models import User, Group

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class TapeTypeViewSet(viewsets.ModelViewSet):
    queryset = TapeType.objects.all()
    serializer_class = TapeTypeSerializer
    permission_classes = [IsAuthenticated, IsReadOnly | IsReadWrite]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'created_at': ['exact', 'date', 'gte', 'lte']  # Add filtering options for datetime
    }

    def perform_create(self, serializer):

        if serializer.is_valid():
            serializer.save(author= self.request.user)
        else: 
            print(serializer.errors)

class CustodyTapeViewSet(viewsets.ModelViewSet):
    queryset = CustodyTape.objects.all()
    serializer_class = CustodyTapeSerializer
    permission_classes = [IsAuthenticated, IsReadOnly | IsReadWrite]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'created_at': ['exact', 'date', 'gte', 'lte']  # Add filtering options for datetime
    }

    def perform_create(self, serializer):

        if serializer.is_valid():
            serializer.save(author= self.request.user)
        else: 
            print(serializer.errors)

class TapeViewSet(viewsets.ModelViewSet):
    queryset = Tape.objects.all()
    serializer_class = TapeSerializer
    permission_classes = [IsAuthenticated, IsReadOnly | IsReadWrite]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'used_at': ['exact', 'date', 'gte', 'lte']  # Add filtering options for datetime
    }
    # lookup_field = 'id'

    def perform_create(self, serializer):

        if serializer.is_valid():
            serializer.save(author= self.request.user)
        else: 
            print(serializer.errors)

    
class CloudViewSet(viewsets.ModelViewSet):
    queryset = Cloud.objects.all()
    serializer_class = CloudSerializer
    permission_classes = [IsAuthenticated, IsReadOnly | IsReadWrite]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'used_at': ['exact', 'date', 'gte', 'lte']  # Add filtering options for datetime
    }

    def perform_create(self, serializer):

        if serializer.is_valid():
            serializer.save(author= self.request.user)
        else: 
            print(serializer.errors)   

# class TapeDetailView(generics.RetrieveAPIView):
#     queryset = Tape.objects.all()
#     serializer_class = TapeSerializer
#     permission_classes = [IsAuthenticated, IsReadOnly | IsReadWrite]
#     lookup_field = 'id'

    

class TapeViewSet2(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing authors and their total number of books.
    """
    queryset = Tape.objects.all()
    serializer_class = TapeSerializer
    permission_classes = [IsAuthenticated, IsReadOnly | IsReadWrite]

class BackupViewSet(viewsets.ModelViewSet):
    queryset = Backup.objects.all()
    serializer_class = BackupSerializer
    permission_classes = [IsAuthenticated, IsReadOnly | IsReadWrite]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'used_at': ['exact', 'date', 'gte', 'lte']  # Add filtering options for datetime
    }

    def perform_create(self, serializer):

        if serializer.is_valid():
            serializer.save(author= self.request.user)
        else: 
            print(serializer.errors)

class CloudBackupViewSet(viewsets.ModelViewSet):
    queryset = CloudBackup.objects.all()
    serializer_class = CloudBackupSerializer
    permission_classes = [IsAuthenticated, IsReadOnly | IsReadWrite]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'used_at': ['exact', 'date', 'gte', 'lte']  # Add filtering options for datetime
    }

    def perform_create(self, serializer):

        if serializer.is_valid():
            serializer.save(author= self.request.user)
        else: 
            print(serializer.errors)

class FrecuencyViewSet(viewsets.ModelViewSet):
    queryset = Frecuency.objects.all()
    serializer_class = FrecuencySerializers
    permission_classes = [IsAuthenticated, IsReadOnly | IsReadWrite]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'created_at': ['exact', 'date', 'gte', 'lte']  # Add filtering options for datetime
    }

    def perform_create(self, serializer):

        if serializer.is_valid():
            serializer.save(author= self.request.user)
        else: 
            print(serializer.errors)

class ElementViewSet(viewsets.ModelViewSet):
    queryset = Element.objects.all()
    serializer_class = ElementSerializers
    permission_classes = [IsAuthenticated, IsReadOnly | IsReadWrite]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'created_at': ['exact', 'date', 'gte', 'lte']  # Add filtering options for datetime
    }


    def perform_create(self, serializer):

        if serializer.is_valid():
            serializer.save(author= self.request.user)
        else: 
            print(serializer.errors)

class SupportedServicedViewSet(viewsets.ModelViewSet):
    queryset = SupportedServiced.objects.all()
    serializer_class = SupportedServiceSerializers
    permission_classes = [IsAuthenticated, IsReadOnly | IsReadWrite]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'created_at': ['exact', 'date', 'gte', 'lte']  # Add filtering options for datetime
    }

    def perform_create(self, serializer):

        if serializer.is_valid():
            serializer.save(author= self.request.user)
        else: 
            print(serializer.errors)

class CopiedInformationViewSet(viewsets.ModelViewSet):
    queryset = CopiedInformation.objects.all()
    serializer_class = CopiedInformationSerializers
    permission_classes = [IsAuthenticated, IsReadOnly | IsReadWrite]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'created_at': ['exact', 'date', 'gte', 'lte']  # Add filtering options for datetime
    }

    def perform_create(self, serializer):

        if serializer.is_valid():
            serializer.save(author= self.request.user)
        else: 
            print(serializer.errors)



class sendHistoryViewSet(viewsets.ModelViewSet):
    queryset = sendHistory.objects.all()
    serializer_class = sendHistorySerializer
    permission_classes = [IsAuthenticated, IsReadOnly | IsReadWrite]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'used_at': ['exact', 'date', 'gte', 'lte']  # Add filtering options for datetime
    }

    def perform_create(self, serializer):

        if serializer.is_valid():
            serializer.save(author= self.request.user)
        else: 
            print(serializer.errors)

class recoverHistoryViewSet(viewsets.ModelViewSet):
    queryset = recoverHistory.objects.all()
    serializer_class = recoverHistorySerializer
    permission_classes = [IsAuthenticated, IsReadOnly | IsReadWrite]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'used_at': ['exact', 'date', 'gte', 'lte']  # Add filtering options for datetime
    }

    def perform_create(self, serializer):

        if serializer.is_valid():
            serializer.save(author= self.request.user)
        else: 
            print(serializer.errors)