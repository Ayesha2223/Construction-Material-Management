// MaterialHub - Main JavaScript File

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all tooltips
    initTooltips();
    
    // Initialize toast notifications
    initToasts();
    
    // Add smooth scrolling to all links
    initSmoothScroll();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize service request forms
    initServiceForms();
    
    // Initialize inquiry form
    initInquiryForm();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize animations
    initAnimations();
    
    // Initialize dashboard charts if on dashboard page
    if (document.querySelector('.dashboard-container')) {
        initDashboardCharts();
    }
});

// Initialize Bootstrap tooltips
function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Toast notification system
function initToasts() {
    // Create toast container if it doesn't exist
    if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
}

// Show toast notification
function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.querySelector('.toast-container');
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span>${message}</span>
        </div>
        <button class="close-btn">&times;</button>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Add event listener to close button
    toast.querySelector('.close-btn').addEventListener('click', function() {
        toast.remove();
    });
    
    // Auto remove toast after duration
    setTimeout(function() {
        if (toast.parentNode) {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }
    }, duration);
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!validateForm(form)) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        });
    });
}

// Validate form fields
function validateForm(form) {
    let isValid = true;
    
    // Check required fields
    form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            showInvalidFeedback(field, 'This field is required');
        } else {
            showValidFeedback(field);
        }
    });
    
    // Check email fields
    form.querySelectorAll('input[type="email"]').forEach(field => {
        if (field.value.trim() && !isValidEmail(field.value)) {
            isValid = false;
            showInvalidFeedback(field, 'Please enter a valid email address');
        }
    });
    
    // Check password match if confirm password exists
    const password = form.querySelector('input[name="password"]');
    const confirmPassword = form.querySelector('input[name="confirm_password"]');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
        isValid = false;
        showInvalidFeedback(confirmPassword, 'Passwords do not match');
    }
    
    return isValid;
}

// Show invalid feedback for a form field
function showInvalidFeedback(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    // Create or update feedback element
    let feedback = field.nextElementSibling;
    if (!feedback || !feedback.classList.contains('invalid-feedback')) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        field.parentNode.insertBefore(feedback, field.nextSibling);
    }
    
    feedback.textContent = message;
}

// Show valid feedback for a form field
function showValidFeedback(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}

// Validate email format
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Initialize service request forms
function initServiceForms() {
    // Handle service form submissions
    document.querySelectorAll('.popup-box form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the form data
            const formData = new FormData(this);
            
            // Show loading state on button
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            // Send the form data to the server
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                // Reset loading state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                if (data.success) {
                    // Show success message
                    const formBox = this.closest('.popup-box');
                    const formContent = this.closest('.popup-content');
                    
                    // Create success message
                    const successDiv = document.createElement('div');
                    successDiv.className = 'alert alert-success mt-3';
                    successDiv.innerHTML = `
                        <h4>Thank you for your request!</h4>
                        <p>We've received your information and will contact you shortly.</p>
                        <button class="btn btn-secondary mt-2" onclick="closeForm('${formBox.id}')">Close</button>
                    `;
                    
                    // Clear form and show success message
                    this.reset();
                    this.style.display = 'none';
                    formContent.appendChild(successDiv);
                    
                    // Reset form after 5 seconds
                    setTimeout(() => {
                        this.style.display = 'block';
                        if (formContent.contains(successDiv)) {
                            formContent.removeChild(successDiv);
                        }
                    }, 5000);
                } else {
                    // Show error message
                    alert('There was an error submitting your request. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                alert('There was an error submitting your request. Please try again.');
            });
        });
    });
    
    // Handle inquiry form submission
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the form data
            const formData = new FormData(this);
            
            // Show loading state on button
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            // Send the form data to the server
            fetch('{% url "submit_inquiry" %}', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': getCookie('csrftoken')
                }
            })
            .then(response => response.json())
            .then(data => {
                // Reset loading state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                if (data.success) {
                    // Show success message
                    this.innerHTML = `
                        <div class="alert alert-success">
                            <h4>Thank you for your inquiry!</h4>
                            <p>We've received your information and will contact you shortly.</p>
                        </div>
                    `;
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        $('#inquiryModal').modal('hide');
                        setTimeout(() => {
                            this.reset();
                            this.innerHTML = originalFormHTML;
                        }, 500);
                    }, 3000);
                } else {
                    // Show error message
                    alert('There was an error submitting your inquiry. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                alert('There was an error submitting your inquiry. Please try again.');
            });
        });
        
        // Store original form HTML for reset
        const originalFormHTML = inquiryForm.innerHTML;
    }
}

// Function to get CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Initialize inquiry form
function initInquiryForm() {
    const inquiryForm = document.getElementById('inquiryForm');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(inquiryForm)) {
                return;
            }
            
            // Get form data
            const formData = new FormData(inquiryForm);
            
            // Send form data using fetch
            fetch('/submit-inquiry/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    showToast(data.message, 'success');
                    inquiryForm.reset();
                    document.querySelector('#inquiryModal .close').click();
                } else {
                    showToast(data.message || 'An error occurred', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showToast('An error occurred while submitting your inquiry', 'error');
            });
        });
    }
}

// Mobile navigation
function initMobileNav() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            navbarCollapse.classList.toggle('show');
        });
    }
}

// Initialize animations
function initAnimations() {
    // We're disabling the fade-in animations to keep services visible all the time
    // This is now handled by CSS with !important rules
    
    // Add animation classes to counters
    const counterElements = document.querySelectorAll('.counter-value');
    if (counterElements.length > 0) {
        initCounters(counterElements);
    }
}

// Function to open service form
function openForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Reset form if it was previously submitted
        const formElement = form.querySelector('form');
        if (formElement) {
            formElement.reset();
        }
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = form.querySelector('input:not([type="hidden"])');
            if (firstInput) {
                firstInput.focus();
            }
        }, 300);
    }
}

// Function to close service form
function closeForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Initialize dashboard charts
function initDashboardCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js is not loaded. Dashboard charts will not be initialized.');
        return;
    }
    
    // Task Status Chart
    const taskStatusChart = document.getElementById('taskStatusChart');
    if (taskStatusChart) {
        new Chart(taskStatusChart, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'In Progress', 'Pending'],
                datasets: [{
                    data: [12, 8, 5],
                    backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'bottom'
                }
            }
        });
    }
    
    // Hours Worked Chart
    const hoursWorkedChart = document.getElementById('hoursWorkedChart');
    if (hoursWorkedChart) {
        new Chart(hoursWorkedChart, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Hours Worked',
                    data: [8, 7.5, 8, 6, 9, 4, 0],
                    backgroundColor: 'rgba(255, 127, 80, 0.2)',
                    borderColor: '#ff7f50',
                    borderWidth: 2,
                    pointBackgroundColor: '#ff7f50',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Add CSS for animations
(function() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .fade-out {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
})();

// Function to initialize counters
function initCounters(counterElements) {
    counterElements.forEach(counter => {
        const targetValue = parseInt(counter.textContent);
        let currentValue = 0;
        
        const intervalId = setInterval(() => {
            currentValue++;
            counter.textContent = currentValue.toString();
            
            if (currentValue >= targetValue) {
                clearInterval(intervalId);
            }
        }, 10);
    });
}
