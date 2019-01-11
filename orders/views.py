from django.http import JsonResponse
# from django.core import serializers
from django.shortcuts import render
from django.db import models
from orders.models import Categorie, PriceCategories, Price, Dish, Orders, OrdersItems, ItemComplements
from datetime import datetime
import json

# Create your views here.
def index(request):
    if not request.user.is_authenticated:
        return render(request, "index.html", {"log": False})
    context = {
        "user": request.user.username,
        "log": True,
        "superuser": request.user.is_superuser
    }
    return render(request, "index.html", context)


def menu(request):
    # if not request.user.is_authenticated:
    #     return render(request, "index.html", {"log": False})
    # context = {
    #     "user": request.user.username,
    #     "log": True
    # }
    dishes_list = []
    dish_normall_price = Price.objects.filter(categorie_id=1)
    for item in dish_normall_price:
        dishes_list.append({
            # 'id': item.dishes.get().id,
            'id': item.dish_id,
            'categorie_id': item.dish.categorie_id,
            # 'categorie_id': Dish.objects.get(id=item.dish_id).categorie,
            'name': item.dish.name,
            # 'name': Dish.objects.get(id=item.dish_id).name,
            'small': float(item.small),
            'large': float(item.large),
            'is_compl': Categorie.objects.filter(
                subtype=item.dish.categorie_id).count() != 0  # :)))))
        })
    content = {'categories_list': Categorie.objects.all(),
               'dishes_list': dishes_list,
               'log': request.user.is_authenticated,
               'user': request.user.username}
    return render(request, 'menu.html', content)


def TableToJSON (obj: models.Model):
    obj_dict = []
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
        'log': request.user.is_authenticated
    }
        # 'prices_list': TableToJSON(Price)}
    return JsonResponse(datadict)


def price(request, dishId):
    pr = []
    for item in Price.objects.filter(dish_id=dishId).values('categorie_id', 'small', 'large'):
        item['small'] = float(item['small'])
        item['large'] = float(item['large'])
        pr.append(item)
    # pr_dict={'pr_'+str(dishId): pr}
    return JsonResponse({str(dishId): pr})


def submit(request, dataord):
    rez = False
    try:
        data = json.loads(dataord)
    except:
        print("Error in 'def Submit''")
        return JsonResponse({'rez': rez})

    summ = 0.00

    order = Orders(
        number=Orders.objects.count(),
        data=datetime.now(),
        user=request.user.username)
    order.save()
    for item in data:
        # append items
        # selToOrd: idDish, idCtgDish, name
        # Dish, idCtgPrice, type, price, countDish, countCompl, complements, summ
        itmorder = OrdersItems(
            order_id=order.id,
            dish_id=item['idDish'],
            count=item['countDish'],
            price_id=Price.objects.get(dish_id=item['idDish'], categorie_id=item['idCtgPrice']).id,
            type=1 if item['type'] == 'small' else 2)
        itmorder.save()

        for compl in item['complements']:
        # append complementsm.complements
        # categorie_id, complement, count, id, name
            if compl['count']>0:
                complitem=ItemComplements(itemord_id=itmorder.id,
                                      dishcompl_id=compl['id'],
                                      price_id=itmorder.price_id,
                                      count=compl['count'])
                complitem.save()
        order.save()
    rez = True
    return JsonResponse({'rez': rez})


def orders():
    pass

