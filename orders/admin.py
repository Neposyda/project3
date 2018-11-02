from django.contrib import admin

# Register your models here.
from .models import Categorie, Dish, Price, PriceCategories

admin.site.register(Categorie)
admin.site.register(Dish)
admin.site.register(Price)
admin.site.register(PriceCategories)