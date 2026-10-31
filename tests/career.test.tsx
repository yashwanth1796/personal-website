import assert from "node:assert/strict";
import { test } from "node:test";
import experiences from "../src/data/experiences.json";
import projects from "../src/data/projects.json";

const aiClaims = /\b(?:LLMs?|LangChain|OpenAI|embeddings?|RAG|Copilot|Tabnine|AI)\b/i;

test("AI experience is attributed only to SurveyMonkey", () => {
  for (const experience of experiences) {
    if (experience.company === "SurveyMonkey") continue;
    assert.doesNotMatch(JSON.stringify(experience), aiClaims, experience.company);
  }
  for (const project of projects) {
    assert.ok(experiences.some(role => role.company === project.company), `Unknown employer: ${project.company}`);
    if (project.company === "SurveyMonkey") continue;
    assert.doesNotMatch(JSON.stringify(project), aiClaims, project.title);
  }
});
