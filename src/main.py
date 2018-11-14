from flask import Flask, jsonify, request

from ioFunctions import loadRecipesJson, loadUsersJson, saveUsersJson, createUser, getUser
from algorithms import getSimilarUsers, getSimilarRecipes

app = Flask(__name__)

# Loading in JSON data
fileNames = ["chickenRecipes.json", "beefRecipes.json", "porkRecipes.json", "tofuRecipes.json", "riceRecipes.json", "beansRecipes.json", "americanRecipes.json", "chineseRecipes.json", "mexicanRecipes.json", "italianRecipes.json"]
recipes = {}

# Getting all the recipes
for fileName in fileNames:
    recipeGenre = loadRecipesJson(fileName)
    recipes.update(recipeGenre)

# Getting all user info
users = loadUsersJson()
createUser('homeboycav@tamu.edu')

@app.route("/getRecommendations", methods=["GET"])
def getRecommendations():
    requestJson = request.args
    originalRecipe = requestJson["recipeId"]
    similarRecipes = getSimilarRecipes(originalRecipe, recipes)
    return jsonify(similarRecipes)

@app.route("/getRecipe", methods=["GET"])
def getRecipe():
    requestJson = request.args
    recipeId = requestJson["recipeId"]
    recipeInfo = recipes[str(recipeId)]
    return jsonify(recipeInfo)

# TODO newUser, getUser (just email)

@app.route("/getUser", methods=["GET"])
def getUser():
    requestJson = request.args
    userId = requestJson["userId"]
    user = users[str(userId)]
    return jsonify(user)

# for user in users:
#     getSimilarUsers(user, users)
# similarRecipes = getSimilarRecipes(0, recipes)
# for recipe in similarRecipes:
#     if recipe[0] != "0":
#         print(recipes[recipe[0]]["name"])
