-- Active: 1720446170662@@127.0.0.1@5432@biblioteca
DO $$ BEGIN
  CREATE TYPE payment_method AS ENUM ('Efectivo', 'Crédito', 'Débito', 'Transferencia');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS Donante(
  id_donante INT GENERATED ALWAYS AS IDENTITY,
  PRIMARY KEY (id_donante)
);

CREATE TABLE IF NOT EXISTS Persona(
  cedula VARCHAR(12),
  nombre VARCHAR(85) NOT NULL,
  apellido VARCHAR(85) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  correo VARCHAR(256) UNIQUE NOT NULL,
  id_donante INT,
  PRIMARY KEY(cedula),
  CONSTRAINT fk_donante_persona
    FOREIGN KEY (id_donante)
      REFERENCES Donante(id_donante)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Empleado(
  cedula VARCHAR(12),
  cargo VARCHAR(85) NOT NULL,
  PRIMARY KEY(cedula),
  CONSTRAINT fk_empleado_persona
    FOREIGN KEY (cedula)
      REFERENCES Persona(cedula)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Lector(
  cedula VARCHAR(12),
  PRIMARY KEY(cedula),
  CONSTRAINT fk_empleado_persona
    FOREIGN KEY (cedula)
      REFERENCES Persona(cedula)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Bibliotecario(
  cedula VARCHAR(12),
  correo VARCHAR(256) UNIQUE NOT NULL,
  PRIMARY KEY (cedula),
  CONSTRAINT fk_empleado_persona
    FOREIGN KEY (cedula)
      REFERENCES Persona(cedula)
      ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Autor(
  cedula VARCHAR(12),
  PRIMARY KEY (cedula),
  CONSTRAINT fk_empleado_persona
    FOREIGN KEY (cedula)
      REFERENCES Persona(cedula)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Editorial(
  nombre VARCHAR(100),
  id_donante INT,
  PRIMARY KEY (nombre),
  CONSTRAINT fk_donante_editorial
  FOREIGN KEY (id_donante)
  REFERENCES Donante(id_donante)
  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Sucursal(
  nombre VARCHAR(100),
  pais VARCHAR(100) NOT NULL,
  estado VARCHAR(100) NOT NULL,
  ciudad VARCHAR(100) NOT NULL,
  calle VARCHAR(100) NOT NULL,
  PRIMARY KEY (nombre)
);

CREATE TABLE IF NOT EXISTS Libro(
  isbn VARCHAR(13),
  titulo VARCHAR(100) NOT NULL,
  precio NUMERIC (2,2) NOT NULL,
  edicion SMALLINT NOT NULL,
  fecha_publicacion DATE NOT NULL,
  restriccion_edad SMALLINT NOT NULL,
  nombre_sucursal VARCHAR(100),
  nombre_editorial VARCHAR(100),
  CONSTRAINT fk_libro_sucursal
    FOREIGN KEY (nombre_sucursal)
      REFERENCES Sucursal(nombre)
      ON DELETE CASCADE,
  CONSTRAINT fk_libro_editorial
    FOREIGN KEY (nombre_editorial)
      REFERENCES Editorial(nombre)
      ON DELETE CASCADE,
  PRIMARY KEY (isbn),
  CONSTRAINT positive_edicion CHECK (edicion > 0),
  CONSTRAINT positive_precio CHECK (precio > 0),
  CONSTRAINT positive_restriccion_edad CHECK (restriccion_edad > 0)
);

CREATE TABLE IF NOT EXISTS Ejemplar(
  isbn VARCHAR(13),
  serial_ejemplar VARCHAR(10),
  PRIMARY KEY (serial_ejemplar),
  CONSTRAINT fk_ejemplar_libro
    FOREIGN KEY (isbn)
      REFERENCES Libro(isbn)
      ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Factura(
  nro_facturacion VARCHAR(8),
  fecha DATE NOT NULL,
  payment_method payment_method,
  PRIMARY KEY (nro_facturacion)
);

CREATE TABLE IF NOT EXISTS Categoría(
  tipo VARCHAR(85),
  PRIMARY KEY (tipo)
);

CREATE TABLE IF NOT EXISTS Evento(
  pk_evento INT GENERATED ALWAYS AS IDENTITY,
  fecha_inicio DATE NOT NULL,
  fecha_final DATE NOT NULL,
  nombre_sucursal VARCHAR(100),
  PRIMARY KEY (pk_evento),
  CONSTRAINT fk_evento_sucursal
    FOREIGN KEY (nombre_sucursal)
      REFERENCES Sucursal(nombre)
      ON DELETE CASCADE
);


-- Relaciones

CREATE TABLE IF NOT EXISTS Presta(
  serial_ejemplar VARCHAR(10),
  cedula_bibliotecario VARCHAR(12),
  cedula_lector VARCHAR(12),
  fecha_inicio DATE,
  fecha_entrega DATE,
  fecha_final DATE,
  PRIMARY KEY (serial_ejemplar, cedula_bibliotecario, cedula_lector, fecha_inicio, fecha_entrega, fecha_final),
  CONSTRAINT fk_presta_ejemplar
    FOREIGN KEY (serial_ejemplar)
      REFERENCES Ejemplar(serial_ejemplar)
      ON DELETE CASCADE,
  CONSTRAINT fk_presta_bibliotecario
    FOREIGN KEY (cedula_bibliotecario)
      REFERENCES Bibliotecario(cedula)
      ON DELETE CASCADE,
  CONSTRAINT fk_presta_lector
    FOREIGN KEY (cedula_lector)
      REFERENCES Lector(cedula)
      ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Es_De(
  isbn VARCHAR(13),
  tipo VARCHAR(85),
  PRIMARY KEY (isbn, tipo),
  CONSTRAINT fk_es_de_libro
    FOREIGN KEY (isbn)
      REFERENCES Libro(isbn)
      ON DELETE CASCADE,
  CONSTRAINT fk_es_de_categoria
    FOREIGN KEY (tipo)
      REFERENCES Categoría(tipo)
      ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Escribe(
  cedula_autor VARCHAR(12),
  isbn VARCHAR(13),
  PRIMARY KEY (cedula_autor, isbn),
  CONSTRAINT fk_escribe_autor
    FOREIGN KEY (cedula_autor)
      REFERENCES Autor(cedula)
      ON DELETE CASCADE,
  CONSTRAINT fk_escribe_libro
    FOREIGN KEY (isbn)
      REFERENCES Libro(isbn)
      ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Visita(
  cedula_lector VARCHAR(12),
  nombre_sucursal VARCHAR(100),
  PRIMARY KEY (cedula_lector, nombre_sucursal),
  CONSTRAINT fk_visita_lector
    FOREIGN KEY (cedula_lector)
      REFERENCES Lector(cedula)
      ON DELETE CASCADE,
  CONSTRAINT fk_visita_sucursal
    FOREIGN KEY (nombre_sucursal)
      REFERENCES Sucursal(nombre)
      ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Organiza(
  cedula VARCHAR(12),
  fecha_inicio DATE,
  fecha_final DATE,
  pk_evento INT,
  PRIMARY KEY (cedula),
  CONSTRAINT fk_organiza_bibliotecario
    FOREIGN KEY (cedula)
      REFERENCES Bibliotecario(cedula)
      ON DELETE CASCADE,
  CONSTRAINT fk_organiza_evento
    FOREIGN KEY (pk_evento)
      REFERENCES Evento(pk_evento)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Trabaja(
  cedula_empleado VARCHAR(12),
  nombre_sucursal VARCHAR(100),
  fecha_ingreso DATE,
  fecha_retiro DATE,
  PRIMARY KEY (cedula_empleado, nombre_sucursal, fecha_ingreso),
  CONSTRAINT fk_trabaja_empleado
    FOREIGN KEY (cedula_empleado)
      REFERENCES Empleado(cedula)
      ON DELETE CASCADE,
  CONSTRAINT fk_trabaja_sucursal
    FOREIGN KEY (nombre_sucursal)
      REFERENCES Sucursal(nombre)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Vende(
  serial_ejemplar VARCHAR(10),
  nro_facturacion VARCHAR(8),
  cedula VARCHAR(12),
  PRIMARY KEY (serial_ejemplar, nro_facturacion, cedula),
  CONSTRAINT fk_vende_ejemplar
    FOREIGN KEY (serial_ejemplar)
      REFERENCES Ejemplar(serial_ejemplar)
      ON DELETE CASCADE,
  CONSTRAINT fk_vende_factura
    FOREIGN KEY (nro_facturacion)
      REFERENCES Factura(nro_facturacion)
      ON DELETE CASCADE,
  CONSTRAINT fk_vende_lector
    FOREIGN KEY (cedula)
      REFERENCES Lector(cedula)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Realiza(
  nombre VARCHAR(100),
  pk_evento INT,
  PRIMARY KEY (nombre),
  CONSTRAINT fk_realiza_sucursal
    FOREIGN KEY (nombre)
      REFERENCES Sucursal(nombre)
      ON DELETE CASCADE,
  CONSTRAINT fk_realiza_evento
    FOREIGN KEY (pk_evento)
      REFERENCES Evento(pk_evento)
      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Asiste(
  correo VARCHAR(256),
  pk_evento INT,
  PRIMARY KEY (correo),
  CONSTRAINT fk_asiste_persona
    FOREIGN KEY (correo)
      REFERENCES Persona(correo)
      ON DELETE CASCADE,
  CONSTRAINT fk_asiste_evento
    FOREIGN KEY (pk_evento)
      REFERENCES Evento(pk_evento)
      ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Dona(
  nombre VARCHAR(100),
  serial_ejemplar VARCHAR(10),
  id_donante INT,
  fecha DATE NOT NULL,
  PRIMARY KEY (nombre, serial_ejemplar, id_donante),
  CONSTRAINT fk_dona_sucursal
    FOREIGN KEY (nombre)
      REFERENCES Sucursal(nombre)
      ON DELETE CASCADE,
  CONSTRAINT fk_dona_ejemplar
    FOREIGN KEY (serial_ejemplar)
      REFERENCES Ejemplar(serial_ejemplar)
      ON DELETE CASCADE,
  CONSTRAINT fk_dona_donante
    FOREIGN KEY (id_donante)
      REFERENCES Donante(id_donante)
      ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS Resena(
  cedula_bibliotecario VARCHAR(12),
  cedula_lector VARCHAR(12),
  estrellas INT NOT NULL,
  comentario VARCHAR(256),
  aprobado BOOLEAN DEFAULT false,
  isbn VARCHAR(13),
  CHECK (estrellas BETWEEN 1 AND 5),
  PRIMARY KEY (cedula_lector, isbn),
  CONSTRAINT fk_resena_lector
    FOREIGN KEY (cedula_lector)
      REFERENCES Lector(cedula)
      ON DELETE CASCADE,
  CONSTRAINT fk_resena_bibliotecario
    FOREIGN KEY (cedula_bibliotecario)
      REFERENCES Bibliotecario(cedula)
      ON DELETE SET NULL,
  CONSTRAINT fk_resena_libro
    FOREIGN KEY (isbn)
      REFERENCES Libro(isbn)
      ON DELETE CASCADE
);

-- Requerimentos funcionales

CREATE OR REPLACE PROCEDURE crear_usuario(
  in_cedula VARCHAR(12),
  in_nombre VARCHAR(85),
  in_apellido VARCHAR(85),
  in_fecha_nacimiento DATE,
  in_correo VARCHAR(256),
  in_tipo_usuario VARCHAR(10)
)
LANGUAGE plpgsql
AS $$
BEGIN

  IF EXISTS (SELECT 1 FROM Persona WHERE cedula = in_cedula) THEN
    RAISE EXCEPTION 'El usuario ya existe.';
  END IF;

  IF in_fecha_nacimiento >= CURRENT_DATE - INTERVAL '12 years' THEN
    RAISE EXCEPTION 'El usuario debe ser mayor de edad.';
  END IF;

  INSERT INTO Persona(cedula, nombre, apellido, fecha_nacimiento, correo, id_donante)
  VALUES (in_cedula, in_nombre, in_apellido, in_fecha_nacimiento, in_correo, NULL);

  IF in_tipo_usuario = 'Bibliotecario' THEN
    INSERT INTO Bibliotecario(cedula, correo)
    VALUES (in_cedula, in_correo);
  ELSIF in_tipo_usuario = 'Lector' THEN
    INSERT INTO Lector(cedula)
    VALUES (in_cedula);
  ELSEIF in_tipo_usuario = 'Autor' THEN
    INSERT INTO Autor(cedula)
    VALUES (in_cedula);
  ELSEIF in_tipo_usuario = 'Empleado' THEN
    INSERT INTO Empleado(cedula, cargo)
    VALUES (in_cedula, 'Empleado');
  ELSE
    RAISE EXCEPTION 'El tipo de usuario no es valido.';
  END IF;

  RAISE NOTICE 'Usuario creado exitosamente.';
END $$;

CREATE OR REPLACE PROCEDURE realizar_prestamo(
  in_serial_ejemplar VARCHAR(10),
  in_cedula_bibliotecario VARCHAR(12),
  in_cedula_lector VARCHAR(12),
  in_fecha_inicio DATE,
  v_fecha_final DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM Persona WHERE cedula = in_cedula_lector AND activo = TRUE) THEN
    RAISE EXCEPTION 'El lector no esta activo.';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM Libro L
    JOIN Persona P ON L.restriccion_edad <= EXTRACT(YEAR FROM age(P.fecha_nacimiento))
    WHERE L.serial_ejemplar = in_serial_ejemplar AND P.cedula = in_cedula_lector
  ) THEN
    RAISE EXCEPTION 'El lector no cumple con la restriccion de edad del libro.';
  END IF;

  IF EXISTS (
    SELECT 1 FROM Presta
    WHERE serial_ejemplar = in_serial_ejemplar AND fecha_entrega IS NULL
  ) THEN
    RAISE EXCEPTION 'El libro seleccionado no esta disponible para prestamo.';
  END IF;
    
  INSERT INTO Presta(serial_ejemplar, cedula_bibliotecario, cedula_lector, fecha_inicio, fecha_entrega, fecha_final)
  VALUES (in_serial_ejemplar, in_cedula_bibliotecario, in_cedula_lector, in_fecha_inicio, NULL, v_fecha_final);

  RAISE NOTICE 'Prestamo realizado exitosamente.';
END $$;

CREATE OR REPLACE PROCEDURE realizar_devolucion(
  in_serial_ejemplar VARCHAR(10),
  in_cedula_bibliotecario VARCHAR(12),
  in_cedula_lector VARCHAR(12),
  in_fecha_entrega DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM Persona WHERE cedula = in_cedula_lector AND activo = TRUE) THEN
        RAISE EXCEPTION 'El lector no esta activo.';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM Presta
    WHERE serial_ejemplar = in_serial_ejemplar AND cedula_bibliotecario = in_cedula_bibliotecario AND cedula_lector = in_cedula_lector AND fecha_entrega IS NULL
  ) THEN
    RAISE EXCEPTION 'El libro no este prestado al lector.';
  END IF;

  UPDATE Presta
  SET fecha_entrega = in_fecha_entrega
  WHERE serial_ejemplar = in_serial_ejemplar AND cedula_bibliotecario = in_cedula_bibliotecario AND cedula_lector = in_cedula_lector AND fecha_entrega IS NULL;

  RAISE NOTICE 'Devolucion realizada exitosamente.';
END $$;

CREATE OR REPLACE PROCEDURE ingresar_resena(
  in_cedula_bibliotecario VARCHAR(12),
  in_cedula_lector VARCHAR(12),
  in_estrellas INT,
  in_comentario VARCHAR(256),
  in_isbn VARCHAR(13)
)
LANGUAGE plpgsql
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM Bibliotecario WHERE cedula = in_cedula_bibliotecario) THEN
    RAISE EXCEPTION 'El bibliotecario no existe.';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM Lector WHERE cedula = in_cedula_lector) THEN
    RAISE EXCEPTION 'El lector no existe.';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM Libro WHERE isbn = in_isbn) THEN
    RAISE EXCEPTION 'El libro no existe.';
  END IF;

  IF EXISTS (SELECT 1 FROM Resena WHERE cedula_lector = in_cedula_lector AND isbn = in_isbn) THEN
    RAISE EXCEPTION 'El lector ya ha reseñado este libro.';
  END IF;

  INSERT INTO Resena(cedula_bibliotecario, cedula_lector, estrellas, comentario, isbn)
  VALUES (in_cedula_bibliotecario, in_cedula_lector, in_estrellas, in_comentario, in_isbn);

  RAISE NOTICE 'Resena ingresada exitosamente.';
END $$;

CREATE OR REPLACE PROCEDURE aprobar_resena(
  in_cedula_bibliotecario VARCHAR(12),
  in_cedula_lector VARCHAR(12),
  in_isbn VARCHAR(13)
)
LANGUAGE plpgsql
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM Bibliotecario WHERE cedula = in_cedula_bibliotecario) THEN
    RAISE EXCEPTION 'El bibliotecario no existe.';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM Resena WHERE cedula_bibliotecario = in_cedula_bibliotecario AND cedula_lector = in_cedula_lector AND isbn = in_isbn) THEN
    RAISE EXCEPTION 'El bibliotecario no ingreso esta resena.';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM Resena WHERE cedula_lector = in_cedula_lector AND isbn = in_isbn) THEN
    RAISE EXCEPTION 'La resena no existe.';
  END IF;

  UPDATE Resena
  SET aprobado = TRUE
  WHERE cedula_lector = in_cedula_lector AND isbn = in_isbn;

  RAISE NOTICE 'Resena aprobada exitosamente.';
END $$;

CREATE OR REPLACE PROCEDURE organizar_evento(
  in_cedula_bibliotecario VARCHAR(12),
  in_fecha_inicio DATE,
  in_fecha_final DATE,
  in_nombre_sucursal VARCHAR(100)
)
LANGUAGE plpgsql
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM Bibliotecario WHERE cedula = in_cedula_bibliotecario) THEN
    RAISE EXCEPTION 'El bibliotecario no existe.';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM Trabaja
    WHERE cedula_empleado = in_cedula_bibliotecario AND fecha_ingreso <= CURRENT_DATE - INTERVAL '2 years'
  ) THEN
    RAISE EXCEPTION 'El bibliotecario no tiene 2 años de antiguedad.';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM Sucursal WHERE nombre = in_nombre_sucursal) THEN
    RAISE EXCEPTION 'La sucursal no existe.';
  END IF;

  IF in_fecha_inicio >= in_fecha_final THEN
    RAISE EXCEPTION 'La fecha de inicio debe ser menor a la fecha final.';
  END IF;

  IF EXISTS (
    SELECT 1 FROM Organiza
    WHERE cedula = in_cedula_bibliotecario AND fecha_inicio <= in_fecha_final AND fecha_final >= in_fecha_inicio
  ) THEN
    RAISE EXCEPTION 'El bibliotecario ya tiene un evento en esa fecha.';
  END IF;

  IF EXISTS (
    SELECT 1 FROM Realiza
    WHERE nombre = in_nombre_sucursal AND fecha_inicio <= in_fecha_final AND fecha_final >= in_fecha_inicio
  ) THEN
    RAISE EXCEPTION 'La sucursal ya tiene un evento en esa fecha.';
  END IF;

  INSERT INTO Evento(fecha_inicio, fecha_final, nombre_sucursal)
  VALUES (in_fecha_inicio, in_fecha_final, in_nombre_sucursal);

  INSERT INTO Organiza(cedula, fecha_inicio, fecha_final, pk_evento)
  VALUES (in_cedula_bibliotecario, in_fecha_inicio, in_fecha_final, (SELECT pk_evento FROM Evento WHERE fecha_inicio = in_fecha_inicio AND fecha_final = in_fecha_final));

  INSERT INTO Realiza(nombre, pk_evento)
  VALUES (in_nombre_sucursal, (SELECT pk_evento FROM Evento WHERE fecha_inicio = in_fecha_inicio AND fecha_final = in_fecha_final));

    RAISE NOTICE 'Evento organizado exitosamente';

END $$;

CREATE OR REPLACE PROCEDURE registrar_nuevo_libro(
    in_isbn VARCHAR,
    in_titulo VARCHAR,
    in_precio DECIMAL(2,2),
    in_edicion SMALLINT,
    in_fecha_publicacion DATE,
    in_restriccion_edad SMALLINT,
    in_nombre_sucursal VARCHAR,
    in_nombre_editorial VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM Libro
    WHERE isbn = in_isbn
  ) THEN
    RAISE EXCEPTION 'El libro con ISBN % ya existe.', in_isbn;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM Editorial
    WHERE nombre = in_nombre_editorial
  ) THEN
    RAISE EXCEPTION 'La editorial no existe.';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM Sucursal
    WHERE nombre = in_nombre_sucursal
  ) THEN
    RAISE EXCEPTION 'La sucursal no existe.';
  END IF;

  -- Insertar el nuevo libro en la tabla Libro
  INSERT INTO Libro(titulo, autor, fecha_publicacion, isbn, cantidad)
  VALUES (in_titulo, in_autor, in_fecha_publicacion, in_isbn, in_cantidad);
    
  RAISE NOTICE 'Libro registrado exitosamente.';
  
END $$;


CREATE OR REPLACE PROCEDURE vender_ejemplar(
    in_serial_ejemplar VARCHAR,
    in_cedula_comprador INT,
    in_fecha_venta DATE,
    in_nro_facturacion VARCHAR,
    in_payment_method payment_method
)
LANGUAGE plpgsql
AS $$
BEGIN
    
  IF EXISTS (
    SELECT serial_ejemplar FROM Dona
    WHERE serial_ejemplar = in_serial_ejemplar
  ) THEN
      RAISE EXCEPTION 'El libro es donado, por lo tanto el ejemplar no puede ser vendido';
  END IF;

  IF EXISTS (
    SELECT serial_ejemplar FROM Vende
    WHERE serial_ejemplar = in_serial_ejemplar
  ) THEN
      RAISE EXCEPTION 'El ejemplar ya ha sido vendido';
  END IF;


  -- Si no existe una factura con el nro_facturacion ingresado, se crea una nueva
  IF NOT EXISTS (
    SELECT nro_facturacion FROM Factura
    WHERE nro_facturacion = in_nro_facturacion
  ) THEN
    INSERT INTO Factura(nro_facturacion, fecha, payment_method)
    VALUES (in_nro_facturacion, in_fecha_venta, in_payment_method);
  END IF;

  INSERT INTO Vende(serial_ejemplar, nro_facturacion, cedula)
  VALUES (in_serial_ejemplar, in_cedula_comprador, in_nro_facturacion, in_fecha_venta);
  
  RAISE NOTICE 'Venta registrada exitosamente.';
END $$;

CREATE OR REPLACE PROCEDURE donar_ejemplar(
    in_serial_ejemplar VARCHAR[],
    in_id_donante INT,
    in_fecha_donacion DATE,
    in_nombre_sucursal VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    serial_actual VARCHAR;
BEGIN
  -- Verificamos si el donante existe
  IF NOT EXISTS (
    SELECT id_donante FROM Donante
    WHERE id_donante = in_id_donante
  ) THEN
    RAISE EXCEPTION 'El donante no existe.';
  END IF;

  -- Iterar sobre cada serial en la lista de seriales de ejemplares
  FOREACH serial_actual IN ARRAY seriales_ejemplares
  LOOP
      INSERT INTO Dona(serial_ejemplar, id_donante, fecha, nombre_sucursal)
      VALUES (serial_actual, in_id_donante, in_fecha_donacion, in_nombre_sucursal);
  END LOOP;

END $$;


CREATE OR REPLACE PROCEDURE actualizar_informacion_usuario(
    in_cedula_persona INT,
    in_nombre VARCHAR,
    in_apellido VARCHAR,
    in_fecha_nacimiento DATE,
    in_activo BOOLEAN,
    in_correo VARCHAR,
    in_id_donante INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Actualizar la tabla Persona
    UPDATE Persona
    SET nombre = in_nombre,
        apellido = in_apellido,
        fecha_nacimiento = in_fecha_nacimiento,
        activo = in_activo,
        correo = in_correo,
        id_donante = in_id_donante
    WHERE cedula = in_cedula_persona;

    RAISE NOTICE 'Información del usuario actualizada correctamente.';
END $$;


CREATE OR REPLACE FUNCTION fn_suspender_usuario_por_devoluciones_tardias()
RETURNS TRIGGER AS $$
DECLARE
    contador_devoluciones_tardias INT;
BEGIN
    -- Contar las devoluciones tardías del usuario
    SELECT COUNT(*)
    INTO contador_devoluciones_tardias
    FROM Presta
    WHERE cedula_lector = NEW.cedula_lector
      AND fecha_entrega IS NOT NULL
      AND fecha_final IS NOT NULL
      AND fecha_entrega > fecha_final;

    -- Si es la tercera devolución tardía, suspender al usuario
    IF contador_devoluciones_tardias >= 3 THEN
        UPDATE Persona
        SET activo = FALSE
        WHERE cedula = NEW.cedula_lector;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_devoluciones_tardias
AFTER INSERT ON Presta
FOR EACH STATEMENT
EXECUTE FUNCTION fn_suspender_usuario_por_devoluciones_tardias();


CREATE OR REPLACE PROCEDURE registrar_asistencia_evento(
  in_correo VARCHAR,
  in_pk_evento INT
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Verificar que el usuario esté registrado
  IF NOT EXISTS (
    SELECT 1 FROM Persona
    WHERE correo = in_correo
  ) THEN
    RAISE EXCEPTION 'El usuario con el correo % no está registrado.', in_correo;
  END IF;
  
  -- Verificar que el evento esté activo
  IF NOT EXISTS (
    SELECT 1 FROM Evento
    WHERE pk_evento = in_pk_evento AND fecha_final >= CURRENT_DATE
  ) THEN
    RAISE EXCEPTION 'El evento con el ID % no está activo o no existe.', in_pk_evento;
  END IF;
  
  -- Insertar la asistencia
  INSERT INTO Asiste(correo, pk_evento)
  VALUES (in_correo, in_pk_evento);
  
  RAISE NOTICE 'Asistencia registrada exitosamente.';
END $$;

-- Generar Reporte de libros más prestados
CREATE OR REPLACE FUNCTION generar_reporte_libros_mas_prestados(
    in_fecha_inicio DATE DEFAULT NULL,
    in_fecha_final DATE DEFAULT NULL
)
RETURNS TABLE (
    nombre_libro VARCHAR,
    edicion_libro SMALLINT,
    primera_fecha_prestamo DATE,
    ultima_fecha_prestamo DATE,
    cantidad_prestamos BIGINT
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        l.titulo AS nombre_libro,
        l.edicion AS edicion_libro,
        MIN(p.fecha_inicio) AS primera_fecha_prestamo,
        MAX(p.fecha_final) AS ultima_fecha_prestamo,
        COUNT(*) AS cantidad_prestamos
    FROM 
        Presta p
    JOIN 
        Ejemplar e ON e.serial_ejemplar = p.serial_ejemplar
    JOIN 
        Libro l ON l.isbn = e.isbn
    WHERE 
        (p.fecha_inicio >= in_fecha_inicio OR in_fecha_inicio IS NULL)
        AND (p.fecha_final <= in_fecha_final OR in_fecha_final IS NULL)
    GROUP BY 
        l.titulo, l.edicion
    ORDER BY 
        cantidad_prestamos DESC, primera_fecha_prestamo DESC;
END $$;

-- Filtrar libros por categoría
CREATE OR REPLACE FUNCTION filtrar_libros_por_categoria(
    in_categoria VARCHAR
)
RETURNS TABLE (
    isbn VARCHAR,
    titulo VARCHAR,
    precio SMALLINT,
    edicion SMALLINT,
    fecha_publicacion DATE,
    restriccion_edad SMALLINT,
    nombre_sucursal VARCHAR,
    nombre_editorial VARCHAR
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        l.isbn,
        l.titulo,
        l.precio,
        l.edicion,
        l.fecha_publicacion,
        l.restriccion_edad,
        l.nombre_sucursal,
        l.nombre_editorial
    FROM 
        Libro l
    JOIN 
        Es_De ed ON l.isbn = ed.isbn
    WHERE 
        ed.tipo = in_categoria;
END $$;

-- Consultar libros más vendidos
CREATE OR REPLACE FUNCTION consultar_libros_mas_vendidos()
RETURNS TABLE (
    titulo VARCHAR,
    cantidad_ventas BIGINT,
    total_ingresos NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        l.titulo,
        COUNT(v.serial_ejemplar) AS cantidad_ventas,
        SUM(l.precio) AS total_ingresos
    FROM 
        Libro l
    JOIN 
        Ejemplar e ON l.isbn = e.isbn
    JOIN 
        Vende v ON e.serial_ejemplar = v.serial_ejemplar
    GROUP BY 
        l.titulo
    ORDER BY 
        cantidad_ventas DESC, total_ingresos DESC;
END $$;

-- Consultar mejores compradores
CREATE OR REPLACE FUNCTION consultar_mejores_compradores()
RETURNS TABLE (
    nombre VARCHAR,
    cedula VARCHAR,
    total_libros_comprados BIGINT
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.nombre,
        p.cedula,
        COUNT(v.serial_ejemplar) AS total_libros_comprados
    FROM 
        Persona p
    JOIN 
        Vende v ON p.cedula = v.cedula
    GROUP BY 
        p.nombre, p.cedula
    ORDER BY 
        total_libros_comprados DESC
    LIMIT 10;
END $$;

-- Consultar bibliotecarios que organizan más eventos
CREATE OR REPLACE FUNCTION consultar_bibliotecarios_que_organizan_mas_eventos()
RETURNS TABLE (
    nombre_bibliotecario VARCHAR,
    cedula_bibliotecario VARCHAR,
    cantidad_eventos BIGINT
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.nombre AS nombre_bibliotecario,
        p.cedula AS cedula_bibliotecario,
        COUNT(o.pk_evento) AS cantidad_eventos
    FROM 
        Persona p
    JOIN 
        Bibliotecario b ON p.cedula = b.cedula
    JOIN 
        Organiza o ON b.cedula = o.cedula
    GROUP BY 
        p.nombre, p.cedula
    ORDER BY 
        cantidad_eventos DESC;
END $$;

-- Consultar personas que más donan libros
CREATE OR REPLACE FUNCTION consultar_personas_que_mas_donan_libros()
RETURNS TABLE (
    nombre VARCHAR,
    cedula VARCHAR,
    cantidad_libros_donados BIGINT
) 
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.nombre,
        p.cedula,
        COUNT(d.serial_ejemplar) AS cantidad_libros_donados
    FROM 
        Persona p
    JOIN 
        Donante don ON p.id_donante = don.id_donante
    JOIN 
        Dona d ON don.id_donante = d.id_donante
    GROUP BY 
        p.nombre, p.cedula
    ORDER BY 
        cantidad_libros_donados DESC;
END $$;

DO $$ BEGIN
  CALL crear_usuario('27318323', 'pedro', 'vielma', '2000-01-01', 'vasd@gmas.com', 'lector', null);
END $$;
