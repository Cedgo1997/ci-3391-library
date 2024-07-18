-- Tablas con posible mayor cantidad de registros: Persona, Ejemplar, Libro, Reseña, Presta
-- Tablas con mayor importancia en búsquedas por igualdad: Ejemplar (ISBN, serial_ejemplar), Persona (cédula, correo), factura (nro_facturacion)
-- Tablas con mayor importancia en búsquedas por rango: Persona (nombre), Libro (fecha_publicacion), factura (fecha)


-- DONANTE:
/* 
 Donante no posee índices, su único atributo es id_donante, el cual es primary key (unique), por lo tanto ya está indexado.
 */
 
-- PERSONA:
/*
 Índice B+ Tree sobre nombre y apellido para optimizar las búsquedas de una persona en concreto.
 Se utilizó por ser criterios de búsqueda bastante comunes. Se utilizó B+ Tree ya que las columnas
 utilizadas devolverán más de un registro, es decir, recorrerá más registros que puedan cumplir con la
 condición, lo que sería equivalente a una búsqueda por rango.
 */
CREATE INDEX idx_persona_correo ON Persona (nombre, apellido);

/* 
 EMPLEADO, LECTOR, BIBLIOTECARIO y AUTOR, no necesitan índices. 
 Para realizar la búsqueda sobre dichas tablas se operará en conjunto con la relación PERSONA (ya indexada). 
 */

/*
 EDITORIAL, solo posee una columna de interés (nombre), la cual es Primary Key.
 Por lo cual un indice no será necesario, ya que estará indexada por defecto.
 Adicionalmente, la frecuencia de una consulta hacia editorial es considerablemente más
 baja que para otras tablas de mayor carga como LIBRO o EJEMPLAR. Y su única relación
 relevante es con DONANTE. 
 */

 /* 
 SUCURSAL, es una relación que podría ser de interés en consultas más complejas, donde
 se requiere mayor información sobre determinado libro (en caso de un evento relacionado a ellos).
 A pesar de eso, ya posee un criterio de búsqueda bastante eficaz, el nombre, por lo que crear un índice
 solo agregaría una capa de complejidad innecesaria.

 Un índice interesante sería un K*, tomando en consideración que es posible que al momento de filtrar
 un libro por sucursal, se necesiten utilizar cada una de las columnas. Pero dado que esto no se encuentra
 en nuestros requerimientos funcionales, nos quedamos con la estructura principal.
 */

-- LIBRO:

/* 
    Libro es una de las relaciones con más frecuencia de acceso, por lo que los índices serán necesarios.
    En primer lugar, ya está previamente indexado por nombre, ya que es un primary key (unique),
    sin embargo, es posible optimizar aún más las búsquedas de un libro en concreto creando un
    índice B+ Tree sobre fecha_publicación:
 */
CREATE INDEX idx_libro_fecha_publicacion ON Libro (fecha_publicacion);

/* 
    Adicionalmente, es posible optimizar búsquedas específicas por nombre, de la siguiente manera,
    incluyento a la editorial perteneciente y el isbn si es necesario:
 */

CREATE INDEX idx_libro_sucursal_editorial
ON Libro (nombre_sucursal, nombre_editorial, isbn);

-- EJEMPLAR:
/* 
    EJEMPLAR, es una relación que debe poseer un índice para optimizar las búsquedas sobre 
    ISBN, esto es así porque ISBN es un atributo perteneciente a LIBRO, relación a la que se está
    referenciando, por defecto, esta no está indexada, y como una consulta sobre un isbn en concreto
    es equivalente a una función biyectiva, podemos mejorarla creando un índice de tipo B+ Tree sobre ISBN.
    Creamos el índice con tipo B+ Tree y no Hash, ya que estamos optimizando solo búsquedas por igualdad PERO teniendo en cuenta
    que para cada Libro con un determinado ISBN, habrá más de un ejemplar, lo que equivale a una búsqueda por rango.
 */
CREATE INDEX idx_ejemplar_isbn ON Ejemplar (isbn);

/* 
    FACTURA, es una relación que no requiere índices. Si bien, la facturación es una relación que se utilzará
    ampliamente, su utilidad es más para operaciones de tipo inserción, edición o eliminación (si aplica).
    Por lo que para consultas de solo tipo lectura no es necesaria una optimización utilizando índices. La idea de esto
    es evitar tener estructuras secundarias que mantener cuando se realiza una modificación en la tabla principal, ya que 
    cada vez que esta se modifical, las estructuras secundarias también se tienen que editar, por lo que añadiendo un índice
    solo estaríamos aumentando la complejidad innecesariamente.

    Es posible que se realicen índices para FACTURA solo para cansos específicos (consultas en donde factura sea parte
    de un JOIN y se requiera optimizar).
 */

CREATE INDEX idx_factura_fecha ON Factura (fecha);

/* 
    CATEGORIA, es una relación que no requiere índices. Solo tiene una columna y es UNIQUE.
*/

/*
    EVENTO, es una relación con una afluencia de datos mucho menor en comparación con el resto
    de relaciones existentes. Normalmente, los eventos se realizan en fechas especiales, por motivos
    bastante concretos y en relación a la cantidad de libros, ejemplares o personas en la base de datos;
    la cantidad de registros que puede haber en EVENTO son considerablemente menores. Por lo que agregar 
    un indice a priori parece ser innecesario. Además, para consultas específicas, los eventos pueden buscarse
    utilizando pk_evento, que es un primary key, y por lo tanto UNIQUE.
*/

