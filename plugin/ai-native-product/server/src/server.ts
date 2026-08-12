import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const stages = [
  "product", "data-kpi", "ab-strategy", "ux", "ui", "figma",
  "coding", "qa", "visual-qa", "release", "data-analysis",
  "ab-analysis", "optimization", "review"
] as const;

type Stage = typeof stages[number];

const projects = new Map<string, { name: string; current: number; figmaHighFidelity: boolean; abEnabled: boolean }>();

const server = new McpServer({ name: "ai-native-product", version: "0.1.0" });

server.tool(
  "create_project",
  "Create an AI Native product project and initialize the staged workflow.",
  {
    name: z.string(),
    figmaHighFidelity: z.boolean().default(false),
    abEnabled: z.boolean().default(true)
  },
  async ({ name, figmaHighFidelity, abEnabled }) => {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `project-${Date.now()}`;
    projects.set(id, { name, current: 0, figmaHighFidelity, abEnabled });
    return { content: [{ type: "text", text: JSON.stringify({ id, name, currentStage: stages[0], figmaHighFidelity, abEnabled }, null, 2) }] };
  }
);

server.tool(
  "get_project_status",
  "Get the current workflow stage and project configuration.",
  { projectId: z.string() },
  async ({ projectId }) => {
    const project = projects.get(projectId);
    if (!project) return { content: [{ type: "text", text: `Project not found: ${projectId}` }], isError: true };
    return { content: [{ type: "text", text: JSON.stringify({ ...project, currentStage: stages[project.current], progress: `${project.current + 1}/${stages.length}` }, null, 2) }] };
  }
);

server.tool(
  "confirm_and_continue",
  "Confirm the current stage and move to the next enabled stage. Figma is skipped when high-fidelity design is disabled; AB analysis is skipped when AB is disabled.",
  { projectId: z.string() },
  async ({ projectId }) => {
    const project = projects.get(projectId);
    if (!project) return { content: [{ type: "text", text: `Project not found: ${projectId}` }], isError: true };
    let next = project.current + 1;
    while (next < stages.length) {
      if (stages[next] === "figma" && !project.figmaHighFidelity) { next++; continue; }
      if (stages[next] === "ab-analysis" && !project.abEnabled) { next++; continue; }
      break;
    }
    project.current = Math.min(next, stages.length - 1);
    return { content: [{ type: "text", text: JSON.stringify({ confirmed: stages[next - 1] ?? stages[0], nextStage: stages[project.current], completed: next >= stages.length }, null, 2) }] };
  }
);

server.tool(
  "restart_stage",
  "Restart the current workflow stage without advancing.",
  { projectId: z.string() },
  async ({ projectId }) => {
    const project = projects.get(projectId);
    if (!project) return { content: [{ type: "text", text: `Project not found: ${projectId}` }], isError: true };
    return { content: [{ type: "text", text: JSON.stringify({ restarted: stages[project.current] }, null, 2) }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
