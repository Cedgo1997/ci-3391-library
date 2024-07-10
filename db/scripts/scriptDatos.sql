INSERT INTO Persona (cedula, nombre, apellido, fecha_nacimiento, activo, correo)
VALUES
  ('1111111111', 'Lector1', 'Apellido1', '1990-01-01', TRUE, 'lector1@example.com'),
  ('1111111112', 'Lector2', 'Apellido2', '1991-02-02', TRUE, 'lector2@example.com'),
  ('1111111113', 'Lector3', 'Apellido3', '1992-03-03', TRUE, 'lector3@example.com'),
  ('1111111114', 'Lector4', 'Apellido4', '1993-04-04', TRUE, 'lector4@example.com'),
  ('1111111115', 'Lector5', 'Apellido5', '1994-05-05', TRUE, 'lector5@example.com'),
  ('1111111116', 'Lector6', 'Apellido6', '1995-06-06', TRUE, 'lector6@example.com'),
  ('1111111117', 'Lector7', 'Apellido7', '1996-07-07', TRUE, 'lector7@example.com'),
  ('1111111118', 'Lector8', 'Apellido8', '1997-08-08', TRUE, 'lector8@example.com'),
  ('1111111119', 'Lector9', 'Apellido9', '1998-09-09', TRUE, 'lector9@example.com'),
  ('1111111120', 'Lector10', 'Apellido10', '1999-10-10', TRUE, 'lector10@example.com');

INSERT INTO Persona (cedula, nombre, apellido, fecha_nacimiento, activo, correo)
VALUES
  ('2222222221', 'Bibliotecario1', 'Apellido11', '1985-01-01', TRUE, 'bibliotecario1@example.com'),
  ('2222222222', 'Bibliotecario2', 'Apellido12', '1986-02-02', TRUE, 'bibliotecario2@example.com'),
  ('2222222223', 'Bibliotecario3', 'Apellido13', '1987-03-03', TRUE, 'bibliotecario3@example.com'),
  ('2222222224', 'Bibliotecario4', 'Apellido14', '1988-04-04', TRUE, 'bibliotecario4@example.com'),
  ('2222222225', 'Bibliotecario5', 'Apellido15', '1989-05-05', TRUE, 'bibliotecario5@example.com');

INSERT INTO Persona (cedula, nombre, apellido, fecha_nacimiento, activo, correo)
VALUES
  ('3333333331', 'Autor1', 'Apellido16', '1980-01-01', TRUE, 'autor1@example.com'),
  ('3333333332', 'Autor2', 'Apellido17', '1981-02-02', TRUE, 'autor2@example.com'),
  ('3333333333', 'Autor3', 'Apellido18', '1982-03-03', TRUE, 'autor3@example.com'),
  ('3333333334', 'Autor4', 'Apellido19', '1983-04-04', TRUE, 'autor4@example.com'),
  ('3333333335', 'Autor5', 'Apellido20', '1984-05-05', TRUE, 'autor5@example.com');

INSERT INTO Lector (cedula)
VALUES
  ('1111111111'), ('1111111112'), ('1111111113'), ('1111111114'), ('1111111115'),
  ('1111111116'), ('1111111117'), ('1111111118'), ('1111111119'), ('1111111120');

INSERT INTO Bibliotecario (cedula, correo)
VALUES
  ('2222222221', 'bibliotecario1@example.com'),
  ('2222222222', 'bibliotecario2@example.com'),
  ('2222222223', 'bibliotecario3@example.com'),
  ('2222222224', 'bibliotecario4@example.com'),
  ('2222222225', 'bibliotecario5@example.com');

INSERT INTO Autor (cedula)
VALUES
  ('3333333331'), ('3333333332'), ('3333333333'), ('3333333334'), ('3333333335');

INSERT INTO Editorial (nombre, id_donante)
VALUES
  ('Editorial A', null),
  ('Editorial B', null),
  ('Editorial C', null),
  ('Editorial D', null),
  ('Editorial E', null);

INSERT INTO Sucursal (nombre, pais, estado, ciudad, calle)
VALUES
  ('Sucursal 1', 'País 1', 'Estado 1', 'Ciudad 1', 'Calle 1'),
  ('Sucursal 2', 'País 2', 'Estado 2', 'Ciudad 2', 'Calle 2'),
  ('Sucursal 3', 'País 3', 'Estado 3', 'Ciudad 3', 'Calle 3'),
  ('Sucursal 4', 'País 4', 'Estado 4', 'Ciudad 4', 'Calle 4'),
  ('Sucursal 5', 'País 5', 'Estado 5', 'Ciudad 5', 'Calle 5');

