# 🌟 Promptopia - Discover and Share AI-Powered Prompts 🌟

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

      Home Page with dynamic search bar
      ![image](https://github.com/user-attachments/assets/4a666ba3-b0cc-44ec-ab6f-ec2cafed5275)

      After log-in
      ![image](https://github.com/user-attachments/assets/9dbf5808-17ba-4995-b977-5c08dce9b92e)

      Create Prompt Page
      ![image](https://github.com/user-attachments/assets/eb06298c-9ffb-4298-843a-2be0c7830714)

      User Can Edit/Delete particular prompt and also copy the prompt
      ![image](https://github.com/user-attachments/assets/801e3529-4cf0-49dd-a0ae-c920c013e78d)





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

## 📧 Contact

Tirth Patel - [Your Email](mailto:tirthpatel4822@gmail.com)

Project Link: [Promptopia](https://github.com/T1rth1/Promptopia)

---

⭐️ Don't forget to give a star if you like this project! ⭐️
