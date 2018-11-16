from django.db import models


# Create your models here.
class Categorie(models.Model):
    name = models.CharField(max_length=15, blank=False)
    subtype=models.IntegerField(default=0, blank=False)

    def __str__(self):
        return f"{self.name}"


class Dish(models.Model):
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE)
    name = models.CharField(max_length=30, blank=False)
    complement = models.IntegerField(default=0, blank=True)

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
        return f"{self.dish} / {self.categorie}: small=${self.small} large=${self.large}"

