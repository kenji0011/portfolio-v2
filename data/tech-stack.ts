import { TechRow } from "@/types/portfolio";

export const techStackRows: TechRow[] = [
  {
    id: "row1",
    dir: -1,
    speed: 32,
    items: [
      { name: "Python", icon: "python" },
      { name: "Java", icon: "java" },
      { name: "C#", icon: "csharp" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "SQL", icon: "mysql" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind", icon: "tailwindcss" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Flutter", icon: "flutter" },
    ],
  },
  {
    id: "row2",
    dir: 1,
    speed: 36,
    items: [
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "NumPy", icon: "numpy" },
      { name: "Pandas", icon: "pandas" },
      { name: "Docker", icon: "docker" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "VS Code", icon: "vscode" },
      { name: "Linux", icon: "linux" },
      { name: "Firebase", icon: "firebase" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Figma", icon: "figma" },
      { name: "Kaggle", icon: "kaggle" },
    ],
  },
];
