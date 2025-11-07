# Documentação da API - HEFC Backend

## 📋 Índice

1. [Informações Gerais](#informações-gerais)
2. [Autenticação](#autenticação)
3. [Rotas de Usuário](#rotas-de-usuário)
4. [Rotas de Pacientes](#rotas-de-pacientes)
5. [Rotas de Atendimentos](#rotas-de-atendimentos)
6. [Rotas de Empréstimos](#rotas-de-empréstimos)
7. [Rotas de Doações](#rotas-de-doções)
8. [Rotas de Oficinas](#rotas-de-oficinas)
9. [Rotas de Relatórios](#rotas-de-relatórios)
10. [Health Check](#health-check)
11. [Tipos e Enums](#tipos-e-enums)
12. [Tratamento de Erros](#tratamento-de-erros)

---

## Informações Gerais

### Base URL
```
http://localhost:8080
```

### Content-Type
```
application/json
```

### Autenticação
A maioria das rotas requer autenticação via JWT Bearer Token. Exceção: rotas de signin, signup (admin) e health check.

---

## Autenticação

### Como obter o token

1. Faça login usando `POST /user/signin`
2. O token será retornado no body da resposta
3. Use o token no header das requisições subsequentes:

```
Authorization: Bearer <token>
```

---

## Rotas de Usuário

### 1. Login (Sign In)

**Endpoint:** `POST /user/signin`

**Autenticação:** Não requerida

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros:**
- `401 Unauthorized`: Credenciais inválidas

---

### 2. Criar Usuário (Sign Up)

**Endpoint:** `POST /user/signup`

**Autenticação:** Requerida (Admin apenas)

**Body:**
```json
{
  "name": "Nome do Usuário",
  "email": "usuario@example.com",
  "password": "senha123",
  "role": "admin" // ou "collaborator"
}
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "name": "Nome do Usuário",
  "email": "usuario@example.com",
  "role": "admin",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

**Validações:**
- `name`: obrigatório (string)
- `email`: obrigatório (email válido)
- `password`: obrigatório (mínimo 6 caracteres)
- `role`: obrigatório (`"admin"` ou `"collaborator"`)

---

### 3. Obter Usuário Atual

**Endpoint:** `GET /user`

**Autenticação:** Requerida

**Resposta (200 OK):**
```json
{
  "id": 1,
  "name": "Nome do Usuário",
  "email": "usuario@example.com",
  "role": "admin",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

---

### 4. Listar Todos os Usuários

**Endpoint:** `GET /user/all`

**Autenticação:** Requerida

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Usuário 1",
    "email": "user1@example.com",
    "role": "admin",
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "Usuário 2",
    "email": "user2@example.com",
    "role": "collaborator",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

---

### 5. Deletar Usuário

**Endpoint:** `DELETE /user/:id`

**Autenticação:** Requerida (Admin apenas)

**Parâmetros:**
- `id` (path): ID do usuário

**Resposta (200 OK):**
```json
{
  "message": "Usuário deletado com sucesso"
}
```

---

### 6. Esqueci minha Senha

**Endpoint:** `POST /user/forgot-password`

**Autenticação:** Não requerida

**Body:**
```json
{
  "email": "usuario@example.com"
}
```

**Resposta (200 OK):**
```json
{
  "message": "Email de recuperação enviado"
}
```

---

### 7. Redefinir Senha

**Endpoint:** `POST /user/reset-password`

**Autenticação:** Requerida

**Body:**
```json
{
  "newPassword": "novaSenha123"
}
```

**Resposta (200 OK):**
```json
{
  "message": "Senha redefinida com sucesso"
}
```

---

## Rotas de Pacientes

### 1. Criar Paciente

**Endpoint:** `POST /patient`

**Autenticação:** Requerida

**Body:**
```json
{
  "name": "Nome do Paciente",
  "type": "cancer", // "family" | "cancer" | "other"
  "status": "ongoing", // "ongoing" | "completed"
  "nomeCompleto": "Nome Completo do Paciente",
  "dataNascimento": "1990-01-15",
  "cpf": "123.456.789-00",
  "rg": "12.345.678-9",
  "enderecoCompleto": "Rua Exemplo, 123 - Bairro - Cidade - UF",
  "cep": "12345-678",
  "telefone": "(11) 98765-4321",
  "estadoCivil": "casado",
  "nomeEsposa": "Nome da Esposa", // opcional
  "filhos": [ // opcional
    {
      "nome": "Nome do Filho 1",
      "idade": 10
    },
    {
      "nome": "Nome do Filho 2",
      "idade": 8
    }
  ]
}
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "name": "Nome do Paciente",
  "type": "cancer",
  "status": "ongoing",
  "nomeCompleto": "Nome Completo do Paciente",
  "dataNascimento": "1990-01-15",
  "cpf": "123.456.789-00",
  "rg": "12.345.678-9",
  "enderecoCompleto": "Rua Exemplo, 123 - Bairro - Cidade - UF",
  "cep": "12345-678",
  "telefone": "(11) 98765-4321",
  "estadoCivil": "casado",
  "nomeEsposa": "Nome da Esposa",
  "filhos": [
    {
      "nome": "Nome do Filho 1",
      "idade": 10
    },
    {
      "nome": "Nome do Filho 2",
      "idade": 8
    }
  ],
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

**Validações:**
- Todos os campos são obrigatórios, exceto `nomeEsposa` e `filhos`

---

### 2. Listar Pacientes

**Endpoint:** `GET /patient`

**Autenticação:** Requerida

**Query Parameters:**
- `patientId` (opcional): ID do paciente específico

**Resposta (200 OK) - Sem patientId (lista todos):**
```json
[
  {
    "id": 1,
    "name": "Paciente 1",
    "type": "cancer",
    "status": "ongoing",
    "nomeCompleto": "Nome Completo 1",
    "dataNascimento": "1990-01-15",
    "cpf": "123.456.789-00",
    "rg": "12.345.678-9",
    "enderecoCompleto": "Endereço 1",
    "cep": "12345-678",
    "telefone": "(11) 98765-4321",
    "estadoCivil": "casado",
    "atendimentos": [],
    "emprestimos": [],
    "doacoes": [],
    "oficinas": [],
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

**Resposta (200 OK) - Com patientId (paciente específico):**
```json
{
  "id": 1,
  "name": "Paciente 1",
  "type": "cancer",
  "status": "ongoing",
  "nomeCompleto": "Nome Completo 1",
  "dataNascimento": "1990-01-15",
  "cpf": "123.456.789-00",
  "rg": "12.345.678-9",
  "enderecoCompleto": "Endereço 1",
  "cep": "12345-678",
  "telefone": "(11) 98765-4321",
  "estadoCivil": "casado",
  "atendimentos": [],
  "emprestimos": [],
  "doacoes": [],
  "oficinas": [],
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

---

## Rotas de Atendimentos

### 1. Criar Atendimento

**Endpoint:** `POST /appointment`

**Autenticação:** Requerida

**Body:**
```json
{
  "pacienteId": 1,
  "data": "2025-11-06",
  "profissional": "Fulano de Tal",
  "especialidade": "Terapia Integrativa",
  "observacoes": "Sessão de acompanhamento"
}
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "pacienteId": 1,
  "data": "2025-11-06",
  "profissional": "Fulano de Tal",
  "especialidade": "Terapia Integrativa",
  "observacoes": "Sessão de acompanhamento",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

**Validações:**
- `pacienteId`: obrigatório (number)
- `data`: obrigatório (date)
- `profissional`: obrigatório (string)
- `especialidade`: obrigatório (string)
- `observacoes`: opcional (string)

---

### 2. Listar Atendimentos

**Endpoint:** `GET /appointment`

**Autenticação:** Requerida

**Query Parameters:**
- `appointmentId` (opcional): ID do atendimento específico

**Resposta (200 OK) - Sem appointmentId:**
```json
[
  {
    "id": 1,
    "pacienteId": 1,
    "paciente": {
      "id": 1,
      "name": "Nome do Paciente",
      "nomeCompleto": "Nome Completo"
    },
    "data": "2025-11-06",
    "profissional": "Fulano de Tal",
    "especialidade": "Terapia Integrativa",
    "observacoes": "Sessão de acompanhamento",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

**Resposta (200 OK) - Com appointmentId:**
```json
{
  "id": 1,
  "pacienteId": 1,
  "paciente": {
    "id": 1,
    "name": "Nome do Paciente",
    "nomeCompleto": "Nome Completo"
  },
  "data": "2025-11-06",
  "profissional": "Fulano de Tal",
  "especialidade": "Terapia Integrativa",
  "observacoes": "Sessão de acompanhamento",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

---

## Rotas de Empréstimos

### 1. Criar Empréstimo

**Endpoint:** `POST /loan`

**Autenticação:** Requerida

**Body:**
```json
{
  "pacienteId": 1,
  "item": "Cadeira de rodas",
  "quantidade": 1,
  "unidade": "unidade",
  "dataEmprestimo": "2025-01-01",
  "dataDevolucaoPrevista": "2025-02-01",
  "declaracaoAssinada": false
}
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "pacienteId": 1,
  "item": "Cadeira de rodas",
  "quantidade": 1,
  "unidade": "unidade",
  "dataEmprestimo": "2025-01-01",
  "dataDevolucaoPrevista": "2025-02-01",
  "declaracaoAssinada": false,
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

**Validações:**
- `pacienteId`: obrigatório (number)
- `item`: obrigatório (string)
- `quantidade`: obrigatório (number)
- `unidade`: obrigatório (string)
- `dataEmprestimo`: obrigatório (date)
- `dataDevolucaoPrevista`: obrigatório (date)
- `declaracaoAssinada`: opcional (boolean, default: false)

---

### 2. Listar Empréstimos

**Endpoint:** `GET /loan`

**Autenticação:** Requerida

**Query Parameters:**
- `loanId` (opcional): ID do empréstimo específico

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "pacienteId": 1,
    "paciente": {
      "id": 1,
      "name": "Nome do Paciente"
    },
    "item": "Cadeira de rodas",
    "quantidade": 1,
    "unidade": "unidade",
    "dataEmprestimo": "2025-01-01",
    "dataDevolucaoPrevista": "2025-02-01",
    "declaracaoAssinada": false,
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

---

## Rotas de Doações

### 1. Criar Doação

**Endpoint:** `POST /donation`

**Autenticação:** Requerida

**Body:**
```json
{
  "pacienteId": 1,
  "descricaoItem": "Medicamentos",
  "quantidade": 10,
  "unidade": "caixas",
  "valorEstimado": 500.00
}
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "pacienteId": 1,
  "descricaoItem": "Medicamentos",
  "quantidade": 10,
  "unidade": "caixas",
  "valorEstimado": 500.00,
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

**Validações:**
- `pacienteId`: obrigatório (number)
- `descricaoItem`: obrigatório (string)
- `quantidade`: obrigatório (number)
- `unidade`: obrigatório (string)
- `valorEstimado`: opcional (number/decimal)

---

### 2. Listar Doações

**Endpoint:** `GET /donation`

**Autenticação:** Requerida

**Query Parameters:**
- `donationId` (opcional): ID da doação específica

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "pacienteId": 1,
    "paciente": {
      "id": 1,
      "name": "Nome do Paciente"
    },
    "descricaoItem": "Medicamentos",
    "quantidade": 10,
    "unidade": "caixas",
    "valorEstimado": 500.00,
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

---

## Rotas de Oficinas

### 1. Criar Oficina

**Endpoint:** `POST /workshop`

**Autenticação:** Requerida

**Body:**
```json
{
  "name": "Imaginação",
  "weekday": "monday", // "monday" | "tuesday" | "wednesday" | "thursday" | "friday"
  "startTime": "09:00",
  "endTime": "11:00",
  "participants": 15,
  "status": "active" // "active" | "inactive" | "cancelled"
}
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "name": "Imaginação",
  "weekday": "monday",
  "startTime": "09:00",
  "endTime": "11:00",
  "participants": 15,
  "status": "active",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

**Validações:**
- `name`: obrigatório (string)
- `weekday`: obrigatório (enum: "monday", "tuesday", "wednesday", "thursday", "friday")
- `startTime`: obrigatório (string, formato HH:mm)
- `endTime`: obrigatório (string, formato HH:mm, deve ser depois de startTime)
- `participants`: obrigatório (number, mínimo 0)
- `status`: obrigatório (enum: "active", "inactive", "cancelled")

**Oficinas pré-definidas sugeridas:**
- Imaginação
- Conexão
- Equilibrar
- Jardim Suspenso
- Rodinhas nos Pés

---

### 2. Listar Oficinas

**Endpoint:** `GET /workshop`

**Autenticação:** Requerida

**Query Parameters:**
- `workshopId` (opcional): ID da oficina específica

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Imaginação",
    "descricao": "Oficina de criatividade",
    "diaSemana": "Segunda-feira",
    "horarioInicio": "09:00",
    "horarioFim": "11:00",
    "participantes": [
      {
        "id": 1,
        "name": "Paciente 1"
      }
    ],
    "status": "active",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

---

## Rotas de Relatórios

### 1. Relatório de Pacientes

**Endpoint:** `GET /relatorios/pacientes`

**Autenticação:** Requerida

**Query Parameters:**
- `patientId` (opcional): ID do paciente específico

**Resposta (200 OK) - Sem patientId (todos os pacientes):**
```json
[
  {
    "paciente": {
      "id": 1,
      "name": "Nome do Paciente",
      "nomeCompleto": "Nome Completo",
      "type": "cancer",
      "status": "ongoing",
      "cpf": "123.456.789-00",
      "telefone": "(11) 98765-4321"
    },
    "atendimentos": [
      {
        "id": 1,
        "data": "2025-11-06",
        "profissional": "Fulano de Tal",
        "especialidade": "Terapia Integrativa"
      }
    ],
    "emprestimos": [
      {
        "id": 1,
        "item": "Cadeira de rodas",
        "dataEmprestimo": "2025-01-01",
        "dataDevolucaoPrevista": "2025-02-01"
      }
    ],
    "doacoes": [
      {
        "id": 1,
        "descricaoItem": "Medicamentos",
        "quantidade": 10,
        "valorEstimado": 500.00
      }
    ],
    "oficinas": [
      {
        "id": 1,
        "name": "Imaginação",
        "diaSemana": "Segunda-feira"
      }
    ]
  }
]
```

**Resposta (200 OK) - Com patientId (paciente específico):**
```json
{
  "paciente": {
    "id": 1,
    "name": "Nome do Paciente",
    "nomeCompleto": "Nome Completo",
    "type": "cancer",
    "status": "ongoing",
    "cpf": "123.456.789-00",
    "telefone": "(11) 98765-4321"
  },
  "atendimentos": [
    {
      "id": 1,
      "data": "2025-11-06",
      "profissional": "Fulano de Tal",
      "especialidade": "Terapia Integrativa"
    }
  ],
  "emprestimos": [
    {
      "id": 1,
      "item": "Cadeira de rodas",
      "dataEmprestimo": "2025-01-01",
      "dataDevolucaoPrevista": "2025-02-01"
    }
  ],
  "doacoes": [
    {
      "id": 1,
      "descricaoItem": "Medicamentos",
      "quantidade": 10,
      "valorEstimado": 500.00
    }
  ],
  "oficinas": [
    {
      "id": 1,
      "name": "Imaginação",
      "diaSemana": "Segunda-feira"
    }
  ]
}
```

**Uso:**
Este endpoint retorna uma visão completa do paciente, incluindo todos os seus vínculos (atendimentos, empréstimos, doações e oficinas). Útil para:
- Dashboard de paciente
- Relatórios detalhados
- Exportação de dados
- Visualização geral de histórico

---

## Health Check

### 1. Health Check - Alive

**Endpoint:** `GET /health/alive`

**Autenticação:** Não requerida

**Resposta (200 OK):**
```json
{
  "status": "alive"
}
```

---

### 2. Health Check - Ready

**Endpoint:** `GET /health/ready`

**Autenticação:** Não requerida

**Resposta (200 OK):**
```json
{
  "status": "ready"
}
```

---

## Tipos e Enums

### PatientType
```typescript
type PatientType = "family" | "cancer" | "other"
```

### PatientStatus
```typescript
type PatientStatus = "ongoing" | "completed"
```

### AppointmentStatus
```typescript
type AppointmentStatus = "ongoing" | "completed"
```

### LoanStatus
```typescript
type LoanStatus = "pending" | "returned"
```

### DonationStatus
```typescript
type DonationStatus = "pending" | "received"
```

### DonationType
```typescript
type DonationType = 
  | "medicine" 
  | "supplies" 
  | "equipment" 
  | "money" 
  | "food" 
  | "clothes" 
  | "other"
```

### WorkshopStatus
```typescript
type WorkshopStatus = "active" | "inactive" | "cancelled"
```

### UserRole
```typescript
type UserRole = "admin" | "collaborator"
```

### Filho (Filhos do Paciente)
```typescript
interface Filho {
  nome: string;
  idade: number;
}
```

---

## Tratamento de Erros

### Códigos de Status HTTP

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Dados inválidos ou faltando
- `401 Unauthorized`: Token inválido ou ausente
- `403 Forbidden`: Acesso negado (requer permissão de admin)
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro interno do servidor

### Formato de Erro

```json
{
  "error": "Mensagem de erro",
  "statusCode": 400
}
```

### Exemplos de Erros Comuns

**401 Unauthorized (Token inválido):**
```json
{
  "error": "Token inválido ou expirado",
  "statusCode": 401
}
```

**400 Bad Request (Validação):**
```json
{
  "error": "ID do paciente é obrigatório",
  "statusCode": 400
}
```

**403 Forbidden (Admin requerido):**
```json
{
  "error": "Acesso negado. Apenas administradores podem realizar esta ação",
  "statusCode": 403
}
```

---

## Exemplos de Uso no Frontend

### Configuração do Cliente HTTP

```typescript
// api/client.ts
const API_BASE_URL = 'http://localhost:8080';

export const apiClient = {
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro na requisição');
    }

    return response.json();
  },
};
```

### Exemplo: Login

```typescript
// api/auth.ts
export const authService = {
  async signIn(email: string, password: string) {
    const response = await apiClient.request('/user/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    localStorage.setItem('token', response.accessToken);
    return response;
  },
};
```

### Exemplo: Criar Paciente

```typescript
// api/patient.ts
export const patientService = {
  async createPatient(patientData: {
    name: string;
    type: string;
    status: string;
    nomeCompleto: string;
    dataNascimento: string;
    cpf: string;
    rg: string;
    enderecoCompleto: string;
    cep: string;
    telefone: string;
    estadoCivil: string;
    nomeEsposa?: string;
    filhos?: Array<{ nome: string; idade: number }>;
  }) {
    return apiClient.request('/patient', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
  },
  
  async getPatients(patientId?: string) {
    const query = patientId ? `?patientId=${patientId}` : '';
    return apiClient.request(`/patient${query}`, {
      method: 'GET',
    });
  },
};
```

### Exemplo: Criar Atendimento

```typescript
// api/appointment.ts
export const appointmentService = {
  async createAppointment(appointmentData: {
    pacienteId: number;
    data: string;
    profissional: string;
    especialidade: string;
    observacoes?: string;
  }) {
    return apiClient.request('/appointment', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },
};
```

### Exemplo: Relatório de Paciente

```typescript
// api/report.ts
export const reportService = {
  async getPatientReport(patientId?: string) {
    const query = patientId ? `?patientId=${patientId}` : '';
    return apiClient.request(`/relatorios/pacientes${query}`, {
      method: 'GET',
    });
  },
};
```

---

## Notas Importantes

1. **Datas**: Todas as datas devem ser enviadas no formato ISO 8601 (YYYY-MM-DD)
2. **Horários**: Horários devem estar no formato HH:mm (24 horas)
3. **Autenticação**: A maioria das rotas requer token JWT no header Authorization
4. **Validação**: Todos os campos obrigatórios são validados no backend
5. **Relacionamentos**: Os endpoints GET retornam relacionamentos quando aplicável
6. **Paginação**: Atualmente não implementada, mas pode ser adicionada no futuro
7. **Filtros**: Os endpoints GET podem ser estendidos com filtros adicionais

---

## Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.

