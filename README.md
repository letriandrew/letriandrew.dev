# letriandrew's Portfolio

A personal portfolio website featuring an interactive terminal interface. Built with Next.js, TypeScript, and Tailwind CSS, this site presents my experience, education, projects, and blog posts through a terminal-themed UI.

## Features

- **Interactive Terminal Interface**: Type commands like `cat`, `ls`, `pwd`, `help`, and `clear` to navigate and explore content
- **Tab Completion**: Auto-complete commands and filenames using the Tab key
- **Experience & Education**: Display work experience and educational background with skills badges
- **Projects Portfolio**: Showcase projects with descriptions, dates, and technology stacks
- **Blog Posts**: MDX-powered blog with syntax highlighting
- **Resume Download**: Direct link to downloadable PDF resume
- **Contact Section**: Email, GitHub, LinkedIn, and X (Twitter) links with clipboard copy functionality
- **SEO Optimized**: Sitemap, robots.txt, RSS feed, and dynamic OG images
- **Responsive Design**: Terminal-themed UI that works across all devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Content**: MDX for blog posts and projects
- **Syntax Highlighting**: sugar-high
- **Analytics**: Vercel Analytics & Speed Insights
- **Deployment**: Vercel

## Available Terminal Commands

- `cat about.txt` - Display about section
- `cat education.txt` - Display education information
- `cat experience.txt` - Display work experience
- `cat projects.txt` - Display project portfolio
- `ls` - List available files
- `pwd` - Show current working directory
- `help` - Display all available commands
- `clear` - Clear terminal output (keeps history)

## Project Structure

```
app/
├── components/          # React components
│   ├── experience-list.tsx
│   ├── projects.tsx
│   ├── interactive-terminal.tsx
│   ├── figlet-banner.tsx
│   └── ...
├── data/               # Static data
│   └── experience.ts   # Experience and education data
├── work/               # Project pages
│   └── projects/       # MDX project files
├── blog/               # Blog pages
│   └── posts/          # MDX blog post files
└── ...
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blog
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Deployment

Deploy easily to [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

## Customization

- **Experience Data**: Edit `app/data/experience.ts` to update work experience and education
- **Projects**: Add MDX files to `app/work/projects/` with frontmatter metadata
- **Blog Posts**: Add MDX files to `app/blog/posts/`
- **Styling**: Modify `app/global.css` for terminal theme colors and styles
- **Terminal Commands**: Extend `app/components/interactive-terminal.tsx` to add new commands

## License

Private - Personal portfolio website

---

Made by Andrew Le © 2026
