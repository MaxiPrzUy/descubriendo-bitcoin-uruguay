# Tu Ruta Bitcoin — PRD V1

> **Estado:** especificación de producto previa a wireframes.  
> **Fecha:** 12 de octubre de 2026.  
> **Proyecto:** Descubriendo Bitcoin Uruguay.  
> **Método oficial:** D4.

## 1. Objetivo

Validar si una experiencia educativa digital corta, adaptativa, crítica y no especulativa puede:

- ser completada por personas adultas con distintos niveles previos;
- producir señales de aprendizaje medibles;
- detectar concepciones erróneas relevantes;
- orientar un siguiente paso sin empujar adopción;
- funcionar como extensión del programa presencial y también de forma autónoma online.

La V1 es un **piloto educativo**, no una evaluación psicométrica validada ni una prueba causal definitiva de efectividad.

## 2. Qué no es

La V1:

- no enseña trading;
- no recomienda comprar bitcoin;
- no muestra precio;
- no recomienda exchanges, wallets ni productos;
- no certifica conocimiento;
- no requiere cuenta;
- no usa IA para personalizar;
- no mide éxito por conversiones a comunidad;
- no reemplaza la clase presencial.

## 3. Arquitectura pedagógica

El producto utiliza el **Método D4**:

**Descubrir → Debatir → Demostrar → Dar el siguiente paso**

Dentro de cada módulo, el patrón de interacción es:

**Predecí → Probá → Mirá qué pasa → Entendé → Aplicá**

Este patrón no es una segunda metodología. Es una forma digital de ejecutar D4.

## 4. Duración

### Núcleo

Objetivo: aproximadamente **9–12 minutos**.

Incluye:

- entrada;
- contexto;
- PRE;
- 0–2 microprobes;
- 2 módulos;
- POST;
- resultado.

### Profundización

Opcional y posterior al POST:

- módulos no recorridos;
- casos completos;
- materiales.

La profundización no modifica la medición PRE/POST del núcleo.

## 5. Seis dimensiones

1. Dinero y contexto.
2. Red y reglas.
3. Claves y custodia.
4. Seguridad y estafas.
5. Privacidad.
6. Pagos y usos reales.

**Conocimiento conceptual y experiencia práctica se mantienen separados.**

## 6. Núcleo PRE / POST

Todas las personas responden los mismos seis conceptos.

Cada concepto tiene formas paralelas A/B.

- grupo AB: A en PRE, B en POST;
- grupo BA: B en PRE, A en POST.

Cada ítem incluye:

- una respuesta defendible;
- opción “No sé”;
- certeza en tres niveles.

Las formas A/B se consideran equivalentes **por diseño solamente hasta ser probadas**. Su dificultad debe analizarse después del piloto.

## 7. Microprobes

Se utilizan únicamente para:

- Seguridad;
- Claves y custodia.

Se disparan cuando existe una respuesta **incorrecta + alta certeza**.

Máximo: 2.

No muestran feedback.

Sirven para diferenciar una posible concepción errónea de un error de lectura o toque.

Los microprobes nunca entran en el score PRE/POST.

## 8. Ruta adaptativa

La experiencia recomienda **2 módulos**.

El motor es rule-based, documentado y versionado.

Principios:

1. Seguridad y custodia tienen prioridad cuando existe una concepción errónea confirmada.
2. Si una persona parte desde cero, Dinero y contexto puede entrar como primera parada.
3. El resto se ordena por necesidad pedagógica, riesgo y puerta de entrada.
4. Los empates se resuelven aleatoriamente con semilla registrada.
5. Si no hay brechas visibles, la ruta propone dos módulos “para ir más allá”.
6. La persona puede cambiar una parada.
7. La ruta sugerida y la final se registran por separado.
8. Si Seguridad no entra en la ruta, aparece una tarjeta breve de seguridad.

La V1 no tendrá tres niveles de dificultad por módulo.

## 9. Módulo V1

Cada módulo usa una sola dificultad base y seis pasos:

