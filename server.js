const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const root = __dirname;
const geminiApiKey = process.env.GEMINI_API_KEY || "";
const geminiModel = process.env.GEMINI_MODEL || "gemini-2.0-flash";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/assistant") {
    await handleAssistantRequest(req, res);
    return;
  }

  const requestPath = req.url === "/" ? "/index.html" : req.url;
  const safePath = path.normalize(requestPath).replace(/^(\.\.[\\/])+/, "");
  const filePath = path.join(root, safePath);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(error.code === "ENOENT" ? 404 : 500, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      res.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    res.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
    });
    res.end(content);
  });
});

async function handleAssistantRequest(req, res) {
  if (!geminiApiKey) {
    writeJson(res, 500, {
      error: "GEMINI_API_KEY is not configured on the server.",
    });
    return;
  }

  try {
    const rawBody = await readRequestBody(req);
    const payload = JSON.parse(rawBody || "{}");
    const conversation = Array.isArray(payload.messages) ? payload.messages : [];
    const financialData = payload.financialData || {};

    const systemPrompt = [
      "You are the LedgrAI finance assistant embedded in an accounting web app.",
      "Answer only from the supplied financial data context.",
      "If data is incomplete, say what is missing and make that limitation explicit.",
      "Keep answers concise and practical for a business user.",
      "Use simple accounting language and cite relevant figures from the provided context.",
      "",
      "Financial data context:",
      JSON.stringify(financialData, null, 2),
    ].join("\n");

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${encodeURIComponent(geminiApiKey)}`,
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: conversation.map((message) => ({
          role: message.role === "assistant" ? "model" : "user",
          parts: [{ text: message.content || "" }],
        })),
        generationConfig: {
          maxOutputTokens: 900,
          temperature: 0.4,
        },
      }),
      },
    );

    const data = await geminiResponse.json();
    if (!geminiResponse.ok) {
      writeJson(res, geminiResponse.status, {
        error: data?.error?.message || "Gemini request failed.",
      });
      return;
    }

    const text = Array.isArray(data.candidates)
      ? data.candidates
          .flatMap((candidate) => candidate?.content?.parts || [])
          .filter((part) => typeof part?.text === "string")
          .map((part) => part.text)
          .join("\n\n")
      : "";

    writeJson(res, 200, {
      message: text || "No response returned from Gemini.",
    });
  } catch (error) {
    writeJson(res, 500, {
      error: "Failed to process assistant request.",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function writeJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(payload));
}

server.listen(port, () => {
  console.log(`LedgrAI running at http://localhost:${port}`);
});
