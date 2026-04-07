# GreenEnergy Frontend - Vercel Deployment

This is the standalone frontend application for the GreenEnergy Management Platform, ready for deployment to Vercel.

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):

   ```bash
   npm install -g vercel
   ```

2. **Navigate to the frontend folder**:

   ```bash
   cd frontend
   ```

3. **Deploy to Vercel**:

   ```bash
   vercel
   ```

   Follow the prompts:
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N` (first time)
   - Project name: `greenenergy` (or your preferred name)
   - In which directory is your code located: `./`
   - Want to override settings: `N`

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Set the **Root Directory** to `frontend`
5. Vercel will auto-detect the settings from `vercel.json`
6. Click "Deploy"

## 📁 Project Structure

```
frontend/
├── src/                    # Source code
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── context/          # React context (Auth, etc.)
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── dist/                  # Build output (generated)
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS config
├── postcss.config.js     # PostCSS config
├── tsconfig.json         # TypeScript config
└── vercel.json           # Vercel deployment config
```

## 🛠️ Local Development

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

   The app will run at `http://localhost:3000`

3. **Build for production**:

   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## ⚙️ Configuration

### Environment Variables

If your app needs to connect to a backend API, create a `.env` file in the frontend folder:

```env
VITE_API_URL=https://your-backend-api.com
```

Then update your API calls to use:

```typescript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
```

### Vercel Configuration

The `vercel.json` file is already configured for SPA routing:

- All routes are redirected to `index.html` for client-side routing
- Build command: `npm run build`
- Output directory: `dist`

## 🔧 Troubleshooting

### 404 Errors on Page Refresh

If you get 404 errors when refreshing pages, ensure:

1. The `vercel.json` file is present in the frontend folder
2. The routes configuration is correct (already set up)

### Build Failures

If the build fails:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Try building again with `npm run build`

### API Connection Issues

If the frontend can't connect to your backend:

1. Update the API proxy in `vite.config.ts` (for local dev)
2. Set the `VITE_API_URL` environment variable in Vercel dashboard
3. Ensure CORS is properly configured on your backend
4. Verify your Supabase instance is running and accessible

## 📝 Notes

- This frontend is completely standalone and separate from the backend
- The backend remains in the `../backend` folder
- To run both frontend and backend together locally, use `npm run dev` from the root folder
