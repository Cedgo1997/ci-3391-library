import json
from flask import Flask, jsonify
from flask import request
from conexion_postgresql import connect_to_db
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)
# Conexion a la base de datos
connect_to_db()

@app.route("/")
def root():
    return "Hello World!"


@app.route("/usuarios")
@cross_origin(supports_credentials=True)
def usuarios():
    return jsonify("Usuarios")


@app.route("/usuarios/<string:cedula>")
@cross_origin(supports_credentials=True)
def usuario(cedula):
    connection = connect_to_db()
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM Persona WHERE cedula = '{cedula}'")
    user = cursor.fetchone()
    cursor.close()
    connection.close()
    return jsonify(user)


@app.route("/usuarios_crear", methods=["POST"])
@cross_origin(supports_credentials=True)
def crear_usuario():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos del usuario desde el body del request
    data = request.json
    
    print("Data recibida:")
    print(data)

    # llamada al procedimiento almacenado usando CALL
    cursor.execute(
        f"CALL crear_usuario('{data['in_cedula']}', '{data['in_nombre']}', '{data['in_apellido']}', '{data['in_fecha_nacimiento']}', '{data['in_correo']}', '{data['in_tipo_usuario']}')")

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Usuario creado exitosamente"})


@app.route("/actualizar_informacion_usuario", methods=["POST"])
@cross_origin(supports_credentials=True)
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
@cross_origin(supports_credentials=True)
def registrar_nuevo_libro():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL registrar_nuevo_libro('{data['in_isbn']}','{data['in_titulo']}', '{data['in_precio']}', '{data['in_edicion']}', '{data['in_fecha_publicacion']}', '{data['in_restriccion_edad']}', '{data['in_nombre_sucursal']}', '{data['in_nombre_editorial']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Libro registrado exitosamente"})


@app.route("/vender_ejemplar", methods=["POST"])
@cross_origin(supports_credentials=True)
def vender_ejemplar():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL vender_ejemplar('{data['in_serial_ejemplar']}','{data['in_cedula_comprador']}', '{data['in_fecha_venta']}', '{data['in_nro_facturacion']}', '{data['in_payment_method']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Venta realizada"})


@app.route("/donar_ejemplar", methods=["POST"])
@cross_origin(supports_credentials=True)
def donar_ejemplar():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL donar_ejemplar('{data['in_serial_ejemplar']}','{data['in_id_donante']}', '{data['in_fecha_donacion']}', '{data['in_nombre_sucursal']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Se ha registrado correctamente la donación"})


@app.route("/registrar_asistencia_evento", methods=["POST"])
@cross_origin(supports_credentials=True)
def registrar_asistencia_evento():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL registrar_asistencia_evento('{data['in_correo']}','{data['in_pk_evento']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Asistencia registrada exitosamente"})


@app.route("/generar_reporte_libros_mas_prestados", methods=["POST"])
@cross_origin(supports_credentials=True)
def generar_reporte_libros_mas_prestados():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL generar_reporte_libros_mas_prestados('{data['in_fecha_inicio']}','{data['in_fecha_final']}')"
    )

    result = cursor.fetchall()

    cursor.close()
    connection.commit()
    connection.close()

    return json.dumps(result)


@app.route("/filtrar_libros_por_categoria", methods=["POST"])
@cross_origin(supports_credentials=True)
def filtrar_libros_por_categoria():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL filtrar_libros_por_categoria('{data['in_categoria']}','{data['in_texto']}')"
    )

    result = cursor.fetchall()

    cursor.close()
    connection.commit()
    connection.close()

    return json.dumps(result)


@app.route("/consultar_libros_mas_vendidos", methods=["POST"])
@cross_origin(supports_credentials=True)
def consultar_libros_mas_vendidos():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL consultar_libros_mas_vendidos()"
    )

    result = cursor.fetchall()

    cursor.close()
    connection.commit()
    connection.close()

    return json.dumps(result)


@app.route("/consultar_mejores_compradores", methods=["POST"])
@cross_origin(supports_credentials=True)
def consultar_mejores_compradores():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL consultar_mejores_compradores()"
    )

    result = cursor.fetchall()

    cursor.close()
    connection.commit()
    connection.close()

    return json.dumps(result)


@app.route("/consultar_bibliotecarios_que_organizan_mas_eventos", methods=["POST"])
@cross_origin(supports_credentials=True)
def consultar_bibliotecarios_que_organizan_mas_eventos():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL consultar_bibliotecarios_que_organizan_mas_eventos()"
    )

    result = cursor.fetchall()

    cursor.close()
    connection.commit()
    connection.close()

    return json.dumps(result)


@app.route("/consultar_personas_que_mas_donan_libros", methods=["POST"])
@cross_origin(supports_credentials=True)
def consultar_personas_que_mas_donan_libros():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL consultar_personas_que_mas_donan_libros()"
    )

    result = cursor.fetchall()

    cursor.close()
    connection.commit()
    connection.close()

    return json.dumps(result)

@app.route("/consultar_categorias_libros", methods=["GET"])
@cross_origin(supports_credentials=True)
def consultar_categorias_libros():
    connection = connect_to_db()
    cursor = connection.cursor()

    cursor.execute(
        f"SELECT * FROM categoría"
    )

    result = cursor.fetchall()

    cursor.close()
    connection.commit()
    connection.close()

    return json.dumps(result)

if __name__ == '__main__':
    app.run(port=3000, debug=True)
