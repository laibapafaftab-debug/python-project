from django.test import TestCase

from .models import Developer


class DeveloperModelTest(TestCase):
    def test_create_developer(self):
        dev = Developer.objects.create(
            name="Ali", email="ali@example.com", skills="Python, Django"
        )
        self.assertEqual(dev.role, "Python Developer")
        self.assertTrue(dev.is_available)


# Create your tests here.
