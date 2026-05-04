# Java Espresso - Angular 19

Proyecto migrado de HTML/CSS/JS vanilla a Angular 19 con Standalone Components.

## Estructura del proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/          ← Navbar compartida
│   │   └── footer/          ← Footer compartido
│   ├── pages/
│   │   ├── home/            ← index.html
│   │   ├── catalogo/        ← pag/catalogo.html
│   │   ├── servicios/       ← pag/servicios.html
│   │   ├── reservas/        ← pag/reservas.html
│   │   ├── cupones/         ← pag/cupones.html
│   │   └── contacto/        ← pag/contacto.html
│   ├── app.routes.ts
│   ├── app.config.ts
│   └── app.component.ts
├── styles.css               ← style.css global
├── index.html
└── main.ts

public/
└── img/                     ← ⚠️ AQUÍ van tus imágenes (copia la carpeta /img aquí)
```

## ⚠️ PASO OBLIGATORIO: Copiar las imágenes

Copia tu carpeta `/img` original dentro de `public/`:

```bash
# Desde la raíz del proyecto Angular
cp -r /ruta/a/tu/proyecto/img  public/img
```

Las imágenes quedarán accesibles como `assets/img/LogoTaza.png`, etc.

## Instalación y arranque

```bash
# 1. Instalar dependencias
npm install

# 2. Lanzar servidor de desarrollo
ng serve

# 3. Abrir en el navegador
# http://localhost:4200
```

## Build para producción

```bash
ng build
# Resultado en dist/cafeteria-angular/
```

## Rutas

| Ruta | Página |
|------|--------|
| `/` | Inicio (Home) |
| `/catalogo` | Carta |
| `/servicios` | Servicios |
| `/reservas` | Reservas |
| `/cupones` | Cupones |
| `/contacto` | Contacto |
