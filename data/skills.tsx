import React from "react";
import { Brain, Cpu, Terminal } from "lucide-react";
import { CoreSkill } from "@/types/portfolio";

export const coreSkills: CoreSkill[] = [
  {
    title: "Generative AI",
    icon: <Brain size={20} />,
    desc: "Developing advanced RAG pipelines, fine-tuning LLMs, and building creative AI applications.",
  },
  {
    title: "Machine Learning",
    icon: <Cpu size={20} />,
    desc: "Building predictive models and intelligent agents using Deep Learning and Reinforcement Learning techniques.",
  },
  {
    title: "Data Science",
    icon: <Terminal size={20} />,
    desc: "Extracting actionable insights from complex datasets through cleaning, visualization, and statistical analysis.",
  },
];

export const softSkills: string[] = [
  "Leadership",
  "Critical Thinking",
  "Problem Solving",
  "Creativity",
  "Communication",
  "Adaptability",
  "Continuous Learning",
  "Time Management",
  "Teamwork",
];
