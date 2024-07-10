from flask import Flask, jsonify
from flask import request
import psycopg2
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

@app.route("/crear_usuario", methods=["POST"])
def crear_usuario():
    try:
        connection = connect_to_db()
        cursor = connection.cursor()

        # Obtener datos del cuerpo del request
        data = request.json
        cedula = data.get('in_cedula')
        nombre = data.get('in_nombre')
        apellido = data.get('in_apellido')
        fecha_nacimiento = data.get('in_fecha_nacimiento')
        correo = data.get('in_correo')
        tipo_usuario = data.get('in_tipo_usuario')
        id_donante = data.get('in_id_donante')

        # Llamar al procedimiento almacenado
        cursor.callproc('crear_usuario', (cedula, nombre, apellido, fecha_nacimiento, correo, tipo_usuario, id_donante))
        connection.commit()

        for result in cursor.fetchall():
            print(result)

        return jsonify({"message": "Usuario creado exitosamente"})
    
    except psycopg2.DatabaseError as e:
        print(e)
        return jsonify({"error": "Error al crear usuario"}), 500
    
    finally:
        cursor.close()
        connection.close()

if __name__ == '__main__':
    app.run(port=3000,debug=True)
