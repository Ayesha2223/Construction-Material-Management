from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Material, ServiceRequest

def home(request):
    return render(request, 'materials/home.html')

def services(request):
    return render(request, 'materials/services.html')

def about(request):
    return render(request, 'materials/about.html')

def contact(request):
    return render(request, 'materials/contact.html')

@login_required
def submit_service_request(request):
    if request.method == 'POST':
        service_type = request.POST.get('service_type')
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone_number = request.POST.get('phone_number')
        details = request.POST.get('details')
        
        # Optional fields
        address = request.POST.get('address', '')
        city = request.POST.get('city', '')
        state = request.POST.get('state', '')
        zip_code = request.POST.get('zip_code', '')
        
        # Create service request
        service_request = ServiceRequest(
            service_type=service_type,
            name=name,
            email=email,
            phone_number=phone_number,
            details=details,
            address=address,
            city=city,
            state=state,
            zip_code=zip_code
        )
        service_request.save()
        
        # Check if request is AJAX
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({'success': True})
        
        # Redirect to services page with success message
        messages.success(request, 'Your service request has been submitted successfully!')
        return redirect('services')
    
    return redirect('services')

def register_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password != confirm_password:
            messages.error(request, "Passwords do not match!")
            return redirect('register')

        # Check if username or email already exists
        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists!")
        elif User.objects.filter(email=email).exists():
            messages.error(request, "Email already in use!")
        else:
            # Create new user
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            messages.success(request, "Registration successful! Please login.")
            return redirect('login')

    return render(request, 'materials/register.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        # Authenticate user
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, "Invalid credentials!")
    
    return render(request, 'materials/login.html')

def logout_view(request):
    logout(request)
    return redirect('login')

@csrf_exempt
def submit_inquiry(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone_number = request.POST.get('phone_number')
        product_service = request.POST.get('product_service')
        additional_info = request.POST.get('additional_info')
        
        # Check if request is AJAX
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({'success': True})
        
        # Redirect to home page with success message
        messages.success(request, 'Your inquiry has been submitted successfully!')
        return redirect('home')
    
    return redirect('home')

@login_required
def view_service_requests(request):
    if request.user.is_superuser:
        service_requests = ServiceRequest.objects.all().order_by('-created_at')
        return render(request, 'materials/view_requests.html', {'service_requests': service_requests})
    else:
        messages.error(request, "Access denied. Admin privileges required.")
        return redirect('home')
from django.shortcuts import render, redirect
from django.contrib import messages

@csrf_exempt
def submit_contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        try:
            # Logic to send email or handle contact form submission
            messages.success(request, 'Your message has been sent successfully.')
        except Exception as e:
            messages.error(request, 'Failed to send message. Please try again later.')
            
        return redirect('contact')
    
    return render(request, 'materials/contact.html')

def material_supply_request(request):
    return render(request, 'materials/material_supply_request.html')

def labor_services_request(request):
    return render(request, 'materials/labor_services_request.html')

def equipment_rental_request(request):
    return render(request, 'materials/equipment_rental_request.html')

def project_planning_request(request):
    return render(request, 'materials/project_planning_request.html')

def finishing_work_request(request):
    return render(request, 'materials/finishing_work_request.html')

def renovation_request(request):
    return render(request, 'materials/renovation_request.html')


from django.shortcuts import render, redirect
from django.contrib import messages
from .models import ServiceRequest  # Make sure to import your ServiceRequest model

def submit_service_request(request):
    if request.method == 'POST':
        service_type = request.POST.get('service_type')
        name = request.POST.get('name')
        phone_number = request.POST.get('phone_number')
        email = request.POST.get('email')
        quantity = request.POST.get('quantity')
        details = request.POST.get('details')

        # Create a new ServiceRequest object
        service_request = ServiceRequest(
            service_type=service_type,
            name=name,
            phone_number=phone_number,
            email=email,
            quantity=quantity,
            details=details
        )
        service_request.save()  # Save to the database

        messages.success(request, 'Your request has been submitted successfully!')
        return redirect('services')  # Redirect to the services page or another page

    return redirect('services')  # Redirect if not a POST request