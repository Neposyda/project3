from django.db import models


# Create your models here.
class Categorie(models.Model):
    name = models.CharField(max_length=15, blank=False)
    subtype = models.IntegerField(default=0, blank=False)

    def __str__(self):
        return f"{self.name}"


class Dish(models.Model):
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, blank=False)
    complement = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return f"{self.name}"


class PriceCategories(models.Model):
    name = models.CharField(max_length=10, blank=False)

    def __str__(self):
        return f"{self.name}"


class Price(models.Model):
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE)
    categorie = models.ForeignKey(PriceCategories, on_delete=models.CASCADE)
    small = models.DecimalField(blank=True, max_digits=5, decimal_places=2)
    large = models.DecimalField(blank=False, max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.dish.name} / {self.categorie.name}: small=${self.small} large=${self.large}"


class Prices(models.Model):
    dishes = models.ManyToManyField(Dish)
    pricecategories = models.ManyToManyField(PriceCategories)
    small = models.DecimalField(blank=True, max_digits=5, decimal_places=2)
    large = models.DecimalField(blank=False, max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.dishes.get().name} / {self.pricecategories.get().name}: small=${self.small} large=${self.large}"


class Orders(models.Model):
    number = models.CharField(blank=False, max_length=15)
    data = models.DateTimeField(blank=False)
    total_cost = models.DecimalField(blank=False, max_digits=5, decimal_places=2)
    status = models.IntegerField(choices=((1, 'edit'),(2, 'completed'), (3, 'paid'), (4, 'done')), default=1)
    user = models.CharField(blank=True, max_length=15)

    def __str__(self):
        return f"{self.data.date()}: ord.{self.number}- ${self.total_cost}/{self.status}"


class OrdersItems(models.Model):
    order = models.ForeignKey(Orders, blank=False, on_delete=models.CASCADE)
    dish = models.ForeignKey(Dish, blank=False, on_delete=models.CASCADE)
    count = models.IntegerField(blank=False, default=0)
    price = models.ForeignKey(Prices, blank=False, on_delete=models.CASCADE)
    type = models.IntegerField(choices=((1, 'small'), (2, 'large')), default=1)

    def __str__(self):
        return f"ord. {self.order.number}: {self.dish.name}"


class ItemComplements(models.Model):
    itemord = models.ForeignKey(OrdersItems, blank=False, on_delete=models.CASCADE)
    dishcompl = models.ForeignKey(Dish, blank=False, on_delete=models.CASCADE)
    price = models.ForeignKey(Price, blank=False, on_delete=models.CASCADE)
    count = models.IntegerField(blank=False, default=0)

    def ___str___ (self):
        return self.complements.name

