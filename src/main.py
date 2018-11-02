import django

from ioFunctions import loadRecipesJson, loadUsersJson, saveUsersJson
from algorithms import getSimilarUsers

fileNames = ["chickenRecipes.json", "beefRecipes.json", "porkRecipes.json", "tofuRecipes.json", "riceRecipes.json", "beansRecipes.json", "americanRecipes.json", "chineseRecipes.json", "mexicanRecipes.json", "italianRecipes.json"]
recipes = []
for fileName in fileNames:
    #   print(fileName)
    recipeGenre = loadRecipesJson(fileName)
    recipes.append(recipeGenre["recipes"])
#print(recipes)
users = loadUsersJson()
saveUsersJson(users)
for user in users:
    print(user["id"])
    getSimilarUsers(user, users)
