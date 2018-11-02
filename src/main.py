import django

from ioFunctions import loadRecipesJson

fileNames = ["chickenRecipes.json", "beefRecipes.json", "porkRecipes.json", "tofuRecipes.json", "riceRecipes.json", "beansRecipes.json", "americanRecipes.json", "chineseRecipes.json", "mexicanRecipes.json", "italianRecipes.json"]
for fileName in fileNames:
    #print(fileName)
    loadRecipesJson(fileName)
