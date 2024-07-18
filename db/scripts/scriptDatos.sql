INSERT INTO Persona (cedula, nombre, apellido, fecha_nacimiento, activo, correo)
VALUES
  ('1111111111', 'Pedro', 'Perez', '1990-01-01', TRUE, 'pedro.perez@example.com'),
  ('1111111112', 'Maria', 'Gomez', '1991-02-02', TRUE, 'maria.gomez@example.com'),
  ('1111111113', 'Juan', 'Rodriguez', '1992-03-03', TRUE, 'juan.rodriguez@example.com'),
  ('1111111114', 'Laura', 'Lopez', '1993-04-04', TRUE, 'laura.lopez@example.com'),
  ('1111111115', 'Carlos', 'Fernandez', '1994-05-05', TRUE, 'carlos.fernandez@example.com'),
  ('1111111116', 'Ana', 'Martinez', '1995-06-06', TRUE, 'ana.martinez@example.com'),
  ('1111111117', 'Luis', 'Garcia', '1996-07-07', TRUE, 'luis.garcia@example.com'),
  ('1111111118', 'Marta', 'Sanchez', '1997-08-08', TRUE, 'marta.sanchez@example.com'),
  ('1111111119', 'Jorge', 'Ramirez', '1998-09-09', TRUE, 'jorge.ramirez@example.com'),
  ('1111111120', 'Sofia', 'Castro', '1999-10-10', TRUE, 'sofia.castro@example.com');

INSERT INTO Persona (cedula, nombre, apellido, fecha_nacimiento, activo, correo)
VALUES
  ('2222222221', 'Alberto', 'Jimenez', '1985-01-01', TRUE, 'alberto.jimenez@example.com'),
  ('2222222222', 'Elena', 'Torres', '1986-02-02', TRUE, 'elena.torres@example.com'),
  ('2222222223', 'Miguel', 'Ruiz', '1987-03-03', TRUE, 'miguel.ruiz@example.com'),
  ('2222222224', 'Patricia', 'Flores', '1988-04-04', TRUE, 'patricia.flores@example.com'),
  ('2222222225', 'Ricardo', 'Hernandez', '1989-05-05', TRUE, 'ricardo.hernandez@example.com');

INSERT INTO Persona (cedula, nombre, apellido, fecha_nacimiento, activo, correo)
VALUES
  ('3333333331', 'Julio', 'Morales', '1980-01-01', TRUE, 'julio.morales@example.com'),
  ('3333333332', 'Isabel', 'Vargas', '1981-02-02', TRUE, 'isabel.vargas@example.com'),
  ('3333333333', 'Oscar', 'Mendoza', '1982-03-03', TRUE, 'oscar.mendoza@example.com'),
  ('3333333334', 'Lucia', 'Ortiz', '1983-04-04', TRUE, 'lucia.ortiz@example.com'),
  ('3333333335', 'Enrique', 'Guerrero', '1984-05-05', TRUE, 'enrique.guerrero@example.com');

INSERT INTO Lector (cedula)
VALUES
  ('1111111111'), ('1111111112'), ('1111111113'), ('1111111114'), ('1111111115'),
  ('1111111116'), ('1111111117'), ('1111111118'), ('1111111119'), ('1111111120');

INSERT INTO Bibliotecario (cedula, correo)
VALUES
  ('2222222221', 'alberto.jimenez@example.com'),
  ('2222222222', 'elena.torres@example.com'),
  ('2222222223', 'miguel.ruiz@example.com'),
  ('2222222224', 'patricia.flores@example.com'),
  ('2222222225', 'ricardo.hernandez@example.com');

INSERT INTO Autor (cedula)
VALUES
  ('3333333331'), ('3333333332'), ('3333333333'), ('3333333334'), ('3333333335');

INSERT INTO Editorial (nombre, id_donante)
VALUES
  ('Editorial Planeta', null),
  ('Editorial Santillana', null),
  ('Editorial Alfaguara', null),
  ('Editorial Anagrama', null),
  ('Editorial Edebé', null);

INSERT INTO Sucursal (nombre, pais, estado, ciudad, calle)
VALUES
  ('Sucursal Centro', 'España', 'Madrid', 'Madrid', 'Calle Mayor, 1'),
  ('Sucursal Norte', 'España', 'Barcelona', 'Barcelona', 'Calle Gran Vía, 2'),
  ('Sucursal Este', 'España', 'Valencia', 'Valencia', 'Avenida del Cid, 3'),
  ('Sucursal Sur', 'España', 'Sevilla', 'Sevilla', 'Calle Sierpes, 4'),
  ('Sucursal Oeste', 'España', 'Galicia', 'Santiago de Compostela', 'Rua Nova, 5');

