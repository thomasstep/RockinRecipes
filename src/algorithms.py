import operator

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

def getSimilarRecipes(recipeId, recipes):
    similarRecipes = []
    # TF-IDF for recipes
    return similarRecipes
