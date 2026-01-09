import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="terminal-line mb-4 block"
            href={`/blog/${post.slug}`}
          >
            <div className="terminal-output">
              <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                <span className="text-terminal-text text-xs opacity-70 tabular-nums min-w-[100px]">
                  {formatDate(post.metadata.publishedAt, false)}
                </span>
                <span className="text-terminal-amber tracking-tight hover:text-terminal-cyan transition-colors">
                  {post.metadata.title}
                </span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}
