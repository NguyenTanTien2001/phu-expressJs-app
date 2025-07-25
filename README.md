# Express.js TypeScript Template

A modern, production-ready Express.js template with TypeScript support, featuring MongoDB integration, Swagger documentation, error handling, logging, and more.

## Prerequisites

- Node.js version 22.15.1 (required)
- MongoDB (for database)

## Quick Start

To create a new project using this template:

```bash
npx @hphudev/create-expressjs-app
```

## Features

- ⚡️ **TypeScript** - Write better, more reliable code
- 📦 **MongoDB Integration** - Ready-to-use MongoDB connection and models
- 📝 **Swagger Documentation** - Built-in API documentation with export capability
- 🔒 **Error Handling** - Centralized error handling
- 📊 **Logging System** - Request logging with daily log files
- 🛠️ **Environment Variables** - Secure configuration management
- 🚦 **Middleware Support** - Pre-configured middleware setup
- 🧪 **CORS Enabled** - Cross-Origin Resource Sharing support
- 📁 **Structured Project** - Well-organized project architecture

## Project Structure

```
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── core/           # Core functionality
│   ├── docs/           # API documentation
│   ├── jobs/           # Background jobs
│   ├── middlewares/    # Express middlewares
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   ├── validations/    # Request validation
│   └── index.ts        # Application entry point
├── scripts/            # Utility scripts
│   └── export-swagger.ts    # Swagger JSON export script
├── logs/               # Application logs
├── public/            # Public assets
│   └── docs/          # Generated API documentation
├── package.json
└── tsconfig.json
```

## Scripts

- `npm run dev` - Start the development server with hot-reload
- `npm run build` - Build the project for production
- `npm start` - Start the production server
- `npm run export-swagger` - Export Swagger documentation to JSON file

## Dependencies

### Core Dependencies

- express - Web framework
- mongoose - MongoDB object modeling
- cors - CORS middleware
- dotenv - Environment variables
- swagger-jsdoc & swagger-ui-express - API documentation
- ulid - Unique ID generation
- yamljs - YAML file support

### Development Dependencies

- typescript - TypeScript support
- tsx - TypeScript execution
- @types/* - TypeScript type definitions

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
NODE_ENV=development
```

## API Documentation

The API documentation is available in two formats:

1. **Interactive Swagger UI**: Once the server is running, access at:

```
http://localhost:3000/api/docs
```

2. **Static JSON File**: Generate the Swagger JSON file using:

```bash
npm run export-swagger
```

The generated file will be available at `public/docs/api-document.json`

## Error Handling

The template includes a centralized error handling system. Custom errors can be thrown using the `AppError` class:

```typescript
throw new AppError('Error message', 400);
```

## Logging

Request logs are automatically saved in the `logs` directory with the format `[DD-MM-YYYY]-access.log`.

## License

ISC

## Author

Created by @hphudev
