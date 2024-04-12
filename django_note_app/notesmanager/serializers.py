from rest_framework.serializers import ModelSerializer
from .models import Note

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
        read_only_fields = ('user',)
        
    # def create(self, validated_data):
    #     tags_data = validated_data.pop('tags', [])
    #     note = Note.objects.create(**validated_data)
    #     for tag_name in tags_data:
    #         tag, created = Tag.objects.get_or_create(name=tag_name, user=note.user)
    #         note.tags.add(tag)
    #     return note

    # def update(self, instance, validated_data):
    #     tags_data = validated_data.pop('tags', [])
    #     instance.tags.clear()  # Optionally clear existing tags and add new ones
    #     for tag_name in tags_data:
    #         tag, created = Tag.objects.get_or_create(name=tag_name, user=instance.user)
    #         instance.tags.add(tag)
    #     return super().update(instance, validated_data)