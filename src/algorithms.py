import operator
import re
from math import log, sqrt

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

def getVector(recipe, tf):
    recipeVector = dict.fromkeys(tf, 0)
    for ingredient in recipe["ingredients"]:
        words = re.findall(r'\w+', ingredient["text"].lower())
        for word in words:
            currentValue = recipeVector.get(word, 0)
            recipeVector[word] = currentValue + 1
    return recipeVector

def getTfIdf(recipeVector, tf, totalDocs):
    for word in recipeVector.keys():
        if recipeVector[word] > 0:
            recipeVector[word] = 1 + log(recipeVector[word], 10)
            recipeVector[word] *= log(totalDocs/tf[word], 10)

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

def getSimilarRecipes(recipeId, recipes):
    tf, totalDocs = getCorpusTermFrequencies(recipes)
    similar = getVectorSpaceModel(recipeId, tf, recipes, totalDocs)
    # Sort the scores then return them
    sortedRecipes = sorted(similar.items(), key=operator.itemgetter(1), reverse=True)
    sortedRecipeIds = []
    for recipe in sortedRecipes:
        if recipe[0] != recipeId:
            sortedRecipeIds.append(recipe[0])
    sortedRecipeIds = sortedRecipeIds[:100]
    return sortedRecipeIds
