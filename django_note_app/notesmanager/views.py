# from rest_framework import generics, permissions
# from .models import Note
# from .serializers import NoteSerializer
# from rest_framework.exceptions import PermissionDenied


# class NoteListCreateView(generics.ListCreateAPIView):
#     serializer_class = NoteSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         """Return notes for the currently authenticated user."""
#         return Note.objects.filter(user=self.request.user)

#     def perform_create(self, serializer):
#         """Ensure the note is associated with the current user upon creation."""
#         serializer.save(user=self.request.user)

# class NoteRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = NoteSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         """Return notes for the currently authenticated user."""
#         return Note.objects.filter(user=self.request.user)

#     def get_object(self):
#         """Retrieve and return the note for the current user."""
#         obj = super().get_object()
#         if obj.user != self.request.user:
#             raise PermissionDenied("You do not have permission to access this note.")
#         return obj



from rest_framework import generics, permissions
from .models import Note
from .serializers import NoteSerializer
from rest_framework.exceptions import PermissionDenied

class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Return notes for the currently authenticated user."""
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Ensure the note is associated with the current user upon creation."""
        serializer.save(user=self.request.user)

class NoteRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Return notes for the currently authenticated user."""
        return Note.objects.filter(user=self.request.user)

    def get_object(self):
        """Retrieve and return the note for the current user."""
        obj = super().get_object()
        if obj.user != self.request.user:
            raise PermissionDenied("You do not have permission to access this note.")
        return obj