/* 
    Para las relaciónes entre tablas, los índices se crearán en función de las consultas a realizar para los
    requerimientos funcionales. Fuera de esto, la mayoría pueden ser consultadas por medio de su primary key, por lo que
    no es necesario añadir índices a los mismos.
*/

/*
    Para los requerimientos funcionales que ocupan solo consultas a la base de datos evaluaremos el uso de índices para cada uno.
    Si son necesarios, serán implementados:
*/

-- 1. generar_reporte_libros_mas_prestados:

/*
    Para esta consulta tenemos que se unen las tablas Presta, Ejemplar y Libro con sus respectivas condiciones de union,
    además tenemos una condición de búsqueda WHERE que consta de un CNF donde cada cláususla tiene una operación de rango y un IS NULL.
    Por último, se agrupa y se ordena. Entonces, para esta consulta podemos optimizarla de la siguiente manera:
*/

-- Para filtrar más eficientemente en la condición WHERE sobre los rangos de fecha_inicio y fecha_final. 
-- Un índice B+ Tree sobre dichas columnas, satisfaciendo la condición de rango:
CREATE INDEX idx_presta_fecha_inicio_fecha_final ON Presta (fecha_inicio, fecha_final);

-- Para ejemplar, el DBSM utilizará ya el índice por defecto enfocado en serial_ejemplar (UNIQUE), 
-- por lo que no hace falta crear otro índice, pudiendo satisfacer la condición de igualdad.

-- Para libro, también se utilizará el índice HASH ya creado por defecto sobre ISBN, por ser UNIQUE, teniendo todas esta consulta correctamente indexada.

-- 2. filtrar_libros_por_categoria:

/* 
    Para esta consulta solo requerimos crear un índice. Tengamos en cuenta que esta consulta solo posee una considicón de búsqueda
    para la tabla ES_DE, y una unión con LIBRO sobre ISBN. Ya por defecto tenemos indexado LIBRO por ISBN al ser UNIQUE, por lo que solo
    haría falta un índice sobre ES_DE para la columna tipo, este índice será B+ Tree, ya que la consulta devolverá más de un libro por categoría:
*/

CREATE INDEX idx_es_de_tipo ON Es_De (tipo)

-- 3. consultar_libros_mas_vendidos

/*
    En este caso el proceso es similar al de RF de generar reportes, a primera instancia, podemos dejar el índice que tiene LIBRO por defecto
    sobre ISBN, o bien podemos crear uno más específico para esta tarea, uno compuesto que a su vez indexe por título,
    ya que es criterio de agrupación:
*/
CREATE INDEX idx_libro_isbn_titulo ON Libro (isbn, titulo);

/*
    Luego, EJEMPLAR, ya está previamente indexado por serial_ejemplar, sin embargo no lo estamos utilizando como su criterio de union principal,
    podemos optimizar a su vez un poco más utilizando un índice sobre ISBN, que será compuesto:
*/
CREATE INDEX idx_ejemplar_serial_isbn ON Ejemplar (isbn, serial_ejemplar)

-- 4. consultar_mejores_compradores

/*
    Vende, ya tiene creado por defecto un índice implícito compuesto por las columnas serial_ejemplar, nro_facturación, cedula.
    Si bien no está del todo optimizado, crear otro índice para una tabla que constantemente se está actualizando no es lo más eficiente
    que podemos hacer, por lo que dejaremos su optimización a su indexación por defecto.
    
    De todas formas, un índice que es posible utilizar sería el siguiente:

    CREATE INDEX idx_vende_cedula_serial_ejemplar ON Vende (cedula, serial_ejemplar)

    Ya que optimiza mejor cambiando el orden y priorizando las columnas involucradas. 
*/

-- 5. consultar_bibliotecarios_que_organizan_mas_eventos

/*
    Para esta consulta no es necesario crear índices, ya que solo están involucradas columnas que son UNIQUE en las tablas mencionadas. 
*/

-- 6. consultar_personas_que_mas_donan_libros

/*
    Donante ya está indexado por id_donante al ser UNIQUE, algo similar sucede con Dona, pero dado que esta es una tabla
    un poco menos recurrida, podemos crear un índice un poco más útil para esta consulta, donde
    solo tendremos en cuenta las columnas involucradas:
*/

CREATE INDEX idx_dona_id_donante_serial_ejemplar ON Dona (id_donante, serial_ejemplar);

/*
    Como dato extra, podríamos hacer lo mismo con Persona, creando un índice que priorice las tablas involucradas
    para esta consulta:
*/

CREATE INDEX idx_persona_id_donante_nombre_cedula ON Persona (id_donante, nombre, cedula);

-- Tablas no indexadas:

/*
    Por último, las tablas no indexadas han sido:
    Presta, Escribe, Visita, Organiza, Trabaja, Realiza, Vende, Asiste y Resena.
    Estas tablas no forman parte fundamental de los requerimientos funcionales para consultas a la 
    base de datos, las que sí, se utilizan con la indexación por defecto. Indexaciones adicionales
    a estas tablas solo complicarían las operaciones de inserción/mantenimiento de dichas relaciones.
*/