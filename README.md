# **Proyecto SU7G2 - Unidad 7**

<h2>Documentación del proyecto en Swagger </h2>

    http://localhost:3000/docs
    
Integrantes:

- 👨‍💻 Starky Medina Caldas
- 👨‍💻 Jhohan Jancco Chara
- 👨‍💻 Henry Ccoillo

## **Proyecto SU7G2**
### **Indicaciones principales del proyecto**
### **Clonar el proyecto**

    git clone https://github.com/starkymc/SU7G2.git

### **Instalar dependencias necesarios**

    npm install

### **Configuración en archivo .env:**

    DATABASE_URL="file:./dev.db"
    PORT=3000
    TOKEN_SECRET = node require('crypto').randomBytes(64).toString('hex')
    
### **Ejecutar el proyecto**

    npm run dev
    
### **Indicación y descripción secundaria del proyecto**

#### **En la ruta: '/'**

    Hola
    
#### **Para ver y crear usuarios : /api/v1/users**

Para crear usuarios (post), ingresar por ejemplo:


    {
      "email": "example@example.com",
      "name": "example",
      "password": "*****************"
    }
    
    
#### **Para generar token en la ruta: /api/v1/users/login**

Con credenciales de email y password se genera un token, por ejemplo:


    {
      "email":"start@example.com",
      "password": "**********"
    }

    
#### **Para ver y crear playlist: /api/v1/playlist**
Petición post:

    
    {
      "name": "Playlist x",
      "userEmail": "example@example.com"
    }


#### **Para ver y crear: /api/v1/songs**

Petición post: 

Canciones privadas


    "isxprivate": true
    
    
Canciones públicas: 
    
    "isxprivate": false

Ejemplo de creación de canción:

    {
      "name": "Cancion x",
      "artist": "Artista x",
      "album": "Album x",
      "year": 2022,
      "genre": "example",
      "duration": 250,
      "isxprivate": true,
      "playlist": "Playlist example"
    }
    
    
Petición get:

Con token: acceso a canciones privadas y públicas.

Sin token: acceso a canciones públicas.

    token = "**********************************************************"
    
#### **Para ver canciones: /api/v1/songs/:id**
Petición get:

Canción privada: requiere token válido.

Canción pública: requiere token activado ya sea vació, nulo, inválido o aleatorio.


    token = "**********************************************************"
    

