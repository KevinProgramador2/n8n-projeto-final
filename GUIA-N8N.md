# Configuracao do n8n Cloud

## Passo 1: Criar conta no n8n Cloud
Acesse https://n8n.cloud e crie uma conta gratuita (trial).

## Passo 2: Importar o Workflow
1. No painel do n8n, clique em "Import from File"
2. Selecione o arquivo `n8n-workflow-pedido.json`
3. O workflow sera importado com 4 nos

## Passo 3: Configurar Credencial do Gemini
1. Vá em Settings > Credentials > Add Credential
2. Escolha "Header Auth"
3. Configure:
   - Name: Gemini API Key
   - Header Name: x-goog-api-key
   - Header Value: SUA_API_KEY_DO_GEMINI
4. Salve e vincule ao no "Gemini IA"

## Passo 4: Configurar URL do Backend (ngrok)
1. Instale o ngrok: https://ngrok.com/download
2. Inicie o ngrok: `ngrok http 8080`
3. Copie a URL publica (ex: https://abc123.ngrok-free.app)
4. No no "Enviar para Backend", substitua `SEU_NGROK_URL` pela URL do ngrok

## Passo 5: Ativar o Workflow
1. Clique em "Active" no canto superior direito
2. Copie a URL do Webhook (aparece ao clicar no no Webhook)
3. Cole a URL no arquivo `backend/src/main/resources/application.properties`:
   ```
   n8n.webhook.url=https://<SEU-ID>.app.n8n.cloud/webhook/pedido-analise
   ```

## Fluxo do Workflow
```
Webhook (POST) → Gemini IA → Formatar Resposta → HTTP Request (PUT para Backend)
```

## Teste
1. Rode o backend: `cd backend && mvn spring-boot:run`
2. Rode o frontend: `cd frontend && npm run dev`
3. Acesse http://localhost:5173
4. Preencha um pedido e envie
5. O n8n recebera o webhook, a IA analisara e devolvera a analise ao backend
6. O frontend exibira o resultado


api gemini

AQ.Ab8RN6ILp9cX0ZN0gK2UzNZDNPn4dTGjSGfdHLXEYOgPZDegaw


FORCA PARADA DA PORTA 8080
$ Stop-Process -Id 22128 -Force; Start-Sleep -Seconds 2; Write-Host "Processo 22128 morto. Porta 8080 liberada."