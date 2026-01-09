import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { getProjects } from 'app/work/utils'
import { formatDate } from 'app/work/date-utils'
import { baseUrl } from 'app/sitemap'
import Link from 'next/link'

export async function generateStaticParams() {
  let projects = getProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export function generateMetadata({ params }) {
  let project = getProjects().find((project) => project.slug === params.slug)
  if (!project) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = project.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/work/${project.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Project({ params }) {
  let project = getProjects().find((project) => project.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <section className="terminal-section">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Project',
            name: project.metadata.title,
            datePublished: project.metadata.publishedAt,
            description: project.metadata.summary,
            image: project.metadata.image
              ? `${baseUrl}${project.metadata.image}`
              : `/og?title=${encodeURIComponent(project.metadata.title)}`,
            url: `${baseUrl}/work/${project.slug}`,
          }),
        }}
      />
      <div className="terminal-line mb-6">
        <span className="terminal-prompt text-terminal-blue">$</span>
        <span className="terminal-text text-terminal-text ml-2">cat projects/{project.slug}.mdx</span>
      </div>
      <div className="terminal-output">
        <h1 className="title font-semibold text-2xl tracking-tighter text-terminal-amber mb-4">
          {project.metadata.title}
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
          <p className="text-sm text-terminal-text opacity-70">
            {formatDate(project.metadata.publishedAt)}
          </p>
          <div className="flex gap-4">
            {project.metadata.githubUrl && (
              <a
                href={project.metadata.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-text hover:text-terminal-blue transition-colors"
              >
                GitHub →
              </a>
            )}
            {project.metadata.liveUrl && (
              <a
                href={project.metadata.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-terminal-text hover:text-terminal-blue transition-colors"
              >
                Live Demo →
              </a>
            )}
          </div>
        </div>
        <article className="prose prose-invert">
          <CustomMDX source={project.content} />
        </article>
      </div>
      <div className="terminal-line mt-8">
        <span className="terminal-prompt text-terminal-blue">$</span>
        <span className="terminal-cursor ml-2"></span>
      </div>
    </section>
  )
}
