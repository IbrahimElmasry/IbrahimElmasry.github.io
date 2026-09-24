# Ibrahim Tarek — ASP.NET Developer Portfolio

A responsive, dark-first developer portfolio built with standalone Blazor WebAssembly on .NET 8. It runs as static files on GitHub Pages and uses JSON files for portfolio content, so it needs no database or custom server. The interface includes animated light trails, scroll reveals, a career timeline, interactive project cards, and a reduced-motion mode.

Live portfolio: [ibrahimelmasry.github.io](https://ibrahimelmasry.github.io/)

## Run locally

Install the .NET 8 SDK, then run from this directory:

```powershell
dotnet run --project PortfolioApp.csproj
```

## Update portfolio content

Edit the JSON files in `wwwroot/data/`, then commit and push your changes:

- `profile.json` — name, role, biography, contact details, social links, resume, and Formspree endpoint.
- `projects.json` — project descriptions, architecture, images, tags, source and demo links.
- `experience.json` — experience and education entries, highlights, dates, and technologies.
- `skills.json` — skill categories and names.

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
├── Models/                 # Profile, Project, Experience, and Skill models
├── Pages/                  # Portfolio home and project details
├── Services/               # Static JSON content reads
├── Layout/                 # Shared navigation and footer
├── wwwroot/data/           # Editable portfolio content
├── wwwroot/css/            # Base styles, animation, and visual polish
├── wwwroot/js/             # Scroll and pointer interaction effects
├── wwwroot/404.html         # GitHub Pages SPA route fallback
└── .github/workflows/      # GitHub Pages deployment workflow
```

## Colophon and rights

See [COLOPHON.md](COLOPHON.md) for authorship, design, and rights information.
