from django.http import JsonResponse
# from django.core import serializers
from django.shortcuts import render
from django.db import models
from orders.models import Categorie, PriceCategories,Price,  Prices, Dish


# Create your views here.
def index(request):
    # return HttpResponse("Project 3: TODO")
    return render(request, 'index.html')


def menu(request):
    dishes_list = []
    dish_normall_price = Price.objects.filter(categorie_id=1)
    # dish_normall_price = Prices.objects.filter(pricecategories=1)
    for item in dish_normall_price:
        dishes_list.append({
            # 'id': item.dishes.get().id,
            'id': item.dish_id,
            'categorie_id': item.dish.categorie_id,
            # 'categorie_id': Dish.objects.get(id=item.dish_id).categorie,
            'name': item.dish.name,
            # 'name': Dish.objects.get(id=item.dish_id).name,
            'small': float(item.small),
            'large': float(item.large)})
    content = {'categories_list': Categorie.objects.all(), 'dishes_list': dishes_list}
    # content = {'categories_list': Categorie.objects.all(), 'dishes_list': Dish.objects.all()}
    return render(request, 'menu.html', content)


def TableToJSON (obj: models.Model):
    obj_dict = []
    # obj = models.Model('NameTable').objects.all()
    if obj != Price:
        for item in obj.objects.values():
            obj_dict.append(item)
    else:
        for item in obj.objects.values():
            item['small'] = float(item['small'])
            item['large'] = float(item['large'])
            obj_dict.append(item)
    return obj_dict


def data(request):
    datadict = {
        'categories_dish_list': TableToJSON(Categorie),
        'dishes_list': TableToJSON(Dish),
        'categories_price_list': TableToJSON(PriceCategories),
        'prices_list': TableToJSON(Price)}
    return JsonResponse(datadict)
