from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Tape,TapeType,Backup, Frecuency, Element, SupportedServiced, CopiedInformation, sendHistory, recoverHistory, CustodyTape, Cloud, CloudBackup
from django.contrib.auth.models import User, Group
from django.core.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=[('read_only', 'Read-Only'), ('read_write', 'Read-Write')], write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        role = validated_data.pop('role')
        user = User.objects.create_user(**validated_data)
        # Assign the user to the appropriate group based on the role
        group_name = 'Read-Only' if role == 'read_only' else 'Read-Write'
        group = Group.objects.get(name=group_name)
        user.groups.add(group)
        return user
    
class TapeTypeSerializer (serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = TapeType
        fields = '__all__'  # Include all fields from the model
        extra_kwargs = {"author": {"read_only": True}}

    def __init__(self, *args, **kwargs):
        super(TapeTypeSerializer, self).__init__(*args, **kwargs)
        # Manually add 'author_name' to the fields
        self.fields['author_name'] = serializers.CharField(source='author.username', read_only=True)

class CustodyTapeSerializer(serializers.ModelSerializer):
    consecutive_name = serializers.CharField(source='tape.consecutive', read_only=True)
    class Meta:
        model = CustodyTape
        fields = '__all__'
        extra_kwargs = {
            "author": {"read_only": True},
        }
    def __init__(self, *args, **kwargs):
        super(CustodyTapeSerializer, self).__init__(*args, **kwargs)
        # Manually add 'author_name' to the fields
        self.fields['consecutive_name'] = serializers.CharField(source='tape.consecutive', read_only=True)

    

class TapeSerializer (serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    tapeType_name = serializers.CharField(source='tapeType.name', read_only=True)
    class Meta:
        model = Tape
        fields = ["id", "tapeType", "consecutive","estatus","used","onCustody","description","created_at", "used_at" ,"author", "total_backups", "author_name", "tapeType_name"]
        extra_kwargs = {"total_backups": {"read_only": True}, "author": {"read_only": True}}
    
    def get_total_backups(self, obj):
        return obj.total_backups
    
class CloudSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = Cloud
        fields = '__all__'
        extra_kwargs = {"author": {"read_only": True}}

    def __init__(self, *args, **kwargs):
        super(CloudSerializer, self).__init__(*args, **kwargs)
        # Manually add 'author_name' to the fields
        self.fields['author_name'] = serializers.CharField(source='author.username', read_only=True)
    
    

class FrecuencySerializers(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = Frecuency
        fields = '__all__'
        extra_kwargs = {"author": {"read_only": True}}

    def __init__(self, *args, **kwargs):
        super(FrecuencySerializers, self).__init__(*args, **kwargs)
        # Manually add 'author_name' to the fields
        self.fields['author_name'] = serializers.CharField(source='author.username', read_only=True)

class ElementSerializers(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = Element
        fields = '__all__'
        extra_kwargs = {"author": {"read_only": True}}

    def validate_elementCode(self, value):
        # Ensure elementCode is unique
        if Element.objects.filter(elementCode=value).exists():
            raise serializers.ValidationError("This elementCode already exists.")
        return value

    def __init__(self, *args, **kwargs):
        super(ElementSerializers, self).__init__(*args, **kwargs)
        # Manually add 'author_name' to the fields
        self.fields['author_name'] = serializers.CharField(source='author.username', read_only=True)

class SupportedServiceSerializers(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    element_name = serializers.CharField(source='element.elementType', read_only=True)
    class Meta:
        model= SupportedServiced
        fields = '__all__'
        extra_kwargs = {"author": {"read_only": True}}
    
    def __init__(self, *args, **kwargs):
        super(SupportedServiceSerializers, self).__init__(*args, **kwargs)
        # Manually add 'author_name' to the fields
        self.fields['author_name'] = serializers.CharField(source='author.username', read_only=True)
        self.fields['element_name'] = serializers.CharField(source='element.elementType', read_only=True)

class CopiedInformationSerializers(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    element_name = serializers.CharField(source='element.elementType', read_only=True)
    class Meta:
        model= CopiedInformation
        fields = '__all__'
        extra_kwargs = {"author": {"read_only": True}}

    def __init__(self, *args, **kwargs):
        super(CopiedInformationSerializers, self).__init__(*args, **kwargs)
        # Manually add 'author_name' to the fields
        self.fields['author_name'] = serializers.CharField(source='author.username', read_only=True)
        self.fields['element_name'] = serializers.CharField(source='element.elementType', read_only=True)

# class StorageSerializers(serializers.ModelSerializer):
#     author_name = serializers.CharField(source='author.username', read_only=True)
#     element_name = serializers.CharField(source='element.elementType', read_only=True)
#     class Meta:
#         model= Storage
#         fields = '__all__'
#         extra_kwargs = {"author": {"read_only": True}}

#     def __init__(self, *args, **kwargs):
#         super(StorageSerializers, self).__init__(*args, **kwargs)
#         # Manually add 'author_name' to the fields
#         self.fields['author_name'] = serializers.CharField(source='author.username', read_only=True)
#         self.fields['element_name'] = serializers.CharField(source='element.elementType', read_only=True)

class BackupSerializer (serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    element_name = serializers.CharField(source='element.elementType', read_only=True)
    frecuency_name = serializers.CharField(source='frecuency.value', read_only=True)
    tapeConcecutive = serializers.CharField(source='tape.consecutive', read_only=True)
    class Meta:
        model = Backup
        # fields = ["id", "created_at", "author","tape","consecutive","status","storage_size", "storage"]
        fields = '__all__'
        extra_kwargs = {"author": {"read_only": True}}
    
    def __init__(self, *args, **kwargs):
        super(BackupSerializer, self).__init__(*args, **kwargs)
        # Manually add 'author_name' to the fields
        self.fields['tapeConcecutive'] = serializers.CharField(source='tape.consecutive', read_only=True)
        self.fields['author_name'] = serializers.CharField(source='author.username', read_only=True)
        self.fields['element_name'] = serializers.CharField(source='element.elementType', read_only=True)
        self.fields['frecuency_name'] = serializers.CharField(source='frecuency.value', read_only=True)



class CloudBackupSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    element_name = serializers.CharField(source='element.elementType', read_only=True)
    frecuency_name = serializers.CharField(source='frecuency.value', read_only=True)
    cloudName = serializers.CharField(source='cloud.cloud_name', read_only=True)
    
    class Meta:
        model = CloudBackup
        fields = '__all__'
        extra_kwargs = {"author": {"read_only": True}}

    def __init__(self, *args, **kwargs):
        super(CloudBackupSerializer, self).__init__(*args, **kwargs)  # Usa el nombre correcto de la clase base
        self.fields['author_name'] = serializers.CharField(source='author.username', read_only=True)
        self.fields['element_name'] = serializers.CharField(source='element.elementType', read_only=True)
        self.fields['frecuency_name'] = serializers.CharField(source='frecuency.value', read_only=True)
        self.fields['cloudName'] = serializers.CharField(source='cloud.cloud_name', read_only=True)

class sendHistorySerializer (serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    tape_name = serializers.CharField(source='tape.consecutive', read_only=True)
    tape_id = serializers.CharField(source='tape.id', read_only=True)
    TapeType_name = serializers.CharField(source='tape.tapeType.name', read_only=True)
    
    class Meta:
        model = sendHistory
        # fields = ["id", "created_at", "author","tape","consecutive","status","storage_size", "storage"]
        fields = '__all__'
        extra_kwargs = {"author": {"read_only": True}}

    def __init__(self, *args, **kwargs):
        super(sendHistorySerializer, self).__init__(*args, **kwargs)
        # Manually add 'author_name' to the fields
        TapeType_name = serializers.CharField(source='tape.tapeType.name', read_only=True)
        self.fields['author_name'] = serializers.CharField(source='author.username', read_only=True)
        self.fields['tape_name'] = serializers.CharField(source='tape.consecutive', read_only=True)
        self.fields['tape_id'] = serializers.CharField(source='tape.id', read_only=True)
        


class recoverHistorySerializer (serializers.ModelSerializer):
    TapeType_name = serializers.CharField(source='tape.tapeType.name', read_only=True)
    author_name = serializers.CharField(source='author.username', read_only=True)
    tape_name = serializers.CharField(source='tape.consecutive', read_only=True)
    tape_id = serializers.CharField(source='tape.id', read_only=True)
    class Meta:
        model = recoverHistory
        # fields = ["id", "created_at", "author","tape","consecutive","status","storage_size", "storage"]
        fields = '__all__'
        extra_kwargs = {"author": {"read_only": True}}

    def __init__(self, *args, **kwargs):
        super(recoverHistorySerializer, self).__init__(*args, **kwargs)
        # Manually add 'author_name' to the fields
        TapeType_name = serializers.CharField(source='tape.tapeType.name', read_only=True)
        self.fields['author_name'] = serializers.CharField(source='author.username', read_only=True)
        self.fields['tape_name'] = serializers.CharField(source='tape.consecutive', read_only=True)
        self.fields['tape_id'] = serializers.CharField(source='tape.id', read_only=True)
