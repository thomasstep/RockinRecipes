import django

from ioFunctions import loadRecipesJson, loadUsersJson, saveUsersJson

fileNames = ["chickenRecipes.json", "beefRecipes.json", "porkRecipes.json", "tofuRecipes.json", "riceRecipes.json", "beansRecipes.json", "americanRecipes.json", "chineseRecipes.json", "mexicanRecipes.json", "italianRecipes.json"]
recipes = []
for fileName in fileNames:
    #   print(fileName)
    recipeGenre = loadRecipesJson(fileName)
    recipes.append(recipeGenre["recipes"])
print(recipes)
usersDict = loadUsersJson()
print(usersDict)
users = usersDict["users"]
print(users)
saveUsersJson(users)
getSimilarUsers(users["users"][0]["id"], users)
