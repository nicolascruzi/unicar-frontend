# Unicar

La plataforma Unicar permite a los estudiantes organizar viajes compartidos desde y hacia las universidades.

## Tabla de Contenidos

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Componentes](#componentes)
  - [CarCard](#carcard)
  - [CarForm](#carform)
- [Páginas y Rutas](#páginas-y-rutas)
  - [HomePage](#homepage)
  - [App.js](#appjs)
- [Utilidades](#utilidades)
- [Despliegue](#despliegue)
- [Recursos Adicionales](#recursos-adicionales)

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

```plaintext
src/
  components/    # Componentes de UI reutilizables
  pages/         # Páginas de la aplicación
  styles/        # Archivos de estilo globales
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

# CarCard
Este componente muestra la información de un automóvil en una tarjeta, incluyendo detalles como marca, modelo, año y placa.

# CarForm
Este componente es un formulario para agregar o editar la información de un automóvil. Permite ingresar detalles como marca, modelo, año y placa, y luego enviar esta información para ser procesada.

## Páginas y Rutas

HomePage
La página principal muestra una lista de automóviles. Incluye un formulario para agregar nuevos automóviles y una lista de tarjetas que muestran la información de cada automóvil registrado.

App.js
El archivo principal de la aplicación que define las rutas y estructura de navegación. Utiliza react-router-dom para gestionar las rutas y cargar diferentes páginas según la URL.

## Utilidades

Las utilidades son funciones auxiliares que pueden ser reutilizadas en varios lugares de la aplicación. Por ejemplo, funciones para hacer llamadas a una API, formatear datos, etc.


## Despliegue

El despliegue de la aplicación puede hacerse en servicios de hosting como Vercel, Netlify o Heroku. Estos servicios permiten subir la aplicación y hacerla accesible en Internet.
