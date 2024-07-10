import psycopg2

# Configuracion de la conexion con PostgreSQL
def connect_to_db():
    try:
        connection = psycopg2.connect(
            host="localhost",
            user="postgres",
            password="575217",
            database="biblioteca"
        )
        print("Connection established")
        return connection
    except Exception as e:
        print(e)
        return None