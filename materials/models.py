from django.db import models
from django.contrib.auth.models import User

class Material(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()

    def __str__(self):
        return self.name

class ServiceRequest(models.Model):
    SERVICE_CHOICES = [
        ('Painter', 'Painter'),
        ('Plumber', 'Plumber'),
        ('Electrician', 'Electrician'),
        ('Carpenter', 'Carpenter'),
        ('Mason','Mason'),
        ('Interior Designer','Interior Designer'),
        ('Roofer','Roofer'),
        ('Tiler','Tiler'),
        ('Landscaper','Landscaper'),
        ('Material Supply', 'Material Supply'),
        ('Labor Services', 'Labor Services'),
        ('Equipment Rental', 'Equipment Rental'),
        ('Project Planning', 'Project Planning'),
        ('Finishing Work', 'Finishing Work'),
        ('Renovation', 'Renovation'),
    ]
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=20, blank=True, null=True)
    service_type = models.CharField(max_length=50, choices=SERVICE_CHOICES)
    details = models.TextField()
    is_verified = models.BooleanField(default=False)  # Admin can verify the request
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.service_type}"
