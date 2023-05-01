from flask import Flask, request, jsonify
from flask_cors import CORS
import pyodbc
import bcrypt
import jwt

app = Flask(__name__)
cors = CORS(app)

server = "localhost"
database = "notes"
username = "NoteAdmin"
password = "noteadmin"
driver = "{ODBC Driver 17 for SQL Server}"
conxString = 'DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password
secret_key = "f4VOEEGXQtvl1Z1Iy5DPNIMdAhG-adaeEOjWmATw-ts"

@app.route("/readNotes")
def readNotes():
    conx = pyodbc.connect(conxString)
    query = "SELECT * from notes"
    cursor = conx.cursor()

    cursor.execute(query)

    rows = cursor.fetchall()
    conx.close()
    notes = [{"id": row[0], "title": row[1], "content": row[2], "date": row[3]} for row in rows]
    return jsonify(notes)


@app.route("/insertNotes", methods=['POST'])
def insertNotes():
    conx = pyodbc.connect(conxString)
    data = request.get_json()
    title = data["title"]
    content = data["content"]
    date = data["date"]
    cursor = conx.cursor()

    sql_query = "INSERT INTO notes (title, content, date) VALUES (?, ?, ?)"

    cursor.execute(sql_query, (title, content, date))
    conx.commit()

    cursor.execute("SELECT @@IDENTITY")
    currentId = cursor.fetchone()[0]
    conx.close()
    return jsonify({"id": currentId, "message": "Inserted Successfully"})

@app.route("/deleteNotes/<int:id>", methods=['DELETE'])
def deleteNotes(id):
    conx = pyodbc.connect(conxString)

    cursor = conx.cursor()
    sql_query = "DELETE FROM notes WHERE id = ?"

    cursor.execute(sql_query, id)

    conx.commit()
    conx.close()
    return jsonify("Deletion successful")

@app.route("/updateNotes/<int:id>", methods=['PUT'])
def updateNotes(id):
    conx = pyodbc.connect(conxString)
    data = request.get_json()
    title = data["title"]
    content = data["content"]
    date = data["date"]
    cursor = conx.cursor()

    sql_query = "UPDATE notes SET title = ?, content = ?, date = ? WHERE id = ?"

    cursor.execute(sql_query, (title, content, date, id))
    conx.commit()
    conx.close()
    return jsonify("Successfully updated")


# Login Section


@app.route("/register", methods=['POST'])
def register():
    conx = pyodbc.connect(conxString)
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    token = jwt.encode({'username': username}, secret_key, algorithm='HS256')
    password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    cursor = conx.cursor()
    query = "INSERT INTO users (username, password, token) VALUES (?, ?, ?)"

    cursor.execute(query, (username, password, token))
    conx.commit()
    conx.close()
    return jsonify({'token': token, 'username': username})


@app.route("/login", methods=['POST'])
def login():
    conx = pyodbc.connect(conxString)
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    cursor = conx.cursor()
    query = "SELECT * FROM users WHERE username = ?"
    cursor.execute(query, (username,))

    result = cursor.fetchone()
    if result:
        pwd = result[2]
        if bcrypt.checkpw(password.encode('utf-8'), pwd.encode('utf-8')):
            token = result[3]
            return jsonify({'token': token, 'username': username})
        else:
            return jsonify({'message': "Incorrect username or password"})
    else:
        return jsonify({'message': "User does not exist"})

if __name__ == "__main__":
    app.run(debug=True)