# Controlador de autenticación 🔐

1. Crea un nuevo archivo llamado `AuthController.js` en el directorio `app/Controllers/Http`.

2. Agrega el siguiente código al archivo `AuthController.js`:

```javascript
'use strict'

const User = use('App/Models/User')

class AuthController {
}

module.exports = AuthController
```

3. Agrega `showRegisterForm()`: Este método se encarga de mostrar la vista de registro al usuario. Utiliza el método `render` del objeto `view` que se le pasa como parámetro para renderizar la vista `register`.

```javascript
  showRegisterForm ({ view }) {
    return view.render('register')
  }
```

4. Agrega `showLoginForm()`: Este método se encarga de mostrar la vista de inicio de sesión al usuario. Utiliza el método `render` del objeto `view` que se le pasa como parámetro para renderizar la vista `login`.

```javascript
  showLoginForm ({ view }) {
    return view.render('login')
  }
```

5. Agrega `register()`: Este método se encarga de registrar un nuevo usuario en la aplicación. Extrae los datos de usuario necesarios del objeto `request` utilizando el método `only`. Luego, crea un nuevo usuario utilizando el método `create` del modelo `User` y los datos del usuario extraídos. Finalmente, devuelve la respuesta en formato JSON con el usuario recién creado.

```javascript
  async register ({ request, response }) {
    const userData = request.only(['username', 'email', 'password'])
    const user = await User.create(userData)
    return response.json(user)
  }
```

6. Agrega `login()`: Este método se encarga de autenticar a un usuario en la aplicación. Extrae el correo electrónico y la contraseña del objeto `request` utilizando el método `all`. Luego, utiliza el objeto `auth` para intentar autenticar al usuario utilizando el método `attempt` y los datos del correo electrónico y la contraseña extraídos. Si la autenticación es exitosa, se genera un token de autenticación que se devuelve como respuesta en formato JSON.

```javascript
  async login ({ request, response, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    return response.json(token)
  }
```

7. Crea dos archivos nuevos llamados `register.edge` y `login.edge` en el directorio `resources/views`.

8. Agrega el siguiente código al archivo `register.edge`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Registro</title>
  </head>
  <body>
    <h1>Registro de nuevo usuario</h1>
    <form action="/register" method="post">
      {{ csrfField() }}
      <label for="username">Nombre de usuario:</label><br>
      <input type="text" id="username" name="username"><br>
      <label for="email">Correo electrónico:</label><br>
      <input type="email" id="email" name="email"><br>
      <label for="password">Contraseña:</label><br>
      <input type="password" id="password" name="password"><br>
      <br>
      <input type="submit" value="Registrarse">
    </form>
  </body>
</html>
```

* `<form action="/register" method="post">`: Este elemento define un formulario que se enviará a la ruta `/register` utilizando el método HTTP POST.

* `{{ csrfField() }}`: Genera un campo oculto con el token CSRF. El token CSRF es una medida de seguridad para prevenir ataques CSRF (Cross-Site Request Forgery) en formularios.

* `<input type="text" id="username" name="username"><br>`: Este elemento muestra un campo de entrada de texto para el "nombre de usuario". El atributo `id` se utiliza para asociar la etiqueta con el campo y el atributo `name` se utiliza para identificar el campo cuando se envía el formulario.

* `<input type="email" id="email" name="email"><br>`: Este elemento muestra un campo de entrada de texto para el "correo electrónico". El atributo `type` se establece en "email" para validar automáticamente el formato del correo electrónico.

* `<input type="password" id="password" name="password"><br>`: Este elemento muestra un campo de entrada de texto para la "contraseña". El atributo `type` se establece en "password" para ocultar los caracteres de la contraseña.

* `<input type="submit" value="Registrarse">`: Este elemento muestra un botón de envío para enviar el formulario.

9. Y agrega el siguiente código al archivo `login.edge`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Iniciar sesión</title>
  </head>
  <body>
    <h1>Iniciar sesión</h1>
    <form action="/login" method="post">
      {{ csrfField() }}
      <label for="email">Correo electrónico:</label><br>
      <input type="email" id="email" name="email"><br>
      <label for="password">Contraseña:</label><br>
      <input type="password" id="password" name="password"><br>
      <br>
      <input type="submit" value="Iniciar sesión">
    </form>
  </body>
</html>
```

10. Agrega las rutas para el controlador de autenticación y las vistas HTML en tu archivo `start/routes.js`:

```javascript
Route.get('/register', 'AuthController.showRegisterForm')
Route.post('/register', 'AuthController.register')
Route.get('/login', 'AuthController.showLoginForm')
Route.post('/login', 'AuthController.login')
```

Estas rutas indican que cuando se acceda a `/register` se ejecutará el método `showRegisterForm()` del controlador `AuthController`, cuando se envíe un formulario POST a `/register` se ejecutará el método `register()` del mismo controlador, cuando se acceda a `/login` se ejecutará el método `showLoginForm()` del controlador `AuthController`, y cuando se envíe un formulario POST a `/login` se ejecutará el método `login()` del controlador `AuthController`.

6. Ejecuta el servidor de AdonisJS, y accede `/register` para ver el formulario de registro, y a `/login` para ver el formulario de inicio de sesión.