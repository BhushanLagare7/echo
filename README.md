# Echo

Echo is an AI-powered customer support widget that enables real-time voice and text interactions for businesses. It consists of an embeddable widget, a management dashboard, and a robust backend system.

## 🚀 Features

- **AI Voice & Chat**: Seamlessly switch between voice and text interactions using [Vapi](https://vapi.ai/).
- **Real-time Dashboard**: Monitor conversations, manage settings, and view analytics.
- **Monorepo Architecture**: Built for scale using [TurboRepo](https://turbo.build/repo).
- **Modern Stack**: Powered by [Next.js](https://nextjs.org/), [Convex](https://convex.dev/), and [Tailwind CSS](https://tailwindcss.com/).
- **Secure Authentication**: Integrated with [Clerk](https://clerk.com/) for user and organization management.

## 🛠️ Architecture

This project is a monorepo managed by TurboRepo:

### Apps

- `apps/web`: The management dashboard for business owners.
  - _Stack_: Next.js 15, Clerk Auth, Convex React Client.
  - _Port_: 3000
- `apps/widget`: The standalone widget application that is embedded on client sites.
  - _Stack_: Next.js, Vapi Web SDK.
  - _Port_: 3001
- `apps/embed`: A lightweight loader script for embedding the widget.
  - _Stack_: Vite.
  - _Port_: 3002

### Packages

- `packages/backend`: The backend logic and database schema powered by Convex.
- `packages/ui`: Shared UI components based on [shadcn/ui](https://ui.shadcn.com/).
- `packages/math`: Shared utility functions.
- `packages/eslint-config` & `packages/typescript-config`: Shared configuration.

## 🏁 Getting Started

### Prerequisites

- Node.js (>= 20)
- pnpm (>= 9)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/BhushanLagare7/echo.git
    cd echo
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

### Environment Setup

You need to set up environment variables for the apps and backend.

**`apps/web/.env.local`** and **`apps/widget/.env.local`**:

```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

**`packages/backend` (Convex Dashboard)**:
Ensure you have your Vapi keys and other secrets configured in your Convex dashboard environment variables.

### Running the Project

Start all applications in development mode:

```bash
pnpm dev
```

- **Dashboard**: [http://localhost:3000](http://localhost:3000) (Redirects to `/conversations`)
- **Widget**: [http://localhost:3001](http://localhost:3001)
- **Embed Script**: [http://localhost:3002](http://localhost:3002)

## 🤝 Contributing

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
