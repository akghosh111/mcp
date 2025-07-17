import "dotenv/config"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js"
import select from "@inquirer/select";

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
    args: ["build/server.js"],
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
    
    console.log("You are connected!");

    while (true) {
        const option = await select({
            message: "What would you like to do?",
            choices: ["Query", "Tools", "Resources", "Prompts"]
        })

        switch (option) {
            case "Tools":
                const toolName = await select({
                    message: "What tool would you like to use?",
                    choices: tools.map(tool =>({
                        name: tool.annotations?.title || tool.name,
                        value: tool.name,
                        description: tool.description,
                    })),
                })
                console.log(toolName)
        }
    }
}


main();

