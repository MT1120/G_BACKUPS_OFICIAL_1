from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.exceptions import ValidationError

class TapeType(models.Model):
    tapeTypeCode = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    size = models.FloatField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    # used_at = models.DateTimeField(default=timezone.now, null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="TapeTypes")

    # def clean(self):
    #     # Asegura que used_at no esté en el futuro
    #     if self.used_at and self.used_at > timezone.now():
    #         raise ValidationError("La fecha de uso no puede estar en el futuro.")
    

    def __str__(self):
        return self.name
    
    
class Tape(models.Model):
    SI = "S"
    NO = "N"

    CHOICES = [
        (SI, "S"),
        (NO, "N"),
    ]

    tapeType= models.ForeignKey(TapeType, on_delete=models.CASCADE, related_name="Tapes")
    consecutive = models.CharField(max_length=50, unique=True)
    estatus = models.CharField(max_length=25)
    used = models.CharField(max_length=25)
    onCustody = models.CharField(max_length=1, choices=CHOICES, default=NO)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    used_at = models.DateTimeField(default=timezone.now, null=True, blank=True)
    
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Tapes")

    def clean(self):
        # Asegura que used_at no esté en el futuro
        if self.used_at and self.used_at > timezone.now():
            raise ValidationError("La fecha de uso no puede estar en el futuro.")

    @property
    def total_backups(self):
        # Assuming you have a related_name='books' on the ForeignKey field in Book model
        return self.backups.count()

    
    def __str__(self):
        return self.consecutive
    
class Cloud(models.Model):
    cloud_name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    used_at = models.DateTimeField(default=timezone.now, null=True, blank=True)
    
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="clouds")

    def clean(self):
        # Asegura que used_at no esté en el futuro
        if self.used_at and self.used_at > timezone.now():
            raise ValidationError("La fecha de uso no puede estar en el futuro.")
        
    def __str__(self):
        return self.cloud_name
    

class CustodyTape(models.Model):
    

    tape= models.OneToOneField(Tape, on_delete=models.CASCADE, related_name="custodyTape")
    #consecutive = models.CharField(max_length=50)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="custodyTape")

    def __str__(self):
        return self.consecutive

      
class Frecuency(models.Model):
    
    valueCode = models.CharField(max_length=50, unique=True)
    value = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    author  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="frecuency")
    
    #location = models.CharField(max_length=3, choices=location_choices, default=BARRANQUILLA)
        
    def __str__(self):
        return self.value
    
class Element(models.Model):
    elementCode = models.CharField(max_length=50, unique=True)
    elementType= models.CharField(max_length=150)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="elements")

    def __str__(self):
        return self.elementType
    

class SupportedServiced (models.Model):

    # BARRANQUILLA = "BQ"
    # GUAJIRA = "TEG"
    # GECELCA_3 = "G3"
    # location_choices = {
    #     BARRANQUILLA: "BQ",
    #     GUAJIRA: "TEG",
    #     GECELCA_3:"G3",
    # }

    
    element  = models.ForeignKey(Element, on_delete=models.CASCADE, related_name="supportedServices")
    serviceType = models.CharField(max_length=150)
    #location = models.CharField(max_length=3, choices=location_choices, default=BARRANQUILLA)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="supportedServices")

    def __str__(self):
        return self.serviceType
    

class CopiedInformation (models.Model):

    
    
    element  = models.ForeignKey(Element, on_delete=models.CASCADE, related_name="copiedInf")
    #location = models.CharField(max_length=3, choices=location_choices, default=BARRANQUILLA)
    copiedInf = models.CharField(max_length=150)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="copiedInf")

    def __str__(self):
        return self.copiedInf



class Backup(models.Model):


    tape = models.ForeignKey(Tape, on_delete=models.CASCADE, related_name="backups")
    element = models.ForeignKey(Element, on_delete=models.CASCADE, related_name="backups")
    consecutive = models.CharField(max_length=50, unique=True)
    #
    tool = models.CharField(max_length=150)
    #
    frecuency = models.ForeignKey(Frecuency, on_delete=models.CASCADE, related_name="backups")
    security = models.CharField(max_length=50)
    copyType = models.CharField(max_length=50)
    
    status = models.CharField(max_length=50)
    storage_size= models.FloatField()
    #
    storaget_at =  models.CharField(max_length=50)
    #location = models.CharField(max_length=3, choices=location_choices, default=BARRANQUILLA)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    used_at = models.DateTimeField(default=timezone.now, null=True, blank=True)
    author  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="backups")
    
    def clean(self):
        # Asegura que used_at no esté en el futuro
        if self.used_at and self.used_at > timezone.now():
            raise ValidationError("La fecha de uso no puede estar en el futuro.")

    def __str__(self):
        return self.consecutive
    
class CloudBackup(models.Model):
    cloud = models.ForeignKey(Cloud, on_delete=models.CASCADE, related_name="cloudBackups")
    element = models.ForeignKey(Element, on_delete=models.CASCADE, related_name="cloudBackups")
    consecutive = models.CharField(max_length=50, unique=True)
    tool = models.CharField(max_length=150)
    #
    frecuency = models.ForeignKey(Frecuency, on_delete=models.CASCADE, related_name="cloudBackups")
    
    copyType = models.CharField(max_length=50)
    
    status = models.CharField(max_length=50)
    storage_size= models.FloatField()
    #
    storaget_at =  models.CharField(max_length=50)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    used_at = models.DateTimeField(default=timezone.now, null=True, blank=True)
    author  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cloudBackups")
    
    def clean(self):
        # Asegura que used_at no esté en el futuro
        if self.used_at and self.used_at > timezone.now():
            raise ValidationError("La fecha de uso no puede estar en el futuro.")

    def __str__(self):
        return self.consecutive
    
class sendHistory(models.Model):
    
    #consecutive = models.CharField(max_length=50)
    tape  = models.ManyToManyField(Tape, related_name="sendhistory")
    formato = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    used_at = models.DateTimeField(default=timezone.now, null=True, blank=True)
    author  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sendhistory")

    def clean(self):
        # Asegura que used_at no esté en el futuro
        if self.used_at and self.used_at > timezone.now():
            raise ValidationError("La fecha de uso no puede estar en el futuro.")
        
    def __str__(self):
        return self.consecutive
    

class recoverHistory(models.Model):
    
    #consecutive = models.CharField(max_length=50)
    tape  = models.ManyToManyField(Tape,  related_name="recoverhistory")
    formato = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    used_at = models.DateTimeField(default=timezone.now, null=True, blank=True)
    author  = models.ForeignKey(User, on_delete=models.CASCADE, related_name="recoverhistory")

    def clean(self):
        # Asegura que used_at no esté en el futuro
        if self.used_at and self.used_at > timezone.now():
            raise ValidationError("La fecha de uso no puede estar en el futuro.")
    def __str__(self):
        return self.consecutive

 



