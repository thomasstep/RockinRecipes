import json

def loadRecipesJson(fileName):
    f = open("./data/" + fileName, "r")
    jsons = f.read()
    recipes = json.loads(jsons)
    #print(recipes)
    return recipes

def loadUsersJson():
    f = open("./data/users.json", "r")
    jsons = f.read()
    users = json.loads(jsons)
    return users

def saveUsersJson(users):
    filename = "./data/users.json"
    f = open(filename, "w")
    f.write(json.dumps(users))


def createUser(email):
    #~ filename = "./data/users.json"
    #~ f = open(filename,"r")
    users = loadUsersJson()
    new_user = {
    'likes': [],
    'dislikes': []
    }
    users[email] = new_user
    saveUsersJson(users)
