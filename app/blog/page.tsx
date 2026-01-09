import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <section className="terminal-section">
      <div className="terminal-line mb-6">
        <span className="terminal-prompt text-terminal-cyan">$</span>
        <span className="terminal-text text-terminal-text ml-2">cd blog/</span>
      </div>
      <div className="terminal-line mb-2">
        <span className="terminal-prompt text-terminal-cyan">$</span>
        <span className="terminal-text text-terminal-text ml-2">ls -la posts/</span>
      </div>
      <div className="terminal-output">
        <BlogPosts />
      </div>
      <div className="terminal-line mt-8">
        <span className="terminal-prompt text-terminal-cyan">$</span>
        <span className="terminal-cursor ml-2"></span>
      </div>
    </section>
  )
}
