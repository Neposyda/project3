from django.contrib import admin

# Register your models here.
from .models import Categorie, Dish, Price, PriceCategories, Orders, OrdersItems, ItemComplements


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
    list_per_page = 10


class ItemComplementsInline(admin.StackedInline):
    model = ItemComplements
    fields = ['dishcompl', 'count', 'price']


class ItemComplementsAdmin(admin.ModelAdmin):
    list_display = ['display_order', 'itemord', 'dishcompl', 'count']
    list_filter = ['itemord']

class OrderItemsInline(admin.StackedInline):
    model = OrdersItems
    fields = ['order', 'dish', 'count', 'type', 'price']
    # list_display = ['order', 'dish', 'count', 'type', 'price', 'display_countcompl']


class OrderItemsAdmin(admin.ModelAdmin):
    inlines = [ItemComplementsInline]
    list_display = ['order', 'dish', 'count', 'type', 'item_price', 'item_total_summ', 'display_countcompl', 'item_compl_summ']
    list_filter = ['order']


class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemsInline]
    # fieldsets = [('Order', {'fields': ['user', 'number', 'total_cost', 'status']})]
    # fields = ['user', 'number', 'total_cost', 'status']
    list_display = ['order_date', 'user', 'id', 'number', 'status', 'order_total_summ']
    list_filter = ['user', 'data', 'status']


admin.site.register(Categorie, CategorieAdmin)
admin.site.register(Dish, DishAdmin)
admin.site.register(Price, PriceAdmin)
admin.site.register(PriceCategories, PriceCategoriesAdmin)
admin.site.register(Orders, OrderAdmin)
admin.site.register(OrdersItems, OrderItemsAdmin)
admin.site.register(ItemComplements, ItemComplementsAdmin)