INSERT INTO Libro (isbn, titulo, precio, edicion, fecha_publicacion, restriccion_edad, nombre_sucursal, nombre_editorial)
VALUES
  ('9788423351882', 'La sombra del viento', 20.0, 1, '2001-06-01', 16, 'Sucursal Centro', 'Editorial Planeta'),
  ('9788408096238', 'El juego del ángel', 22.0, 1, '2008-04-17', 16, 'Sucursal Norte', 'Editorial Planeta'),
  ('9788432212218', 'El tiempo entre costuras', 24.0, 1, '2009-06-03', 14, 'Sucursal Este', 'Editorial Planeta'),
  ('9788498381231', 'La catedral del mar', 18.0, 1, '2006-02-16', 18, 'Sucursal Sur', 'Editorial Santillana'),
  ('9788423344570', 'Patria', 23.0, 1, '2016-09-06', 18, 'Sucursal Oeste', 'Editorial Edebé');

INSERT INTO Ejemplar (isbn, serial_ejemplar)
VALUES
  ('9788423351882', 'EJEM1_L1'),
  ('9788423351882', 'EJEM2_L1'),
  ('9788423351882', 'EJEM3_L1'),
  ('9788423351882', 'EJEM4_L1'),
  ('9788423351882', 'EJEM5_L1'),
  ('9788423351882', 'EJEM6_L1'),
  ('9788423351882', 'EJEM7_L1'),
  ('9788423351882', 'EJEM8_L1'),
  ('9788423351882', 'EJEM9_L1'),
  ('9788423351882', 'EJEM10_L1');

INSERT INTO Ejemplar (isbn, serial_ejemplar)
VALUES
  ('9788408096238', 'EJEM2_L2'),
  ('9788408096238', 'EJEM3_L2'),
  ('9788408096238', 'EJEM4_L2'),
  ('9788408096238', 'EJEM5_L2'),
  ('9788408096238', 'EJEM6_L2'),
  ('9788408096238', 'EJEM7_L2'),
  ('9788408096238', 'EJEM8_L2'),
  ('9788408096238', 'EJEM9_L2'),
  ('9788408096238', 'EJEM10_L2');

INSERT INTO Ejemplar (isbn, serial_ejemplar)
VALUES
  ('9788432212218', 'EJEM1_L3'),
  ('9788432212218', 'EJEM2_L3'),
  ('9788432212218', 'EJEM3_L3'),
  ('9788432212218', 'EJEM4_L3'),
  ('9788432212218', 'EJEM5_L3'),
  ('9788432212218', 'EJEM6_L3'),
  ('9788432212218', 'EJEM7_L3'),
  ('9788432212218', 'EJEM8_L3'),
  ('9788432212218', 'EJEM9_L3'),
  ('9788432212218', 'EJEM10_L3');

INSERT INTO Ejemplar (isbn, serial_ejemplar)
VALUES
  ('9788498381231', 'EJEM1_L4'),
  ('9788498381231', 'EJEM2_L4'),
  ('9788498381231', 'EJEM3_L4'),
  ('9788498381231', 'EJEM4_L4'),
  ('9788498381231', 'EJEM5_L4'),
  ('9788498381231', 'EJEM6_L4'),
  ('9788498381231', 'EJEM7_L4'),
  ('9788498381231', 'EJEM8_L4'),
  ('9788498381231', 'EJEM9_L4'),
  ('9788498381231', 'EJEM10_L4');

INSERT INTO Ejemplar (isbn, serial_ejemplar)
VALUES
  ('9788423344570', 'EJEM1_L5'),
  ('9788423344570', 'EJEM2_L5'),
  ('9788423344570', 'EJEM3_L5'),
  ('9788423344570', 'EJEM4_L5'),
  ('9788423344570', 'EJEM5_L5'),
  ('9788423344570', 'EJEM6_L5'),
  ('9788423344570', 'EJEM7_L5'),
  ('9788423344570', 'EJEM8_L5'),
  ('9788423344570', 'EJEM9_L5'),
  ('9788423344570', 'EJEM10_L5');

INSERT INTO Factura (nro_facturacion, fecha, payment_method)
VALUES
  ('FAC00001', '2023-01-01', 'Efectivo'),
  ('FAC00002', '2023-01-02', 'Efectivo'),
  ('FAC00003', '2023-01-03', 'Efectivo'),
  ('FAC00004', '2023-01-04', 'Efectivo'),
  ('FAC00005', '2023-01-05', 'Efectivo');

INSERT INTO Categoría (tipo)
VALUES
  ('Terror'),
  ('Romance'),
  ('Misterio'),
  ('Sistemas de Bases de Datos'),
  ('Drama'),
  ('Psicología'),
  ('Ciencia Ficción'),
  ('Anime'),
  ('Fantasía');

INSERT INTO Evento (nombre, fecha_inicio, fecha_final, nombre_sucursal)
VALUES
  ('Vida y obra de Bill Cosby','2023-01-01', '2023-01-02', 'Sucursal Centro'),
  ('SQL for dummies', '2023-01-02', '2023-01-03', 'Sucursal Norte'),
  ('Aprende Python en 3 minutos', '2023-01-03', '2023-01-04', 'Sucursal Este'),
  ('La tierra es plana','2023-01-04', '2023-01-05', 'Sucursal Sur'),
  ('Las vacunas causan autismo','2023-01-05', '2023-01-06', 'Sucursal Oeste');