from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse


def log_start(request):
    if not request.user.is_authenticated:
        return render(request, "login.html", {"message": None})

    context = {
        "user": request.user.username,
        "log": True
    }
    return render(request, "index.html", context)


def reg_start(request):
    return render(request, 'register.html')


def login_view(request):
    username = request.POST["username"]
    password = request.POST["password"]
    usercur = authenticate(request, username=username, password=password)
    if usercur is not None:
        login(request, usercur)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "login.html", {"message": "Invalid credentials."})

def logout_view(request):
    logout(request)
    return render(request, "login.html", {"message": "Logged out"})

def register_view(request):
    # username = request.POST["username"]
    # password = request.POST["password"]
    if User.objects.filter(username=request.POST["username"]).count()>0:
        return render(request, 'register.html', {'message': 'Input unical name.'})
    user = User(username=request.POST["username"], last_name=request.POST['lastname'], password=request.POST["password"], is_staff=True, is_superuser=False)
    user.set_password(request.POST['password'])
    user.save()
    return render(request, "login.html")
