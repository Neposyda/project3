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


class Orders(models.Model):
    number = models.CharField(blank=False, max_length=15)
    data = models.DateTimeField(blank=False)
    total_cost = models.DecimalField(blank=False, max_digits=5, decimal_places=2)
    status = models.IntegerField(choices=((1, 'edit'), (2, 'completed'), (3, 'paid'), (4, 'done')), default=1)
    user = models.CharField(blank=True, max_length=15)

    def __str__(self):
        return f"{self.number}/ {self.data.date()} id/{self.id}"


class OrdersItems(models.Model):
    order = models.ForeignKey(Orders, blank=False, on_delete=models.CASCADE)
    dish = models.ForeignKey(Dish, blank=False, on_delete=models.CASCADE)
    count = models.IntegerField(blank=False, default=0)
    price = models.ForeignKey(Price, blank=False, on_delete=models.CASCADE)
    type = models.IntegerField(choices=((1, 'small'), (2, 'large')), default=1)

    def GetComplAllCost(self):
        from orders.models import ItemComplements
        if ItemComplements.objects.filter(itemord_id=self.id) == 0:
            return 0.00
        cost = 0.00
        compl = ItemComplements.objects.filter(itemord_id=self.id)
        for item in compl:
            cost += float(item.GetComplCost())*self.count
        return cost

    def GetItemCost(self):
        if self.type == 1:
            price = self.price.small
        else:
            price = self.price.large
        cost = self.count * float(price) + self.GetComplAllCost()
        return cost

    def __str__(self):
        return f"N{self.order.number}/{self.order_id}..{self.id}/{self.dish.name}${self.GetItemCost()}"


class ItemComplements(models.Model):
    itemord = models.ForeignKey(OrdersItems, blank=False, on_delete=models.CASCADE)
    dishcompl = models.ForeignKey(Dish, blank=False, on_delete=models.CASCADE)
    price = models.ForeignKey(Price, blank=False, on_delete=models.CASCADE)
    count = models.IntegerField(blank=False, default=0)

    def GetComplCost(self):
        from orders.models import Price
        if Price.objects.filter(dish_id=self.dishcompl_id, categorie_id=self.itemord.price.categorie).count() == 1:
            price = Price.objects.get(dish_id=self.dishcompl_id, categorie_id=self.itemord.price.categorie)
        else:
            return 0.00
        if self.itemord.type == 1:
            cost = price.small
        else:
            cost = price.large

        return cost*self.count

    def __str__(self):
        return f"{self.itemord.order_id}..{self.itemord_id}..{self.id}/{self.dishcompl.name} ${self.GetComplCost()}"

