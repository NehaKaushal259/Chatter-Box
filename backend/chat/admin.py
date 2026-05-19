from django.contrib import admin
from .models import *

# Register your models here.

class MessageAdmin(admin.ModelAdmin):
    list_editable = ['is_read']
    list_display = ['sender', 'receiver', 'message', 'is_read', 'date']

admin.site.register(SignUp)
admin.site.register(Message, MessageAdmin)