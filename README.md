# Tecnologías Usadas
## Frontend
* React con React Router
* Context API para manejo de estado
* Axios para llamadas a la API
* CSS Modules (según los componentes)
* Vercel (para despliegue)
## Backend
* Node.js con Express
* PostgreSQL con Sequelize ORM
* JWT para autenticación
* bcrypt.js para hashing de contraseñas
* Express Validator para validaciones
* Render (para despliegue)

## Funcionalidades
* Registro e inicio de sesión con JWT
* CRUD de tareas: crear, editar, completar y eliminar
* Filtrado de tareas por estado y fecha
* Protección de rutas con autenticación
* Gestión de sesiones con localStorage

## Endpoints API
### Autenticación
* POST /api/auth/register → Registro de usuario
* POST /api/auth/login → Inicio de sesión
### Tareas
* POST /api/tasks → Crear nueva tarea
* GET /api/tasks → Obtener todas las tareas del ### usuario
* GET /api/tasks/:id → Obtener tarea por ID
* PUT /api/tasks/:id → Editar tarea
* DELETE /api/tasks/:id → Eliminar tarea

cambiar https://final-tasks-manager.onrender.com

## Despliegue
* Frontend: Vercel
* Backend: Render
* Base de datos: PostgreSQL 
## Autor
 Harold Joseph Sanchez Nogales

🔗 GitHub | https://github.com/haroldjose/Final_Tasks_Manager.git
