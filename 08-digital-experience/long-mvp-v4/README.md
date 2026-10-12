# Descubriendo Bitcoin — Long MVP V4

Versión extendida y usable del producto educativo interactivo de Descubriendo Bitcoin.

## Alcance

**7 mundos · 37 lecciones · 7 desafíos finales**

1. De dinero a Bitcoin
2. Cómo funciona Bitcoin
3. Claves y control
4. Seguridad
5. Privacidad
6. Usar Bitcoin
7. Verificá

La progresión es deliberadamente por dependencias. Un término técnico no debería aparecer como requisito antes de ser introducido.

## Principio pedagógico

Cada lección sigue una variante del ciclo:

**situación → interacción → consecuencia → concepto → debate → transferencia → sello**

Esto implementa el Método D4:

**Descubrir → Debatir → Demostrar → Dar el siguiente paso**

## Progreso

El Pasaporte Bitcoin distingue:

- Descubierta
- Demostrada
- Afirmada

Completar una pantalla no alcanza para marcar una pieza como demostrada.

## Mecánicas presentes

El motor incluye, entre otras:

- elecciones contextuales
- actualización de registros
- doble gasto simulado
- inspección
- comparación
- copias que rechazan cambios inválidos
- firma conceptual
- ordenamiento de una transacción
- cola/mempool
- construcción de bloques
- prueba de trabajo simulada
- confirmaciones
- caminos con consecuencias
- chats de ingeniería social
- lectura crítica de mercado ficticio

## Migración desde World 1 V3

Si el navegador conserva una sesión completa de `dbu_world1_v3`, esta versión reconoce automáticamente ese progreso y permite continuar desde **Mundo 2**.

## Privacidad de esta beta

No existe backend ni analytics remoto.

El progreso vive en `localStorage` del dispositivo.

## QA

Antes de publicar se probaron programáticamente:

- recorrido completo de los 7 mundos
- 37/37 lecciones
- 7/7 desafíos
- 15 tipos de mecánicas
- handlers sin referencias faltantes
- sintaxis de `app.js` y `content.js`

Esto no sustituye pruebas humanas de UX, accesibilidad ni pedagogía.

## Estado

**Beta de producto para pruebas de usuario.**
