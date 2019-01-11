from django.urls import path

from . import views as views
from users import views as users_views

urlpatterns = [
    path("", views.index, name="index"),
    path("menu/", views.menu, name="menu"),
    path("data/", views.data, name="data"),
    path("<int:dishId>", views.price, name='price'),
    path("submit/<str:dataord>", views.submit, name='submit'),
    path("orders", views.orders, name="orders")
]
