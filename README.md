# 🛒 E-Commerce Inteligente: Automação e IA com n8n

[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![n8n](https://img.shields.io/badge/n8n-FF6D5A?style=for-the-badge&logo=n8n&logoColor=white)](https://n8n.io/)

Um projeto Full-Stack focado na **Integração de Tecnologias Web com Inteligência Artificial**. Esta aplicação simula o fluxo de uma Loja Virtual onde a finalização de um pedido aciona uma automação assíncrona no **n8n**, utilizando IA Generativa para analisar o perfil do cliente, recomendar produtos e gerar mensagens personalizadas de pós-venda.

Projeto desenvolvido como parte das atividades da **Residência em TIC Software (Serratec)**.

---

## ⚙️ Arquitetura e Fluxo de Dados (Event-Driven AI)

O sistema opera de forma assíncrona para não sobrecarregar o servidor principal:
1. O usuário finaliza o pedido no **Frontend (React)**.
2. O **Backend (Spring Boot)** salva o pedido no banco de dados com o status `AGUARDANDO_IA`.
3. O Backend dispara um Webhook para o orquestrador **n8n**.
4. O **n8n** aciona um modelo de Inteligência Artificial (LLM) que analisa os produtos comprados e o valor total.
5. O n8n formata a resposta e faz um `PUT` de volta para o Backend.
6. O Frontend, via *polling*, detecta a atualização e exibe o perfil, as recomendações e o cupom ao cliente.

---

## 🚀 Tecnologias Utilizadas

### Backend
* **Java + Spring Boot:** Motor da API REST e regras de negócio.
* **Spring Data JPA & H2 Database:** Persistência de dados em memória para agilidade no desenvolvimento.
* **WebClient / RestTemplate:** Para disparo do Webhook assíncrono.

### Frontend
* **React + Vite:** Interface visual reativa e de alta performance.
* **TailwindCSS:** Estilização moderna.
* **Axios:** Consumo da API REST.
* **Acessibilidade (a11y):** Interface totalmente navegável via teclado, com alto contraste e marcações ARIA.

### Automação & IA
* **n8n:** Orquestração de fluxos de trabalho e chamadas de API.
* **Google Gemini (ou Basic LLM):** Análise cognitiva e estruturação de dados em formato JSON.

---

## 🛣️ Endpoints da API

A API foi projetada de forma modular:

* `POST /pedidos` - Registra um novo pedido e aciona o Webhook da IA.
* `GET /pedidos/{id}` - Consulta o status e os dados de um pedido específico.
* `PUT /pedidos/{id}/analise` - Rota restrita, consumida pelo n8n para devolver a análise gerada pela IA.

---

## 💻 Como rodar o projeto localmente

### 1. Backend (Spring Boot)
1. Navegue até a pasta do backend: `cd backend`
2. Certifique-se de ter o Maven e o Java instalados.
3. Execute a aplicação:
   bash

   ```mvnw spring-boot:run```

   ## 👥 Integrantes do Projeto

Este aplicativo foi desenvolvido colaborativamente por:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/KevinProgramador2">
        <img src="https://github.com/KevinProgramador2.png" width="100px;" alt="KevinProgramador2"/><br />
        <sub><b>KevinProgramador2</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/lhmillan">
        <img src="https://github.com/lhmillan.png" width="100px;" alt="nisgri"/><br />
        <sub><b>lhmillan</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/RodolphoAlmeida-FS">
        <img src="https://github.com/RodolphoAlmeida-FS.png" width="100px;" alt="MadowRod"/><br />
        <sub><b>RodolphoAlmeida-FS</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/leandrotcdev">
        <img src="https://github.com/leandrotcdev.png" width="100px;" alt="RafaelSilvc"/><br />
        <sub><b>leandrotcdev</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/bernardocaetano7">
        <img src="https://github.com/bernardocaetano7.png" width="100px;" alt="pedroteixeira5"/><br />
        <sub><b>bernardocaetano7</b></sub>
      </a>
    </td>
  </tr>
</table>
