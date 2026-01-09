# Content Management Guide

This guide explains how to easily add and manage content on your terminal-themed portfolio site.

## Adding Projects

Projects are managed through MDX files in the `app/work/projects/` directory.

### Steps:
1. Create a new `.mdx` file in `app/work/projects/`
2. Add frontmatter with metadata:
   ```mdx
   ---
   title: "Project Name"
   publishedAt: "2024-01-01"
   summary: "Brief description of the project"
   githubUrl: "https://github.com/username/repo" # Optional
   liveUrl: "https://project-demo.com" # Optional
   image: "/path/to/image.png" # Optional
   ---

   Your project content here in markdown...
   ```
3. The project will automatically appear on the site!

### Example:
Create `app/work/projects/my-project.mdx`:
```mdx
---
title: "My Awesome Project"
publishedAt: "2024-01-15"
summary: "A full-stack application built with Next.js and TypeScript"
githubUrl: "https://github.com/username/my-project"
liveUrl: "https://my-project.vercel.app"
---

## Overview

This project does amazing things...

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
```

## Adding Experience

Experience is managed through a simple TypeScript file for easy editing.

### Steps:
1. Open `app/data/experience.ts`
2. Add a new object to the `experience` array:
   ```typescript
   {
     company: 'Company Name',
     role: 'Your Role',
     period: '2020 - 2023',
     description: 'What you did there',
     logo: '/path/to/logo.png' // Optional - path to logo image
   }
   ```
3. Save the file - it will automatically appear on the site!

### Example:
```typescript
export const experience: Experience[] = [
  {
    company: 'Tech Corp',
    role: 'Senior Software Engineer',
    period: '2021 - Present',
    description: 'Led backend development, improved API performance by 40%',
    logo: '/logos/tech-corp.png'
  },
  // Add more experiences here...
]
```

## Adding Education

Education follows the same pattern as experience:

1. Open `app/data/experience.ts`
2. Add objects to the `education` array:
   ```typescript
   {
     company: 'University Name',
     role: 'Bachelor of Science in Computer Science',
     period: '2016 - 2020',
     description: 'Relevant coursework or achievements'
   }
   ```

## Adding Blog Posts

Blog posts are managed through MDX files in `app/blog/posts/`.

### Steps:
1. Create a new `.mdx` file in `app/blog/posts/`
2. Add frontmatter:
   ```mdx
   ---
   title: "Blog Post Title"
   publishedAt: "2024-01-01"
   summary: "Brief summary of the post"
   ---

   Your blog post content here...
   ```
3. The post will automatically appear on the blog page!

## Styling

The site uses a terminal theme with these color classes:
- `text-terminal-blue` - Blue text (headings, links)
- `text-terminal-cyan` - Cyan text (links, accents)
- `text-terminal-green` - Green text (prompts, success)
- `text-terminal-amber` - Amber text (titles, highlights)
- `text-terminal-text` - Default terminal text color
- `text-terminal-red` - Red text (errors)

All content automatically uses terminal styling - just add your content and it will look great!
