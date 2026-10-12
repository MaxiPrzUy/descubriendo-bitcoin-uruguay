# Protocolo de medición V2 — borrador de diseño

> **Estado:** diseño en revisión.  
> Este documento no reemplaza todavía las encuestas utilizadas en el piloto 2026.

## Por qué existe una V2

El piloto utilizó cinco preguntas idénticas antes y después.

Eso permite una comparación simple y conserva una línea de base histórica, pero tiene una limitación: parte de la mejora puede deberse al recuerdo del ítem.

La V2 busca medir aprendizaje con mayor rigor sin convertir la experiencia en un examen.

## Principios

1. **Núcleo común:** todas las personas responden el mismo conjunto de conceptos medidos, aunque el contenido intermedio sea adaptativo.
2. **Formas paralelas A/B:** mismo concepto, distinto enunciado.
3. **Rotación:** parte de la muestra recibe A en PRE y B en POST; otra parte recibe B en PRE y A en POST.
4. **“No sé” explícito:** reduce respuestas al azar.
5. **Certeza:** cada respuesta registra si la persona está segura, dudando o no sabe.
6. **Sin feedback en PRE:** las respuestas se revelan después de la experiencia.
7. **Transferencia:** al menos una evidencia debe aplicar el concepto a una situación nueva.
8. **Conocimiento ≠ experiencia:** usar una wallet o un exchange no aumenta automáticamente el nivel conceptual.
9. **Aprendizaje ≠ adopción:** clics, comunidad o uso de Bitcoin se reportan por separado.

## Seis dimensiones propuestas

- Dinero y contexto.
- Red y reglas.
- Claves y custodia.
- Seguridad y estafas.
- Privacidad.
- Pagos y usos reales.

Estas dimensiones todavía deben validarse con pruebas de usuario y revisión pedagógica.

## Lectura de una respuesta

Una posible escala para el motor adaptativo:

| Respuesta | Lectura pedagógica |
|---|---|
| Correcta + alta certeza | evidencia sólida |
| Correcta + duda | evidencia parcial |
| No sé | sin evidencia |
| Incorrecta + duda | brecha |
| Incorrecta + alta certeza | posible concepción errónea |

La puntuación exacta del motor se definirá antes del piloto digital y se versionará.

## Qué permanece comparable

La adaptación ocurre **entre** PRE y POST.

El núcleo de medición permanece común para todos.

Las preguntas adaptativas o microprobes sirven para personalizar, pero se analizan por separado y no se mezclan con el score principal.

## Línea de base histórica

Los cinco ítems del piloto 2026 se conservan en el repositorio como instrumento V1 y como referencia histórica.

No se deben reinterpretar retroactivamente con las reglas de V2.

## Datos

La medición educativa no necesita recolectar:

- nombre;
- email;
- wallet;
- dirección;
- balance;
- monto de bitcoin;
- frase semilla;
- ciudad o barrio.

Un identificador aleatorio de sesión o código anónimo es suficiente para parear respuestas.

Si en el futuro se ofrece guardar progreso por email, identidad y respuestas educativas deben almacenarse de forma separada.

## Antes de lanzar V2

Falta:

- escribir formas A/B;
- revisar técnicamente cada ítem;
- probar distractores;
- hacer pruebas cognitivas con personas principiantes;
- definir reglas de exclusión de datos;
- fijar métricas principales antes de mirar resultados;
- publicar la versión final del protocolo.
