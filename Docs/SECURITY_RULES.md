# DOLLÉRIA – Backend Security Rules & Best Practices

## 🔐 General Principles
- Never trust client input
- Validate everything
- Least privilege access
- Secure by default

---

## 🔑 Authentication & Authorization
- Use Laravel Sanctum for API tokens
- Protect sensitive routes with auth middleware
- Separate roles (admin / customer / wholesale)
- Rotate tokens if compromised

---

## 🛡 Input Validation
- Always use Form Request validation
- Sanitize user input
- Validate file uploads (type, size, mime)
- Never trust frontend calculations

---

## 🗃 Database Security
- Use Eloquent ORM (avoid raw SQL)
- Use prepared statements
- No sensitive data in plain text
- Hash passwords using bcrypt

---

## 🖼 File & Image Uploads
- Restrict file types (jpg, png, webp)
- Limit file size
- Store files outside public root if possible
- Generate unique filenames

---

## 🚦 API Protection
- Enable rate limiting
- Protect against brute-force attacks
- Use HTTPS only
- Enable CORS properly (only frontend domain)

---

## 🔎 Error Handling
- Never expose stack traces in production
- Use generic error messages
- Log detailed errors server-side only

---

## 🧪 Testing & Maintenance
- Write basic feature tests
- Test authentication flows
- Monitor logs regularly
- Keep dependencies updated

---

## 🚨 Environment Safety
- Never commit `.env`
- Use strong database passwords
- Disable debug mode in production
- Restrict admin routes by IP (optional)

---

## ✅ Minimum Security Checklist
- HTTPS enabled
- CSRF protection active
- Auth middleware applied
- Validation everywhere
- Rate limiting enabled
