# MattieTech Portfolio V1 — Matthew Aliu

Production personal portfolio built by **Matthew Aliu (MattieTech)** — Software Engineering student at Confluence University of Science and Technology (CUSTECH).

Designed and engineered with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, and Lenis smooth scrolling.

---

## Key Features

- **Direct Email Messaging**: Integrated contact form forwarding messages directly to `matthewaliu001@gmail.com` with auto `Reply-To` support for 1-click email replies.
- **WhatsApp Instant Integration**: Instant WhatsApp messaging button and card linked directly to `+234 808 868 6829`.
- **Command Palette (`⌘K` / `Ctrl+K`)**: Accessible keyboard-driven search palette with dimming backdrop and responsive touch dismiss controls.
- **Interactive Terminal Emulator**: In-browser CLI component with interactive commands (`whoami`, `skills`, `education`, `projects`, `contact`, `help`).
- **Dynamic Appearance Theming**: Smooth dark and light mode engine with persistent state and mobile navbar appearance controls.
- **Floating Scroll-to-Top**: Reactive floating action button that appears on scroll to return smoothly to the top of the page.
- **Strict Accessibility & Iconography**: Clean SVG icons with zero unicode emojis, focus rings, and screen-reader accessibility.
- **Universal Mobile Responsiveness**: Tailored layout engine supporting all smartphone form factors (Infinix, iPhone X, iPhone 12/13/14/15 Pro Max, Android) down to 320px width.

---

## Tech Stack

| Domain | Tech |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Library** | React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Smooth Scroll** | Lenis |
| **Icons** | Lucide React & Custom SVG |
| **Email API** | Web3Forms API |

---

## Project Structure

```text
src/
  app/            -> Routes, API handlers (/api/contact), global layout & styles
  components/     -> Modular UI components:
                     Hero, About, Skills, Terminal, Projects, Certificates,
                     Experience (Journey), Services, OpenSource, Testimonials,
                     FollowBuild, FAQ, Contact, Footer, Navbar, CommandPalette,
                     ScrollProgress, ScrollToTop, CursorGlow, ThemeProvider
  lib/            -> Data store (data.ts) containing profile, projects, skills & timeline
public/
  images/         -> Project previews & hero portrait
  resume/         -> Resume PDF document
```

---

## Environment & Local Development

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Setup

1. **Clone & Install Dependencies**:
   ```bash
   git clone https://github.com/MattieTech/portfolio.git
   cd portfolio
   npm install
   ```

2. **Environment Variables (`.env.local`)**:
   ```env
   WEB3FORMS_ACCESS_KEY=a79c8b21-638c-402a-91b5-0234e1bf4676
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) or [http://localhost:5000](http://localhost:5000) in your browser.

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

---

## License & Author

Built with precision by **Matthew Aliu (MattieTech)**  
- Email: [matthewaliu001@gmail.com](mailto:matthewaliu001@gmail.com)  
- WhatsApp: [+234 808 868 6829](https://wa.me/2348088686829)  
- GitHub: [@MattieTech](https://github.com/MattieTech)
