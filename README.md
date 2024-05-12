# Patrigma

Patrigma is a Progressive Web Application (PWA) designed to enhance social interactions through a culturally enriching treasure hunt experience. Using Next.js, this application allows users to discover local points of interest through mystery-solving and navigation-based challenges.

## Features

- **User Registration and Authentication**: Secure sign-up and login functionality.
- **Interactive Enigma Routes**: Users can create and manage custom routes with puzzles based on local landmarks.
- **Event Management**: Organize and participate in treasure hunt events.
- **Real-time GPS Navigation**: Guide users through selected routes and puzzles.
- **Accessible and Intuitive UI**: Ensures a smooth user experience across various devices.
- **Feedback System**: Rate and comment on routes and events, enhancing community engagement.

## Technology Stack

- **[Next.js](https://nextjs.org/)**: The React framework for production.
- **[Prisma](https://www.prisma.io/)**: Next-generation ORM for Node.js and TypeScript.
- **[PostgreSQL](https://www.postgresql.org/)**: Robust and powerful open-source relational database.
- **[Mapbox](https://www.mapbox.com/)**: Location data platform for mobile and web applications.
- **[GitHub Actions](https://github.com/features/actions)**: CI/CD that makes it easy to automate all your software workflows.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- PostgreSQL database
- Mapbox API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/patrigma.git
   cd patrigma
   ```

2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up the environment variables:
    ```env
    DATABASE_URL="your-database-url"
    MAPBOX_KEY="your-mapbox-api-key"
    NEXT_PUBLIC_MAPBOX_KEY="your-public-mapbox-api-key"
    JWT_SECRET="mysecret"
    ```
4. Apply database migrations:  

    Dev environnement : 
    ```bash
    npx prisma migrate dev
    ```

    Prod environnement : 
    ```bash
    npx prisma migrate deploy
    ```

5. Seeding database (optionnal):
    ```bash
    npx prisma db seed
    ```

6. Run the development server:
    ```bash
    npm run dev
    ```
Open http://localhost:3000 with your browser to see the result.

### Deployment
To deploy Patrigma, follow these steps:

1. Build the application for production:
    ```bash
    npm run build
    ```
2. Start the production server:
    ```bash
    npm run start
    ```
