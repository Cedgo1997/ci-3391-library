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
    cursor.execute(
        f"CALL crear_usuario('{data['in_cedula']}', '{data['in_nombre']}', '{data['in_apellido']}', '{data['in_fecha_nacimiento']}', '{data['in_correo']}', '{data['in_tipo_usuario']}', null)")

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Usuario creado exitosamente"})


@app.route("/actualizar_informacion_usuario", methods=["POST"])
def actualizar_informacion_usuario():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos del usuario desde el body del request
    data = request.json

    cursor.execute(
        f"CALL actualizar_informacion_usuario('{data['in_cedula']}', '{data['in_nombre']}', '{data['in_apellido']}', '{data['in_fecha_nacimiento']}', '{data['in_correo']}', '{data['in_id_donante']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Información actualizada exitosamente"})


@app.route("/registrar_nuevo_libro", methods=["POST"])
def registrar_nuevo_libro():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos del usuario desde el body del request
    data = request.json

    cursor.execute(
        f"CALL registrar_nuevo_libro('{data['in_isbn']}','{data['in_titulo']}', '{data['in_precio']}', '{data['in_edicion']}', '{data['in_fecha_publicacion']}', '{data['in_restriccion_edad']}', '{data['in_nombre_sucursal']}', '{data['in_nombre_editorial']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Libro registrado exitosamente"})


@app.route("/vender_ejemplar", methods=["POST"])
def vender_ejemplar():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos del usuario desde el body del request
    data = request.json

    cursor.execute(
        f"CALL vender_ejemplar('{data['in_serial_ejemplar']}','{data['in_cedula_comprador']}', '{data['in_fecha_venta']}', '{data['in_nro_facturacion']}', '{data['in_payment_method']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Venta realizada"})


@app.route("/donar_ejemplar", methods=["POST"])
def donar_ejemplar():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos del usuario desde el body del request
    data = request.json

    cursor.execute(
        f"CALL donar_ejemplar('{data['in_serial_ejemplar']}','{data['in_id_donante']}', '{data['in_fecha_donacion']}', '{data['in_nombre_sucursal']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Se ha registrado correctamente la donación"})


@app.route("/registrar_asistencia_evento", methods=["POST"])
def registrar_asistencia_evento():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos del usuario desde el body del request
    data = request.json

    cursor.execute(
        f"CALL registrar_asistencia_evento('{data['in_correo']}','{data['in_pk_evento']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Asistencia registrada exitosamente"})


if __name__ == '__main__':
    app.run(port=3000, debug=True)
