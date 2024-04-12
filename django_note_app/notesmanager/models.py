from django.db import models
from userauth.models import User

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=True, blank=True)
    is_archived = models.BooleanField(default=False)
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.body is None or self.body == "":
            return "Note with no content"
        return f"{self.body[:30]}"
