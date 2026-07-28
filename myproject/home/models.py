from django.db import models


class Developer(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, default="Python Developer")
    email = models.EmailField(unique=True)
    skills = models.CharField(
        max_length=255, help_text="Comma-separated skills, e.g. Django, DRF, PostgreSQL"
    )
    experience_years = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.role}"


# Create your models here.
