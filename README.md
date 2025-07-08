# Amadeus Horas Extras

## Descripción del Proyecto

Amadeus Dashboard es una aplicación web desarrollada con React y Vite que permite gestionar horas extras, empleados y configuraciones relacionadas con el equipo laboral. La plataforma está diseñada para maximizar la eficiencia en la gestión de horas extras, ofreciendo funcionalidades como registro, cálculo automático, historial y generación de reportes.

## Estructura del Proyecto

### Principales Directorios y Archivos
- **src/**: Contiene el código fuente de la aplicación.
  - **pages/**: Componentes principales que representan las vistas de la aplicación (Dashboard, Login, ExtraHour, Profile, Record).
  - **components/**: Componentes reutilizables como Header, Footer, Table, TableEmployee, Configuration, Report.
  - **api/**: Configuración de Axios para realizar solicitudes HTTP.
  - **store/**: Configuración de Redux para el manejo del estado global.
  - **routes/**: Rutas protegidas para garantizar el acceso seguro a las vistas.
  - **styles.css**: Archivo de estilos globales utilizando TailwindCSS.
- **public/**: Contiene recursos estáticos como imágenes.
- **Dockerfile**: Configuración para desplegar la aplicación en un contenedor Docker.
- **vite.config.js**: Configuración de Vite para el desarrollo y la compilación.
- **.github/workflows/node.yml**: Configuración de GitHub Actions para CI/CD.

## Tecnologías Utilizadas

### Frontend
- **React**: Biblioteca para construir interfaces de usuario.
- **Vite**: Herramienta de desarrollo rápida para proyectos de frontend.
- **TailwindCSS**: Framework de estilos CSS.
- **Redux Toolkit**: Manejo del estado global.
- **React Router**: Navegación entre vistas.

### Backend
- **Axios**: Cliente HTTP para consumir APIs.
- **Vite API Proxy**: Configuración para interactuar con el backend.

### DevOps
- **Docker**: Contenedor para desplegar la aplicación.
- **GitHub Actions**: Automatización de CI/CD.

# Configuración del Entorno

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
2. Instalar dependencias
    ```bash
   npm install
3. Inicia el servidor
    ```bash
   npm run dev

## Construcción y despliegue

1. Costruir la aplicación
    ```bash
   npm run build
2. Desplegar en Docker
    ```bash
   docker build -t amadeus-dashboard .
   docker run -p 5173:5173 amadeus-dashboard

# Funciones principales
## Gestión de horas extras
- Registro de horas extras.
- Cálculo automático de horas.
- Aprobación y rechazo de solicitudes.
- Historial de horas extras.
## Gestión de Empleados
- Creación, edición y eliminación de empleados.
- Búsqueda avanzada por nombre.
## Configuración
- Ajuste de límites de horas extras.
- Configuración de tipos de horas extras.
## Reportes
- Generación de reportes en formato Excel.
## CI/CD
El proyecto utiliza GitHub Actions para automatizar la construcción y despliegue:

- Workflow: [node.yml](.github/workflows/node.yml)
- Construcción en cada `push` o `pull_request` a la rama `main`.
## Contribución
1. Crear un fork del repositorio.
2. Crear una nueva rama para los cambios:
   ```bash
   git checkout -b feature/nueva-funcionalidad
3. Realizar un pull request a la rama `main`.
# React + Vite

Esta plantilla proporciona una configuración mínima para que React funcione en Vite con HMR y algunas reglas de ESLint.

Actualmente, hay dos complementos oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) utiliza [Babel](https://babeljs.io/) para Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) utiliza [SWC](https://swc.rs/) para Fast Refresh.

## Expandiendo la configuración de ESLint

Si estás desarrollando una aplicación de producción, recomendamos usar TypeScript y habilitar reglas de lint con reconocimiento de tipos. Consulta la [plantilla de TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para integrar TypeScript y [`typescript-eslint`](https://typescript-eslint.io) en tu proyecto.
## Licencia
Este proyecto está bajo la licencia de Amadeus IT Group SA. Todos los derechos reservados. ```