INSERT INTO Libro (isbn, titulo, precio, edicion, fecha_publicacion, restriccion_edad, nombre_sucursal, nombre_editorial)
VALUES
  ('111111111', 'Libro 1', 0.99, 1, '2023-01-01', 16, 'Sucursal 1', 'Editorial A'),
  ('222222222', 'Libro 2', 0.99, 2, '2022-05-15', 12, 'Sucursal 2', 'Editorial B'),
  ('333333333', 'Libro 3', 0.99, 1, '2023-08-20', 18, 'Sucursal 3', 'Editorial C'),
  ('444444444', 'Libro 4', 0.99, 3, '2021-11-30', 14, 'Sucursal 4', 'Editorial D'),
  ('555555555', 'Libro 5', 0.99, 1, '2024-03-10', 21, 'Sucursal 5', 'Editorial E');

INSERT INTO Ejemplar (isbn, serial_ejemplar)
VALUES
  ('111111111', 'EJEM1_L1'),
  ('111111111', 'EJEM2_L1'),
  ('111111111', 'EJEM3_L1'),
  ('111111111', 'EJEM4_L1'),
  ('111111111', 'EJEM5_L1'),
  ('111111111', 'EJEM6_L1'),
  ('111111111', 'EJEM7_L1'),
  ('111111111', 'EJEM8_L1'),
  ('111111111', 'EJEM9_L1'),
  ('111111111', 'EJEM10_L1');

INSERT INTO Ejemplar (isbn, serial_ejemplar)
VALUES
  ('222222222', 'EJEM2_L2'),
  ('222222222', 'EJEM3_L2'),
  ('222222222', 'EJEM4_L2'),
  ('222222222', 'EJEM5_L2'),
  ('222222222', 'EJEM6_L2'),
  ('222222222', 'EJEM7_L2'),
  ('222222222', 'EJEM8_L2'),
  ('222222222', 'EJEM9_L2'),
  ('222222222', 'EJEM10_L2');

INSERT INTO Ejemplar (isbn, serial_ejemplar)
VALUES
  ('333333333', 'EJEM1_L3'),
  ('333333333', 'EJEM2_L3'),
  ('333333333', 'EJEM3_L3'),
  ('333333333', 'EJEM4_L3'),
  ('333333333', 'EJEM5_L3'),
  ('333333333', 'EJEM6_L3'),
  ('333333333', 'EJEM7_L3'),
  ('333333333', 'EJEM8_L3'),
  ('333333333', 'EJEM9_L3'),
  ('333333333', 'EJEM10_L3');

INSERT INTO Ejemplar (isbn, serial_ejemplar)
VALUES
  ('444444444', 'EJEM1_L4'),
  ('444444444', 'EJEM2_L4'),
  ('444444444', 'EJEM3_L4'),
  ('444444444', 'EJEM4_L4'),
  ('444444444', 'EJEM5_L4'),
  ('444444444', 'EJEM6_L4'),
  ('444444444', 'EJEM7_L4'),
  ('444444444', 'EJEM8_L4'),
  ('444444444', 'EJEM9_L4'),
  ('444444444', 'EJEM10_L4');

INSERT INTO Ejemplar (isbn, serial_ejemplar)
VALUES
  ('555555555', 'EJEM1_L5'),
  ('555555555', 'EJEM2_L5'),
  ('555555555', 'EJEM3_L5'),
  ('555555555', 'EJEM4_L5'),
  ('555555555', 'EJEM5_L5'),
  ('555555555', 'EJEM6_L5'),
  ('555555555', 'EJEM7_L5'),
  ('555555555', 'EJEM8_L5'),
  ('555555555', 'EJEM9_L5'),
  ('555555555', 'EJEM10_L5');

INSERT INTO Factura (nro_facturacion, fecha, payment_method)
VALUES
  ('FAC00001', '2023-01-01', 'Efectivo'),
  ('FAC00002', '2023-01-02', 'Efectivo'),
  ('FAC00003', '2023-01-03', 'Efectivo'),
  ('FAC00004', '2023-01-04', 'Efectivo'),
  ('FAC00005', '2023-01-05', 'Efectivo');

INSERT INTO Categoría (tipo)
VALUES
  ('Categoria 1'),
  ('Categoria 2'),
  ('Categoria 3'),
  ('Categoria 4'),
  ('Categoria 5');

INSERT INTO Evento (fecha_inicio, fecha_final, nombre_sucursal)
VALUES
  ('2023-01-01', '2023-01-02', 'Sucursal 1'),
  ('2023-01-02', '2023-01-03', 'Sucursal 2'),
  ('2023-01-03', '2023-01-04', 'Sucursal 3'),
  ('2023-01-04', '2023-01-05', 'Sucursal 4'),
  ('2023-01-05', '2023-01-06', 'Sucursal 5');

