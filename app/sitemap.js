import { locales } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/siteConfig";

const staticPaths = ["", "/about", "/activities", "/projects", "/join", "/documents", "/contact"];

export default function sitemap() {
  const now = new Date();
  const staticEntries = locales.flatMap((locale) => staticPaths.map((path) => ({
    url: `${siteConfig.siteUrl}/${locale}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/projects" ? 0.9 : 0.7,
  })));

  const projectEntries = locales.flatMap((locale) => projects.map((project) => ({
    url: `${siteConfig.siteUrl}/${locale}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  })));

  return [...staticEntries, ...projectEntries];
}
