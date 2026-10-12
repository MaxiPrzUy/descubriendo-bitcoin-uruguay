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

Una explicación introductoria puede seguir este recorrido:

**wallet → transacción firmada → red → mineros → bloque → nodos → confirmaciones**

## Qué es la blockchain

La blockchain es el registro público y ordenado del historial de transacciones confirmadas.

Las transacciones se agrupan en bloques y cada bloque se conecta con los anteriores.

> Bitcoin no es “la blockchain”. La blockchain es una de las piezas que utiliza Bitcoin.

## Pregunta para debatir

> Si los mineros producen bloques pero los nodos verifican las reglas, ¿quién “manda” en Bitcoin?
