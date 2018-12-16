from django.contrib import admin

# Register your models here.
from .models import Categorie, Dish, Price, PriceCategories, Orders, OrdersItems


class DishInline(admin.StackedInline):
    model = Dish
    # fields = ['id', 'name', 'complement']
    fieldsets = [(None, {'fields': ['id', 'name', 'complement']})]


class CategorieAdmin(admin.ModelAdmin):
    # inlines = [DishInline]
    list_display = ['id', 'name', 'subtype']
    list_filter = ['subtype']


class DishAdmin(admin.ModelAdmin):
    list_filter = ['complement', 'categorie_id']


class CategorieInline(admin.StackedInline):
    model = Categorie
    fieldsets = [('category', {'fields': ['id', 'name']})]



class PriceAdmin(admin.ModelAdmin):
    # inlines = [DishInline]
    pass

admin.site.register(Categorie, CategorieAdmin)
admin.site.register(Dish, DishAdmin)
admin.site.register(Price, PriceAdmin)
admin.site.register(PriceCategories)
admin.site.register(Orders)
admin.site.register(OrdersItems)
