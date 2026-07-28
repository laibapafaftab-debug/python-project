from django.http import HttpResponse


def home(request):
    return HttpResponse("Hello, Laiba! Welcome to Django.")


# Create your views here.
