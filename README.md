# Ibrahim Tarek — ASP.NET Developer Portfolio

A responsive, dark-first developer portfolio built with standalone Blazor WebAssembly on .NET 8. It runs as static files on GitHub Pages and uses JSON files for portfolio content, so it needs no database or custom server. The interface includes animated light trails, scroll reveals, a career timeline, interactive project cards, and a reduced-motion mode.

Live portfolio: [ibrahimelmasry.github.io](https://ibrahimelmasry.github.io/)

## Run locally

Install the .NET 8 SDK, then run from this directory:

```powershell
dotnet run --project PortfolioApp.csproj
```

## Update portfolio content

- `profile.json` — name, role, biography, contact details, social links, resume, Formspree endpoint, and optional `bookingUrl` (e.g. your Calendly or Cal.com scheduling link).
- `projects.json` — project descriptions, architecture, images, tags, source and demo links.
- `services.json` — services offered, capabilities, and links to relevant projects.
- `process.json` — step-by-step engineering workflow and approach principles.
- `faqs.json` — common questions and answers about stack, services, and availability.
- `testimonials.json` — approved client testimonials and quotes (section is omitted when empty).
- `experience.json` — experience and education entries, highlights, dates, and technologies.
- `skills.json` — skill categories and names.

### Booking a Call Integration (Appointment Scheduling)

The portfolio includes a dedicated appointment booking route at `/book-a-call`. It connects with modern third-party scheduling providers (**Cal.com** or **Calendly**) without requiring any backend server, calendar credentials, or complex OAuth setup.

#### How to configure your live scheduler:

1. **Create an account with a scheduling provider:**
   - **Cal.com** (Recommended, free): [https://cal.com](https://cal.com)
   - **Calendly** (Free tier): [https://calendly.com](https://calendly.com)
2. **Connect your personal or work calendar:**
   - Connect your Google Calendar or Outlook calendar so the scheduler automatically checks your real-time availability and prevents double-booking.
3. **Create a technical discussion event:**
   - Name: e.g. *Introductory Technical Call* or *ASP.NET Project Discussion*.
   - Duration: e.g. `30 minutes`.
   - Location: Google Meet, Zoom, or Phone.
   - Copy your public event booking link (e.g. `https://cal.com/ibrahimtarek/30min` or `https://calendly.com/ibrahimtarek/30min`).
4. **Update `wwwroot/data/profile.json`:**
   ```json
   "bookingUrl": "https://cal.com/your-username/30min",
   "bookingDuration": "30 minutes",
   "bookingFormat": "Google Meet"
   ```
5. **How it operates:**
   - **When `bookingUrl` is configured:** The `/book-a-call` page embeds the live interactive scheduler allowing visitors to browse dates, pick an open time slot, submit their details, and immediately receive automated calendar invitations and confirmation emails. A prominent direct link to the provider's event page is also included in case the embed does not load.
   - **When `bookingUrl` is empty (`""`):** The `/book-a-call` page honestly displays an *Awaiting Scheduler Event URL* status with clear setup guidance, ensuring no fake appointment confirmations are implied, while keeping direct contact channels (email, phone, WhatsApp) available.
6. **How to test:**
   - Run `dotnet run --project PortfolioApp.csproj` and navigate to `http://localhost:5247/book-a-call`.
   - Confirm that the provider's date and time slots load, choose a test slot, and verify the confirmation email arrives in your inbox.

The contact form submits directly to the configured Formspree endpoint using a standard HTML `POST`. Keep `formspreeEndpoint` set in `profile.json` to enable the form; the contact email and phone links remain available as direct contact options.

WhatsApp is configured with a `wa.me` link in `whatsAppUrl`. Use the full international number without a leading `+`, spaces, or punctuation.

This repository does not include a browser CMS. Make content changes in the JSON files and deploy them through GitHub.

## Deploy to GitHub Pages

1. Push the repository to GitHub with the default branch named `main`.
2. Under **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. For a project site such as `https://OWNER.github.io/REPOSITORY/`, add the repository Actions variable `PAGES_BASE_PATH` with the value `REPOSITORY`. For a user site such as `https://OWNER.github.io/`, leave the variable unset.
4. Push to `main` or run **Actions → Deploy portfolio to GitHub Pages → Run workflow**.

The workflow in `.github/workflows/deploy.yml` publishes the Blazor app and configures the base path and SPA fallback for GitHub Pages.

## Project structure

```text
PortfolioApp/
├── Components/             # Interactive widgets (CommandPalette, CodeOptimizer, ResumeModal, ChatWidget, ProjectScoper, GitHubActivity, ArchitectureDiagram)
├── Models/                 # Profile, Project, Experience, Skill, Service, Process, FAQ models
├── Pages/                  # Home, ProjectDetails, and BookCall pages
├── Services/               # Static JSON content reader
├── Layout/                 # MainLayout (header, section nav, footer)
├── wwwroot/data/           # Editable JSON (profile, projects, services, process, faqs, skills, etc.)
├── wwwroot/css/            # app.css, motion.css, and polish.css
├── wwwroot/js/             # Scroll observer, light trails, and card interactions
├── wwwroot/404.html         # GitHub Pages SPA route fallback
└── .github/workflows/      # GitHub Pages deployment workflow
```


## Colophon and rights

See [COLOPHON.md](COLOPHON.md) for authorship, design, and rights information.
