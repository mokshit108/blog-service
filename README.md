# Service Manager

A modern React application for managing and displaying services and blog content, with optional integration to a WordPress backend.

---

## Project Architecture

- **Frontend:** React (Create React App), Tailwind CSS, React Router
- **Backend (optional):** WordPress REST API (must be publicly accessible with HTTPS for production)
- **Data:**
  - Uses local JSON files for services/blogs by default
  - Can fetch live data from a WordPress backend if configured

---

## Run Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Mode
```bash
npm start
```
- Runs the app at [http://localhost:3000](http://localhost:3000)
- Uses local JSON data or your local WordPress API (see `src/config.js`)

### 3. Production Build
```bash
npm run build
```
- Builds the app for deployment (output in `/build`)

### 4. Deploying
- Deploy the `/build` folder to Netlify, Vercel, or any static hosting provider.
- **If using WordPress API:** Your WordPress backend must be publicly accessible over HTTPS (see below).

---

## WordPress Backend Requirements

- To use live WordPress data in production, your WordPress site **must**:
  - Be deployed to a public domain (not `.local` or `localhost`)
  - Have a valid SSL certificate (HTTPS)
  - Expose the REST API at `https://your-domain.com/wp-json/wp/v2/`
- Update `src/config.js`:
  ```js
  export const CONFIG = {
    USE_WORDPRESS: true,
    WORDPRESS_URL: 'https://your-domain.com',
    API_BASE: 'https://your-domain.com/wp-json/wp/v2'
  };
  ```
- If you do **not** have a public WordPress server, set `USE_WORDPRESS: false` to use local JSON data.

---

## Security Headers (Recommended for Production)

If deploying to Netlify, add a `_headers` file in your `public/` folder:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; img-src * data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

- Adjust the `Content-Security-Policy` as needed for your use case.

---

## reCAPTCHA Notes

- If you plan to use Google reCAPTCHA for forms:
  - Register your site at [Google reCAPTCHA](https://www.google.com/recaptcha/about/)
  - Add your site key and secret to your environment/config
  - Integrate the reCAPTCHA widget in your forms (see [docs](https://developers.google.com/recaptcha/docs/v3))
- **Note:** This project does not include reCAPTCHA by default, but is ready for integration.

---

## Troubleshooting

- **Build fails on Netlify:** Ensure all warnings are fixed (CI treats warnings as errors).
- **Mixed Content errors:** Your WordPress API must be HTTPS and public.
- **API not reachable:** Check your domain, DNS, and SSL certificate.

---

## License
MIT
