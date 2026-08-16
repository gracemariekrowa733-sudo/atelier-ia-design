export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Méthode non autorisée" }), { status: 405 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Clé API manquante côté serveur (variable GEMINI_API_KEY non configurée)" }),
      { status: 500 }
    );
  }

  try {
    const { instruction, studentPrompt } = await req.json();

    const gradingPrompt = `Tu es un correcteur pédagogique strict mais bienveillant qui évalue des prompts écrits par des étudiants en herbe.

Consigne donnée à l'étudiant : "${instruction}"

Prompt écrit par l'étudiant :
"""
${studentPrompt}
"""

Évalue ce prompt sur exactement 4 critères : clarté, contexte, structure, format. Pour chaque critère donne une note entière sur 5 et un commentaire très court (une phrase, en français). Donne aussi une note globale sur 20 et une version améliorée courte du prompt.

Réponds UNIQUEMENT avec un objet JSON valide, sans texte avant ni après, sans balises markdown, au format exact suivant :
{"clarte":{"note":0,"commentaire":""},"contexte":{"note":0,"commentaire":""},"structure":{"note":0,"commentaire":""},"format":{"note":0,"commentaire":""},"note_globale":0,"prompt_ameliore":""}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: gradingPrompt }] }],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return new Response(JSON.stringify({ error: "Erreur API Gemini", details: errText }), { status: 502 });
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Échec de la correction", details: String(err) }), { status: 500 });
  }
};
