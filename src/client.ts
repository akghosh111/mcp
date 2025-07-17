import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const mcp = new Client({
    name: "text-client-video",
    version: "1.0.0",
},
{
    capabilities: {
        sampling: {}
    }
})

const transport = new StdioClientTransport({
    command: "node",
    args: ["src/server.js"],
    stderr: "ignore",
})


async function main() {
    await mcp.connect(transport);
    const [{ resources }, { tools }, { prompts }, { resourceTemplates }] = await Promise.all([
        mcp.listResources(),
        mcp.listTools(),
        mcp.listPrompts(),
        mcp.listResourceTemplates(),
    ])
    
}


main();

