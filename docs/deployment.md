# 🚀 Deployment Guide for Polaris

Deploying Polaris is straightforward! This guide will help you launch your own instance of the Polaris AI-powered code editor.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Deploy (Vercel)](#quick-deploy-vercel)
- [Manual Deployment](#manual-deployment)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Third-Party Services](#third-party-services)
- [Build Configuration](#build-configuration)
- [Post-Deployment](#post-deployment)
- [Alternative Platforms](#alternative-platforms)
- [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before deploying, ensure you have:

### Required Accounts

- [ ] **GitHub Account** - For repository access and OAuth
- [ ] **Vercel Account** - For hosting (or alternative platform)
- [ ] **Database Provider** - Convex (recommended), Neon, Supabase, or PlanetScale
- [ ] **Clerk Account** - For authentication
- [ ] **Anthropic Account** - For Claude AI API (or any other AI provider)

### Optional Services

- [ ] **Sentry Account** - For error tracking
- [ ] **Firecrawl Account** - For web scraping features
- [ ] **Inngest/Trigger.dev** - For background jobs

---

## ⚡ Quick Deploy (Vercel)

The fastest way to deploy Polaris:

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/itzzjustmateo/polris)

1. Click the "Deploy with Vercel" button above
2. Sign in to Vercel with GitHub
3. Clone the repository to your account
4. Configure environment variables (see below)
5. Click "Deploy"

### Manual Vercel Deployment

```bash
# Install Vercel CLI
bun i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🔧 Manual Deployment

### Step 1: Clone the Repository

```bash
git clone https://github.com/itzzjustmateo/polris.git
cd polris
```

### Step 2: Install Dependencies

```bash
# Using Bun (recommended)
bun install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Fill in all required variables (see [Environment Variables](#environment-variables) section)

### Step 4: Build the Application

```bash
# Build for production
bun run build
```

### Step 5: Start the Production Server

```bash
# Start the server
bun start
```

Your app will be available at `http://localhost:3000`

---

## 🗄️ Database Setup

Polaris supports multiple database providers. Choose one:

### Option 1: Neon (Recommended)

1. **Create a Neon account** at [neon.tech](https://neon.tech)
2. **Create a new project**
3. **Copy the connection string**:
   ```
   postgres://user:password@host.neon.tech/dbname?sslmode=require
   ```
4. **Add to `.env.local`**:
   ```env
   DATABASE_URL="your-neon-connection-string"
   ```

### Option 2: Supabase

1. **Create a Supabase account** at [supabase.com](https://supabase.com)
2. **Create a new project**
3. **Go to Settings → Database**
4. **Copy the connection string** (use "Connection pooling" for production)
5. **Add to `.env.local`**:
   ```env
   DATABASE_URL="your-supabase-connection-string"
   ```

### Option 3: PlanetScale

1. **Create a PlanetScale account** at [planetscale.com](https://planetscale.com)
2. **Create a new database**
3. **Create a branch** (main)
4. **Get connection string** from "Connect"
5. **Add to `.env.local`**:
   ```env
   DATABASE_URL="your-planetscale-connection-string"
   ```

### Running Migrations

After setting up your database:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed the database
npx prisma db seed
```

### Database Schema

View your database schema:

```bash
npx prisma studio
```

This opens a visual database browser at `http://localhost:5555`

---

## 🔐 Environment Variables

### Complete Environment Variables List

Create a `.env.local` file with the following variables:

```env
# ============================================
# REQUIRED VARIABLES
# ============================================

# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# Anthropic Claude AI
ANTHROPIC_API_KEY="sk-ant-..."

# Application
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
NODE_ENV="production"

# ============================================
# OPTIONAL VARIABLES
# ============================================

# GitHub OAuth (for repository integration)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Error Tracking (Sentry)
NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."
SENTRY_AUTH_TOKEN="your-sentry-auth-token"

# Background Jobs (Inngest)
INNGEST_EVENT_KEY="your-inngest-event-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"

# Firecrawl (Web Scraping)
FIRECRAWL_API_KEY="fc-..."

# Analytics (Optional)
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# Feature Flags
NEXT_PUBLIC_ENABLE_AI_FEATURES="true"
NEXT_PUBLIC_ENABLE_COLLABORATION="false"
```

### How to Obtain Each Variable

#### Database URL
- See [Database Setup](#database-setup) section

#### Clerk Authentication
1. Go to [clerk.com](https://clerk.com)
2. Create a new application
3. Copy the API keys from the dashboard
4. Configure sign-in/sign-up URLs

#### Anthropic API Key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account
3. Go to API Keys
4. Create a new API key

#### GitHub OAuth
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `https://your-domain.com/api/auth/callback/github`
4. Copy Client ID and generate Client Secret

#### Sentry (Error Tracking)
1. Go to [sentry.io](https://sentry.io)
2. Create a new project (Next.js)
3. Copy the DSN from project settings
4. Generate an auth token for source maps

### Security Best Practices

- ✅ Never commit `.env.local` to Git
- ✅ Use different keys for development and production
- ✅ Rotate API keys regularly
- ✅ Use environment-specific variables
- ✅ Limit API key permissions to minimum required

---

## 🔌 Third-Party Services

### Clerk Authentication Setup

1. **Create Application**:
   - Go to [clerk.com/dashboard](https://clerk.com/dashboard)
   - Click "Add application"
   - Choose "Next.js"

2. **Configure Sign-In Methods**:
   - Enable Email/Password
   - Enable GitHub OAuth (optional)
   - Enable Google OAuth (optional)

3. **Customize Appearance**:
   - Match your brand colors
   - Upload logo
   - Set dark mode theme

4. **Set Redirect URLs**:
   ```
   Sign-in URL: /sign-in
   Sign-up URL: /sign-up
   After sign-in: /dashboard
   After sign-up: /dashboard
   ```

### Claude API Configuration

1. **Get API Key**:
   - Sign up at [console.anthropic.com](https://console.anthropic.com)
   - Navigate to API Keys
   - Create new key

2. **Set Usage Limits** (recommended):
   - Set monthly spending limit
   - Enable usage alerts
   - Monitor usage in dashboard

3. **Choose Model**:
   - `claude-3-5-sonnet-20241022` (recommended for code)
   - `claude-3-opus-20240229` (most capable)
   - `claude-3-haiku-20240307` (fastest, cheapest)

### GitHub OAuth Setup

1. **Register OAuth App**:
   - Go to GitHub Settings → Developer settings
   - Click "New OAuth App"
   - Fill in details:
     ```
     Application name: Polaris
     Homepage URL: https://your-domain.com
     Authorization callback URL: https://your-domain.com/api/auth/callback/github
     ```

2. **Configure in Clerk**:
   - Go to Clerk Dashboard → Social Connections
   - Enable GitHub
   - Add Client ID and Secret

### Error Tracking (Sentry) Setup

1. **Create Project**:
   - Go to [sentry.io](https://sentry.io)
   - Create new project (Next.js)
   - Copy DSN

2. **Configure Source Maps**:
   ```bash
   # Install Sentry CLI
   npm install -g @sentry/cli
   
   # Login
   sentry-cli login
   
   # Upload source maps (automatic with Next.js plugin)
   ```

3. **Set Up Alerts**:
   - Configure email/Slack notifications
   - Set error thresholds
   - Create custom alerts

---

## ⚙️ Build Configuration

### Next.js Configuration

The `next.config.ts` file includes:

```typescript
import { withSentryConfig } from '@sentry/nextjs';

const config = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: ['panel.devflare.de'],
  },
  
  // Experimental features
  experimental: {
    serverActions: true,
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
};

export default withSentryConfig(config);
```

### Optimization Tips

1. **Enable Compression**:
   - Vercel automatically enables gzip/brotli
   - For self-hosted, use nginx compression

2. **Image Optimization**:
   - Use Next.js Image component
   - Configure image domains
   - Use WebP format

3. **Code Splitting**:
   - Use dynamic imports for large components
   - Lazy load routes
   - Split vendor bundles

4. **Caching**:
   - Configure CDN caching headers
   - Use ISR for static pages
   - Implement API response caching

### Performance Considerations

```typescript
// Example: Dynamic imports for code splitting
const CodeEditor = dynamic(() => import('@/components/CodeEditor'), {
  loading: () => <EditorSkeleton />,
  ssr: false,
});

// Example: Lazy loading heavy dependencies
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

---

## 🎉 Post-Deployment

### Health Checks

After deployment, verify:

1. **Application Loads**:
   - Visit your domain
   - Check homepage renders correctly
   - Verify no console errors

2. **Authentication Works**:
   - Test sign-up flow
   - Test sign-in flow
   - Verify user session persists

3. **Database Connection**:
   - Check database queries work
   - Verify data persistence
   - Test CRUD operations

4. **AI Features**:
   - Test code completions
   - Verify AI chat works
   - Check API rate limits

### Monitoring Setup

1. **Vercel Analytics**:
   - Enable in Vercel dashboard
   - Monitor performance metrics
   - Track Core Web Vitals

2. **Sentry Monitoring**:
   - Verify error tracking works
   - Set up performance monitoring
   - Configure release tracking

3. **Database Monitoring**:
   - Check connection pool usage
   - Monitor query performance
   - Set up alerts for slow queries

### Domain Configuration

1. **Add Custom Domain** (Vercel):
   ```bash
   vercel domains add your-domain.com
   ```

2. **Configure DNS**:
   - Add A record or CNAME
   - Wait for DNS propagation
   - Verify SSL certificate

3. **Update Environment Variables**:
   ```env
   NEXT_PUBLIC_APP_URL="https://your-domain.com"
   ```

### SSL/HTTPS

- Vercel automatically provides SSL certificates
- For custom domains, SSL is auto-configured
- Force HTTPS redirects are enabled by default

---

## 🌐 Alternative Platforms

### Railway Deployment

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

**Configuration**:
- Add environment variables in Railway dashboard
- Connect database (Railway provides PostgreSQL)
- Set custom domain

### Netlify Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**Configuration**:
- Add `netlify.toml`:
  ```toml
  [build]
    command = "npm run build"
    publish = ".next"
  
  [[plugins]]
    package = "@netlify/plugin-nextjs"
  ```

### Self-Hosted (Docker)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb ./
RUN npm install

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

**Deploy with Docker**:

```bash
# Build image
docker build -t polaris .

# Run container
docker run -p 3000:3000 --env-file .env.local polaris
```

### DigitalOcean App Platform

1. Connect GitHub repository
2. Configure build settings:
   - Build Command: `npm run build`
   - Run Command: `npm start`
3. Add environment variables
4. Deploy

---

## 🔧 Troubleshooting

### Common Issues

#### Build Failures

**Issue**: Build fails with TypeScript errors
```bash
# Solution: Check types
npm run type-check

# Fix type errors or use
npm run build -- --no-lint
```

**Issue**: Out of memory during build
```bash
# Solution: Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

#### Database Connection Issues

**Issue**: Cannot connect to database
```bash
# Check connection string format
# Ensure SSL mode is set for production
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
```

**Issue**: Migration fails
```bash
# Reset database (CAUTION: deletes data)
npx prisma migrate reset

# Or create new migration
npx prisma migrate dev --name fix-schema
```

#### Authentication Issues

**Issue**: Clerk redirects not working
- Verify redirect URLs in Clerk dashboard
- Check environment variables are set
- Ensure URLs match exactly (no trailing slashes)

**Issue**: GitHub OAuth fails
- Verify callback URL in GitHub OAuth app
- Check client ID and secret are correct
- Ensure Clerk GitHub connection is enabled

#### Performance Issues

**Issue**: Slow page loads
- Enable caching headers
- Optimize images
- Use CDN for static assets
- Implement code splitting

**Issue**: High API costs
- Implement request caching
- Add rate limiting
- Use cheaper AI models for simple tasks
- Monitor usage in Anthropic dashboard

### Getting Help

If you encounter issues:

1. **Check Logs**:
   - Vercel: Function logs in dashboard
   - Railway: `railway logs`
   - Self-hosted: Check server logs

2. **Verify Environment Variables**:
   ```bash
   # List all env vars (be careful not to expose secrets)
   vercel env ls
   ```

3. **Test Locally**:
   ```bash
   # Run production build locally
   npm run build
   npm start
   ```

4. **Open an Issue**:
   - Visit [GitHub Issues](https://github.com/itzzjustmateo/polris/issues)
   - Provide error logs
   - Include environment details

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Clerk Documentation](https://clerk.com/docs)
- [Anthropic API Docs](https://docs.anthropic.com)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

---

## 🎯 Next Steps

After successful deployment:

1. ✅ Set up monitoring and alerts
2. ✅ Configure custom domain
3. ✅ Enable analytics
4. ✅ Set up CI/CD pipeline
5. ✅ Create backup strategy
6. ✅ Document your deployment process
7. ✅ Share with users! 🚀

---

**Need help?** Open an issue or discussion on [GitHub](https://github.com/itzzjustmateo/polris).

Happy deploying! 🎉
