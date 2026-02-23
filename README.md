# Softour FE Components Module

Librería de componentes frontend para Softour, construida con Vue 3 + Vite.

## ¿Para qué sirve este proyecto?

Este proyecto sirve para diseñar, desarrollar y mantener componentes UI reutilizables (tabla, panel, celdas, filas, botones, etc.) con un enfoque de sistema de diseño.

Objetivos principales:

- Estandarizar la UI entre productos.
- Tener componentes desacoplados y reutilizables.
- Documentar y validar visualmente cada componente.
- Permitir evolución segura con tests y Storybook.

---

## Requisitos

- Node.js 20+
- npm 10+

---

## Instalación

1. Clonar el repositorio.
2. Instalar dependencias:

```bash
npm install
```

3. Levantar entorno de desarrollo:

```bash
npm run dev
```

---

## Scripts principales

- Desarrollo app:

```bash
npm run dev
```

- Build de librería (genera el paquete en `dist/`):

```bash
npm run build
```

  Salida: `dist/softour-fe-components.es.js`, `dist/softour-fe-components.umd.js`, `dist/softour-fe-components.css`.

- Tests unitarios:

```bash
npm run test
```

- Storybook (modo desarrollo):

```bash
npm run storybook
```

- Build estático de Storybook:

```bash
npm run build-storybook
```

---

## ¿Qué es Storybook y para qué se usa aquí?

Storybook es una herramienta para desarrollar y documentar componentes de forma aislada, sin depender de toda la aplicación.

En este proyecto se usa para:

- Visualizar estados de cada componente (default, variantes, casos con datos reales).
- Documentar API visual (props, slots, comportamiento).
- Tener una referencia compartida entre diseño y desarrollo.
- Detectar regresiones de UI más rápido.

---

## Flujo recomendado de trabajo

1. Crear o modificar componente.
2. Crear/actualizar su story en Storybook.
3. Validar visualmente en Storybook.
4. Añadir/actualizar tests.
5. Integrar en vistas reales.

---

## Convención clave del proyecto

### `Default.vue` es el playground de construcción

La vista `src/views/Default/Default.vue` funciona como área de pruebas e integración rápida de componentes durante desarrollo.

### Storybook es la fuente base sobre la que se basará todo

Storybook es la fuente de verdad para los componentes:

- Definición de estados válidos.
- Comportamiento esperado por componente.
- Referencia visual para futuras implementaciones.

En resumen:

- `Default.vue` = playground operativo para construir e integrar.
- Storybook = fuente canónica para documentar, validar y evolucionar componentes.

---

## Uso como paquete npm

El proyecto se construye como librería y puede publicarse en npm o consumirse en local.

### Consumir en otro proyecto

1. En la app que consumirá los componentes, instalar dependencias peer (Vue, etc.) si no están ya:

```bash
npm install vue @heroicons/vue pinia vue-i18n vue-router
```

2. Instalar este paquete (ruta local o nombre si está publicado):

```bash
npm install /ruta/a/softour-fe-components__module
# o, si está publicado: npm install softour-fe-components__module
```

3. En la app Vue:

```js
// Registrar todos los componentes (plugin)
import SoftourFeComponents from 'softour-fe-components__module';
import 'softour-fe-components__module/style.css';
app.use(SoftourFeComponents);

// O importar componentes concretos
import { CustomTable, CustomPanel, CustomButton, CustomIcon } from 'softour-fe-components__module';
import 'softour-fe-components__module/style.css';
```

### Publicar en npm

Después de `npm run build`, la carpeta `dist/` y el `package.json` están listos para publicar. El campo `"files": ["dist"]` hace que solo se suba esa carpeta.

```bash
npm publish
```

---

## Notas

- El build estático de Storybook se genera en `storybook-static/`.
- Esa carpeta está ignorada en git.

