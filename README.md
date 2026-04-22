# 🚀  Formulário de cadastro (React + TypeScript)

> Um sistema de formulário multi-etapas inspirado em fluxos reais de fintechs, CRMs e plataformas de cadastro avançadas, com foco em UX, escalabilidade e arquitetura frontend moderna.

---

## 👋 Sobre o projeto

Este projeto simula um fluxo completo de onboarding de usuário em etapas, com validação, persistência de dados e integração com API externa de CEP.

O foco não é só “fazer funcionar”, mas sim demonstrar como estruturar um frontend escalável e pronto para produção.

---

## 🎯 O que este projeto demonstra na prática

✔ Arquitetura escalável de formulários complexos  
✔ Gerenciamento de estado global sem overengineering (Zustand)  
✔ Componentização avançada de inputs reutilizáveis  
✔ Integração com API externa (ViaCEP) com UX otimizada  
✔ Testes automatizados cobrindo fluxo real de usuário  
✔ Boas práticas de React + TypeScript em produção  

---

## ⚙️ Stack utilizada

- React 18
- TypeScript
- Vite
- React Hook Form
- Zod
- Zustand
- IMask
- Jest + React Testing Library

---

## 🧭 Fluxo do sistema

Dados Pessoais → Endereço (CEP auto-complete) → Dados Profissionais → Finalização

---

## 📍 Auto-preenchimento de CEP

Ao digitar um CEP válido:

- Consulta ViaCEP automaticamente
- Preenche endereço, cidade, bairro e estado
- Loading state durante busca
- Tratamento de erro de CEP inválido

API:
https://viacep.com.br/ws/{cep}/json/

---

## 🧱 Arquitetura

src/
 ├── components/
 │   └── form
 ├── modules/
 │   └── form/
 │       ├── steps/
 │       ├── store/
 │       ├── services/
 │       └── types

---

## 🧠 Decisões técnicas

- React Hook Form para performance
- Zustand para estado global simples
- Componentização de inputs reutilizáveis
- IMask para UX melhorada

---

## 🧪 Testes

- Fluxo completo do usuário
- Mock de API CEP
- Validação de inputs
- Interações reais

Exemplo:
expect(getAddressByCep).toHaveBeenCalledWith('12345678')

---

## 🚀 Como rodar

npm install
npm run dev

Testes:
npm run test

---

## 💼 Para recrutadores

Projeto criado para demonstrar domínio em:

- React moderno
- Arquitetura frontend escalável
- UX em formulários complexos
- Testes automatizados
