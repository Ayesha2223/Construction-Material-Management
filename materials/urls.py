# materials/urls.py
from django.conf import settings
from django.urls import path
from . import views
from django.conf.urls.static import static


urlpatterns = [
    path('', views.home, name='home'),
    path('services/', views.services, name='services'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('submit_service_request/', views.submit_service_request, name='submit_service_request'),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('submit-inquiry/', views.submit_inquiry, name='submit_inquiry'),
    path('submit_contact/', views.submit_contact, name='submit_contact'),
    path('view-requests/', views.view_service_requests, name='view_requests'),
    path('service-request/material-supply/', views.material_supply_request, name='material_supply_request'),
    path('service-request/labor-services/', views.labor_services_request, name='labor_services_request'),
    path('service-request/equipment-rental/', views.equipment_rental_request, name='equipment_rental_request'),
    path('service-request/project-planning/', views.project_planning_request, name='project_planning_request'),
    path('service-request/finishing-work/', views.finishing_work_request, name='finishing_work_request'),
    path('service-request/renovation/', views.renovation_request, name='renovation_request'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)