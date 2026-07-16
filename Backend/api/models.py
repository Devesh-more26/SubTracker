from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, AbstractUser

# Create your models here.
class User(AbstractUser):
    # AbstractUser already has: username, email, first_name, last_name,

    def __str__(self):
        return self.email

class Subscription(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField(null=False)
    subscrib_at = models.DateField(auto_now=False)
    expire_at = models.DateField()
    number_of_user = models.IntegerField(null=False)

    def __str__(self):
        return self.name
    
    