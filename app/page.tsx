import { Projects } from 'app/components/projects'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Andrew Le is a software engineer and security engineer.
      </h1>
      <p className="mb-4">
        {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
        Vim's keystroke commands and tabs' flexibility for personal viewing
        preferences. This extends to my support for static typing, where its
        early error detection ensures cleaner code, and my preference for dark
        mode, which eases long coding sessions by reducing eye strain.`}
      </p>
      <div className="mb-8">
        <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-3">
          Worked at
        </h2>
        <div className="flex flex-wrap gap-3">
          {/* Company logo bubbles - add your company logos here */}
          <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
            {/* Add company logo image here */}
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Logo</span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Logo</span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Logo</span>
          </div>
        </div>
      </div>
      <div id="work" className="my-8">
        <Projects />
      </div>
    </section>
  )
}
