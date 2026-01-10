export function ContactSection() {
  return (
    <div id="contact" className="w-full flex justify-center mt-12 mb-16">
      <div className="border border-terminal-border rounded p-6 bg-[#2d2d2d] max-w-2xl w-full mx-4">
        <h2 className="text-terminal-amber text-xl font-semibold mb-4">
          Let's Connect
        </h2>
        <p className="text-terminal-text mb-6 leading-relaxed">
          Interested in collaborating or have a question? Feel free to reach out!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:letriandrew@gmail.com"
            className="inline-block px-6 py-3 border border-terminal-blue text-terminal-blue font-medium rounded hover:bg-terminal-blue hover:text-white transition-colors text-center"
          >
            Send Email
          </a>
          <a
            href="https://www.linkedin.com/in/letriandrew/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-terminal-blue text-terminal-blue font-medium rounded hover:bg-terminal-blue hover:text-white transition-colors text-center"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/letriandrew"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-terminal-blue text-terminal-blue font-medium rounded hover:bg-terminal-blue hover:text-white transition-colors text-center"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
