---
title: "Integración de IA en productos reales: lecciones del campo"
description: "Cómo implementé chatbots con OpenAI y Meta API en producción, los retos encontrados y las soluciones aplicadas para entregar valor real al negocio."
date: 2025-03-15
tags: ["OpenAI", "Meta API", "NestJS", "Chatbots"]
---

La inteligencia artificial dejó de ser un concepto futurista para convertirse en una herramienta tangible de negocio. En mi experiencia desarrollando el chatbot de atención al cliente para FOX Analytics, aprendí que la integración exitosa de IA en productos reales va mucho más allá de llamar una API.

## El reto

El objetivo era crear un chatbot de WhatsApp que no solo respondiera preguntas frecuentes, sino que pudiera agendar citas automáticamente a través de Google Calendar. El backend debía ser escalable, mantenible y capaz de manejar conversaciones complejas con contexto.

## La arquitectura

Elegimos NestJS por su estructura modular y su sistema de inyección de dependencias, que nos permitió separar la lógica de conversación, la integración con OpenAI y el agendamiento en módulos independientes. MySQL como base de datos nos dio la flexibilidad de queries complejos para el historial de conversaciones.

## Lecciones aprendidas

1. **El prompt engineering es iterativo**: Los primeros prompts generaban respuestas genéricas. Fue necesario refinar constantemente basándonos en conversaciones reales.
2. **La gestión del contexto es crítica**: Mantener el contexto de una conversación multi-turno requiere un diseño cuidadoso del estado.
3. **Los fallbacks son esenciales**: Cuando la IA no puede resolver, debe escalar a un humano de forma transparente.

La clave está en entender que la IA es una herramienta más en el stack, no la solución completa.
