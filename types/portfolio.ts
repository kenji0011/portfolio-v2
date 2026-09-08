import React from "react";

export type Project = {
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  icon: React.ReactNode;
  image: string | null;
  gallery?: string[];
  github: string;
  live: string;
  date?: string;
  techIcons?: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  icon: React.ReactNode;
  year: string;
  description: string;
  image: string | null;
  credential: string;
  category: "Certification" | "Badge";
};

export type TechItem = {
  name: string;
  icon: string;
};

export type TechRow = {
  id: string;
  dir: number;
  speed: number;
  items: TechItem[];
};

export type CoreSkill = {
  title: string;
  icon: React.ReactNode;
  desc: string;
};

export type NavLink = {
  name: string;
  href: string;
};
