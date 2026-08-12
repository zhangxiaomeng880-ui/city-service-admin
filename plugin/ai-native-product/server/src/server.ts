import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const stages = [
  "product", "data-kpi", "ab-strategy", "ux", "ui", "figma",
  "coding", "qa", "visual-qa", "release", "data-analysis",
  "ab-analysis", "optimization", "review"
] as const;

type Stage = typeof stages[number];
type CapabilityStatus = "ready" | "optional" | "required-missing" | "error";

type Project = {
  name: string;
  current: number;
  figmaHighFidelity: boolean;
  abEnabled: boolean;
  capabilities: Record<string, CapabilityStatus>;
};

const defaultCapabilities: Record<string, CapabilityStatus> = {
  analytics: "optional",
  experiment: "optional",
  figma: "optional",
  coding: "optional",
  github: "optional",
  browser: "optional"
};

const stageDependencies: Record<Stage, string[]> = {
  product: [],
  "data-kpi": ["analytics"],
  "ab-strategy": ["experiment"],
  ux: [],
  ui: [],
  figma: ["figma"],
  coding: ["coding", "github"],
  qa: ["browser"],
  "visual-qa": ["browser"],
  release: ["github"],
  "data-analysis": ["analytics"],
  "ab-analysis": ["experiment", "analytics"],
  optimization: ["analytics"],
  review: []
};

const projects = new Map<string, Project>();

const server = new McpServer({ name: "ai-native-product", version: "0.1.1" });

function requiredCapabilitiesForProject(project: Project) {
  return stages
    .filter((stage) => stage !== "figma" || project.figmaHighFidelity)
    .filter((stage) => stage !== "ab-analysis" || project.abEnabled)
    .flatMap((stage) => stageDependencies[stage])
    .filter((value, index, values) => values.indexOf(value) === index);
}

function checkCapabilities(project: Project) {
  const required = new Set(requiredCapabilitiesForProject(project));
  return Object.entries(project.capabilities).map(([id, status]) => ({
    id,
    status: required.has(id) && status === "optional" ? "required-missing" : status,
    requiredByProject: required.has(id)
  }));
}

function missingDependencies(project: Project, stage: Stage) {
  return stageDependencies[stage].filter((id) => {
    const status = project.capabilities[id];
    return status !== "ready";
  });
}

function enabledStage(project: Project, stage: Stage) {
  if (stage === "figma" && !project.figmaHighFidelity) return false;
  if (stage === "ab-analysis" && !project.abEnabled) return false;
  return true;
}

server.tool(
  "create_project",
  "Create an AI Native product project and initialize the staged workflow. Runs capability preflight but does not require every tool to be connected.",
  {
    name: z.string(),
    figmaHighFidelity: z.boolean().default(false),
    abEnabled: z.boolean().default(true),
    capabilities: z.record(z.enum(["ready", "optional", "required-missing", "error"])).optional()
  },
  async ({ name, figmaHighFidelity, abEnabled, capabilities }) => {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `project-${Date.now()}`;
    const project: Project = {
      name,
      current: 0,
      figmaHighFidelity,
      abEnabled,
      capabilities: { ...defaultCapabilities, ...(capabilities ?? {}) }
    };
    projects.set(id, project);
    return { content: [{ type: "text", text: JSON.stringify({ id, name, currentStage: stages[0], figmaHighFidelity, abEnabled, capabilityCheck: checkCapabilities(project) }, null, 2) }] };
  }
);

server.tool(
  "check_capabilities",
  "Run or refresh the project capability preflight. Reports tool readiness without blocking unrelated workflow stages.",
  {
    projectId: z.string(),
    capabilities: z.record(z.enum(["ready", "optional", "required-missing", "error"])).optional()
  },
  async ({ projectId, capabilities }) => {
    const project = projects.get(projectId);
    if (!project) return { content: [{ type: "text", text: `Project not found: ${projectId}` }], isError: true };
    if (capabilities) project.capabilities = { ...project.capabilities, ...capabilities };
    return { content: [{ type: "text", text: JSON.stringify({ projectId, capabilityCheck: checkCapabilities(project) }, null, 2) }] };
  }
);

server.tool(
  "get_project_status",
  "Get the current workflow stage, project configuration, and capability readiness.",
  { projectId: z.string() },
  async ({ projectId }) => {
    const project = projects.get(projectId);
    if (!project) return { content: [{ type: "text", text: `Project not found: ${projectId}` }], isError: true };
    return { content: [{ type: "text", text: JSON.stringify({ ...project, currentStage: stages[project.current], progress: `${project.current + 1}/${stages.length}`, capabilityCheck: checkCapabilities(project) }, null, 2) }] };
  }
);

server.tool(
  "confirm_and_continue",
  "Confirm the current stage and move to the next enabled stage. A missing tool blocks only the dependent stage and never the entire project.",
  { projectId: z.string() },
  async ({ projectId }) => {
    const project = projects.get(projectId);
    if (!project) return { content: [{ type: "text", text: `Project not found: ${projectId}` }], isError: true };

    const currentStage = stages[project.current];
    const missing = missingDependencies(project, currentStage);
    if (missing.length > 0) {
      return { content: [{ type: "text", text: JSON.stringify({ blocked: true, stage: currentStage, missingCapabilities: missing, message: "Connect the missing capability to execute this stage. Other independent stages may continue." }, null, 2) }] };
    }

    let next = project.current + 1;
    while (next < stages.length && !enabledStage(project, stages[next])) next++;
    project.current = Math.min(next, stages.length - 1);
    return { content: [{ type: "text", text: JSON.stringify({ confirmed: currentStage, nextStage: stages[project.current], completed: next >= stages.length, capabilityCheck: checkCapabilities(project) }, null, 2) }] };
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
