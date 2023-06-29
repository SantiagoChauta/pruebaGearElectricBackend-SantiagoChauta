# pruebaTecnicaBackend
Aqui se encuentra el repositorio del backend de la prueba tecnica

# Base de datos
Se utiliza la base de datos postgres 14.8

En la carpeta database se encuentra un script el cual se encarga de crear la base de datos e inicializarla

El comando para ejecutar el script es el siguiente
```
\i ruta-al-proyecto/database/database.sql
```

# Inicilizar servidor
Es necesario instalar los modulos de express y pg para que funcione correctamente, instalarlos mediante el siguiente comando

```
npm i express pg
```

una vez instalados y estando en la raiz del proyecto ejecutar el comando

```
node src/index.js
```
