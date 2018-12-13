from django.urls import path

from . import views as views
from users import views as users_views

urlpatterns = [
    path("", views.index, name="index"),
    path("user/", users_views.index, name='user'),
    path("menu/", views.menu, name="menu"),
    # path("dish_list/", views.menu, name="dish_list"),
    path("data/", views.data, name="data"),
    path("<int:dishId>", views.price, name='price')
]
