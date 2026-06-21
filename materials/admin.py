from django.contrib import admin
from .models import Material, ServiceRequest

# Customizing the admin panel for ServiceRequest
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'service_type', 'email', 'is_verified', 'created_at')
    list_filter = ('service_type', 'is_verified')
    search_fields = ('name', 'email')
    actions = ['mark_as_verified']  # Add custom action to verify requests

    def mark_as_verified(self, request, queryset):
        queryset.update(is_verified=True)
        self.message_user(request, "Selected service requests have been verified.")
    mark_as_verified.short_description = "Mark selected requests as verified"

# Register models in admin site
admin.site.register(Material)
admin.site.register(ServiceRequest, ServiceRequestAdmin)