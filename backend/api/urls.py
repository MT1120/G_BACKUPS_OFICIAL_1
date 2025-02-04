from django.urls import path, include
from rest_framework.routers import DefaultRouter

# from .views import UserViewSet, TapeTypeViewSet, TapeViewSet, BackupViewSet,TapeViewSet2
from .views import *
# Create a router and register our viewsets with it
router = DefaultRouter()

router.register('api/tapetypes', TapeTypeViewSet, 'tapeTypes')
router.register('api/tapes', TapeViewSet, 'Tapes')
router.register('api/clouds', CloudViewSet, 'Clouds')

router.register('api/cloudBackup', CloudBackupViewSet, 'cloudBackup')
router.register('api/custodyTape', CustodyTapeViewSet, 'CustodyTape')
#router.register('api/tape/<int:id>/', TapeDetailView, 'Tape')
router.register('api/getTapes',TapeViewSet2 , 'getTapes')
router.register('api/backups', BackupViewSet, 'backups')
router.register('api/frecuency', FrecuencyViewSet, 'frecuency')
router.register('api/element', ElementViewSet, 'element')
router.register('api/ssp', SupportedServicedViewSet, 'ssp')
router.register('api/copiedInf', CopiedInformationViewSet, 'copiedInf')
# router.register('api/storage', StorageViewSet, 'storage')
router.register('api/sendTape', sendHistoryViewSet, 'sendTape')
router.register('api/recoverTape', recoverHistoryViewSet, 'recoverTape')

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('', include(router.urls)),
]