---
title: "Arquitectura de microservicios con Node.js y Go en producción"
description: "Mi experiencia construyendo sistemas distribuidos con Node.js y Go, incluyendo patrones de comunicación, despliegue en GCP y lecciones aprendidas."
date: 2025-06-20
tags: ["Node.js", "Go", "GCP", "Microservicios"]
---

Construir microservicios que funcionen en desarrollo es fácil. Construir microservicios que sobrevivan en producción es otra historia. En Estrellas App, diseñé una arquitectura que combina la flexibilidad de Node.js con la eficiencia de Go, desplegada sobre Google Cloud Platform.

## Por qué combinar Node.js y Go

Node.js es excelente para APIs REST, manejo de I/O asíncrono y desarrollo rápido de features. Sin embargo, para servicios que requieren procesamiento intensivo o alta concurrencia, Go ofrece un rendimiento superior con menor consumo de recursos.

## Patrones que funcionaron

- **API Gateway con Node.js**: Un único punto de entrada que maneja autenticación, rate limiting y routing hacia los microservicios internos.
- **Servicios de procesamiento en Go**: Workers que procesan tareas en background con goroutines, alcanzando throughput significativamente mayor.
- **Event-driven communication**: Comunicación asíncrona entre servicios para operaciones que no requieren respuesta inmediata.

## Despliegue en GCP

Cloud Run resultó ideal para este caso de uso: escalado automático, pay-per-use y contenedores Docker sin gestionar infraestructura. La combinación con Cloud Storage para assets y Cloud SQL para datos persistentes nos dio una plataforma robusta.

## La regla de oro

No todo necesita ser un microservicio. Empezamos con un monolito modular y fuimos extrayendo servicios conforme la necesidad lo justificaba. El peor error es crear microservicios prematuramente.
