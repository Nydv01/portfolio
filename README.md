# 🚀 Nitin Yadav — Developer Portfolio

A **premium, animated, production-ready personal portfolio** built with modern frontend tooling, showcasing my projects, skills, certifications, and engineering philosophy.

🌐 **Live Website**: https://nitin-yadav.vercel.app  
📦 **Repository**: https://github.com/Nydv01/portfolio  

---

## ✨ Features

- ⚡ Ultra-smooth animations using **Framer Motion**
- 🎨 Premium glassmorphism & gradient UI
- 🧠 Engineering-focused content (not just visuals)
- 📱 Fully responsive (mobile-first optimized)
- 🧑‍💻 Animated avatar & interactive hero section
- 📈 Skill radar charts & growth curves
- 🏆 Certifications & Credly badges carousel
- 📂 Real-world project showcases
- 📬 Working contact form with **EmailJS**
- 🔁 Auto-reply confirmation emails
- 📅 Calendly meeting booking
- 🌙 Dark mode support
- 🚀 Deployed on **Vercel (Free Tier)**

---

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons
- shadcn/ui

### Integrations
- EmailJS (Contact form + Auto reply)
- Calendly (Call booking)
- Google Drive (Resume hosting)

### Deployment
- Vercel

---

## 📁 Project Structure

portfolio/
├── public/
│ └── favicon.ico
├── src/
│ ├── components/
│ │ ├── Navbar.tsx
│ │ ├── Footer.tsx
│ │ ├── PageTransition.tsx
│ │ ├── SectionHeading.tsx
│ │ ├── CredlyBadgeCarousel.tsx
│ │ └── ui/
│ ├── hooks/
│ │ └── use-mobile.tsx
│ ├── pages/
│ │ ├── Home.tsx
│ │ ├── About.tsx
│ │ ├── Skills.tsx
│ │ ├── Projects.tsx
│ │ ├── Experience.tsx
│ │ ├── Certifications.tsx
│ │ ├── GitHub.tsx
│ │ ├── Resume.tsx
│ │ └── Contact.tsx
│ ├── lib/
│ │ └── utils.ts
│ ├── App.tsx
│ ├── main.tsx
│ └── index.css
├── .gitignore
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md


---

## 🚀 Getting Started Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Nydv01/portfolio.git
cd portfolio

2️⃣ Install Dependencies
npm install

3️⃣ Create Environment Variables

Create a .env file in the root directory:

touch .env


Add the following:

VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_ADMIN_TEMPLATE_ID=your_admin_template_id
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=your_autoreply_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key


⚠️ Do not commit .env to GitHub (already ignored).

4️⃣ Run Development Server
npm run dev


Open:

http://localhost:5173


📬 Contact Form (EmailJS Setup)

Sends email to admin

Sends auto-reply to user

Template variables used:

{{name}}
{{email}}
{{message}}

📦 Build for Production
npm run build


Preview build:

npm run preview

🌍 Deploying on Vercel

Push code to GitHub

Go to https://vercel.com

Import repository

Add environment variables

Deploy

✔️ Free hosting
✔️ CI/CD enabled

🔗 Custom Domain

Free: *.vercel.app

Paid: .dev, .me, .com

Attach domain directly from Vercel dashboard.

📈 Performance & Optimization

Reduced heavy blur & shadows for mobile

Optimized Framer Motion usage

Lazy-loaded animations

Responsive spacing system

🧠 Engineering Philosophy

“I don’t just write code — I build systems.”

Focused on:

Clean architecture

Scalability

Security awareness

Real-world engineering

📜 License

Open for inspiration.
Please do not copy directly.

🤝 Connect With Me

🌐 Portfolio: https://nitin-yadav.vercel.app

💼 LinkedIn: https://linkedin.com/in/ydv-nitin

💻 GitHub: https://github.com/Nydv01

📧 Email: ydv.nitin2401@gmail.com

⭐ Star the repo if you like it!