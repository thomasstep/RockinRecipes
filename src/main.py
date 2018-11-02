import django

from ioFunctions import loadRecipesJson, loadUsersJson, saveUsersJson
from algorithms import getSimilarUsers, getSimilarRecipes

fileNames = ["chickenRecipes.json", "beefRecipes.json", "porkRecipes.json", "tofuRecipes.json", "riceRecipes.json", "beansRecipes.json", "americanRecipes.json", "chineseRecipes.json", "mexicanRecipes.json", "italianRecipes.json"]
recipes = {}
for fileName in fileNames:
    recipeGenre = loadRecipesJson(fileName)
    recipes.update(recipeGenre)
users = loadUsersJson()
for user in users:
    getSimilarUsers(user, users)
getSimilarRecipes(0, recipes)
