from django.contrib.auth import authenticate, login, logout

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

# Create your views here.
def index(request):
    if not request.user.is_authenticated:
        return render(request, "../../users/templates/login.html", {"message": None})
    context={"user":request.user}
    return render (request, "../../users/templates/user.html")

def login(request):

    return render(request, "../../users/templates/login.html")

def logout(request):
    return render(request, "../../users/templates/logout.html")
