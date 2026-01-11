export function Skills() {
  const skills = {
    'Languages': ['Python', 'Bash', 'Dart'],
    'Frameworks & Tools': ['Flutter', 'Selenium', 'Appium', 'Squish'],
    'DevOps & CI/CD': ['Docker', 'GitLab CI', 'YAML'],
    'Systems & Infrastructure': ['Linux', 'SSH', 'Network Programming'],
    'Design': ['Figma'],
    'Other': ['REST APIs', 'Jira', 'SOLID Principles'],
  }

  return (
    <div className="space-y-4">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category}>
          <div className="text-terminal-amber text-sm font-medium mb-2">{category}</div>
          <div className="flex flex-wrap gap-2">
            {items.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-[#2d2d2d] border border-terminal-border rounded text-terminal-text text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
