# 🌟 Promptopia - Discover and Share AI-Powered Prompts 🌟

[![GitHub stars](https://img.shields.io/github/stars/T1rth1/Promptopia)](https://github.com/T1rth1/Promptopia/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/T1rth1/Promptopia)](https://github.com/T1rth1/Promptopia/network)
[![GitHub issues](https://img.shields.io/github/issues/T1rth1/Promptopia)](https://github.com/T1rth1/Promptopia/issues)

Promptopia is a robust Full Stack Next.js application designed as a one-stop solution for discovering and sharing AI-powered prompts.

## 🚀 Key Features

- 🤖 **AI-Powered Prompts**: Discover and share AI-generated prompts.
- 🔒 **Secure Authentication**: Google authentication via NextAuth ensures secure user access.
- 👤 **Profile Management**: Comprehensive user profile management with CRUD operations for prompts.
- 🌍 **Global Submission**: Submit prompts globally and engage with other users' prompts.
- 🔄 **User Interaction**: Manage, view, edit, and delete prompts for enhanced interaction.
- 🔍 **Search Functionality**: Perform case-insensitive searches through prompts, user profiles, and tags dynamically.
- 🛡️ **Authorization Control**: Users can create, edit, and delete prompts only when signed in.

## 🛠️ Tech Stack

- **Frontend**: Next.js, React.js, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **Authentication**: NextAuth (Google Authentication)
- **Styling**: Tailwind CSS
- **Language**: JavaScript

## 📸 Screenshots

![Screenshot 1](link_to_screenshot1)
![Screenshot 2](link_to_screenshot2)

## 🏁 Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/T1rth1/Promptopia.git
    cd Promptopia
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory and add your environment variables:
    ```env
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    MONGODB_URI=your_mongodb_uri
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📂 Project Structure

├── components
│ ├── Auth
│ ├── Layout
│ └── Prompt
├── pages
│ ├── api
│ ├── auth
│ ├── prompts
│ ├── index.js
│ └── _app.js
├── styles
│ ├── globals.css
├── utils
│ ├── db.js
├── .env.local
└── package.json

## 📧 Contact

Tirth Patel - [Your Email](mailto:tirthpatel4822@gmail.com)

Project Link: [Promptopia](https://github.com/T1rth1/Promptopia)

---

⭐️ Don't forget to give a star if you like this project! ⭐️
