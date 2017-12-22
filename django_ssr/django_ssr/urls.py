"""django_ssr URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.http import JsonResponse
from .gql import GraphQLClient
from django.conf import settings
from django.core.cache import cache
from django.shortcuts import render

def get_result(route):
    inst = GraphQLClient(settings.GRAPHQL_ENDPOINT)
    query = """
    query getRoute($path:String) {
        route(path:$path){
            html
            css
            scripts
            styles
        }
    }
    """
    print(route)
    return inst.execute(query, {"path":f"/${route}"},"getRoute")


def get_query(route, from_cache=True):
    if from_cache:
        result = cache.get(route)
        if not result:
            result = get_result(route)
            cache.set(route,result,timeout=3600)
    else:
        result = get_result(route)
    return result


def all_urls(request, path=''):
    print(path)
    result = get_query(path,False)
    print(result)
    return render(request, 'base.html',result['data']['route'])
    # return JsonResponse(result)

urlpatterns = [
    path('', all_urls),
    # re_path('^.*$', all_urls, name='index'),
    re_path(r'^(?P<path>.*)/$', all_urls),
    path('admin/', admin.site.urls),

]
