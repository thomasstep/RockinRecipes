def getSimilarUsers(userId, users):
    similarUsers = []
    jaccardScores = {}
    for user in users:
        if userId != user["id"]:
            intersection = set(user["likes"]) & set(user["dislikes"])
            union = set(user["likes"]) | set(user["dislikes"])
            jaccard = len(intersection) / len(union)
            jaccardScores[user] = jaccard

    sortedDict = sorted(jaccardScores.items(), key=operator.itemgetter(1), reverse=True)
    print(sortedDict)
    return similarUsers

def getSimilarRecipes(recipeId, recipes):
    similarRecipes = []
    # TF-IDF for recipes
    return similarRecipes