1. **Predecí** — activar conocimiento previo.
2. **Probá** — interacción.
3. **Entendé** — explicación breve.
4. **Debatí** — mito, matiz o crítica real.
5. **Caso semilla** — cuando corresponda.
6. **Aplicá** — transferencia a una situación nueva.

Si Aplicá falla:

- explicación alternativa;
- un ítem hermano;
- luego se continúa.

Nunca hay loops.

## 10. Módulos

### Dinero y contexto

Idea: funciones del dinero, emisión, contexto histórico y qué propone Bitcoin sin convertir el dinero fiat en una caricatura.

### Red y reglas

Idea: nodos validan reglas; mineros construyen/proponen bloques mediante prueba de trabajo; consenso no es una votación central.

### Claves y custodia

Idea: distinguir acceso a una plataforma de control directo de claves, junto con responsabilidades y trade-offs.

### Seguridad y estafas

Idea: seed phrase, phishing, soporte falso, errores y buenas prácticas.

### Privacidad

Idea: seudonimato, información pública y límites.

### Pagos y usos reales

Idea: on-chain, Lightning, otros medios de pago, trade-offs y economías circulares.

## 11. Casos reales

Existen dos formatos desde una misma fuente de verdad.

### Caso semilla

Duración: 60–90 segundos.

Debe incluir:

- contexto;
- problema;
- cómo se usó Bitcoin;
- una limitación visible;
- pregunta crítica;
- conflicto de interés, si corresponde.

### Caso completo

Duración: 3–5 minutos.

Debe incluir:

- identidad y período;
- contexto;
- problema;
- iniciativa y financiamiento;
- uso de Bitcoin;
- evidencia;
- qué funcionó;
- qué no funcionó;
- críticas;
- comparación de contexto;
- qué no se puede concluir;
- fuentes;
- conflicto de interés;
- fecha de revisión.

### Casos V1

- Bitcoin Beach / El Zonte: candidato principal para caso completo.
- Punta Bitcoin: caso semilla, **economía circular Bitcoin en construcción**, con relación con el programa explícitamente declarada.

Lugano queda fuera del MVP inicial.

## 12. Resultado individual

El resultado es orientativo, no una nota ni un diagnóstico psicométrico.

Muestra:

- PRE: X de 6;
- POST: X de 6;
- cambios relevantes;
- seis dimensiones en categorías cualitativas;
- experiencia práctica separada;
- siguiente paso sugerido y alternativas.

### Copy de niveles

Evitar afirmaciones fuertes como “dominás”.

Preferencia V1:

- **Bien encaminado**
- **En construcción**
- **Conviene revisar**

Estos niveles describen la evidencia observada en esta experiencia, no la capacidad global de la persona.

## 13. Métricas de aprendizaje

### Principal descriptiva

Tabla de transición por concepto:

- incorrecta → correcta;
- correcta → incorrecta;
- correcta → correcta;
- incorrecta → incorrecta.

Reportar **ganancias y retrocesos**, no solamente mejoras.

### Concepciones erróneas

Analizar solo las confirmadas por microprobe.

### Transferencia

Los ítems Aplicá se reportan separados del núcleo.

### Certeza

Se analiza en agregado, no como métrica individual robusta.

### Importante: causalidad

La V1 **no debe afirmar que la ruta adaptativa causó la mejora**.

Comparar conceptos recorridos vs. no recorridos es exploratorio porque la asignación depende del PRE y está expuesta a regresión a la media.

Para medir el efecto causal de la adaptación en una fase posterior será necesario introducir una comparación aleatorizada entre rutas igualmente elegibles o un diseño experimental equivalente.

## 14. Validación del MVP

La V1 debe responder principalmente:

- ¿la gente termina la experiencia?;
- ¿los ítems se entienden?;
- ¿las formas A/B tienen dificultades razonablemente comparables?;
- ¿aparecen señales positivas PRE→POST?;
- ¿las concepciones peligrosas se corrigen con frecuencia suficiente para justificar el enfoque?;
- ¿las rutas realmente varían?;
- ¿la experiencia se percibe educativa y no como una venta?

