import React from "react";
import { BarChart3, CheckCircle2, Workflow } from "lucide-react";
import { CoreSkill } from "@/types/portfolio";

export const coreSkills: CoreSkill[] = [
  {
    title: "Data Analytics & Insights",
    icon: <BarChart3 size={20} />,
    desc: "Extracting actionable insights from relational databases, auditing data integrity, and creating reporting dashboards using SQL, PostgreSQL, Pandas, and Power BI.",
    badge: "Core Skill",
  },
  {
    title: "Quality Assurance (QA) & Testing",
    icon: <CheckCircle2 size={20} />,
    desc: "Actively exploring and interested in structured testing methodologies, test case design, system workflow analysis, and software reliability for OJT.",
    badge: "Interest / Learning",
  },
  {
    title: "Workflow & Test Automation",
    icon: <Workflow size={20} />,
    desc: "Enthusiastic about learning test automation frameworks (Selenium/PyTest), CI/CD pipelines, and automated scripting to eliminate repetitive tasks.",
    badge: "Interest / Learning",
  },
];

export const softSkills: string[] = [
  "Attention to Detail",
  "System Workflow Analysis",
  "Root Cause Analysis",
  "Agile & Scrum",
  "Critical Thinking",
  "Problem Solving",
  "Communication",
  "Continuous Learning",
  "Time Management",
  "Teamwork",
];
