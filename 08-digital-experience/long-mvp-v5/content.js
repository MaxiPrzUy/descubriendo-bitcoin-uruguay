window.DBU_CONTENT = {
  version: "5.1.0-beta",
  worlds: [
    {
      id:"fundamentals", n:1, title:"De dinero a Bitcoin", icon:"▤",
      question:"¿Por qué alguien inventaría otro sistema de dinero?",
      summary:"Dinero → registro → doble gasto → intermediarios → Bitcoin → riesgo.",
      lessons:[
        {
          id:"functions", title:"Qué hace el dinero", icon:"↔", concept:"Funciones del dinero",
          intro:"Antes de Bitcoin, una pregunta más simple: ¿para qué usamos dinero?",
          mechanic:{type:"choice",prompt:"Querés comprar un café, pero solo tenés tomates y el café no los necesita. ¿Qué herramienta resuelve mejor el problema?",options:["Usar algo que ambos acepten como medio de intercambio","Acordar que el café te lo cobre más adelante","Buscar a otra persona que sí quiera tus tomates"],answer:0},
          explain:{title:"Un medio común destraba el intercambio",text:"El dinero puede facilitar intercambios, servir para comparar precios y trasladar valor en el tiempo. No significa que todas las sociedades hayan pasado históricamente por una etapa de trueque."},
          critical:{q:"¿El dinero siempre conserva igual poder de compra?",options:["Sí","No","Depende del plazo y del contexto"],answer:1,feedback:"No. Distintos dineros pueden ganar o perder poder de compra."},
          transfer:{q:"Guardaste dinero para el mes que viene y perdió mucho poder de compra. ¿Qué función se debilitó?",options:["Reserva de valor","Medio de intercambio","Unidad de cuenta"],answer:0}
        },
        {
          id:"ledger", title:"El saldo tiene que cerrar", icon:"☕", concept:"Saldo y registro",
          intro:"Antes de hablar de Bitcoin, hagamos una cuenta que cualquiera pueda verificar.",
          mechanic:{type:"cafe",prompt:"Pagás un café. ¿Cuánto debería quedar?",start:100,price:20,satsStart:10000,satsPrice:2000,fee:2},
          explain:{title:"Primero la cuenta. Después la tecnología.",text:"Un saldo se entiende como entradas y salidas. Si la cuenta no cierra, hay algo que revisar. Esa intuición sirve en bancos, wallets y Bitcoin."},
          critical:{q:"Tenías 100 y pagaste 20. ¿Qué saldo debería aparecer?",options:["80","79","Depende de cómo lo muestre la app"],answer:0,feedback:"80. La cuenta básica tiene que cerrar antes de agregar cualquier otra complejidad."},
          transfer:{q:"Tenés 10.000 sats, pagás 2.000 y una comisión ilustrativa de 2 sats. ¿Saldo final?",options:["7.998 sats","8.000 sats","7.980 sats"],answer:0}
        },
        {
          id:"double", title:"Enviá dos veces", icon:"⧉", concept:"Doble gasto",
          intro:"La información digital puede copiarse. El dinero no puede funcionar como una foto.",
          mechanic:{type:"double",prompt:"Primero mandá una foto. Después intentá gastar los mismos $100 digitales dos veces."},
          explain:{title:"Aparece el doble gasto",text:"Un sistema de dinero digital necesita decidir qué unidades ya se gastaron y qué transferencias son válidas."},
          critical:{q:"¿Copiar algo digital siempre es un problema?",options:["Sí, copiar siempre rompe el sistema","No, depende de qué representa","Solo si el archivo representa algo escaso"],answer:1,feedback:"Exacto. Copiar una foto está bien; reutilizar una misma unidad monetaria rompe la contabilidad."},
          transfer:{q:"Una entrada digital debería usarse una sola vez. ¿Qué problema debe evitar el sistema?",options:["Doble uso de la misma autorización","Desacuerdo entre registros","Falta de coordinación entre participantes"],answer:0}
        },
        {
          id:"intermediary", title:"¿Quién lleva la libreta?", icon:"◎", concept:"Intermediarios",
          intro:"Si el dinero es un registro, alguien o algún sistema tiene que coordinarlo.",
          mechanic:{type:"compare",prompt:"Elegí quién lleva el registro y mirá qué cambia.",left:{title:"Institución central",items:["Coordina saldos","Puede dar soporte","Concentra decisiones"]},right:{title:"Sin coordinador común",items:["No hay una autoridad única","Hay que resolver inconsistencias","Necesita reglas compartidas"]}},
          explain:{title:"Los intermediarios resuelven problemas reales",text:"Pueden aportar coordinación, atención, reversibilidad o cumplimiento. La pregunta no es 'banco bueno o malo', sino qué dependencia introduce cada modelo."},
          critical:{q:"¿Un intermediario es siempre algo negativo?",options:["Sí","No","Depende de cuánto control tenga"],answer:1,feedback:"No. Puede aportar valor y también crear dependencias."},
          transfer:{q:"Usás una app que mantiene tus saldos y autoriza transferencias. ¿Qué rol cumple?",options:["Intermediario","Minero","Nodo propio"],answer:0}
        },
        {
          id:"bitcoin", title:"Borrá Bitcoin por un momento", icon:"₿", concept:"Primera idea de Bitcoin",
          intro:"Antes de definir Bitcoin, volvamos al problema que queremos resolver.",
          mechanic:{type:"surprise",prompt:"¿Cómo llevás una libreta de dinero digital sin un único dueño?",reveal:"Bitcoin propone reglas públicas y una red distribuida donde participantes independientes pueden verificar un mismo historial."},
          explain:{title:"Una red abierta, sin un único dueño",text:"Bitcoin permite enviar, recibir y custodiar valor usando reglas públicas que distintos participantes pueden verificar por su cuenta."},
          critical:{q:"¿Bitcoin depende de una empresa que autoriza cada operación?",options:["Sí, como una red de pagos privada","No, la red funciona sin una autoridad central única","Depende de qué wallet uses"],answer:1,feedback:"No existe una empresa central que autorice cada operación de la red."},
          transfer:{q:"Recibís datos que violan las reglas que tu software verifica. ¿Qué puede hacer?",options:["Rechazarlos","Esperar a que otro nodo los reescriba","Aceptarlos si vienen de un actor grande"],answer:0}
        },
        {
          id:"risk", title:"¿Es una inversión?", icon:"≈", concept:"Precio y riesgo",
          intro:"Bitcoin puede tener precio de mercado, pero el protocolo no promete rentabilidad.",
          mechanic:{type:"market",prompt:"Mirá una línea ficticia que sube y baja. ¿Quién garantiza el próximo precio?"},
          explain:{title:"Nadie garantiza el precio",text:"El precio surge de mercados y puede ser volátil. Haber subido antes no obliga a que vuelva a hacerlo."},
          critical:{q:"Si subió antes, ¿va a subir otra vez?",options:["Sí, porque ya ocurrió","No se puede garantizar","Puede repetirse, pero sigue sin ser seguro"],answer:1,feedback:"Correcto: rendimiento pasado no garantiza rendimiento futuro."},
          transfer:{q:"Alguien promete 15% mensual garantizado 'porque es Bitcoin'. ¿Qué ves?",options:["Una propiedad técnica","Una señal de alarma","Una garantía del protocolo"],answer:1}
        }
      ],
      challenge:{prompt:"Elegí las 4 piezas que mejor explican por qué aparece Bitcoin.",options:[
        {id:"double",text:"El dinero digital necesita evitar gastar lo mismo dos veces"},
        {id:"central",text:"Una solución común es un registro administrado por una entidad"},
        {id:"network",text:"Bitcoin propone una red con reglas verificables"},
        {id:"limits",text:"Eso no garantiza precio ni elimina todos los riesgos"},
        {id:"rich",text:"Bitcoin existe para hacerse rico"},
        {id:"anon",text:"Bitcoin es completamente anónimo"}
      ],answer:["double","central","network","limits"]}
    },

    {
      id:"network", n:2, title:"Cómo funciona Bitcoin", icon:"⌘",
      question:"¿Cómo se coordinan miles de participantes sin una autoridad central?",
      summary:"Firmas → transacciones → nodos → mempool → mineros → prueba de trabajo → confirmaciones.",
      lessons:[
        {
          id:"signature", title:"Firmar sin mostrar el secreto", icon:"✦", concept:"Firma digital",
          intro:"Antes de una transacción, necesitamos demostrar autorización sin revelar el secreto que permite autorizar.",
          mechanic:{type:"seal",prompt:"Firmá un mensaje con un sello secreto y dejá que otra persona verifique la marca sin ver el sello."},
          explain:{title:"Firma digital",text:"Una firma permite demostrar que una clave autorizó un mensaje sin publicar la clave privada. Es una intuición, no una explicación criptográfica completa."},
          critical:{q:"¿La firma revela la clave privada?",options:["Sí","No","Solo a quien recibe"],answer:1,feedback:"No. La verificación no requiere publicar la clave privada."},
          transfer:{q:"¿Qué propiedad buscamos al firmar una transacción?",options:["Probar autorización sin revelar el secreto","Demostrar que será confirmada","Ocultar la operación del registro"],answer:0}
        },
        {
          id:"transaction", title:"Qué es una transacción", icon:"→", concept:"Transacción",
          intro:"Una transacción es un mensaje que propone mover valor siguiendo reglas.",
          mechanic:{type:"sequence",prompt:"Ordená la idea básica.",items:["La wallet construye el mensaje","Se firma","Se difunde a la red"],answer:[0,1,2]},
          explain:{title:"Construir → firmar → difundir",text:"La wallet prepara datos, firma la autorización y difunde la transacción. Después empieza la validación de la red."},
          critical:{q:"¿Firmar una transacción significa enviarla automáticamente?",options:["Sí","No"],answer:1,feedback:"No. Firmar y difundir son pasos distintos."},
          transfer:{q:"Tenés una transacción firmada pero sin conexión. ¿Ya llegó a la red?",options:["No","Sí","Solo si es Lightning"],answer:0}
        },
        {
          id:"nodes", title:"Resultado vs. cuenta", icon:"⬡", concept:"Verificación",
          intro:"Una app puede mostrarte un saldo. Verificar significa poder revisar cómo se obtuvo.",
          mechanic:{type:"verify",prompt:"La pantalla dice: saldo 60. ¿Confiás en el resultado o rehacés la cuenta?",entries:[["+50","Ingreso"],["+30","Ingreso"],["−20","Pago"]],result:60},
          explain:{title:"Verificar es rehacer la cuenta",text:"Un nodo valida datos y reglas localmente. No necesita llamar a una oficina central para preguntar si una transacción cumple."},
          critical:{q:"¿Usar una app de Bitcoin significa que automáticamente verificás todo por tu cuenta?",options:["Sí, cualquier wallet verifica todo","No, depende de cómo esté conectada y qué software uses","Solo si la app muestra la blockchain"],answer:1,feedback:"Verificar es una posibilidad, no algo automático. Muchas apps delegan parte de esa tarea."},
          transfer:{q:"Una transacción tiene una firma inválida. ¿Qué hace un nodo que verifica correctamente?",options:["La rechaza","La deja pendiente hasta que pague más comisión","La corrige antes de retransmitirla"],answer:0}
        },
        {
          id:"mempool", title:"La sala de espera", icon:"⋯", concept:"Mempool",
          intro:"Una transacción válida puede esperar antes de entrar en un bloque.",
          mechanic:{type:"queue",prompt:"Meté tres transacciones válidas en la sala de espera y elegí cuál podría tomar un minero."},
          explain:{title:"Mempool",text:"Cada nodo mantiene su propia memoria de transacciones pendientes. No existe un único mempool global perfectamente idéntico."},
          critical:{q:"¿Estar en un mempool significa estar confirmado?",options:["Sí","No"],answer:1,feedback:"No. Significa que ese nodo conoce una transacción pendiente."},
          transfer:{q:"Una transacción válida todavía no entró en un bloque. ¿Cómo conviene describirla?",options:["Pendiente","Confirmada","Borrada"],answer:0}
        },
        {
          id:"miners", title:"Construir un bloque", icon:"⛏", concept:"Mineros",
          intro:"Los mineros seleccionan transacciones y construyen bloques candidatos.",
          mechanic:{type:"builder",prompt:"Elegí transacciones válidas y armá un bloque candidato."},
          explain:{title:"Proponen bloques",text:"Los mineros no 'aprueban' las reglas de toda la red. Construyen bloques candidatos y compiten para encontrar una prueba de trabajo válida."},
          critical:{q:"¿Mineros y nodos hacen exactamente lo mismo?",options:["Sí","No"],answer:1,feedback:"No. Sus funciones se superponen en algunas validaciones, pero su rol principal es distinto."},
          transfer:{q:"Un minero incluye una transacción inválida en su bloque. ¿Qué pueden hacer los nodos?",options:["Rechazar el bloque","Aceptarlo por venir de un minero","Editar el bloque"],answer:0}
        },
        {
          id:"pow", title:"Prueba de trabajo", icon:"#", concept:"Proof of Work",
          intro:"Para proponer un bloque válido, un minero debe encontrar una prueba que cuesta trabajo computacional producir y es barata de verificar.",
          mechanic:{type:"hash",prompt:"Buscá una prueba válida. Vas a hacer intentos simulados hasta encontrar una."},
          explain:{title:"Costoso producir, fácil verificar",text:"La prueba de trabajo hace costoso producir bloques y reescribir historia. La simulación no reproduce la física real de SHA‑256; solo muestra la asimetría."},
          critical:{q:"¿La prueba de trabajo es gratis?",options:["Sí","No"],answer:1,feedback:"No. Requiere energía y equipos; ese costo es parte del diseño y también objeto de debate."},
          transfer:{q:"¿Qué debería ser más fácil?",options:["Verificar una prueba válida","Encontrarla antes que todos"],answer:0}
        },
        {
          id:"confirmations", title:"Confirmaciones", icon:"▣", concept:"Confirmaciones",
          intro:"Cuando una transacción entra en un bloque, obtiene una confirmación. Los bloques posteriores agregan más.",
          mechanic:{type:"confirmations",prompt:"Agregá bloques y mirá cómo cambia la confianza en que esa parte de la historia permanezca."},
          explain:{title:"Más bloques posteriores, más costo de reescritura",text:"No existe un número universal correcto de confirmaciones para cualquier monto o riesgo. El contexto importa."},
          critical:{q:"¿Una confirmación es '100% definitiva' para cualquier caso?",options:["Sí","No"],answer:1,feedback:"No. En la práctica se decide cuánta seguridad esperar según contexto y riesgo."},
          transfer:{q:"Vendés algo muy valioso. ¿Qué pregunta tiene más sentido?",options:["Cuántas confirmaciones son razonables para este riesgo","Si alcanza con ver una notificación","Si conviene entregar antes de confirmar"],answer:0}
        }
      ],
      challenge:{prompt:"Elegí las 4 piezas que mejor describen el viaje de una transacción.",options:[
        {id:"sign",text:"La wallet construye y firma"},
        {id:"validate",text:"Los nodos pueden validar y retransmitir"},
        {id:"mine",text:"Un minero puede incluirla en un bloque"},
        {id:"confirm",text:"Los nodos validan el bloque y llegan confirmaciones"},
        {id:"bank",text:"Un banco central autoriza"},
        {id:"anonymous",text:"La red borra la identidad automáticamente"}
      ],answer:["sign","validate","mine","confirm"]}
    },

    {
      id:"keys", n:3, title:"Claves y control", icon:"⚿",
      question:"¿Qué significa realmente 'tener' bitcoin?",
      summary:"Wallet → claves → custodia → autocustodia → respaldo → recuperación.",
      lessons:[
        {
          id:"wallet", title:"La wallet no guarda monedas", icon:"⌁", concept:"Wallet",
          intro:"La palabra 'billetera' puede engañar: los bitcoin no viven dentro del teléfono.",
          mechanic:{type:"inspect",prompt:"Tocá qué cosas sí puede gestionar una wallet.",items:[
            {title:"Claves",text:"Permiten autorizar operaciones."},
            {title:"Direcciones",text:"Ayudan a recibir."},
            {title:"Historial",text:"Muestra información de la red."},
            {title:"Monedas físicas",text:"No hay monedas guardadas dentro."}
          ]},
          explain:{title:"Wallet = gestor de claves e interfaz",text:"La wallet ayuda a crear, guardar y usar claves y a interactuar con la red. El saldo se deriva del estado de la red."},
          critical:{q:"Si borrás una app, ¿desaparece automáticamente Bitcoin de la red?",options:["Sí","No"],answer:1,feedback:"No. El acceso depende de las claves/respaldo, no de una app específica."},
          transfer:{q:"¿Qué metáfora es más útil?",options:["Llavero / gestor de claves","Billetera digital con monedas adentro","Cuenta administrada por una entidad central"],answer:0}
        },
        {
          id:"keys", title:"Clave privada y dirección", icon:"⌘", concept:"Claves",
          intro:"Una clave privada autoriza. Una dirección sirve para recibir. No son lo mismo.",
          mechanic:{type:"compare",prompt:"Compará los roles.",left:{title:"Clave privada",items:["Se mantiene secreta","Autoriza","No se comparte"]},right:{title:"Dirección",items:["Puede compartirse para recibir","No autoriza por sí sola","Es visible en transacciones"]}},
          explain:{title:"Secreto vs. identificador de recepción",text:"Una simplificación útil: la clave privada debe protegerse; una dirección puede compartirse para recibir."},
          critical:{q:"¿Debés publicar tu clave privada para demostrar que sos dueño?",options:["Sí","No"],answer:1,feedback:"No. Las firmas permiten demostrar autorización sin revelar la clave."},
          transfer:{q:"Alguien te pide un dato para enviarte bitcoin. ¿Cuál tiene sentido compartir?",options:["Una dirección de recepción","Tu clave privada","Tu seed"],answer:0}
        },
        {
          id:"custody", title:"¿Quién tiene las llaves?", icon:"⚖", concept:"Custodia",
          intro:"Ver un saldo en una app no responde quién controla técnicamente las claves.",
          mechanic:{type:"compare",prompt:"Compará dos modelos.",left:{title:"Custodio",items:["Tercero controla claves","Más soporte posible","Dependencia del proveedor"]},right:{title:"Autocustodia",items:["Vos controlás claves","Más autonomía","Más responsabilidad"]}},
          explain:{title:"Comodidad y control son trade-offs",text:"Autocustodia no es automáticamente mejor para cualquier persona. Más control también implica más responsabilidad."},
          critical:{q:"¿Tener experiencia usando un exchange significa hacer autocustodia?",options:["Sí","No"],answer:1,feedback:"No. Depende de quién controla las claves."},
          transfer:{q:"Una plataforma congela retiros y vos no tenés las claves. ¿Qué riesgo aparece?",options:["Riesgo de custodio","Riesgo de firma digital","Riesgo de halving"],answer:0}
        },
        {
          id:"seed", title:"El secreto que nunca se muestra", icon:"⋮", concept:"Frase semilla",
          intro:"Una frase semilla puede permitir recuperar las claves de una wallet. Por eso merece una regla muy simple.",
          mechanic:{type:"seedShock",prompt:"Mirá esta frase por cinco segundos.",words:["NARANJA","MATE","FARO","OCÉANO","TAMBOR","NUBE","PIEDRA","SOL","RUTA","BOSQUE","VIENTO","PUERTO"]},
          explain:{title:"Si fuera real, mostrarla sería un error grave",text:"Quien accede a una seed válida puede llegar a reconstruir claves y mover fondos. Ningún soporte legítimo necesita que se la envíes."},
          critical:{q:"¿Hay alguna situación normal en la que soporte deba pedirte la seed?",options:["Sí, si demuestra su identidad","No, nunca para darte soporte","Solo cuando querés recuperar la wallet"],answer:1,feedback:"La regla útil es simple: la seed no se comparte con soporte, comunidades ni terceros."},
          transfer:{q:"Querés hacer una copia de respaldo. ¿Qué opción reduce exposición online?",options:["Guardarla fuera de internet con un método seguro","Fotografiarla y ocultar el álbum","Enviártela por un chat cifrado"],answer:0}
        },
        {
          id:"recovery", title:"Perdiste el teléfono", icon:"↺", concept:"Recuperación",
          intro:"El teléfono puede perderse. La pregunta importante es qué respaldo existe.",
          mechanic:{type:"path",prompt:"Elegí tu historia.",paths:[
            {title:"Tenías respaldo correcto",result:"Podés restaurar acceso en una wallet compatible, cuidando dónde ingresás la seed."},
            {title:"No tenías respaldo",result:"Si las claves solo estaban en ese dispositivo y no hay recuperación, podés perder el acceso."},
            {title:"Le diste la seed a soporte",result:"El problema ya no es el teléfono: otra persona puede tener el secreto."}
          ]},
          explain:{title:"Autocustodia implica plan de recuperación",text:"No hay un centro de llamadas capaz de recrear una clave perdida. El diseño del respaldo importa tanto como la app."},
          critical:{q:"¿Recuperar significa pedirle a Bitcoin que 'resetee' la contraseña?",options:["Sí","No"],answer:1,feedback:"No. Se reconstruye acceso usando el respaldo correspondiente."},
          transfer:{q:"¿Qué conviene pensar antes de perder el teléfono?",options:["Cómo recuperar acceso de forma segura","Si la app puede reconstruirlo sin respaldo","Si conviene crear otra cuenta después"],answer:0}
        }
      ],
      challenge:{prompt:"Elegí las 4 ideas que mejor resumen claves y control.",options:[
        {id:"wallet",text:"Una wallet gestiona claves e interacción con la red"},
        {id:"custody",text:"Custodia depende de quién controla las claves"},
        {id:"seed",text:"La seed es un respaldo sensible que no se comparte"},
        {id:"recovery",text:"Autocustodia requiere pensar recuperación"},
        {id:"app",text:"Los bitcoin viven dentro de la app"},
        {id:"support",text:"Soporte puede recuperar cualquier clave"}
      ],answer:["wallet","custody","seed","recovery"]}
    },

    {
      id:"security", n:4, title:"Seguridad", icon:"⌾",
      question:"¿Cómo te pueden robar sin 'hackear Bitcoin'?",
      summary:"Soporte falso → phishing → verificación → prueba pequeña → ingeniería social.",
      lessons:[
        {
          id:"support", title:"Soporte falso", icon:"☏", concept:"Soporte falso",
          intro:"Muchos ataques apuntan a la persona, no a romper la red.",
          mechanic:{type:"chat",prompt:"Leé el mensaje y marcá la señal crítica.",message:"URGENTE: detectamos actividad sospechosa. Respondé con tus 12 palabras para asegurar tus fondos ahora."},
          explain:{title:"Urgencia + secreto = alarma",text:"Un atacante puede copiar logos, nombres y tonos de soporte. La seed no se comparte aunque el perfil parezca legítimo."},
          critical:{q:"¿Una tilde azul o logo correcto prueba legitimidad?",options:["Sí","No"],answer:1,feedback:"No. Apariencia y legitimidad no son lo mismo."},
          transfer:{q:"Un 'admin' de Telegram te escribe primero y pide la seed. ¿Qué hacés?",options:["No la compartís y verificás por otro canal","Pedís una prueba de identidad antes de enviarla","Compartís solo una parte para validar el contacto"],answer:0}
        },
        {
          id:"phishing", title:"El link perfecto", icon:"↗", concept:"Phishing",
          intro:"Una web falsa puede verse idéntica a la real.",
          mechanic:{type:"inspect",prompt:"Inspeccioná antes de actuar.",items:[
            {title:"Dominio",text:"¿Es exactamente el sitio esperado?"},
            {title:"Origen",text:"¿Llegaste desde una fuente confiable?"},
            {title:"Pedido",text:"¿Te pide secretos que nunca debería pedir?"},
            {title:"Urgencia",text:"¿Te presiona a actuar ya?"}
          ]},
          explain:{title:"Verificar fuente antes de interactuar",text:"No alcanza con que una página 'se vea bien'. Verificá la fuente oficial y qué información está solicitando."},
          critical:{q:"¿Un anuncio patrocinado en buscador garantiza que una wallet sea oficial?",options:["Sí","No"],answer:1,feedback:"No. La publicidad no es una verificación de autenticidad."},
          transfer:{q:"Un link recibido por DM abre una web que pide tu seed. ¿Qué señal pesa más?",options:["Que pide la seed","Que el dominio se parece al oficial","Que llegó desde un anuncio patrocinado"],answer:0}
        },
        {
          id:"address", title:"Antes de enviar", icon:"✓", concept:"Verificación de dirección",
          intro:"Una operación confirmada no tiene un botón central de 'deshacer'.",
          mechanic:{type:"inspect",prompt:"Chequeá antes de enviar.",items:[
            {title:"Dirección",text:"Comparar inicio y final no reemplaza una verificación completa en operaciones importantes."},
            {title:"Monto",text:"¿Es el monto esperado?"},
            {title:"Red / método",text:"¿La persona espera este tipo de pago?"},
            {title:"Destino",text:"¿Confirmaste por un canal confiable?"}
          ]},
          explain:{title:"Verificar antes reduce errores",text:"La práctica exacta depende del monto, contexto y herramienta, pero dirección, monto y destino merecen atención."},
          critical:{q:"¿Copiar/pegar elimina todos los riesgos?",options:["Sí","No"],answer:1,feedback:"No. Malware, errores humanos o un destino equivocado siguen siendo posibles."},
          transfer:{q:"Vas a enviar un monto importante. ¿Qué conducta es más razonable?",options:["Verificar cuidadosamente datos y contexto","Copiar y pegar sin revisar porque reduce errores","Confiar en que la app detectará cualquier problema"],answer:0}
        },
        {
          id:"smalltest", title:"Prueba pequeña", icon:"·", concept:"Prueba pequeña",
          intro:"Para algunas operaciones de alto riesgo o con un destino nuevo, una pequeña prueba puede reducir el costo de un error.",
          mechanic:{type:"path",prompt:"Elegí una estrategia para un destino nuevo.",paths:[
            {title:"Enviar todo inmediatamente",result:"Más simple, pero cualquier error afecta el total."},
            {title:"Enviar una pequeña prueba y verificar recepción",result:"Agrega pasos y fees, pero puede reducir riesgo en ciertos contextos."},
            {title:"No verificar nada",result:"Ahorrás tiempo, no riesgo."}
          ]},
          explain:{title:"No es una regla universal",text:"Una prueba pequeña puede tener sentido según monto, fees, urgencia y contexto. No siempre es necesaria."},
          critical:{q:"¿Siempre hay que hacer una transacción de prueba?",options:["Sí","No, depende"],answer:1,feedback:"Depende del riesgo, costo y contexto."},
          transfer:{q:"El fee es alto y el monto pequeño. ¿Qué conviene hacer?",options:["Evaluar el trade-off","Hacer siempre dos pagos","Ignorar el destino"],answer:0}
        },
        {
          id:"social", title:"Ingeniería social", icon:"◌", concept:"Ingeniería social",
          intro:"Un atacante puede aprovechar confianza, miedo, autoridad o urgencia.",
          mechanic:{type:"chat",prompt:"Detectá la táctica.",message:"Soy del equipo de seguridad. Tu cuenta se cerrará en 5 minutos. Necesito que actúes ahora y no consultes con nadie."},
          explain:{title:"El ataque busca controlar tu decisión",text:"Urgencia, aislamiento y autoridad aparente son tácticas comunes. Frenar y verificar por otro canal puede romper el guion del atacante."},
          critical:{q:"¿Ser técnico te hace inmune a ingeniería social?",options:["Sí","No"],answer:1,feedback:"No. Estos ataques explotan comportamiento humano."},
          transfer:{q:"Te presionan para actuar en secreto y rápido. ¿Cuál es una buena primera reacción?",options:["Frenar y verificar por un canal independiente","Responder para ganar tiempo","Seguir el proceso porque parece urgente"],answer:0}
        }
      ],
      challenge:{prompt:"Elegí las 4 reglas de seguridad más sólidas.",options:[
        {id:"seed",text:"La seed no se comparte"},
        {id:"source",text:"Verificá fuentes y destinos"},
        {id:"pause",text:"La urgencia es motivo para frenar"},
        {id:"context",text:"Evaluá el riesgo antes de enviar"},
        {id:"logo",text:"Un logo correcto alcanza"},
        {id:"blue",text:"Una tilde azul garantiza identidad"}
      ],answer:["seed","source","pause","context"]}
    },

    {
      id:"privacy", n:5, title:"Privacidad", icon:"◐",
      question:"¿Qué puede saber la red y qué puede saber una persona?",
      summary:"Registro público → seudonimato → vinculación → trade-offs.",
      lessons:[
        {
          id:"publicledger", title:"Qué ve la blockchain", icon:"▦", concept:"Registro público",
          intro:"Bitcoin no oculta todas las transacciones.",
          mechanic:{type:"inspect",prompt:"Inspeccioná una transacción ficticia.",items:[
            {title:"Direcciones",text:"Se observan identificadores, no nombres civiles por defecto."},
            {title:"Monto",text:"La estructura de la transacción contiene valores."},
            {title:"Historial",text:"Puede relacionarse con transacciones anteriores/posteriores."},
            {title:"Nombre",text:"No viene escrito automáticamente en la dirección."}
          ]},
          explain:{title:"Público no significa 'nombre visible'",text:"La red expone datos de transacciones. Vincularlos con una identidad depende de información adicional."},
          critical:{q:"¿Todas las transacciones son secretas?",options:["Sí","No"],answer:1,feedback:"No. Bitcoin usa un registro público."},
          transfer:{q:"¿Qué dato NO aparece automáticamente como campo civil?",options:["Nombre legal","Dirección","Monto"],answer:0}
        },
        {
          id:"pseudonym", title:"Seudónimo, no anónimo", icon:"◇", concept:"Seudonimato",
          intro:"Una dirección no es tu nombre, pero tampoco garantiza anonimato.",
          mechanic:{type:"compare",prompt:"Separá conceptos.",left:{title:"Seudónimo",items:["Identificador sin nombre civil directo","Puede vincularse con contexto"]},right:{title:"Anónimo",items:["Identidad no vinculable","No describe bien a Bitcoin por defecto"]}},
          explain:{title:"Seudonimato",text:"Bitcoin se describe mejor como seudónimo. Si una dirección se vincula con una identidad, parte de su actividad pública puede analizarse."},
          critical:{q:"¿Crear una dirección nueva garantiza anonimato total?",options:["Sí","No"],answer:1,feedback:"No. Hay muchas formas de correlacionar información."},
          transfer:{q:"Publicás tu dirección junto a tu nombre. ¿Qué cambia?",options:["Facilitás vincular actividad pública con vos","La blockchain se vuelve privada","Desaparecen transacciones anteriores"],answer:0}
        },
        {
          id:"linkability", title:"Seguí el rastro", icon:"⌁", concept:"Vinculación",
          intro:"Información pública + contexto externo puede crear vínculos.",
          mechanic:{type:"path",prompt:"Caso ficticio: una cafetería publica una dirección de donaciones. Después paga a un proveedor.",paths:[
            {title:"La dirección nunca se vinculó con nadie",result:"Hay datos públicos, pero menos contexto externo."},
            {title:"La cafetería publicó esa dirección con su nombre",result:"Ahora es más fácil asociar actividad de esa dirección a la cafetería."},
            {title:"La blockchain muestra cédula y nombre",result:"Eso no ocurre automáticamente."}
          ]},
          explain:{title:"El contexto cambia la privacidad",text:"Una misma transacción puede revelar más o menos según qué información externa ya está vinculada."},
          critical:{q:"¿Privacidad es solo una propiedad del protocolo?",options:["Sí","No"],answer:1,feedback:"No. También depende de comportamiento, herramientas y contexto."},
          transfer:{q:"¿Qué aumenta la capacidad de análisis?",options:["Vincular una dirección pública a una identidad","Cambiar de wallet sin mover fondos","Separar contextos de uso"],answer:0}
        },
        {
          id:"tradeoffs", title:"Privacidad y usabilidad", icon:"⚖", concept:"Trade-offs de privacidad",
          intro:"Más privacidad puede requerir más conocimiento, disciplina o herramientas.",
          mechanic:{type:"compare",prompt:"Compará objetivos.",left:{title:"Más comodidad",items:["Menos pasos","Más proveedores posibles","Más datos compartidos en algunos servicios"]},right:{title:"Más privacidad",items:["Más decisiones","Más responsabilidad","No siempre es gratis ni simple"]}},
          explain:{title:"No existe una única configuración correcta",text:"Privacidad, comodidad, cumplimiento y recuperación pueden empujar en direcciones distintas."},
          critical:{q:"¿La opción más privada siempre es la mejor para cualquier persona?",options:["Sí","No"],answer:1,feedback:"No. Hay trade-offs y necesidades distintas."},
          transfer:{q:"Un servicio exige identidad por regulación. ¿Qué pregunta es razonable?",options:["Qué datos entrega y qué trade-off acepto","Si promete privacidad absoluta","Si puedo ignorar su política de datos"],answer:0}
        }
      ],
      challenge:{prompt:"Elegí las 4 afirmaciones más precisas sobre privacidad.",options:[
        {id:"public",text:"El historial de transacciones es público"},
        {id:"pseudo",text:"Dirección no equivale automáticamente a nombre civil"},
        {id:"link",text:"Contexto externo puede vincular actividad"},
        {id:"trade",text:"Privacidad tiene trade-offs de uso"},
        {id:"anon",text:"Bitcoin es completamente anónimo"},
        {id:"secret",text:"Todos los montos son secretos"}
      ],answer:["public","pseudo","link","trade"]}
    },

    {
      id:"usage", n:6, title:"Usar Bitcoin", icon:"↯",
      question:"¿Cuándo tiene sentido usar qué herramienta?",
      summary:"Fees → on-chain → Lightning → pagos → transferencias → economía circular.",
      lessons:[
        {
          id:"fees", title:"El espacio cuesta", icon:"▥", concept:"Comisiones",
          intro:"El espacio de los bloques es limitado. Cuando mucha gente quiere usarlo, compite.",
          mechanic:{type:"queue",prompt:"Tres transacciones esperan. Elegí cuáles entran primero en un bloque limitado."},
          explain:{title:"Fees como mercado por espacio",text:"En términos simplificados, las comisiones ayudan a priorizar transacciones cuando el espacio es escaso. No existe un fee fijo universal."},
          critical:{q:"¿Una comisión alta significa que Bitcoin 'está roto'?",options:["Siempre","No necesariamente"],answer:1,feedback:"Puede reflejar demanda por espacio, políticas de wallets y otras condiciones."},
          transfer:{q:"La red está congestionada y tu pago no es urgente. ¿Qué opción existe?",options:["Esperar o ajustar estrategia según contexto","Pagar cualquier fee sin mirar el contexto","Cancelar siempre y volver a intentar"],answer:0}
        },
        {
          id:"layers", title:"Un pago que se siente instantáneo", icon:"⚡", concept:"Capas de pago",
          intro:"No todos los pagos necesitan usar exactamente el mismo camino.",
          mechanic:{type:"lightningPay",prompt:"El café cuesta 2.000 sats. Hacé un pago Lightning simulado.",amount:2000,fee:2},
          explain:{title:"Lightning busca pagos rápidos y frecuentes",text:"Lightning puede ser útil para pagos pequeños. La capa base se usa para liquidación on-chain. Cada capa tiene trade-offs propios."},
          critical:{q:"¿Lightning reemplaza a la capa base de Bitcoin?",options:["Sí, porque es más rápido","No, usa Bitcoin como base y resuelve otro tipo de necesidad","Solo cuando las comisiones on-chain son altas"],answer:1,feedback:"Lightning y la capa base cumplen funciones distintas y están relacionadas."},
          transfer:{q:"Pagás cafés pequeños varias veces por día. ¿Qué herramienta puede tener sentido explorar?",options:["Lightning","On-chain para cada pago aunque el contexto no lo requiera","Una app custodial solo porque parece más rápida"],answer:0}
        },
        {
          id:"payments", title:"Elegí el camino del pago", icon:"⇢", concept:"Elección de medio de pago",
          intro:"A veces Bitcoin es útil. A veces otro medio puede ser más simple.",
          mechanic:{type:"path",prompt:"Elegí para cada contexto.",paths:[
            {title:"Café pequeño y frecuente",result:"Lightning puede ser razonable si ambas partes ya lo usan."},
            {title:"Liquidación de alto valor sin urgencia",result:"On-chain puede tener sentido según fees, riesgo y necesidad."},
            {title:"Compra local donde tarjeta funciona perfecto",result:"Quizá no haya una razón práctica para cambiar de medio."}
          ]},
          explain:{title:"Contexto antes que ideología",text:"La pregunta no es '¿cómo uso Bitcoin para todo?', sino qué problema existe y qué herramienta encaja."},
          critical:{q:"¿Bitcoin debe ser siempre el medio de pago correcto?",options:["Sí","No"],answer:1,feedback:"No. Depende del caso."},
          transfer:{q:"Un comercio ya tiene pagos baratos, rápidos y confiables. ¿Qué deberías hacer primero?",options:["Preguntar qué problema real quiere resolver","Proponer Bitcoin aunque no resuelva una necesidad","Cambiar su sistema solo por novedad"],answer:0}
        },
        {
          id:"crossborder", title:"Mover valor entre lugares", icon:"🌐", concept:"Transferencias abiertas",
          intro:"Una red global puede ser útil cuando los sistemas tradicionales son caros, lentos o difíciles de acceder.",
          mechanic:{type:"compare",prompt:"Compará escenarios sin asumir ganador.",left:{title:"Sistema tradicional",items:["Puede tener soporte y reversibilidad","Regulación conocida","Costos/tiempos varían"]},right:{title:"Bitcoin",items:["Red global abierta","Liquidación propia","Volatilidad y autocustodia pueden importar"]}},
          explain:{title:"Puede resolver fricciones específicas",text:"Bitcoin puede ser útil en ciertos corredores o contextos, pero no elimina regulaciones, riesgo de precio, educación ni necesidad de convertir a moneda local."},
          critical:{q:"¿Enviar Bitcoin cruza fronteras sin que exista ningún marco legal?",options:["Sí","No"],answer:1,feedback:"No. La red es global, pero las personas e instituciones siguen sujetas a marcos locales."},
          transfer:{q:"Una persona necesita recibir valor y luego pagar gastos en moneda local. ¿Qué más hay que pensar?",options:["Conversión, fees y acceso local","Solo la velocidad de envío","Solo la variación de precio del día"],answer:0}
        },
        {
          id:"circular", title:"Hacé circular el valor", icon:"↻", concept:"Economía circular",
          intro:"Aceptar Bitcoin una vez no crea una economía circular.",
          mechanic:{type:"circle",prompt:"Una persona paga un café con bitcoin. ¿Qué pasa después?",actors:["Persona","Café","Proveedor","Panadería","Otra persona"]},
          explain:{title:"El círculo existe cuando el valor vuelve a usarse",text:"Una economía circular necesita personas, comercios, proveedores, infraestructura, educación y tiempo. Convertir a moneda local no es un error: depende del contexto de cada negocio."},
          critical:{q:"¿Un comercio que acepta bitcoin ya forma por sí solo una economía circular?",options:["Sí, aceptar alcanza","No, hace falta que exista uso entre varios actores","Solo si nunca convierte a moneda local"],answer:1,feedback:"Aceptar es una pieza. La circularidad aparece cuando hay conexiones y uso repetido entre varios actores."},
          transfer:{q:"Un café acepta bitcoin, pero ninguno de sus proveedores lo usa. ¿Qué falta principalmente?",options:["Más conexiones útiles dentro del circuito","Que el café guarde todo indefinidamente","Que aumente el precio de bitcoin"],answer:0}
        },
        {
          id:"supply", title:"21 millones ≠ precio garantizado", icon:"21", concept:"Emisión y precio",
          intro:"Las reglas actuales limitan la emisión total hacia 21 millones, pero eso no define el precio futuro.",
          mechanic:{type:"market",prompt:"Mirá una oferta limitada y una demanda que cambia. ¿Qué variable sigue sin estar garantizada?"},
          explain:{title:"Oferta programada no es promesa de demanda",text:"El límite de emisión es una regla de consenso verificable. No garantiza precio, adopción ni rentabilidad."},
          critical:{q:"¿Escasez programada = suba asegurada?",options:["Sí","No"],answer:1,feedback:"No. El precio depende de más variables."},
          transfer:{q:"Un anuncio usa 'solo habrá 21M' para prometer rentabilidad. ¿Qué falta?",options:["Reconocer que oferta limitada no garantiza demanda ni precio","Una proyección optimista de demanda","Un historial de precios pasados"],answer:0}
        },
        {
          id:"minerpower", title:"¿Los mineros controlan Bitcoin?", icon:"⛏", concept:"Poder de mineros",
          intro:"Los mineros tienen poder económico y técnico, pero no pueden obligar a todos los nodos a aceptar cualquier regla.",
          mechanic:{type:"copies",prompt:"Intentá propagar un bloque que crea monedas fuera de las reglas."},
          explain:{title:"Producción de bloques ≠ control absoluto",text:"Los nodos verifican bloques. También existe poder social y económico alrededor de software, pools, exchanges y usuarios. El sistema no es políticamente simple."},
          critical:{q:"¿'Los nodos mandan' describe toda la gobernanza?",options:["Sí","No"],answer:1,feedback:"No. Es una simplificación útil para validación, no una teoría completa de gobernanza."},
          transfer:{q:"Un minero propone un bloque inválido. ¿Qué propiedad importa?",options:["Que otros nodos puedan rechazarlo","Que tenga más hash rate","Que pague una comisión alta"],answer:0}
        },
        {
          id:"energy", title:"Energía: una crítica real", icon:"⚡", concept:"Energía",
          intro:"Proof of Work consume energía. Negarlo sería propaganda.",
          mechanic:{type:"compare",prompt:"Separá dos preguntas.",left:{title:"Hecho",items:["Minar consume electricidad","El costo varía por ubicación y fuente"]},right:{title:"Debate",items:["Si ese gasto vale la pena","Qué externalidades genera","Qué comparación es justa"]}},
          explain:{title:"Hecho y juicio no son lo mismo",text:"Podemos medir consumo y discutir externalidades. La conclusión normativa depende de valores, usos y comparaciones."},
          critical:{q:"¿'Usa energía' demuestra por sí solo que no tiene valor?",options:["Sí","No"],answer:1,feedback:"No. Es un dato relevante, no una conclusión completa."},
          transfer:{q:"Un argumento serio sobre energía debería incluir...",options:["Datos, contexto y externalidades","Una comparación sin metodología","Solo el costo eléctrico"],answer:0}
        },
        {
          id:"cases", title:"¿Esto existe acá?", icon:"⌂", concept:"Caso local con contexto",
          intro:"Después de entender la idea, miramos un caso cercano sin convertirlo en publicidad.",
          mechanic:{type:"localCase",prompt:"¿Existe una experiencia Bitcoin en construcción en Punta del Este?",place:"Punta Bitcoin",subtitle:"Una economía circular Bitcoin en construcción, en Punta del Este.",today:["Educación y encuentros","Lightning y adopción comercial","Comunidad local"],missing:["Más conexiones entre comercios y proveedores","Uso repetido","Más evidencia pública"],proof:"Que el bitcoin recibido vuelva a gastarse localmente, no solo que se acepte."},
          explain:{title:"Un caso real no es una prueba universal",text:"Punta Bitcoin es aliado de DBU y sirve como caso local para observar qué existe, qué falta y qué datos necesitaríamos para decir que una economía circular funciona."},
          critical:{q:"¿Que un caso exista en Punta del Este demuestra que funcionará igual en otra ciudad?",options:["Sí, porque Bitcoin funciona igual en todos lados","No, el contexto económico y social cambia","Solo si se copia exactamente el mismo formato"],answer:1,feedback:"Un caso ayuda a formular preguntas. No reemplaza evidencia del contexto donde se quiere replicar."},
          transfer:{q:"¿Cómo conviene presentar un aliado dentro de una clase educativa?",options:["Declarar la relación y mostrar también límites y preguntas abiertas","Usarlo como prueba de que el modelo ya funciona","Evitar mencionar cualquier vínculo para que parezca neutral"],answer:0}
        },
        {
          id:"promises", title:"Promesa vs. explicación", icon:"!", concept:"Pensamiento crítico",
          intro:"Una explicación te ayuda a verificar. Una promesa intenta cerrar la discusión.",
          mechanic:{type:"inspect",prompt:"Detectá señales de propaganda.",items:[
            {title:"Urgencia",text:"'Antes de que sea tarde'"},
            {title:"Garantía",text:"'No puede fallar'"},
            {title:"Autoridad",text:"'Confía en mí, soy experto'"},
            {title:"Sin límites",text:"Nunca menciona trade-offs"}
          ]},
          explain:{title:"Buen contenido deja espacio para dudar",text:"Una explicación seria muestra supuestos, límites y fuentes. No necesita que adoptes Bitcoin para considerarse útil."},
          critical:{q:"¿DBU debería medir éxito por cuántas personas compran Bitcoin?",options:["Sí","No"],answer:1,feedback:"No. Educación y adopción son métricas distintas."},
          transfer:{q:"Una charla termina con 'comprá ahora o te quedás afuera'. ¿Qué detectás?",options:["FOMO y presión","Una opinión de mercado","Una explicación educativa neutral"],answer:0}
        }
      ],
      challenge:{prompt:"Elegí las 4 reglas que mejor representan 'No confíes. Verificá'.",options:[
        {id:"sources",text:"Pedí fuentes y contexto"},
        {id:"limits",text:"Buscá límites y trade-offs"},
        {id:"claims",text:"Separá reglas técnicas de promesas de precio"},
        {id:"conflicts",text:"Declarar conflictos mejora la lectura"},
        {id:"fomo",text:"La urgencia confirma que es verdad"},
        {id:"adopt",text:"Aprender implica adoptar"}
      ],answer:["sources","limits","claims","conflicts"]}
    }
  ]
};