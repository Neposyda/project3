from django.http import HttpResponse
from django.shortcuts import render
from orders.models import Categorie, PriceCategories, Price, Dish

# Create your views here.
def index(request):
    # return HttpResponse("Project 3: TODO")
    return render(request, 'index.html')

def menu(request):
    content = {'categories_list': Categorie.objects.all(), 'dishes_list': Dish.objects.all()}
    print(content)
    return render(request, 'menu.html', content)

def dish_list(request, categorie_id):
    pass
