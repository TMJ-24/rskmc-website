# RSKMC Website

Official website for RSKMC (Restored Saints Kingdom Ministries Church), built with Next.js 15 (App Router) and AWS Amplify Gen 2.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Backend**: AWS Amplify Gen 2
- **Authentication**: Amazon Cognito via `@aws-amplify/ui-react`
- **Database**: Amazon DynamoDB
- **Styling**: Tailwind CSS + AWS Amplify UI design system
- **Language**: TypeScript

## Features

- Public-facing church website with ministry and leadership information
- Admin dashboard (protected by Cognito) for managing:
  - Ministries
  - Leaders & staff
  - Service times
  - Sermons & messages
  - Gallery
  - Announcements & news
  - Quotes, testimonials, and more
- Responsive design with mobile navigation

## Getting Started

### Prerequisites

- Node.js 18+
- AWS account with Amplify configured
- Amplify CLI or Amplify Gen 2 sandbox

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run the Amplify sandbox (backend)

```bash
npx ampx sandbox
```

## Deployment

Deployed via AWS Amplify Hosting with continuous deployment from the `main` branch. Push to `main` to trigger a build.

For more on deploying Next.js apps with Amplify Gen 2, see the [Amplify docs](https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/#deploy-a-fullstack-app-to-aws).

## Project Structure

```
app/
  (public)/       # Public-facing pages
  admin/          # Admin dashboard (auth-protected)
amplify/          # Amplify Gen 2 backend definition
components/       # Shared UI components
public/           # Static assets
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the MIT-0 License. See the LICENSE file.
