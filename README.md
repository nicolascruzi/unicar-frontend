# Unicar

La plataforma Unicar permite a los estudiantes organizar viajes compartidos desde y hacia las universidades.

## Tabla de Contenidos

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Componentes](#componentes)
  - [MapComponent](#mapcomponent)
  - [Navbar](#navbar)
  - [LoginForm](#loginform)
  - [SignUpForm](#signupform)
- [Páginas y Rutas](#páginas-y-rutas)
- [Utilidades](#utilidades)
- [Despliegue](#despliegue)
- [Recursos Adicionales](#recursos-adicionales)

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```plaintext
src/
  assets/
    images/
  components/    # Componentes de UI reutilizables y vistas
  contexts/      # Contiene el AuthContext
  utils/         # Utilidades y funciones auxiliares
  App.js         # Componente principal de la aplicación
  index.js       # Punto de entrada de la aplicación
```

## Instalación

Para instalar todas las dependencias necesarias, ejecute el siguiente comando:

```bash
npm install
```

## Ejecución

Para iniciar la aplicación, use el siguiente comando:

```bash
npm start
```
Esto iniciará el servidor de desarrollo y podrá ver la aplicación en http://localhost:3000.

## Componentes

### MapComponent
Este componente muestra la información del mapa, utilizando la api key de Google Maps, es llamada en todas las vistas en donde se requiere renderizar un mapa.

### Navbar
Este componente se muestra en la parte superior y contiene los botones para navegar en la plataforma.

### LoginForm
Este componente renderiza el formulario para iniciar sesion.

### SignUpForm
Este componente renderiza el formulario para registrarse como usuario de la plataforma.

## Páginas y Rutas

### LandingPage
La página principal muestra informacion relevante sobre el objetivo de la plataforma y cuenta con botones para llegar al registro y login.

### App.js
El archivo principal de la aplicación que define las rutas y estructura de navegación. Utiliza react-router-dom para gestionar las rutas y cargar diferentes páginas según la URL.

## Utilidades

Las utilidades son funciones auxiliares que pueden ser reutilizadas en varios lugares de la aplicación. Por ejemplo, funciones para hacer llamadas a una API, formatear datos, etc.


## Despliegue

El despliegue de la aplicación puede hacerse en servicios de hosting como Vercel, Netlify o Heroku. Estos servicios permiten subir la aplicación y hacerla accesible en Internet.