Los umbrales numéricos finales se pre-registran **antes del análisis del piloto**, después de pruebas de usabilidad pero sin ajustarlos para “hacer pasar” los resultados.

## 15. Uso en eventos — decisión V1

Durante V1, el producto digital **complementa** la clase presencial; no reemplaza todavía el instrumento histórico en papel.

Flujo recomendado:

1. la clase utiliza su PRE/POST presencial actual;
2. al final del encuentro se reserva un bloque opcional de aproximadamente 10 minutos para Tu Ruta Bitcoin;
3. la experiencia digital tiene su propio PRE/POST y se analiza como aprendizaje producido por el producto digital, no como medida del impacto de la clase;
4. las sesiones provenientes de eventos se analizan por separado del tráfico web.

No vinculamos en V1 el código del papel con la sesión digital.

Esto evita duplicar identidades, confundir líneas de base y agregar complejidad antes de validar el producto.

## 16. Privacidad

### Nunca recolectar

- wallet;
- dirección;
- xpub;
- balance;
- montos;
- seed phrase;
- ciudad o barrio;
- IP almacenada;
- user agent completo;
- texto libre en V1.

### Datos locales que no necesitan subirse

La **experiencia práctica** se utiliza para personalizar, pero no necesita persistirse en el dataset analítico V1.

Puede permanecer en el dispositivo durante la sesión.

Esto reduce el riesgo de inferir tenencia o prácticas de custodia en eventos pequeños.

### Analytics

Solo se envían si existe consentimiento.

Sin consentimiento:

- la experiencia funciona completa;
- no se envían eventos analíticos.

No intentamos medir la tasa de rechazo de analytics si la persona rechazó analytics.

## 17. Email y continuidad

La V1 permite email **solo al final y de forma opcional** para:

- recursos educativos;
- próximos eventos/comunidad.

Cada propósito tiene consentimiento independiente.

### Decisión de privacidad

“Guardar mi recorrido por email” queda **fuera de la V1**.

Enviar resultados personalizados o un estado de progreso por email vuelve a vincular identidad y experiencia, incluso si técnicamente se intenta separar mediante enlaces o fragmentos de URL.

El progreso se guarda localmente en el dispositivo.

En una versión futura se podrá evaluar una solución específica de continuidad cross-device.

## 18. País

No se obtiene por IP.

- modo evento: se conoce por la configuración del evento;
- web abierta: pregunta opcional después del resultado;
- “Prefiero no decir” siempre disponible.

No es necesario para personalizar el aprendizaje.

## 19. Analytics V1

Eventos mínimos:

- session_started;
- context_completed;
- pre_item_answered;
- pre_sealed;
- probe_answered;
- route_confirmed;
- module_screen_viewed;
- apply_answered;
- case_seed_viewed;
- post_item_answered;
- result_viewed;
- next_step_selected;
- deep_dive_started.

No recolectar por defecto:

- heatmaps;
- scroll;
- page views generales;
- tiempo total de sitio;
- share clicks.

## 20. Arquitectura abierta

```
08-digital-experience/
  README.md
  PRD-V1.md
  DECISIONS.md

future-app/
  engine/
  content/
    items/
    modules/
    glossary/
  cases/
  locales/
  analytics/
  docs/
```

El contenido debe ser editable y versionable sin modificar el motor.

## 21. Testing antes de lanzar

- revisión técnica de Bitcoin;
- revisión pedagógica / evaluación educativa;
- revisión externa con una voz crítica o escéptica;
- entrevistas cognitivas de ítems;
- pruebas de usabilidad mobile;
- test del motor con 20+ perfiles ficticios;
- accesibilidad WCAG 2.2 AA;
- performance en teléfono de gama baja;
- verificación de analytics;
- plan de análisis publicado antes del piloto.

## 22. Decisiones pendientes

Antes de pasar de wireframes a producción deben resolverse:

- personas concretas que revisarán el banco de ítems;
- stack actual de la web;
- proveedor/infraestructura de analytics first-party o autoalojada;
- proveedor de email;
- fuentes públicas suficientes para cada case study;
- umbrales finales del piloto.

Estas decisiones no bloquean los wireframes.
