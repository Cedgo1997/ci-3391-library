import json
from flask import Flask, jsonify
from flask import request
from conexion_postgresql import connect_to_db
from flask_cors import CORS, cross_origin
from helper.decimal_encoder import Encoder
app = Flask(__name__)
CORS(app, support_credentials=True)
# Conexion a la base de datos
connect_to_db()


@app.route("/")
def root():
    return "Hello World!"

#####################################
############### USUARIOS ############
#####################################


@app.route("/usuarios")
@cross_origin(supports_credentials=True)
def usuarios():
    connection = connect_to_db()
    cursor = connection.cursor()
    cursor.execute(f"SELECT cedula, nombre, apellido FROM Persona")
    users = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(users)


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

@app.route("/usuarios_tipo/<string:tipo_usuario>")
@cross_origin(supports_credentials=True)
def usuarios_tipo(tipo_usuario):
    connection = connect_to_db()
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM '{tipo_usuario}'")
    users = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(users)

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

#####################################
############### PRESTAMOS ###########
#####################################


@app.route("/realizar_prestamo", methods=["POST"])
@cross_origin(supports_credentials=True)
def realizar_prestamo():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL realizar_prestamo('{data['in_serial_ejemplar']}', '{data['in_cedula_lector']}', '{data['in_cedula_bibliotecario']}' , '{data['in_fecha_prestamo']}', '{data['in_fecha_devolucion']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Prestamo realizado exitosamente"})


@app.route("/realizar_devolucion", methods=["POST"])
@cross_origin(supports_credentials=True)
def realizar_devolucion():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL realizar_devolucion('{data['in_serial_ejemplar']}', '{data['in_cedula_bibliotecario']}', '{data['in_cedula_lector']}' , '{data['in_fecha_devolucion']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Devolución realizada exitosamente"})


@app.route("/reseñas_sin_aprobar", methods=["GET"])
@cross_origin(supports_credentials=True)
def reseñas_sin_aprobar():

    connection = connect_to_db()
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM Resena WHERE aprobado = false")
    resenas = cursor.fetchall()
    cursor.close()
    connection.close()
    return json.dumps(resenas)


@app.route("/ingresar_resena", methods=["POST"])
@cross_origin(supports_credentials=True)
def ingresar_resena():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL ingresar_resena('{data['in_cedula_lector']}', '{data['in_estrellas']}', '{data['in_comentario']}', '{data['in_isbn']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Reseña ingresada exitosamente"})


@app.route("/aprobar_resena", methods=["POST"])
@cross_origin(supports_credentials=True)
def aprobar_resena():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL aprobar_resena('{data['in_cedula_bibliotecario']}', '{data['in_cedula_lector']}', '{data['in_isbn']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Reseña aprobada."})


@app.route("/reseñas", methods=["GET"])
@cross_origin(supports_credentials=True)
def reseñas():

    connection = connect_to_db()
    cursor = connection.cursor()

    # Está filtrado por aprobado, bibliotecario y lector
    if len(request.args) == 3:
        cursor.execute(
            f"SELECT * FROM Resena WHERE aprobado = {request.args['aprobado']} AND cedula_bibliotecario = {request.args['cedula_bibliotecario']} AND cedula_lector = {request.args['cedula_lector']}")
    elif len(request.args) == 2:
        if "aprobado" in request.args and "cedula_bibliotecario" in request.args:
            cursor.execute(
                f"SELECT * FROM Resena WHERE aprobado = {request.args['aprobado']} AND cedula_bibliotecario = {request.args['cedula_bibliotecario']}")
        elif "aprobado" in request.args and "cedula_lector" in request.args:
            cursor.execute(
                f"SELECT * FROM Resena WHERE aprobado = {request.args['aprobado']} AND cedula_lector = {request.args['cedula_lector']}")
        elif "cedula_bibliotecario" in request.args and "cedula_lector" in request.args:
            cursor.execute(
                f"SELECT * FROM Resena WHERE cedula_bibliotecario = {request.args['cedula_bibliotecario']} AND cedula_lector = {request.args['cedula_lector']}")
    elif len(request.args) == 1:
        if "aprobado" in request.args:
            cursor.execute(
                f"SELECT * FROM Resena WHERE aprobado = {request.args['aprobado']}")
        elif "cedula_bibliotecario" in request.args:
            cursor.execute(
                f"SELECT * FROM Resena WHERE cedula_bibliotecario = {request.args['cedula_bibliotecario']}")
        elif "cedula_lector" in request.args:
            cursor.execute(
                f"SELECT * FROM Resena WHERE cedula_lector = {request.args['cedula_lector']}")

    else:
        cursor.execute(f"SELECT * FROM Resena")
    resenas = cursor.fetchall()
    cursor.close()
    connection.close()
    return json.dumps(resenas)

#####################################
############### LIBROS ##############
#####################################


@app.route("/libros", methods=["GET"])
@cross_origin(supports_credentials=True)
def libros():
    connection = connect_to_db()
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM libro")
    libros = cursor.fetchall()
    cursor.close()
    connection.close()
    return json.dumps(libros, cls=Encoder)


@app.route("/registrar_nuevo_libro", methods=["POST"])
@cross_origin(supports_credentials=True)
def registrar_nuevo_libro():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL registrar_nuevo_libro('{data['in_isbn']}', '{data['in_autor']}', '{data['in_titulo']}', '{data['in_precio']}', '{data['in_edicion']}', '{data['in_fecha_publicacion']}', '{data['in_restriccion_edad']}', '{data['in_nombre_sucursal']}', '{data['in_nombre_editorial']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Libro registrado exitosamente"})


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


@app.route("/generar_reporte_libros_mas_prestados", methods=["GET"])
@cross_origin(supports_credentials=True)
def generar_reporte_libros_mas_prestados():
    # Obtener parámetros de la consulta
    in_fecha_inicio = request.args.get('fecha_inicio')
    in_fecha_final = request.args.get('fecha_final')

    connection = connect_to_db()
    cursor = connection.cursor()
    try:

        cursor.execute(
            f"SELECT * FROM generar_reporte_libros_mas_prestados({in_fecha_inicio}, {in_fecha_final})"
        )

        result = cursor.fetchall()

        return json.dumps(result)

    except Exception as e:
        return jsonify({"message": "Error al consultar los libros más prestados"})

    finally:
        cursor.close()
        connection.commit()
        connection.close()


@app.route("/filtrar_libros_por_categoria", methods=["POST"])
@cross_origin(supports_credentials=True)
def filtrar_libros_por_categoria():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"SELECT * FROM filtrar_libros_por_categoria('{data['in_categoria']}','{data['in_texto']}')"
    )

    result = cursor.fetchall()

    cursor.close()
    connection.commit()
    connection.close()

    return json.dumps(result, cls=Encoder)


@app.route("/consultar_libros_mas_vendidos", methods=["GET"])
@cross_origin(supports_credentials=True)
def consultar_libros_mas_vendidos():
    connection = connect_to_db()
    cursor = connection.cursor()

    try:

        cursor.execute(
            f"SELECT * FROM consultar_libros_mas_vendidos()"
        )

        result = cursor.fetchall()
        return json.dumps(result)

    except Exception as e:
        return jsonify({"message": "Error al consultar los libros más vendidos"})

    finally:
        cursor.close()
        connection.commit()
        connection.close()


@app.route("/consultar_sucursales", methods=["GET"])
@cross_origin(supports_credentials=True)
def consultar_sucursales():
    connection = connect_to_db()
    cursor = connection.cursor()

    try:
        cursor.execute(
            f"SELECT * FROM sucursal"
        )
        result = [dict((cursor.description[idx][0], value)
                       for idx, value in enumerate(row)) for row in cursor.fetchall()]
        return jsonify(result)

    except Exception as e:
        return jsonify({"message": "Error al consultar las sucursales"})

    finally:
        cursor.close()
        connection.commit()
        connection.close()


@app.route("/consultar_editoriales", methods=["GET"])
@cross_origin(supports_credentials=True)
def consultar_editoriales():
    connection = connect_to_db()
    cursor = connection.cursor()

    try:
        cursor.execute(
            f"SELECT * FROM editorial"
        )

        result = cursor.fetchall()
        return json.dumps(result)

    except Exception as e:
        return jsonify({"message": "Error al consultar las editoriales"})

    finally:
        cursor.close()
        connection.commit()
        connection.close()


#####################################
############### VENTAS ##############
#####################################

# Ver todas las ventas
@app.route("/ventas", methods=["GET"])
@cross_origin(supports_credentials=True)
def ventas():
    connection = connect_to_db()
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM vende")
    ventas = cursor.fetchall()
    cursor.close()
    connection.close()
    return json.dumps(ventas, cls=Encoder)


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


@app.route("/consultar_mejores_compradores", methods=["GET"])
@cross_origin(supports_credentials=True)
def consultar_mejores_compradores():
    connection = connect_to_db()
    cursor = connection.cursor()

    try:
        cursor.execute(
            f"SELECT * FROM consultar_mejores_compradores()"
        )

        result = cursor.fetchall()
        return json.dumps(result)
    except Exception as e:
        return jsonify({"message": "Error al consultar los mejores compradores"})
    finally:
        cursor.close()
        connection.commit()
        connection.close()


#####################################
############### DONACIONES ##########
#####################################

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


@app.route("/consultar_personas_que_mas_donan_libros", methods=["GET"])
@cross_origin(supports_credentials=True)
def consultar_personas_que_mas_donan_libros():
    connection = connect_to_db()
    cursor = connection.cursor()

    try:
        cursor.execute(
            f"SELECT * FROM consultar_personas_que_mas_donan_libros()"
        )

        result = cursor.fetchall()
        return json.dumps(result)
    except Exception as e:
        return jsonify({"message": "Error al consultar las personas que más donan libros"})
    finally:
        cursor.close()
        connection.commit()
        connection.close()


#####################################
############### EVENTOS #############
#####################################

@app.route("/organizar_evento", methods=["POST"])
@cross_origin(supports_credentials=True)
def organizar_evento():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL organizar_evento('{data['in_cedula_bibliotecario']}', '{data['in_nombre_evento']}', '{data['in_fecha_inicio']}', '{data['in_fecha_final']}', '{data['in_nombre_sucursal']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Evento organizado exitosamente"})


@app.route("/consultar_eventos", methods=["GET"])
@cross_origin(supports_credentials=True)
def consultar_eventos():
    # Obtener parámetros de la consulta
    in_fecha_inicio = request.args.get('fecha_inicio')
    in_fecha_final = request.args.get('fecha_final')
    in_nombre_sucursal = request.args.get('nombre_sucursal')
    print(request.args.get('fecha_inicio'))
    connection = connect_to_db()
    cursor = connection.cursor()

    try:
        # Construir la consulta con los parámetros
        cursor.execute("""
            SELECT * FROM consultar_eventos(%s, %s, %s)
        """, (in_fecha_inicio, in_fecha_final, in_nombre_sucursal))

        result = [dict((cursor.description[idx][0], value)
                       for idx, value in enumerate(row)) for row in cursor.fetchall()]

        return jsonify(result)

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        connection.commit()
        connection.close()


@app.route("/registrar_nuevo_evento", methods=["POST"])
@cross_origin(supports_credentials=True)
def registrar_nuevo_evento():
    connection = connect_to_db()
    cursor = connection.cursor()

    # Obtener los datos desde el body del request
    data = request.json

    cursor.execute(
        f"CALL organizar_evento('{data['in_cedula_bibliotecario'], data['in_nombre_evento']}','{data['in_fecha_inicio']}', '{data['in_fecha_final']}', '{data['in_nombre_sucursal']}')"
    )

    cursor.close()
    connection.commit()
    connection.close()

    return jsonify({"message": "Evento registrado exitosamente"})


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


@app.route("/consultar_bibliotecarios_que_organizan_mas_eventos", methods=["GET"])
@cross_origin(supports_credentials=True)
def consultar_bibliotecarios_que_organizan_mas_eventos():
    connection = connect_to_db()
    cursor = connection.cursor()

    try:
        cursor.execute(
            f"SELECT * FROM consultar_bibliotecarios_que_organizan_mas_eventos()"
        )

        result = cursor.fetchall()
        return json.dumps(result)

    except Exception as e:
        return jsonify({"message": "Error al consultar los bibliotecarios"})

    finally:
        cursor.close()
        connection.commit()
        connection.close()


if __name__ == '__main__':
    app.run(port=3000, debug=True)
