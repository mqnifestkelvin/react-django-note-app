from django.contrib import admin
from .models import Note

class NoteAdmin(admin.ModelAdmin):
    # Assuming you might want to list certain fields or customize the admin for Notes
    list_display = ('title', 'user', 'created', 'updated', 'is_archived')
    search_fields = ('title', 'body')
    list_filter = ('is_archived', 'created', 'updated')
    date_hierarchy = 'created'

admin.site.register(Note, NoteAdmin)
