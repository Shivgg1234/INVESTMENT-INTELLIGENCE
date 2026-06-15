import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load local environment files (.env.local) and assign them to Node's process.env
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "vercel-serverless-emulator",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            // Intercept all requests targeting /api/*
            if (req.url && req.url.startsWith("/api/")) {
              const url = new URL(req.url, `http://${req.headers.host}`);
              const apiName = url.pathname.replace(/^\/api\//, "");
              const apiPath = path.resolve(process.cwd(), "api", `${apiName}.js`);

              if (fs.existsSync(apiPath)) {
                try {
                  // Buffer body chunks for POST data mapping
                  let body = {};
                  if (req.method === "POST") {
                    const buffers = [];
                    for await (const chunk of req) {
                      buffers.push(chunk);
                    }
                    const data = Buffer.concat(buffers).toString();
                    if (data) {
                      body = JSON.parse(data);
                    }
                  }

                  // Mock the Node Express Request signature for serverless functions
                  const mockReq = {
                    method: req.method,
                    url: req.url,
                    headers: req.headers,
                    body,
                    query: Object.fromEntries(url.searchParams.entries()),
                  };

                  // Mock the response controls
                  const mockRes = {
                    statusCode: 200,
                    headers: {},
                    setHeader(name, value) {
                      this.headers[name] = value;
                      return this;
                    },
                    status(code) {
                      this.statusCode = code;
                      return this;
                    },
                    json(data) {
                      res.writeHead(this.statusCode, {
                        "Content-Type": "application/json",
                        ...this.headers,
                      });
                      res.end(JSON.stringify(data));
                    },
                    send(data) {
                      res.writeHead(this.statusCode, this.headers);
                      res.end(data);
                    },
                  };

                  // Dynamic import of the serverless script with cache-busting
                  const module = await import(`file://${apiPath}?t=${Date.now()}`);
                  await module.default(mockReq, mockRes);
                  return;
                } catch (err) {
                  console.error(`Emulator error running API ${apiName}:`, err);
                  res.writeHead(500, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ 
                    success: false, 
                    reply: "I’m unable to fully resolve this issue. Please contact support at rg39405057@gmail.com." 
                  }));
                  return;
                }
              }
            }
            next();
          });
        },
      },
    ],
  };
});