# Descubriendo Bitcoin — Long MVP V5

La V5 toma el Long MVP V4 y aplica el feedback real de las primeras experiencias de Descubriendo Bitcoin.

## Qué cambia

La prioridad de esta versión es que la persona **descubra antes de recibir la respuesta**.

Se conserva la ruta larga:

**7 mundos · 37 lecciones · 7 desafíos finales**

pero se mejora ritmo, claridad, contraste, variedad de interacciones y narrativa.

## Correcciones incorporadas

### El café y el saldo

El ejemplo ahora se construye en capas:

1. 100 − 20 = 80.
2. después aparecen sats;
3. recién al final se introduce una comisión ilustrativa;
4. la cuenta termina en 7.998 sats.

No se mezclan saldo, pago y fee antes de que la resta básica quede clara.

### Verificación

Nueva dinámica **resultado vs. cuenta**.

La persona puede elegir:

- confiar en el saldo que muestra una app;
- o rehacer la cuenta.

El matiz queda explícito: usar una app de Bitcoin no significa verificar todo automáticamente. Verificar por cuenta propia requiere herramientas y configuración adecuadas, como un nodo.

### Punta Bitcoin

Ya no aparece como una sección promocional.

Primero se trabaja economía circular. Después aparece la pregunta:

**¿Esto existe acá?**

Punta Bitcoin se presenta como:

**una economía circular Bitcoin en construcción**, con tres dimensiones:

- qué existe hoy;
- qué falta;
- cómo sabríamos si funciona.

También se declara que es aliado del programa.

### Economía circular

Nueva mecánica:

**Persona → Café → Proveedor → Panadería → Otra persona**

La experiencia muestra dos caminos:

- convertir a moneda local y cortar el circuito;
- volver a usar bitcoin y mantener el valor circulando.

Convertir a moneda local no se presenta como un error.

### Respuestas

Se revisaron distractores para evitar respuestas burlonas o deliberadamente absurdas.

Una opción incorrecta debe representar una confusión razonable y enseñar algo.

### Contraste

La interfaz pasa a ser predominantemente:

- blanco cálido;
- negro;
- naranja Bitcoin como acento.

Se eliminan combinaciones oscuras con contraste débil.

## Nuevas mecánicas V5

Además de las mecánicas existentes:

- **cafe** — saldo progresivo;
- **surprise** — pausa narrativa antes de definir Bitcoin;
- **verify** — resultado vs. cuenta;
- **seedShock** — frase ficticia y regla de seguridad;
- **lightningPay** — pago Lightning simulado;
- **circle** — economía circular interactiva;
- **localCase** — caso Punta Bitcoin con contexto.

## Tres factores sorpresa principales

1. **“Borrá todo lo que escuchaste de Bitcoin”** antes de la definición.
2. **Frase semilla ficticia** para convertir seguridad en una experiencia.
3. **Pago Lightning simulado** para que la teoría se vuelva acción.

Punta Bitcoin funciona además como revelación local al final del recorrido de usos.

## Principio pedagógico

**Situación → interacción → consecuencia → concepto → debate → transferencia**

Método D4:

**Descubrir → Debatir → Demostrar → Dar el siguiente paso**

## Principio editorial

> No venimos a convencerte. Venimos a hacerte pensar.

Una respuesta incorrecta no se ridiculiza.

Una crítica válida no se oculta.

Y un caso real no se presenta como prueba universal.

## Datos

No hay backend ni analytics remoto.

El progreso se guarda en el navegador mediante `localStorage`.

V5 migra automáticamente el progreso existente de V4 cuando lo encuentra.

## Estado

**Beta V5 para prueba humana en móvil y escritorio.**

El siguiente QA importante no es agregar más contenido: es observar usuarios reales y medir dónde dudan, dónde abandonan y qué recuerdan después.
