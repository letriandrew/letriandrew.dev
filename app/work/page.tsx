import { Projects } from 'app/components/projects'

export const metadata = {
  title: 'Work',
  description: 'My projects and work.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Work</h1>
      <div className="my-8">
        <Projects />
      </div>
    </section>
  )
}
