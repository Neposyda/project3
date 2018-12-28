from django.urls import path
# from django.contrib.auth import authenticate, login, logout

from . import views

urlpatterns = [
    path("log/",views.log_start, name='log'),
    path("reg/", views.reg_start, name='reg'),
    path("login/", views.login_view, name='login'),
    path("logout/", views.logout_view, name="logout"),
    path("register/", views.register_view, name="register")
]

# path("login/", views.login_view, name='login'),