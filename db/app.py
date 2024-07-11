from flask import Flask, jsonify
from flask import request
from conexion_postgresql import connect_to_db

app = Flask(__name__)

# Conexion a la base de datos
connect_to_db()

@app.route("/")
def root():
    return "Hello World!"

@app.route("/usuarios")
def usuarios():
    return "usuarios"

@app.route("/usuarios/<string:cedula>")
def usuario(cedula):
    connection = connect_to_db()
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM Persona WHERE cedula = '{cedula}'")
    user = cursor.fetchone()
    cursor.close()
    connection.close()
    return jsonify(user)

@app.route("/usuarios_crear", methods=["POST"])
def crear_usuario():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos del usuario desde el body del request
    data = request.json
    
    # llamada al procedimiento almacenado usando CALL
    cursor.execute(f"CALL crear_usuario('{data['in_cedula']}', '{data['in_nombre']}', '{data['in_apellido']}', '{data['in_fecha_nacimiento']}', '{data['in_correo']}', '{data['in_tipo_usuario']}', null)")
        
    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Usuario creado exitosamente"})

if __name__ == '__main__':
    app.run(port=3000,debug=True)
