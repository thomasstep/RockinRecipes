import json

def loadRecipesJson(fileName):
    f = open("../data/" + fileName, "r")
    jsons = f.read()
    recipes = json.loads(jsons)
    #print(recipes)
    return recipes
