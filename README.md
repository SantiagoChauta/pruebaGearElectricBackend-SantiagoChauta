# pruebaTecnicaBackend
Aqui se encuentra el repositorio del backend de la prueba tecnica

# Base de datos
Se utiliza la base de datos postgres 14.8

En la carpeta database se encuentra un script el cual se encarga de crear la base de datos e inicializarla

El comando para ejecutar el script es el siguiente
```
\i ruta-al-proyecto/database/database.sql
```

En caso de que la base de datos no le permita correr el archivo directamente puede abrirlo copiar todo el contenido y pegarlo en la SQL Shell

# Lenguaje utilizado

El proyecto esta hecho utilizando unicamente javascript haciendo uso del modulo ```express``` para facilitar la creacion del servidor en el cual
tendremos configurados nuestros endpoints.

No se utiliza ningun ORM ya que es un servidor con un unico endpoint y la base de datos solo posee una tabla, por lo que se prefiere codificar las consultas a la
base de datos como uno considere. 


# instalacion de modulos necesarios
Es necesario instalar los modulos de express, pg y cors para que funcione correctamente, instalarlos mediante el siguiente comando

```
npm i express pg cors
```

# Configuraciones adicionales

## Conexion a la base datos datos

En el archivo ``` src/controllers/index.controllers.js ``` encontrara la instancia de un objeto llamado pool, es necesario modificar los siguientes 2 parametros

```
const pool = new Pool({
    host:'localhost', ->host en donde se encuentra la base de datos
    user:'postgres',
    password:'', -> contraseña que se configuro al instalar la base de datos
    database:'pruebatecnica', 
    port:'5432'
})
```

## Permitir conexión al cliente 

En el archivo ``` src/index.js ``` encontrara la siguiente linea de código, la cual debe modificar para que le permita la conexión al cliente

``` 
app.use(cors({
    origin:'http://localhost:8080' -> debe colocar la direccion en la cual esta ejecutandose el cliente
}))
```

# Inicializar servidor

una vez hechas las configuraciones anteriores y estando en la raiz del proyecto ejecutar el comando

```
node src/index.js
```

# Nota
De ser posible correr en el mismo host que el cliente para facilitar la conexión entre las aplicaciones

