export const metadata = {
  title: 'About',
  description: 'Learn more about me.',
}

export default function About() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">About</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="mb-4">
          Welcome to my about page. This is a template that you can customize
          with your own information.
        </p>
        <p className="mb-4">
          Add your bio, background, interests, and anything else you'd like to
          share here.
        </p>
      </div>
    </section>
  )
}
