from django.contrib import admin

# Register your models here.
from .models import Categorie, Dish, Price, PriceCategories, Orders, OrdersItems


class CategorieInline(admin.StackedInline):
    model = Categorie
    fieldsets = [('category', {'fields': ['name', 'subtype']})]


class DishInline(admin.StackedInline):
    model = Dish
    fields = ['name']
    # fieldsets = [('DISH inf:', {'fields': ['id', 'name', 'complement']})]


class PriceInline(admin.StackedInline):
    model = Price
    fields = ['categorie', 'small', 'large']

class CategorieAdmin(admin.ModelAdmin):
    inlines = [DishInline]
    list_display = ['name', 'subtype']
    list_filter = ['subtype']


class DishAdmin(admin.ModelAdmin):
    inlines = [PriceInline]
    fields = ['name', 'complement']
    # fieldsets = [('DISH inf:', {'fields': ['name', 'complement']})]
    search_fields = ['name']
    list_display = ['name', 'complement']
    list_filter = ['complement', 'categorie_id']
    list_per_page = 7

class PriceCategoriesAdmin(admin.ModelAdmin):
    inlines = [PriceInline]
    # list_filter = ['name']


class PriceAdmin(admin.ModelAdmin):
    search_fields = ['dish']
    list_display = ['dish', 'categorie', 'small', 'large']
    list_filter = ['categorie']


admin.site.register(Categorie, CategorieAdmin)
admin.site.register(Dish, DishAdmin)
admin.site.register(Price, PriceAdmin)
admin.site.register(PriceCategories, PriceCategoriesAdmin)
admin.site.register(Orders)
admin.site.register(OrdersItems)
