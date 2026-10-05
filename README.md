# 🏠 HomeCache

> **Your household, remembered.**

HomeCache is an AI-powered household memory assistant that turns invoices, warranties, service receipts, and user manuals into a searchable, conversational memory.

Instead of searching through folders and documents, simply ask:

> **"When does my washing machine warranty expire?"**

HomeCache retrieves the relevant information from your documents and uses **Gemma 2 2B IT** to generate a grounded answer.

---

## ✨ Features

* 📄 **Document Upload** — Store household invoices, warranties, receipts, and manuals.
* 🧠 **AI Memory** — Documents are converted into searchable chunks and embeddings.
* 💬 **Natural Language Chat** — Ask questions about your household documents.
* 🔎 **RAG-powered Answers** — Answers are generated using relevant document context.
* 📌 **Source Awareness** — See which documents were used to answer a question.
* 📊 **Ingestion Status** — Track documents as they move through the processing pipeline.
* ✨ **Meet the Memory** — Explore a preloaded fictional household without uploading anything.
* 🔗 **Cross-document Retrieval** — Ask questions that require information from multiple documents.

---

## 🧠 How It Works

HomeCache uses a **Retrieval-Augmented Generation (RAG)** pipeline.

```text
                Household Documents
                        │
                        ▼
                Text Extraction
                        │
                        ▼
                    Chunking
                        │
                        ▼
                   Embeddings
                        │
                        ▼
                 Vector Search
                        │
                        ▼
              Relevant Context
                        │
                        ▼
              Gemma 2 2B IT
                        │
                        ▼
               Grounded Answer
```

When a user asks a question, HomeCache retrieves the most relevant pieces of their documents and provides them as context to Gemma.

This allows the model to answer using the user's own household information rather than relying only on its general knowledge.

---

# 🤖 AI Model

HomeMemory uses:

### Gemma 2 2B IT

**Gemma 2 2B IT** is an instruction-tuned open-weight model from Google.

It was chosen because it provides a good balance between:

* ⚡ Fast inference
* 🧠 Useful instruction following
* 💻 Relatively lightweight model size
* 🔓 Open-weight experimentation
* 💰 Low-cost development

The AI layer is kept separate from the rest of the application so the model can be replaced or experimented with in the future.

---

# 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │       Vercel        │
                         │                     │
                         │   React + TypeScript│
                         │      Frontend       │
                         └──────────┬──────────┘
                                    │
                                  HTTPS
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       Render        │
                         │                     │
                         │ Node.js + Express   │
                         │       Backend       │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
                    ▼               ▼                ▼
             ┌───────────┐   ┌────────────┐   ┌────────────┐
             │ MongoDB   │   │ Embeddings │   │   Gemma    │
             │   Atlas   │   │  + Vector  │   │  2 2B IT   │
             │           │   │   Search   │   │            │
             └───────────┘   └────────────┘   └────────────┘
```

---

# 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* React Router
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose

### AI

* **Gemma 2 2B IT**
* Embeddings
* Retrieval-Augmented Generation (RAG)
* Vector similarity search

### Deployment

* **Vercel** — Frontend
* **Render** — Backend
* **MongoDB Atlas** — Database

---

# ✨ Meet the Memory

To make the project easy to experience during a demo, HomeMemory includes a **Meet the Memory** mode.

Instead of asking visitors to upload their own documents, a fictional household is preloaded with five documents:

```text
🧺 LG Washing Machine Invoice
🧊 Samsung Refrigerator Warranty
❄️ Voltas AC Service Receipt
📺 TV User Manual
💧 Water Purifier Invoice
```

Click **Meet the Memory** and start asking questions immediately.

### Try these questions

```text
When does my washing machine warranty expire?

How much did the water purifier cost?

When should I service the AC again?

How do I factory reset the TV?

Which appliance has the latest warranty expiry date?
```

All demo documents contain fictional information.

---

# 🔍 Example

### Question

```text
When does my washing machine warranty expire?
```

### HomeMemory

```text
The washing machine warranty expires on
March 11, 2027.

Source:
📄 LG Washing Machine Invoice
```

The answer is generated using the relevant information retrieved from the household memory.

---

# 🌱 Why Open AI?

HomeCache was built around the idea that **personal information should remain under the user's control**.

Household documents can contain sensitive information such as:

* Purchase history
* Warranty information
* Service records
* Product details
* Personal information

Using an open-weight model such as Gemma makes the AI layer more flexible.

The model can potentially be:

* 🖥️ Run locally
* 🔒 Self-hosted
* 🔄 Replaced with another open model
* 🧪 Fine-tuned or adapted
* 💰 Used without being completely dependent on a proprietary AI provider

This flexibility is especially valuable for an application designed to work with personal memories.

---

# 📂 Project Structure

```text
HomeCache/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   ├── demo/
│   │   │   └── ...
│   │   ├── pages/
│   │   ├── lib/
│   │   └── ...
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   │       ├── demo/
│   │       └── rag/
│   │
│   └── package.json
│
└── README.md
```

---

# 🚀 Running Locally

## Prerequisites

* Node.js
* npm
* MongoDB Atlas or MongoDB
* Git

### Clone

```bash
git clone https://github.com/Advi729/home-cache.git

cd home-cache
```

---

## Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string

AI_MODEL=gemma-2-2b-it
HF_TOKEN=your_huggingface_token

CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

---

## Frontend

Open another terminal:

```bash
cd client
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

---

# 🔐 Environment Variables

Never commit secrets to the repository.

Create a `.env.example` file containing only variable names:

```env
PORT=
MONGODB_URI=
AI_MODEL=
HF_TOKEN=
CLIENT_URL=
```

Frontend:

```env
VITE_API_URL=
```

Make sure `.env` is included in `.gitignore`.

---

# 🌐 Deployment

HomeCache is deployed using:

### Frontend

**Vercel**

```text
React + Vite
      ↓
   Vercel
```

### Backend

**Render**

```text
Node.js + Express
        ↓
      Render
```

### Database

**MongoDB Atlas**

```text
MongoDB
   ↓
Atlas
```

This keeps the frontend and backend independently deployable.

---

# 🧪 Demo Flow

The recommended way to experience HomeCache:

```text
Open HomeCache
       ↓
Meet the Memory
       ↓
Load fictional household
       ↓
Ask a question
       ↓
Retrieve relevant memories
       ↓
Gemma generates answer
       ↓
View supporting source
```

The goal is to demonstrate the entire AI memory pipeline in under a minute.

---

# 🚧 Future Improvements

* 🎙️ Voice-based questions
* 📱 Mobile/PWA version
* 📸 OCR for scanned documents
* 🔔 Warranty expiration reminders
* 🛠️ Household maintenance reminders
* 🏠 Multi-person household memories
* 🖥️ Fully local/offline inference
* 🔄 Support for additional open-weight models
* ☁️ Cloud storage integrations
* 📅 Household maintenance calendar

---

# 🏆 Built for Hacktoberfest
[Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)

HomeCache was built for the **Hacktoberfest "Build for a Friend"** challenge.

The project explores how open AI can solve a small but real problem:

> **What if your home could actually remember?**

Instead of building another general-purpose chatbot, HomeCache focuses on turning the information people already have into something they can actually talk to.

---

# 👨‍💻 Author

Built by **Adal Adwaid Vikas**

If you found HomeCache interesting, consider ⭐ starring the repository and exploring the code.

---

## 📄 License

Distributed under the MIT License. View the accompanying LICENSE file layout context for structural authorization parameters.
