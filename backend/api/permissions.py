from rest_framework.permissions import BasePermission

class IsReadOnly(BasePermission):
    """
    Custom permission to allow only read operations for users in the 'Read-Only' group.
    """
    def has_permission(self, request, view):
        # Check if the user belongs to the "Read-Only" group
        is_read_only_user = request.user and request.user.groups.filter(name='Read-Only').exists()

        # Allow only safe methods for "Read-Only" users
        if is_read_only_user and request.method not in ['GET', 'HEAD', 'OPTIONS']:
            return False
        
        # Allow all actions for users not in the "Read-Only" group
        return True


class IsReadWrite(BasePermission):
    """
    Custom permission to allow full CRUD operations for certain users.
    """
    def has_permission(self, request, view):
        # Check if the user has 'Read-Write' permission
        return request.user and request.user.groups.filter(name='Read-Write').exists()
