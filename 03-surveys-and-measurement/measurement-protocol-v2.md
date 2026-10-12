# Protocolo de medición V2 — diseño para piloto digital

> **Estado:** especificación previa a validación.  
> Este documento no reemplaza retroactivamente las encuestas utilizadas en el piloto presencial 2026.

## Objetivo

Medir aprendizaje sin convertir la experiencia en un examen y sin confundir personalización con evidencia de impacto.

## Principios

1. **Núcleo común:** todas las personas responden los mismos seis conceptos.
2. **Adaptación intermedia:** la ruta personalizada ocurre entre PRE y POST.
3. **Formas paralelas A/B:** mismo concepto, situación distinta.
4. **Contrabalanceo:** AB / BA.
5. **“No sé” explícito.**
6. **Certeza en tres niveles.**
7. **Sin feedback en PRE.**
8. **Transferencia separada:** los ítems Aplicá no se mezclan con el score del núcleo.
9. **Conocimiento ≠ experiencia.**
10. **Aprendizaje ≠ adopción.**
11. **No causalidad prematura:** el piloto no atribuye causalmente el cambio a la ruta adaptativa.

## Seis dimensiones

- Dinero y contexto.
- Red y reglas.
- Claves y custodia.
- Seguridad y estafas.
- Privacidad.
- Pagos y usos reales.

## Instrumento núcleo

Cada persona responde:

- 6 ítems PRE;
- 6 ítems POST.

Cada concepto tiene:

- forma A;
- forma B.

Las formas A/B se consideran equivalentes **por diseño**, pero esa equivalencia debe analizarse con datos antes de hacer inferencias individuales fuertes.

## Certeza

Después de una respuesta distinta de “No sé”:

- poca;
- media;
- mucha.

La certeza sirve para identificar posibles concepciones erróneas y estudiar calibración en agregado.

No se presenta como una medición psicométrica individual robusta.

## Microprobes

Solo Seguridad y Custodia.

Disparador:

**incorrecta + certeza alta**

Máximo 2.

El microprobe:

- usa otra situación;
- no muestra feedback;
- no entra en PRE/POST;
- ayuda al motor a diferenciar concepción errónea de respuesta inconsistente.

## Resultado cualitativo

Los niveles de una dimensión son orientativos.

Copy V1:

- **Bien encaminado**
- **En construcción**
- **Conviene revisar**

No significan dominio formal.

Una dimensión puede tener más evidencia si fue recorrida dentro de la ruta, por lo que las dimensiones no deben compararse entre sí como si fueran escalas equivalentes.

## Métrica principal

Reportar tablas de transición agregadas por concepto:

| PRE | POST | Lectura |
|---|---|---|
| Incorrecta | Correcta | ganancia observada |
| Correcta | Incorrecta | retroceso / ruido |
| Correcta | Correcta | estabilidad |
| Incorrecta | Incorrecta | sin cambio |

La lectura principal incluye tanto ganancias como retrocesos.

## Concepciones erróneas

Se analizan especialmente respuestas:

**incorrecta + alta certeza**

cuando hayan sido confirmadas por microprobe.

La corrección posterior es una métrica relevante, pero sigue expuesta a error de medición y efecto de repetir la prueba.

## Transferencia

Los ítems Aplicá evalúan el uso del concepto en una situación distinta.

Se reportan por separado.

No se suman al score PRE/POST.

## Comparaciones de ruta

Comparar “conceptos recorridos” y “conceptos no recorridos” puede ser útil de forma exploratoria, pero **no identifica por sí mismo el efecto causal del módulo**, porque el motor selecciona la ruta en función del PRE.

Para una estimación causal posterior será necesario un diseño con aleatorización entre opciones pedagógicamente elegibles u otra estrategia experimental.

## Score X de 6

Puede mostrarse al usuario como devolución simple:

**PRE X/6 → POST Y/6**

No debe convertirse automáticamente en la métrica principal de impacto público.

## Línea de base histórica

El piloto presencial 2026 usó cinco ítems idénticos antes y después.

Ese instrumento se conserva como V1 histórica.

No se reinterpretan retrospectivamente sus resultados con el protocolo digital.

## Datos y privacidad

La medición no necesita:

- nombre;
- email;
- wallet;
- dirección;
- balance;
- monto de bitcoin;
- frase semilla;
- ciudad;
- barrio.

La experiencia práctica puede utilizarse **en el dispositivo** para personalización y no persistirse en el dataset analítico.

Si la persona rechaza analytics, la experiencia funciona igual y no envía eventos analíticos.

## Antes del piloto

Debe completarse:

- banco A/B;
- microprobes;
- ítems Aplicá;
- entrevistas cognitivas;
- revisión técnica Bitcoin;
- revisión de evaluación educativa;
- revisión externa crítica;
- test de equivalencia inicial por diseño;
- reglas de exclusión;
- plan de análisis;
- criterios del piloto pre-registrados.

## Después del piloto

Analizar:

- abandono;
- dificultad por ítem;
- diferencia A/B;
- ganancias y retrocesos;
- concepciones erróneas;
- transferencias;
- diversidad de rutas;
- desempeño por origen web/evento;
- datos faltantes y sesgo de consentimiento.

Los resultados deben publicarse con tamaño de muestra y limitaciones.
