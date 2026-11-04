import React from "react";
import { BarChart3, CheckCircle2, Workflow } from "lucide-react";
import { CoreSkill } from "@/types/portfolio";

export const coreSkills: CoreSkill[] = [
  {
    title: "Data Analytics & Insights",
    icon: <BarChart3 size={20} />,
    desc: "Extracting actionable insights from complex datasets, auditing data integrity, and building visual dashboards using SQL, PostgreSQL, Pandas, and Power BI.",
  },
  {
    title: "Quality Assurance (QA) & Testing",
    icon: <CheckCircle2 size={20} />,
    desc: "Ensuring software reliability through structured technical testing, functional verification, system workflow analysis, and rigorous test case execution.",
  },
  {
    title: "Workflow & Test Automation",
    icon: <Workflow size={20} />,
    desc: "Designing automated scripts, ETL data pipelines, and intelligent agent workflows using Python, Selenium/PyTest, and CI/CD tools to accelerate delivery.",
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
