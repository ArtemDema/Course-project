from rest_framework.serializers import ModelSerializer
from .models import WorkerUser, PhotoProfile
from rest_framework import serializers

class UserSerializer(ModelSerializer):
  avatar = serializers.SerializerMethodField(read_only=True)
  avatar_upload = serializers.ImageField(write_only=True, required=False)

  class Meta:
    model = WorkerUser
    fields = [
      'id', 'username', 'email', 'first_name', 'last_name', 
      'city', 'education', 'about_me', 'birthday', 
      'avatar', 'avatar_upload'
    ]

    read_only_fields = ['date_joined', 'id']

  def get_avatar(self, obj):
    try:
      if obj.photoprofile and obj.photoprofile.original:
        request = self.context.get('request')
        if request is not None:
          return request.build_absolute_uri(obj.photoprofile.original.url)
        return obj.photoprofile.original.url
    except PhotoProfile.DoesNotExist:
      return None
    return None

  def update(self, instance, validated_data):
    avatar_file = validated_data.pop('avatar_upload', None)
    
    instance = super().update(instance, validated_data)

    if avatar_file:
      PhotoProfile.objects.update_or_create(
        profile=instance,
        defaults={'original': avatar_file}
      )

    return instance