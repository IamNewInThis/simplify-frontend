# Simplify Frontend

Interfaz de usuario para la plataforma Simplify.

## 📋 Descripción

Aplicación web desarrollada con React que proporciona la interfaz de usuario para la plataforma Simplify. Permite a los usuarios interactuar con el asistente de consultas, gestionar tareas de scraping y descargar resultados en formato CSV.

## 🏗️ Estructura del Proyecto

```
simplify-frontend/
├── src/
│   ├── components/         # Componentes reutilizables
│   ├── pages/              # Páginas de la aplicación
│   ├── hooks/              # Custom React hooks
│   ├── lib/
│   │   └── api.js          # Cliente HTTP para API
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Entry point
│   └── index.css           # Estilos globales con Tailwind
├── public/                 # Archivos estáticos
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md               # Este archivo
```

## 🛠️ Tecnologías

- **React 19** - Librería UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos utility-first
- **TanStack Query** - Gestión de estado del servidor (próximamente)
- **React Router** - Navegación (próximamente)

## ⚙️ Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno (opcional)

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:8000/api
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173/`

## 📦 Scripts Disponibles

```bash
# Ejecutar en modo desarrollo
npm run dev

# Crear build de producción
npm run build

# Vista previa del build
npm run preview

# Ejecutar linter
npm run lint
```

## 🚀 Build para Producción

```bash
# Generar build optimizado
npm run build

## 📝 Próximos Pasos

- Implementar sistema de autenticación
- Crear interfaz de asistente conversacional
- Implementar dashboard de tareas de scraping
- Añadir sistema de descarga de CSV
- Integrar TanStack Query para gestión de estado
- Añadir React Router para navegación

## 🔗 Servicios Relacionados

- [simplify-api](https://github.com/IamNewInThis/simplify-api) - Backend FastAPI
- [simplify-scraper](https://github.com/IamNewInThis/simplify-scraper) - Motor de scraping
- simplify-ai-service - Servicio de normalización con IA (próximamente)

