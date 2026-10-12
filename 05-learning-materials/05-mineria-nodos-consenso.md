# 05 · Minería, nodos y consenso

## Idea central

Los mineros y los nodos cumplen funciones diferentes.

**Los mineros proponen bloques. Los nodos verifican que esos bloques respeten las reglas.**

## Minería

Las transacciones esperan a ser incluidas en bloques.

Los mineros compiten mediante **prueba de trabajo** para proponer nuevos bloques.

La prueba de trabajo hace costoso producir bloques y reescribir el historial, contribuyendo a la seguridad de la red.

## Emisión

Cuando un minero produce un bloque válido puede recibir:

- bitcoins nuevos definidos por el protocolo;
- comisiones de las transacciones incluidas.

La recompensa de nuevos bitcoins disminuye periódicamente mediante el **halving**.

## Nodos

Un nodo corre software de Bitcoin y verifica de forma independiente que se cumplan las reglas.

Entre otras cosas, verifica que:

- las transacciones sean válidas;
- los bloques tengan una estructura válida;
- no se creen bitcoins fuera de las reglas;
- se respete la política monetaria.

Si un minero propone un bloque inválido, los nodos pueden rechazarlo.

## Consenso

Consenso no significa que todas las personas voten en una reunión.

Significa que la red converge hacia un historial válido porque sus participantes siguen reglas compatibles.

## Cómo viaja una transacción

Una explicación introductoria más precisa puede seguir este recorrido:

1. **La wallet construye y firma** la transacción sin revelar la clave privada.
2. **La transacción se difunde** a la red.
3. **Los nodos la validan** según las reglas que conocen y, si es válida, pueden retransmitirla y mantenerla en su mempool local.
4. **Los mineros seleccionan** transacciones válidas y construyen un bloque candidato.
5. Compiten mediante **prueba de trabajo** para encontrar un bloque válido.
6. El bloque ganador **se difunde** a la red.
7. **Los nodos verifican el bloque completo**. Si viola las reglas, lo rechazan.
8. Cuando el bloque es aceptado, la transacción obtiene su primera **confirmación**; los bloques posteriores agregan más confirmaciones.

No existe un único “mempool global”: cada nodo mantiene su propia visión de transacciones pendientes.

## Qué es la blockchain

La blockchain es el registro público y ordenado del historial de transacciones confirmadas.

Las transacciones se agrupan en bloques y cada bloque se conecta con los anteriores.

> Bitcoin no es “la blockchain”. La blockchain es una de las piezas que utiliza Bitcoin.

## Pregunta para debatir

> Si los mineros producen bloques pero los nodos verifican las reglas, ¿quién “manda” en Bitcoin?
