export function FigletBanner() {
  return (
    <div className="terminal-figlet mb-8">
      <div className="flex flex-row items-center gap-6 md:gap-8">
        <div className="flex-1 min-w-0">
          <pre className="terminal-figlet-text text-terminal-blue font-mono text-xs leading-tight whitespace-pre overflow-x-auto">
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
        <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-2xl bg-[#2d2d2d] border border-terminal-border flex items-center justify-center overflow-hidden flex-shrink-0">
          {/* Replace this div with your image when ready:
              <img src="/your-photo.jpg" alt="Andrew Le" className="w-full h-full object-cover rounded-2xl" />
          */}
          <span className="text-terminal-text text-xs opacity-50">Photo</span>
        </div>
      </div>
    </div>
  )
}
