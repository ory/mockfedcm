# MockFedCM

A mock implementation of the [FedCM (Federated Credential Management) API](https://developer.mozilla.org/en-US/docs/Web/API/FedCM_API) that provides both Relying Party (RP) and Identity Provider (IdP) functionality for testing FedCM integrations.

## Features

- 🔐 Complete FedCM IdP implementation\*
- 🔑 FedCM Relying Party (RP) testing tools
- ⚡ Built with Next.js 15 and TypeScript
- 🎨 Modern UI with Tailwind CSS and DaisyUI
- 🧪 Testing utilities for FedCM implementations

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm, yarn, or pnpm

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/jhickmanit/mockfedcm.git
cd mockfedcm
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

   - Copy `.example.env` to `.env.local`:

   ```bash
   cp .example.env .env.local
   ```

   - Update the following variables in `.env.local`:
     - `NEXT_PUBLIC_APP_FQDN`: Your application's domain (default: localhost:3000)
     - `JWT_SECRET`: A secure secret for JWT signing
     - `FEDCM_PROVIDER_NAME`: Your IdP name
     - `FEDCM_BACKGROUND_COLOR`: Brand color for the FedCM UI
     - `FEDCM_TEXT_COLOR`: Text color for the FedCM UI
     - `BYPASS_SEC_FETCH_CHECK`: Bypass Sec-Fetch-Dest checks for development

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   └── fedcm/        # FedCM API endpoints
│   ├── .well-known/      # Well-known endpoints
│   │   └── web-identity/ # FedCM web-identity endpoint
│   ├── idp/              # Identity Provider pages
│   │   └── _components/  # IdP-specific components
│   └── rp/               # Relying Party pages
│       └── _components/  # RP-specific components
├── components/            # Reusable React components
│   └── ui/               # UI components (buttons, inputs, etc.)
├── lib/                   # Core functionality and utilities
│   └── fedcm.ts          # FedCM implementation
├── types/                 # TypeScript type definitions
└── utils/                # Helper functions
```

## FedCM Implementation

### As an Identity Provider (IdP)

The project implements all required FedCM IdP endpoints:

- `/.well-known/web-identity`: Returns the provider URLs configuration
- `/api/fedcm/config.json`: Returns the manifest URL configuration
- `/api/fedcm/manifest`: Returns the FedCM manifest
- `/api/fedcm/accounts`: Returns available user accounts
- `/api/fedcm/client-metadata`: Provides client application metadata
- `/api/fedcm/token`: Issues identity tokens
- `/api/fedcm/disconnect`: Handles account disconnection

### As a Relying Party (RP)

Includes a testing interface for FedCM RP implementations with features like:

- Configuration form for FedCM parameters
- Auto-testing capabilities
- JSON configuration preview
- Nonce management
- Modern UI with toggle switches and joined inputs

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Environment Variables

| Variable                 | Description                           | Default        |
| ------------------------ | ------------------------------------- | -------------- |
| `APP_FQDN`               | Application domain                    | localhost:3000 |
| `JWT_SECRET`             | JWT signing secret                    | -              |
| `FEDCM_PROVIDER_NAME`    | IdP name                              | Mock FedCM IdP |
| `FEDCM_BACKGROUND_COLOR` | UI background color                   | #ffffff        |
| `FEDCM_TEXT_COLOR`       | UI text color                         | #000000        |
| `BYPASS_SEC_FETCH_CHECK` | Bypass security checks in development | false          |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Apache License, Version 2.0 - see the [LICENSE](LICENSE) file for details.
