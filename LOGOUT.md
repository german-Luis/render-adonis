# Logout 🔐

Para agregar la funcionalidad de logout

1. Agrega una nueva ruta en el archivo `start/routes.js` para la acción de logout:

```js
Route.post('/logout', 'AuthController.logout')
```

2. Agrega un nuevo método `logout()` en el controlador `AuthController` para manejar la acción de logout:

```js
async logout ({ auth, response }) {
  await auth.logout()
  return response.redirect('/')
}
```

Este método llama al método `logout()` del objeto `auth` de AdonisJS para cerrar la sesión actual del usuario, y luego redirige al usuario a la página de inicio.

3. En la vista de `login.edge` agrega la siguiente forma:

```html
    <form action="/logout" method="post">
        {{ csrfField() }}
        <button type="submit">Logout</button>
    </form>
```

# Contenido para el usuario

Para agregar una página que imprima un saludo para el usuario logeado o un mensaje que lo invite a logearse si no está logeado, puedes seguir los siguientes pasos:

1. Crea una nueva ruta en el archivo `start/routes.js` para mostrar la página de bienvenida:

```javascript
Route.get('/', 'HomeController.index')
```

2. Crea un nuevo controlador `HomeController` con un método `index()` para manejar la página de bienvenida:

```javascript
class HomeController {
  async index ({ auth, view }) {
    const user = await auth.getUser()

    return view.render('welcome', {
      user: user || null
    })
  }
}

module.exports = HomeController
```

Este método obtiene el usuario autenticado a través del objeto `auth` de AdonisJS y luego pasa el usuario a la vista `welcome.edge`.

3. Edita la vista `welcome.edge` que muestre un saludo para el usuario logeado o un mensaje de bienvenida si no está logeado:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hola</title>
  </head>
  <body>
    <h1>Hola</h1>
  @if (user)
    <h1>Hola, {{ user.username }} ✋</h1>
  @else
    <p>No haz iniciado sesión 💔</p>
  @endif
  </body>
</html>
```

Esta vista verifica si el usuario está logeado o no usando la variable `user` que se le pasa desde el controlador. Si el usuario está logeado, se muestra un saludo personalizado. Si no, se muestra un mensaje de bienvenida general.