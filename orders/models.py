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
    status = models.IntegerField(choices=((1, 'edit'), (2, 'completed'), (3, 'paid'), (4, 'done')), default=1)
    user = models.CharField(blank=True, max_length=15)

    @property
    def order_total_summ(self):
        from orders.models import OrdersItems
        if OrdersItems.objects.filter(order_id=self.id).count()==0:
            return 0.00
        items = OrdersItems.objects.filter(order_id=self.id)
        summ = 0.00
        for item in items:
            summ += item.item_total_summ
        return summ

    @property
    def order_date(self):
        return self.data.date()

    @property
    def order_time(self):
        return self.data.time()

    def __str__(self):
        return f"{self.number}/ {self.data.date()} id/{self.id}"


class OrdersItems(models.Model):
    order = models.ForeignKey(Orders, blank=False, on_delete=models.CASCADE)
    dish = models.ForeignKey(Dish, blank=False, on_delete=models.CASCADE)
    count = models.IntegerField(blank=False, default=0)
    price = models.ForeignKey(Price, blank=False, on_delete=models.CASCADE)
    type = models.IntegerField(choices=((1, 'small'), (2, 'large')), default=1)

    @property
    def item_compl_summ(self):
        from orders.models import ItemComplements
        if ItemComplements.objects.filter(itemord_id=self.id) == 0:
            return 0.00
        summ = 0.00
        compl = ItemComplements.objects.filter(itemord_id=self.id)
        for item in compl:
            summ += item.compl_total_summ*self.count
        return summ

    @property
    def item_price(self):
        if self.type == 1:
            price = self.price.small
        else:
            price = self.price.large

        return float(price)

    @property
    def item_total_summ(self):
        return self.count * self.item_price + self.item_compl_summ

    @property
    def display_countcompl(self):
        from orders.models import ItemComplements
        return ItemComplements.objects.filter(itemord_id=self.id).count()

    def __str__(self):
        return f"N{self.order.number}/{self.order_id}..{self.id}/{self.dish.name}${self.item_total_summ}"


class ItemComplements(models.Model):
    itemord = models.ForeignKey(OrdersItems, blank=False, on_delete=models.CASCADE)
    dishcompl = models.ForeignKey(Dish, blank=False, on_delete=models.CASCADE)
    price = models.ForeignKey(Price, blank=False, on_delete=models.CASCADE)
    count = models.IntegerField(blank=False, default=0)

    @property
    def compl_total_summ(self):
        from orders.models import Price
        if Price.objects.filter(dish_id=self.dishcompl_id, categorie_id=self.itemord.price.categorie).count() == 1:
            price = Price.objects.get(dish_id=self.dishcompl_id, categorie_id=self.itemord.price.categorie)
        else:
            return 0.00
        if self.itemord.type == 1:
            price = price.small
        else:
            price = price.large
        return float(price)*self.count

    def display_order(self):
        return self.itemord.order

    def __str__(self):
        return f"{self.itemord.order_id}..{self.itemord_id}..{self.id}/{self.dishcompl.name} ${self.compl_total_summ}"

