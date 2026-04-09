# Relayr

Relayr is a powerful Workflow Automation Tool designed to help you build, manage, and execute complex workflows seamlessly. With a visual workflow builder and an intuitive interface, automating your tasks has never been easier.

## 🚀 Features

- **Visual Workflow Builder**: Create and edit automation flows using an interactive node-based interface (powered by React Flow).
- **Execution Tracking**: Monitor your workflow runs in real-time, inspect past executions, and debug issues easily.
- **Credentials Management**: Securely store and manage API keys and credentials for third-party integrations.
- **Authentication & Subscriptions**: Built-in secure authentication with tiered pricing (Free/Pro plans) for advanced feature access.
- **Dark Mode Support**: Beautiful, fully responsive UI built with Tailwind CSS, Shadcn UI, and dark mode.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Workflow Engine**: [React Flow](https://reactflow.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏃 Getting Started

### Prerequisites

Make sure you have Node.js and npm (or pnpm/yarn) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd relayr-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables. Create a `.env.local` file and add the required variables (e.g., authentication secrets, database URLs, etc.).

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

- `/src/app` - Next.js App Router pages and layouts.
- `/src/components` - Reusable React components (UI elements, Sidebar, Header, etc.).
- `/src/features` - Feature-specific logic, hooks, and components (Workflows, Executions, Subscriptions).

## 📄 License

This project is licensed under the MIT License.
