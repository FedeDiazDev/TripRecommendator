# Trip Recommendator 🌍✈️

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white)


**Trip Recommendator** es una aplicación web moderna diseñada con un enfoque **Mobile-First** que utiliza **Inteligencia Artificial** para sugerir destinos de viaje basándose en las preferencias del usuario.

El usuario puede describir su viaje ideal en lenguaje natural (ej: "Quiero un lugar con playas tranquilas, buena comida y clima tropical"), y la aplicación, impulsada por la **API de Google Gemini**, procesará la solicitud para mostrar destinos recomendados en un **mapa interactivo**.

---

## 🚀 Características Principales

- **Búsqueda con IA (Free-Text Input):** Procesamiento de lenguaje natural utilizando Google GenAI para interpretar descripciones complejas de viajes.  
- **Mapa Interactivo:** Visualización de destinos mediante Leaflet y marcadores personalizados.  
- **Diseño Mobile-First:** Interfaz responsiva y adaptativa, optimizada para dispositivos móviles y de escritorio.  
- **UI Moderna (Luxury Tech):** Estética elegante con modo oscuro, efectos de vidrio (glassmorphism) y animaciones fluidas.  
- **Arquitectura:** Frontend (Vite + React) y Backend (Express).

---

## 📸 Capturas de Pantalla

<div align="center">
  <img src="assets/portada.png" alt="Portada de la aplicación" width="45%" />
  <img src="assets/carga.png" alt="Pantalla de carga con IA" width="45%" />
  <br/>
  <br/>
  <img src="assets/resultado.png" alt="Resultados en el mapa" width="45%" />
  <img src="assets/listado.png" alt="Listado de destinos" width="45%" />
</div>

---


---


## 🛠️ Stack Tecnológico

### Frontend
- **Framework:** React 19 + Vite  
- **Lenguaje:** TypeScript  
- **Estilos:** TailwindCSS + Autoprefixer  
- **Mapas:** Leaflet + React-Leaflet  
- **Iconos:** Lucide React  
- **IA (Cliente):** @google/genai (Integración directa o vía backend)  

### Backend
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Lenguaje:** TypeScript  
- **IA:** @google/genai (Google Gemini API)  
- **Utilidades:** CORS, ts-node  

### DevOps
- **Contenedorización:** Docker + Docker Compose  
- **Linting:** ESLint  

---

## 📋 Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

- Node.js (v18 o superior recomendado)  
- Docker Desktop (Obligatorio para la entrega)  
- Una API Key de Google Gemini (Google AI Studio)

### Archivos de Configuración

1.  Crea un archivo `.env` en la raíz del backend (`backend/.env`) **(Solo para ejecución manual sin Docker)**:
    ```bash
    PORT=9000
    GEMINI_API_KEY=tu_api_key_aqui
    ```
2.  Para Docker, asegúrate de que las variables de entorno necesarias estén configuradas en `docker-compose.yml` o en un archivo `.env` en la raíz del proyecto si decides externalizarlas.

---


## 🔧 Instalación y Ejecución (Entorno Local)


###  🐳 Ejecución con Docker
Para cumplir con los requisitos de entrega, el proyecto está completamente dockerizado.

Asegúrate de estar en la raíz del proyecto (donde está el docker-compose.yml).

Construye y levanta los contenedores:
```bash
docker-compose up --build
```

Esto iniciará tanto el frontend como el backend.

- Frontend: Accesible en http://localhost:3000
- Backend: Accesible en http://localhost:9000

### 📂 Estructura del Proyecto
```bash
TripRecommendator/
├── backend/            # Servidor Express y lógica de IA
│   ├── src/
│   │   ├── server.ts   # Punto de entrada
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
│
├── frontend/           # Cliente React + Vite
│   ├── src/
│   │   ├── components/ # Componentes (SearchBar, Map, etc.)
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml  # Orquestación de servicios
└── README.md           # Documentación del proyecto
```

### ✒️ Autor

Desarrollado por fdiaz-gu.
