La pandèmia va accelerar la transformació digital, però va deixar visible una debilitat estructural: els perímetres de seguretat tradicionals ja no funcionen. Les pimes andorranes que havien confiat en firewall i VPN de "xarxa privada" es van trobar vulnerables quan els seus treballadors van passar al treball remot.

## Què és Zero Trust?

**Zero Trust** és una arquitectura de seguretat que rebutja la premissa de "confiar en qui és dins del perímetre". En canvi, *verifica cada connexió*, independentment del seu origen.

Els principis fonamentals són:

- **Verificació contínua** d'identitat i dispositiu
- **Accés per privilegis mínims** (least privilege)
- **Xifrat de tot el tràfic**, intern i extern
- **Monitorització i logging constants** d'anomalies

## Implementació a pimes: pas a pas

**Pas 1: Inventari i context.** Mapeja els actius crítics (bases de dades, aplicacions, documents sensibles) i els usuaris que hi accedeixen.

**Pas 2: Autenticació multifactor.** Implementa MFA en tots els accessos (Microsoft Entra, Okta o solucions gratuïtes com Keycloak).

**Pas 3: Segmentació de xarxa.** Crea zones de confiança lògica (desenvolupament, producció, dades sensibles) amb regles d'accés granulars.

**Pas 4: Microsegmentació.** Aplica polítiques a nivell de tràfic, no només a nivell d'usuari.

## Cost vs. Benefici

Un desplegament Zero Trust d'entrada per a una pime de 20-50 empleats oscil·la entre 15.000€ i 40.000€ (hardware, software, formació). El temps de ROI és típicament de 18-24 mesos, considerant la reducció de riscos de breach.

Els costos d'un breach de dades mitjà són **10-100x més alts** que un desplegament preventiu.

## Conclusió

Zero Trust ja no és exclusiu de bancs i governs. Les pimes andorranes que adoptin aquest model avui seran més resilients davant de les ciberamenaces en constant evolució.
