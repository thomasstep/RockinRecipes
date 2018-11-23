import operator
import re
from math import log, sqrt

# Ranks users by similarity based on Jaccard
def getSimilarUsers(baseUser, allUsers):
    similarUsers = []
    jaccardScores = {}
    # Look at similar likes and dislikes in all other users
    for user in allUsers:
        if baseUser["id"] != user["id"]:
            likesIntersection = set(baseUser["likes"]) & set(user["likes"])
            likesUnion = set(baseUser["likes"]) | set(user["likes"])
            if len(likesUnion) != 0:
                likesJaccard = len(likesIntersection) / len(likesUnion)

            dislikesIntersection = set(baseUser["dislikes"]) & set(user["dislikes"])
            dislikesUnion = set(baseUser["dislikes"]) | set(user["dislikes"])
            if len(dislikesUnion) != 0:
                dislikesJaccard = len(dislikesIntersection) / len(dislikesUnion)

            # Our "Jaccard" will be the average of the two Jaccards
            jaccardScores[user["id"]] = (likesJaccard + dislikesJaccard) / 2

    sortedInfo = sorted(jaccardScores.items(), key=operator.itemgetter(1), reverse=True)
    return sortedInfo

# Returns a dictionary with the frequencies of all words in the corpus
def getCorpusTermFrequencies(recipes):
    similarRecipes = []
    # TF-IDF for recipes
    tf = {}
    totalDocs = len(recipes.keys())
    for recipe in recipes.keys():
        for ingredient in recipes[recipe]["ingredients"]:
            words = re.findall(r'\w+', ingredient["text"].lower())
            for word in words:
                currentValue = tf.get(word, 0)
                tf[word] = currentValue + 1
    return tf, totalDocs

# Returns the vector representation of a recipe's ingredients
def getVector(recipe, tf):
    recipeVector = dict.fromkeys(tf, 0)
    for ingredient in recipe["ingredients"]:
        words = re.findall(r'\w+', ingredient["text"].lower())
        for word in words:
            currentValue = recipeVector.get(word, 0)
            recipeVector[word] = currentValue + 1
    return recipeVector

# Returns the TF-IDF score of a recipe
def getTfIdf(recipeVector, tf, totalDocs):
    for word in recipeVector.keys():
        if recipeVector[word] > 0:
            recipeVector[word] = 1 + log(recipeVector[word], 10)
            recipeVector[word] *= log(totalDocs/tf[word], 10)

# Returns the cosine of two vectors
def getCosine(vectorOne, vectorTwo):
    numerator = 0
    vectorOneRoot = 0
    vectorTwoRoot = 0
    # Find dot product and sum up what will be rooted
    for word in vectorOne.keys():
        numerator += vectorOne[word] * vectorTwo[word]
        vectorOneRoot += vectorOne[word] ** 2
        vectorTwoRoot += vectorTwo[word] ** 2

    # If no words overlap cosine score is 0
    if vectorOneRoot > 0 and vectorTwoRoot > 0:
        cosine = numerator / (sqrt(vectorOneRoot) * sqrt(vectorTwoRoot))
    else:
        cosine = 0
    return cosine

# Ranks the recipes by similarity in terms of TF-IDF and Cosine similarity
def getVectorSpaceModel(recipeId, tf, recipes, totalDocs):
    similar = {}
    # Start by getting relevant info from original recipe ingredients
    recipeIdVector = getVector(recipes[str(recipeId)], tf)
    getTfIdf(recipeIdVector, tf, totalDocs)
    # Do the same for all other recipes and measure their similarities
    for recipe in recipes.keys():
        compareVector = getVector(recipes[str(recipe)], tf)
        getTfIdf(compareVector, tf, totalDocs)
        cosineScore = getCosine(recipeIdVector, compareVector)
        similar[recipe] = cosineScore
    return similar

# This function returns the first 100 most similar recipes based
# off of TF-IDF and Cosine similarity
def getSimilarRecipes(recipeId, recipes):
    tf, totalDocs = getCorpusTermFrequencies(recipes)
    similar = getVectorSpaceModel(recipeId, tf, recipes, totalDocs)
    # Sort the scores then return them
    sortedRecipes = sorted(similar.items(), key=operator.itemgetter(1), reverse=True)
    sortedRecipeIds = []
    for recipe in sortedRecipes:
        sortedRecipeIds.append(recipe[0])
    sortedRecipeIds = sortedRecipeIds[:100]
    return sortedRecipeIds

# This function returns the most popular recipes based on category
# If ten recipes have not been liked from a category the first several are
# returned until 10 recipes can be returned.
def getPopularCategoryRecipes(category, recipes, users):
    popular = {}
    for user in users.values():
        for recipeId in user["likes"]:
            if recipes[str(recipeId)]["category"] == category:
                recipeScore = popular.get(recipeId, 0)
                recipeScore += 1
                popular[recipeId] = recipeScore
    sortedPopular = sorted(popular.items(), key=operator.itemgetter(1), reverse=True)
    topTen = []
    for recipe in sortedPopular:
        topTen.append(recipe[0])
        if len(topTen) >= 10:
            break
    startingRecipe = 0
    if category == "american":
        startingRecipe = 600
    elif category == "beans":
        startingRecipe = 500
    elif category == "beef":
        startingRecipe = 100
    elif category == "chinese":
        startingRecipe = 700
    elif category == "italian":
        startingRecipe = 900
    elif category == "mexican":
        startingRecipe = 800
    elif category == "pork":
        startingRecipe = 200
    elif category == "rice":
        startingRecipe = 400
    elif category == "tofu":
        startingRecipe = 300
    while len(topTen) < 10:
        if startingRecipe not in topTen:
            topTen.append(startingRecipe)
        startingRecipe += 1
    return topTen
