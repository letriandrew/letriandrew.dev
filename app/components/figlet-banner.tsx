export function FigletBanner() {
  return (
    <div className="terminal-figlet mb-8">
      <pre className="terminal-figlet-text text-terminal-text font-mono text-xs leading-tight whitespace-pre">
{` .d888888                 dP                              dP                 
d8'    88                 88                              88                 
88aaaaa88a 88d888b. .d888b88 88d888b. .d8888b. dP  dP  dP 88        .d8888b. 
88     88  88'  \`88 88'  \`88 88'  \`88 88ooood8 88  88  88 88        88ooood8 
88     88  88    88 88.  .88 88       88.  ... 88.88b.88' 88        88.  ... 
88     88  dP    dP \`88888P8 dP       \`88888P' 8888P Y8P  88888888P \`88888P' 
ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo`}
      </pre>
      <p className="text-terminal-text text-sm mt-2 ml-1">
        Welcome to my personal portfolio website! (Version 1.0.0)
      </p>
    </div>
  )
}
