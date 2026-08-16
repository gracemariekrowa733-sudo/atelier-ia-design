import { useState, useEffect, useCallback } from "react";
import { Lock, Check, Star, Sparkles, Loader2, X, ChevronRight, Palette, BrainCircuit, Trophy } from "lucide-react";

/* ---------------------------------------------------------
   Contenu des parcours
--------------------------------------------------------- */

const TRACKS = {
  ia: {
    label: "Intelligence Artificielle",
    short: "IA",
    accent: "#9F7AEA",
    accentSoft: "rgba(159,122,234,0.15)",
    icon: BrainCircuit,
    nodes: [
      {
        id: "ia-1",
        title: "C'est quoi l'IA ?",
        lesson: [
          "L'intelligence artificielle (IA) désigne des systèmes capables d'effectuer des tâches qui demandaient jusqu'ici une intelligence humaine : reconnaître une image, comprendre du texte, prendre une décision.",
          "Le Machine Learning (apprentissage automatique) est une branche de l'IA : au lieu de programmer des règles explicites, on entraîne un modèle sur des exemples pour qu'il apprenne des motifs.",
          "Le Deep Learning est une sous-branche du Machine Learning qui utilise des réseaux de neurones à plusieurs couches — c'est ce qui a permis les grands progrès récents (reconnaissance d'image, ChatGPT, etc.).",
          "Tu utilises déjà de l'IA au quotidien : suggestions Google, filtres Instagram, reconnaissance faciale, traduction automatique, correcteur orthographique.",
        ],
        exercise: {
          type: "qcm",
          questions: [
            {
              q: "Quelle affirmation décrit le mieux l'IA ?",
              options: [
                "Un logiciel qui suit uniquement des règles écrites à l'avance, sans jamais changer",
                "Un système qui exécute des tâches nécessitant normalement une intelligence humaine",
                "Un robot physique uniquement",
              ],
              correct: 1,
              explain: "L'IA est un domaine large : elle regroupe tout système imitant des capacités cognitives humaines, pas seulement des robots.",
            },
            {
              q: "Le Machine Learning se distingue de la programmation classique parce que...",
              options: [
                "Le modèle apprend à partir de données au lieu de suivre des règles écrites manuellement",
                "Il ne fonctionne que sur des ordinateurs Apple",
                "Il n'utilise jamais de code",
              ],
              correct: 0,
              explain: "En ML, on entraîne un modèle sur des exemples pour qu'il découvre lui-même les règles/motifs.",
            },
            {
              q: "Le Deep Learning est...",
              options: [
                "Une IA totalement différente du Machine Learning",
                "Une sous-branche du Machine Learning basée sur les réseaux de neurones",
                "Un synonyme exact de Machine Learning",
              ],
              correct: 1,
              explain: "Deep Learning ⊂ Machine Learning ⊂ IA. C'est une poupée russe.",
            },
            {
              q: "Vrai ou faux : une IA comme un LLM 'comprend' le sens des mots comme un humain.",
              options: [
                "Vrai, elle raisonne exactement comme un cerveau humain",
                "Faux, elle prédit des motifs statistiques appris sur des données, sans conscience",
              ],
              correct: 1,
              explain: "Un LLM ne 'comprend' rien au sens humain : il prédit la suite la plus probable d'un texte, appris sur d'énormes quantités de données.",
            },
          ],
        },
      },
      {
        id: "ia-2",
        title: "Comment pense un LLM",
        lesson: [
          "Un LLM (Large Language Model, comme Claude ou ChatGPT) découpe le texte en tokens — des petits morceaux de mots — puis prédit le token suivant le plus probable, encore et encore.",
          "Ce comportement vient d'un entraînement sur d'énormes quantités de texte (livres, sites web, code) : le modèle apprend des régularités statistiques du langage, pas des faits vérifiés un par un.",
          "Conséquence importante : un LLM peut 'halluciner', c'est-à-dire générer une réponse qui sonne juste mais qui est fausse — parce qu'il génère ce qui est statistiquement plausible, pas ce qui est vérifié.",
          "C'est pourquoi il faut toujours vérifier les infos factuelles importantes données par une IA, surtout des dates, chiffres ou noms précis.",
        ],
        exercise: {
          type: "qcm",
          questions: [
            {
              q: "Un token, c'est...",
              options: [
                "Une clé API secrète",
                "Un petit fragment de texte (mot ou morceau de mot) que le modèle manipule",
                "Un badge de récompense dans l'appli",
              ],
              correct: 1,
              explain: "Le texte est découpé en tokens avant d'être traité par le modèle.",
            },
            {
              q: "Un LLM génère du texte en...",
              options: [
                "Cherchant la réponse dans une base de données comme Google",
                "Prédisant le token suivant le plus probable, répété en boucle",
                "Copiant-collant des phrases d'internet",
              ],
              correct: 1,
              explain: "C'est un mécanisme de prédiction statistique, pas une recherche dans une base de faits.",
            },
            {
              q: "Une 'hallucination' d'IA, c'est...",
              options: [
                "Un bug d'affichage à l'écran",
                "Une réponse qui semble crédible mais qui est factuellement fausse",
                "Un mode spécial qu'on peut désactiver dans les réglages",
              ],
              correct: 1,
              explain: "Le modèle génère ce qui est plausible statistiquement, ce qui peut produire des erreurs présentées avec assurance.",
            },
            {
              q: "Que faut-il faire face à une info factuelle précise donnée par une IA (date, chiffre, nom) ?",
              options: [
                "La croire à 100%, l'IA ne se trompe jamais",
                "La vérifier, surtout si elle est importante pour ta décision",
                "L'ignorer systématiquement",
              ],
              correct: 1,
              explain: "Bon réflexe : utiliser l'IA pour aller vite, mais vérifier les faits précis qui comptent vraiment.",
            },
          ],
        },
      },
      {
        id: "ia-3",
        title: "Le prompting efficace",
        lesson: [
          "Un bon prompt donne du contexte : qui tu es, ce que tu veux, pour qui, dans quel but.",
          "Il précise le format attendu : longueur, structure (liste, tableau, code), ton.",
          "Il peut inclure un exemple de ce que tu attends — les modèles suivent très bien les exemples concrets.",
          "Le prompting est itératif : tu affines ta demande en fonction de ce que l'IA te renvoie, comme une conversation.",
        ],
        exercise: {
          type: "ai-prompt",
          prompt:
            "Écris un prompt pour demander à une IA de générer 5 questions de quiz biblique (QCM) sur le livre de la Genèse, destinées à des jeunes de 15-18 ans.",
        },
      },
      {
        id: "ia-4",
        title: "IA générative : texte & image",
        lesson: [
          "Les modèles de génération d'image récents (Midjourney, DALL-E) utilisent souvent une architecture de diffusion : ils partent d'un bruit aléatoire et le débruitent progressivement vers une image cohérente, guidés par ton prompt texte.",
          "Un bon prompt image précise : sujet, style (photo, illustration, 3D...), ambiance/lumière, cadrage, et parfois un artiste ou une référence de style.",
          "Ces IA ont des limites : difficulté avec le texte lisible dans l'image, mains/doigts parfois déformés, biais hérités des données d'entraînement.",
          "Attention aux droits d'auteur : les images générées par IA se trouvent dans une zone encore floue juridiquement selon les pays et les usages (commercial ou non).",
        ],
        exercise: {
          type: "qcm",
          questions: [
            {
              q: "Un modèle de diffusion génère une image en...",
              options: [
                "Assemblant des morceaux de vraies photos existantes",
                "Débruitant progressivement une image de bruit aléatoire vers un résultat cohérent",
                "Dessinant pixel par pixel de gauche à droite",
              ],
              correct: 1,
              explain: "La diffusion part de bruit et le retire par étapes successives guidées par le prompt.",
            },
            {
              q: "Pour un bon prompt image, il est utile de préciser...",
              options: [
                "Seulement le sujet principal",
                "Le sujet, le style, l'ambiance/lumière et le cadrage",
                "Uniquement des mots-clés en anglais, rien d'autre ne fonctionne",
              ],
              correct: 1,
              explain: "Plus le prompt est précis sur ces axes, plus le résultat correspond à ce que tu imagines.",
            },
            {
              q: "Une faiblesse connue des IA génératrices d'images est...",
              options: [
                "Elles ne peuvent générer que du noir et blanc",
                "Le texte lisible et les mains sont souvent mal générés",
                "Elles sont incapables de générer des visages",
              ],
              correct: 1,
              explain: "C'est une limite technique classique, en amélioration mais encore présente sur beaucoup de modèles.",
            },
            {
              q: "Concernant les droits d'auteur des images générées par IA...",
              options: [
                "La question est parfaitement réglée partout dans le monde",
                "C'est encore flou juridiquement selon les pays et l'usage prévu",
                "Ce n'est jamais un problème si l'image est gratuite",
              ],
              correct: 1,
              explain: "Bonne pratique : rester prudent, surtout pour un usage commercial.",
            },
          ],
        },
      },
      {
        id: "ia-5",
        title: "Utiliser une API IA",
        lesson: [
          "Une API IA (comme celle d'Anthropic ou OpenAI) permet à ton code d'envoyer une requête (souvent en JSON) et de recevoir une réponse générée par le modèle.",
          "Tu as besoin d'une clé API secrète, à ne jamais exposer côté client dans le code public (sinon n'importe qui peut l'utiliser à ta place).",
          "La requête contient en général : le modèle choisi, un message (ta demande), un nombre maximum de tokens en sortie.",
          "Cas d'usage concret pour toi : dans ton appli de quiz biblique, un bouton 'Générer des questions' qui appelle l'API avec un prompt et affiche automatiquement les questions retournées.",
        ],
        exercise: {
          type: "qcm",
          questions: [
            {
              q: "Une clé API doit...",
              options: [
                "Être affichée directement dans le code JavaScript visible par les visiteurs",
                "Rester secrète, généralement gérée côté serveur",
                "Être partagée publiquement pour que ce soit plus simple",
              ],
              correct: 1,
              explain: "Exposer une clé API publiquement permet à n'importe qui de l'utiliser à tes frais.",
            },
            {
              q: "Le format généralement utilisé pour échanger avec une API IA est...",
              options: ["Le CSV", "Le JSON", "Le PDF"],
              correct: 1,
              explain: "JSON est le format standard pour structurer requêtes et réponses d'API.",
            },
            {
              q: "Dans ton appli de quiz biblique, une bonne utilisation d'une API IA serait...",
              options: [
                "Générer automatiquement des propositions de questions à partir d'un thème donné",
                "Remplacer entièrement la base de données MySQL",
                "Servir uniquement à afficher des images statiques",
              ],
              correct: 0,
              explain: "C'est un cas d'usage concret et utile : gagner du temps sur la création de contenu.",
            },
            {
              q: "Le paramètre qui limite la longueur de la réponse générée s'appelle généralement...",
              options: ["max_tokens", "response_limit", "text_size"],
              correct: 0,
              explain: "max_tokens définit le nombre maximum de tokens que le modèle peut générer en sortie.",
            },
          ],
        },
      },
    ],
  },
  design: {
    label: "Graphisme",
    short: "Design",
    accent: "#FF8B5E",
    accentSoft: "rgba(255,139,94,0.15)",
    icon: Palette,
    nodes: [
      {
        id: "d-1",
        title: "Théorie des couleurs",
        lesson: [
          "Le cercle chromatique organise les couleurs et permet de construire des harmonies fiables.",
          "Harmonie complémentaire : deux couleurs opposées sur le cercle (ex: bleu/orange) — fort contraste, très dynamique.",
          "Harmonie analogue : couleurs voisines sur le cercle (ex: bleu, bleu-vert, vert) — douce et cohérente.",
          "Harmonie triadique : trois couleurs équidistantes sur le cercle — équilibrée et vive, à utiliser avec une couleur dominante.",
        ],
        exercise: {
          type: "color-harmony",
          questions: [
            {
              q: "Quelle harmonie forment ces couleurs ?",
              colors: ["#2563EB", "#EA580C"],
              options: ["Complémentaire", "Analogue", "Monochrome"],
              correct: 0,
              explain: "Bleu et orange sont opposés sur le cercle chromatique : c'est une harmonie complémentaire, fort contraste.",
            },
            {
              q: "Quelle harmonie forment ces couleurs ?",
              colors: ["#16A34A", "#65A30D", "#0D9488"],
              options: ["Triadique", "Analogue", "Complémentaire"],
              correct: 1,
              explain: "Ces trois verts/teals sont voisins sur le cercle : harmonie analogue, effet cohérent et apaisant.",
            },
            {
              q: "Quelle harmonie forment ces couleurs ?",
              colors: ["#DC2626", "#CA8A04", "#2563EB"],
              options: ["Monochrome", "Complémentaire", "Triadique"],
              correct: 2,
              explain: "Rouge, jaune, bleu sont à peu près équidistants sur le cercle : harmonie triadique, vive et équilibrée si une couleur domine.",
            },
          ],
        },
      },
      {
        id: "d-2",
        title: "Typographie",
        lesson: [
          "Une police serif (avec empattements) évoque le classique, l'autorité, l'imprimé — bonne pour de longs textes en print.",
          "Une police sans-serif (sans empattements) évoque le moderne, le digital — souvent plus lisible sur écran, surtout en petite taille.",
          "La hiérarchie typographique se construit avec la taille, la graisse (bold/regular) et l'espacement — pas seulement la couleur.",
          "Règle simple : pas plus de 2 familles de polices sur un même support, mais plusieurs graisses de la même famille pour varier.",
        ],
        exercise: {
          type: "qcm",
          questions: [
            {
              q: "Une police serif est en général plus adaptée pour...",
              options: [
                "De longs textes imprimés, style classique",
                "Un bouton d'application mobile",
                "Un logo minimaliste tech",
              ],
              correct: 0,
              explain: "Les empattements guident l'œil dans la lecture de longs blocs de texte imprimé.",
            },
            {
              q: "Sur un écran, en petite taille, on privilégie souvent...",
              options: ["Le serif fin", "Le sans-serif", "L'écriture manuscrite"],
              correct: 1,
              explain: "Le sans-serif reste net et lisible même en petite taille sur écran.",
            },
            {
              q: "La hiérarchie typographique se construit principalement avec...",
              options: [
                "Uniquement la couleur du texte",
                "Taille, graisse et espacement",
                "Le nombre de polices différentes utilisées",
              ],
              correct: 1,
              explain: "Varier taille/graisse/espacement crée une hiérarchie claire, sans même changer de couleur.",
            },
            {
              q: "Bonne pratique de pairing typographique :",
              options: [
                "Utiliser 5 familles de polices différentes pour varier",
                "Limiter à 2 familles, en jouant sur leurs graisses",
                "Toujours utiliser la même taille partout",
              ],
              correct: 1,
              explain: "Trop de familles de polices casse la cohérence visuelle.",
            },
          ],
        },
      },
      {
        id: "d-3",
        title: "Hiérarchie visuelle & grilles",
        lesson: [
          "La hiérarchie visuelle guide l'œil : ce qui est plus grand, plus contrasté ou plus isolé attire l'attention en premier.",
          "L'espace négatif (le vide autour des éléments) n'est pas perdu : il aère la composition et met en valeur ce qui compte.",
          "La règle des tiers : diviser l'image en 3x3, placer les éléments importants sur les lignes ou intersections plutôt qu'au centre strict.",
          "Une grille (souvent 12 colonnes en web) structure l'alignement des éléments et donne une cohérence professionnelle immédiate.",
        ],
        exercise: {
          type: "qcm",
          questions: [
            {
              q: "Ce qui attire l'œil en premier dans une composition, c'est en général...",
              options: [
                "L'élément le plus petit et discret",
                "L'élément le plus grand, contrasté ou isolé",
                "Toujours l'élément le plus à gauche",
              ],
              correct: 1,
              explain: "Taille, contraste et isolement sont les leviers principaux de hiérarchie visuelle.",
            },
            {
              q: "L'espace négatif (le vide) dans un design sert à...",
              options: [
                "Rien, c'est de l'espace perdu à combler",
                "Aérer la composition et mettre en valeur les éléments importants",
                "Uniquement à remplir les marges obligatoires",
              ],
              correct: 1,
              explain: "Le vide est un outil de composition à part entière, pas un problème à résoudre.",
            },
            {
              q: "La règle des tiers propose de placer les éléments clés...",
              options: [
                "Toujours pile au centre de l'image",
                "Sur les lignes ou intersections d'une grille 3x3",
                "Toujours dans le coin en bas à droite",
              ],
              correct: 1,
              explain: "Ça évite les compositions centrées et statiques, souvent moins dynamiques visuellement.",
            },
            {
              q: "Une grille 12 colonnes sert principalement à...",
              options: [
                "Décorer la page avec des lignes visibles",
                "Structurer l'alignement des éléments de façon cohérente",
                "Limiter le nombre de couleurs utilisées",
              ],
              correct: 1,
              explain: "C'est un outil d'alignement, très utilisé en web design pour la cohérence entre sections.",
            },
          ],
        },
      },
      {
        id: "d-4",
        title: "IA pour le design",
        lesson: [
          "Des outils comme Canva Magic Studio ou Leonardo.ai permettent de générer des visuels, supprimer un fond, ou proposer des palettes automatiquement.",
          "Un bon prompt visuel précise : sujet, style graphique, palette de couleurs, ambiance, ratio/format (carré, story, bannière).",
          "L'IA générative accélère les premières idées, mais le résultat brut demande presque toujours une retouche manuelle (cadrage, texte, cohérence de marque).",
          "Limite importante : l'IA ne connaît pas toujours ta charte graphique précise (logo, couleurs exactes de marque) — c'est à toi d'ajuster après génération.",
        ],
        exercise: {
          type: "qcm",
          questions: [
            {
              q: "Canva Magic Studio et Leonardo.ai sont des exemples de...",
              options: [
                "Logiciels de comptabilité",
                "Outils IA d'aide à la création graphique",
                "Bases de données SQL",
              ],
              correct: 1,
              explain: "Ce sont des outils qui intègrent l'IA générative dans un workflow de design.",
            },
            {
              q: "Un bon prompt pour générer un visuel devrait préciser...",
              options: [
                "Seulement une couleur",
                "Sujet, style, palette, ambiance et format",
                "Rien, l'IA devine toujours toute seule",
              ],
              correct: 1,
              explain: "Plus le prompt est complet sur ces axes, plus le résultat est exploitable directement.",
            },
            {
              q: "Un visuel généré par IA...",
              options: [
                "Est toujours parfait et prêt à l'emploi",
                "Demande presque toujours une retouche manuelle ensuite",
                "Ne peut jamais être modifié après génération",
              ],
              correct: 1,
              explain: "L'IA accélère la première version, mais l'œil humain reste nécessaire pour l'ajuster.",
            },
            {
              q: "Une limite de l'IA générative pour une marque précise est...",
              options: [
                "Elle connaît automatiquement ta charte graphique exacte",
                "Elle ne connaît pas tes couleurs/logo exacts sans que tu les précises",
                "Elle refuse de générer des logos",
              ],
              correct: 1,
              explain: "Sans instructions précises ou références, l'IA invente sa propre interprétation.",
            },
          ],
        },
      },
      {
        id: "d-5",
        title: "Composition & contraste",
        lesson: [
          "Le contraste (couleur, taille, forme) crée un point focal : l'œil sait où regarder en premier.",
          "L'équilibre visuel peut être symétrique (formel, stable) ou asymétrique (dynamique, moderne) — les deux sont valides selon l'intention.",
          "Un point focal unique et clair fonctionne mieux que plusieurs éléments qui se disputent l'attention.",
          "Le contraste de couleur doit aussi respecter la lisibilité : texte clair sur fond sombre ou l'inverse, jamais deux tons proches en luminosité.",
        ],
        exercise: {
          type: "qcm",
          questions: [
            {
              q: "Le contraste dans une composition sert principalement à...",
              options: [
                "Rendre tout uniforme",
                "Créer un point focal clair pour guider l'œil",
                "Réduire le nombre de couleurs utilisées",
              ],
              correct: 1,
              explain: "Le contraste guide le regard : c'est un outil de hiérarchie, pas juste esthétique.",
            },
            {
              q: "Un équilibre asymétrique dans une composition est...",
              options: [
                "Toujours une erreur à corriger",
                "Une approche valide, souvent perçue comme plus dynamique",
                "Interdit en design professionnel",
              ],
              correct: 1,
              explain: "Symétrique = stable/formel, asymétrique = dynamique/moderne : les deux sont des choix légitimes.",
            },
            {
              q: "Pour un point focal efficace, il vaut mieux...",
              options: [
                "Avoir plusieurs éléments qui attirent autant l'attention",
                "Avoir un seul point focal clair et dominant",
                "N'avoir aucun élément mis en avant",
              ],
              correct: 1,
              explain: "Plusieurs points focaux de force égale créent de la confusion visuelle.",
            },
            {
              q: "Pour garantir la lisibilité d'un texte, il faut...",
              options: [
                "Un fort contraste de luminosité entre texte et fond",
                "Toujours du texte noir sur fond blanc uniquement",
                "Éviter tout contraste pour rester discret",
              ],
              correct: 0,
              explain: "Ce qui compte c'est l'écart de luminosité, pas une combinaison de couleurs figée.",
            },
          ],
        },
      },
    ],
  },
};

/* ---------------------------------------------------------
   Utilitaires
--------------------------------------------------------- */

const STORAGE_KEY = "atelier-progress-v1";
const totalNodes = Object.values(TRACKS).reduce((sum, t) => sum + t.nodes.length, 0);

function levelFromXp(xp) {
  return Math.floor(xp / 60) + 1;
}
function xpForNextLevel(xp) {
  const lvl = levelFromXp(xp);
  return lvl * 60;
}

async function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* pas encore de progression sauvegardée */
  }
  return { xp: 0, nodes: {} };
}

async function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Sauvegarde impossible", e);
  }
}

/* ---------------------------------------------------------
   Composant principal
--------------------------------------------------------- */

export default function App() {
  const [progress, setProgress] = useState(null);
  const [activeTrackId, setActiveTrackId] = useState("ia");
  const [openNode, setOpenNode] = useState(null); // { trackId, node }
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadProgress().then(setProgress);
  }, []);

  const updateProgress = useCallback((nodeId, stars, xpGain) => {
    setProgress((prev) => {
      const prevNode = prev.nodes[nodeId];
      const bestStars = Math.max(stars, prevNode?.stars || 0);
      const alreadyDone = !!prevNode?.completed;
      const next = {
        xp: prev.xp + (alreadyDone ? 0 : xpGain),
        nodes: { ...prev.nodes, [nodeId]: { completed: true, stars: bestStars } },
      };
      saveProgress(next);
      return next;
    });
  }, []);

  if (!progress) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0B1512" }}>
        <Loader2 className="animate-spin text-amber-300" size={28} />
      </div>
    );
  }

  const isUnlocked = (trackId, index) => {
    if (index === 0) return true;
    const prevNode = TRACKS[trackId].nodes[index - 1];
    return !!progress.nodes[prevNode.id]?.completed;
  };

  const completedCount = Object.values(progress.nodes).filter((n) => n.completed).length;
  const level = levelFromXp(progress.xp);
  const nextLevelXp = xpForNextLevel(progress.xp);
  const currentLevelBaseXp = (level - 1) * 60;
  const levelProgressPct = Math.round(
    ((progress.xp - currentLevelBaseXp) / (nextLevelXp - currentLevelBaseXp)) * 100
  );

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg,#0B1512 0%,#0D1A17 100%)", fontFamily: "'Inter',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600;700&display=swap');
        .display-font { font-family: 'Space Grotesk', system-ui, sans-serif; }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(255,200,87,0.45); }
          70% { box-shadow: 0 0 0 10px rgba(255,200,87,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,200,87,0); }
        }
        .pulse-ring { animation: pulseRing 2.2s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .pulse-ring { animation: none; }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md border-b" style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(11,21,18,0.85)" }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-amber-300" />
            <span className="display-font font-bold text-white tracking-tight">L'Atelier</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-3 py-1 border border-white/10">
              <Star size={13} className="text-amber-300 fill-amber-300" />
              <span className="text-sm font-semibold text-amber-100">{progress.xp} XP</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-3 py-1 border border-white/10">
              <Trophy size={13} className="text-emerald-300" />
              <span className="text-sm font-semibold text-emerald-100">Niv. {level}</span>
            </div>
          </div>
        </div>
        {/* level progress bar */}
        <div className="max-w-2xl mx-auto px-4 pb-2">
          <div className="h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-200" style={{ width: `${levelProgressPct}%` }} />
          </div>
        </div>

        {/* Track tabs */}
        <div className="max-w-2xl mx-auto px-4 flex gap-2 pb-3">
          {Object.entries(TRACKS).map(([id, track]) => {
            const Icon = track.icon;
            const active = activeTrackId === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTrackId(id)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: active ? track.accentSoft : "rgba(255,255,255,0.04)",
                  color: active ? track.accent : "rgba(255,255,255,0.55)",
                  border: `1px solid ${active ? track.accent + "55" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <Icon size={15} />
                {track.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Path / quest map */}
      <main className="max-w-2xl mx-auto px-6 pt-10 pb-24">
        <TrackPath
          trackId={activeTrackId}
          track={TRACKS[activeTrackId]}
          progress={progress}
          isUnlocked={isUnlocked}
          onOpenNode={(node) => setOpenNode({ trackId: activeTrackId, node })}
        />

        <div className="mt-10 text-center text-xs text-white/30">
          {completedCount} / {totalNodes} modules terminés au total
        </div>
      </main>

      {openNode && (
        <NodeModal
          trackId={openNode.trackId}
          track={TRACKS[openNode.trackId]}
          node={openNode.node}
          onClose={() => setOpenNode(null)}
          onComplete={(stars, xpGain) => {
            updateProgress(openNode.node.id, stars, xpGain);
            setToast({ stars, xpGain, title: openNode.node.title });
          }}
        />
      )}

      {toast && <Toast toast={toast} onDone={() => setToast(null)} />}
    </div>
  );
}

/* ---------------------------------------------------------
   Chemin de quête (skill tree)
--------------------------------------------------------- */

function TrackPath({ track, progress, isUnlocked, onOpenNode }) {
  return (
    <div className="relative">
      {/* ligne centrale */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2" style={{ background: "rgba(255,255,255,0.08)" }} />
      <div className="flex flex-col gap-14">
        {track.nodes.map((node, i) => {
          const state = progress.nodes[node.id];
          const unlocked = isUnlocked(track === TRACKS.ia ? "ia" : "design", i);
          const side = i % 2 === 0 ? "justify-start" : "justify-end";
          return (
            <div key={node.id} className={`flex ${side}`}>
              <div className={`flex flex-col items-center gap-2 ${i % 2 === 0 ? "items-start pr-0" : "items-end pl-0"}`} style={{ width: "58%" }}>
                <button
                  disabled={!unlocked}
                  onClick={() => onOpenNode(node)}
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-transform active:scale-95 ${unlocked ? "cursor-pointer" : "cursor-not-allowed opacity-40"} ${unlocked && !state?.completed ? "pulse-ring" : ""}`}
                  style={{
                    background: state?.completed ? track.accent : unlocked ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                    border: `2px solid ${state?.completed ? track.accent : unlocked ? track.accent + "80" : "rgba(255,255,255,0.15)"}`,
                  }}
                >
                  {!unlocked ? (
                    <Lock size={20} className="text-white/40" />
                  ) : state?.completed ? (
                    <Check size={24} className="text-[#0B1512]" strokeWidth={3} />
                  ) : (
                    <span className="text-white font-bold text-lg display-font">{i + 1}</span>
                  )}
                </button>
                <div className="text-sm font-semibold text-white/90 max-w-[160px] text-center">{node.title}</div>
                {state?.completed && (
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map((s) => (
                      <Star key={s} size={11} className={s <= state.stars ? "text-amber-300 fill-amber-300" : "text-white/15"} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Toast de récompense
--------------------------------------------------------- */

function Toast({ toast, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white text-[#0B1512] rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-3 animate-[fadeIn_0.2s_ease-out]">
      <div className="w-9 h-9 rounded-full bg-amber-300 flex items-center justify-center">
        <Star size={18} className="fill-[#0B1512] text-[#0B1512]" />
      </div>
      <div>
        <div className="font-bold text-sm">+{toast.xpGain} XP</div>
        <div className="text-xs text-black/60">{toast.title} terminé</div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Modal de module : Leçon -> Exercice -> Correction
--------------------------------------------------------- */

function NodeModal({ track, node, onClose, onComplete }) {
  const [step, setStep] = useState("lesson"); // lesson | exercise | result

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl max-h-[88vh] overflow-y-auto"
        style={{ background: "#101C18", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="sticky top-0 flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#101C18" }}>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: track.accent }}>{track.short}</div>
            <div className="text-white font-bold display-font">{node.title}</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10">
            <X size={16} className="text-white/70" />
          </button>
        </div>

        <div className="px-5 py-5">
          {step === "lesson" && (
            <LessonView node={node} accent={track.accent} onNext={() => setStep("exercise")} />
          )}
          {step === "exercise" && (
            <ExerciseView
              node={node}
              accent={track.accent}
              onFinish={(stars, xpGain) => {
                onComplete(stars, xpGain);
                setStep("result");
              }}
            />
          )}
          {step === "result" && <ResultView accent={track.accent} onClose={onClose} />}
        </div>
      </div>
    </div>
  );
}

function LessonView({ node, accent, onNext }) {
  return (
    <div>
      <div className="space-y-4 mb-6">
        {node.lesson.map((p, i) => (
          <p key={i} className="text-white/80 text-[15px] leading-relaxed">{p}</p>
        ))}
      </div>
      <button
        onClick={onNext}
        className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-[#0B1512]"
        style={{ background: accent }}
      >
        Passer à l'exercice <ChevronRight size={16} />
      </button>
    </div>
  );
}

/* ---------------------------------------------------------
   Exercices
--------------------------------------------------------- */

function ExerciseView({ node, accent, onFinish }) {
  const ex = node.exercise;
  if (ex.type === "qcm") return <QcmExercise ex={ex} accent={accent} onFinish={onFinish} />;
  if (ex.type === "color-harmony") return <ColorHarmonyExercise ex={ex} accent={accent} onFinish={onFinish} />;
  if (ex.type === "ai-prompt") return <AiPromptExercise ex={ex} accent={accent} onFinish={onFinish} />;
  return null;
}

function QcmExercise({ ex, accent, onFinish }) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showExplain, setShowExplain] = useState(false);

  const q = ex.questions[qIndex];
  const isLast = qIndex === ex.questions.length - 1;

  const submitAnswer = () => {
    if (selected === null) return;
    setShowExplain(true);
  };

  const nextQuestion = () => {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setShowExplain(false);
    setSelected(null);
    if (isLast) {
      const score = newAnswers.filter((a, i) => a === ex.questions[i].correct).length;
      const stars = score >= ex.questions.length ? 3 : score >= Math.ceil(ex.questions.length * 0.6) ? 2 : 1;
      onFinish(stars, 15 + score * 5);
    } else {
      setQIndex(qIndex + 1);
    }
  };

  return (
    <div>
      <div className="text-xs text-white/40 mb-3">Question {qIndex + 1} / {ex.questions.length}</div>
      <div className="text-white font-semibold text-[15px] mb-4">{q.q}</div>
      <div className="space-y-2 mb-5">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correct;
          const isSelected = i === selected;
          let style = { border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" };
          if (showExplain && isCorrect) style = { border: "1px solid #34D399", background: "rgba(52,211,153,0.1)" };
          else if (showExplain && isSelected && !isCorrect) style = { border: "1px solid #F87171", background: "rgba(248,113,113,0.1)" };
          else if (isSelected) style = { border: `1px solid ${accent}`, background: accent + "20" };
          return (
            <button
              key={i}
              disabled={showExplain}
              onClick={() => setSelected(i)}
              className="w-full text-left px-4 py-3 rounded-xl text-sm text-white/85 transition-colors"
              style={style}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {showExplain && (
        <div className="mb-5 px-4 py-3 rounded-xl text-sm text-white/70" style={{ background: "rgba(255,255,255,0.04)" }}>
          {q.explain}
        </div>
      )}

      {!showExplain ? (
        <button
          onClick={submitAnswer}
          disabled={selected === null}
          className="w-full py-3 rounded-xl font-semibold text-[#0B1512] disabled:opacity-30"
          style={{ background: accent }}
        >
          Valider
        </button>
      ) : (
        <button onClick={nextQuestion} className="w-full py-3 rounded-xl font-semibold text-[#0B1512]" style={{ background: accent }}>
          {isLast ? "Voir mon résultat" : "Question suivante"}
        </button>
      )}
    </div>
  );
}

function ColorHarmonyExercise({ ex, accent, onFinish }) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showExplain, setShowExplain] = useState(false);

  const q = ex.questions[qIndex];
  const isLast = qIndex === ex.questions.length - 1;

  const nextQuestion = () => {
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setShowExplain(false);
    setSelected(null);
    if (isLast) {
      const score = newAnswers.filter((a, i) => a === ex.questions[i].correct).length;
      const stars = score >= ex.questions.length ? 3 : score >= Math.ceil(ex.questions.length * 0.6) ? 2 : 1;
      onFinish(stars, 15 + score * 5);
    } else {
      setQIndex(qIndex + 1);
    }
  };

  return (
    <div>
      <div className="text-xs text-white/40 mb-3">Question {qIndex + 1} / {ex.questions.length}</div>
      <div className="text-white font-semibold text-[15px] mb-4">{q.q}</div>
      <div className="flex gap-2 mb-5">
        {q.colors.map((c, i) => (
          <div key={i} className="flex-1 h-16 rounded-xl" style={{ background: c, border: "1px solid rgba(255,255,255,0.15)" }} />
        ))}
      </div>
      <div className="space-y-2 mb-5">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.correct;
          const isSelected = i === selected;
          let style = { border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" };
          if (showExplain && isCorrect) style = { border: "1px solid #34D399", background: "rgba(52,211,153,0.1)" };
          else if (showExplain && isSelected && !isCorrect) style = { border: "1px solid #F87171", background: "rgba(248,113,113,0.1)" };
          else if (isSelected) style = { border: `1px solid ${accent}`, background: accent + "20" };
          return (
            <button
              key={i}
              disabled={showExplain}
              onClick={() => setSelected(i)}
              className="w-full text-left px-4 py-3 rounded-xl text-sm text-white/85"
              style={style}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {showExplain && (
        <div className="mb-5 px-4 py-3 rounded-xl text-sm text-white/70" style={{ background: "rgba(255,255,255,0.04)" }}>
          {q.explain}
        </div>
      )}
      {!showExplain ? (
        <button
          onClick={() => setShowExplain(true)}
          disabled={selected === null}
          className="w-full py-3 rounded-xl font-semibold text-[#0B1512] disabled:opacity-30"
          style={{ background: accent }}
        >
          Valider
        </button>
      ) : (
        <button onClick={nextQuestion} className="w-full py-3 rounded-xl font-semibold text-[#0B1512]" style={{ background: accent }}>
          {isLast ? "Voir mon résultat" : "Question suivante"}
        </button>
      )}
    </div>
  );
}

function AiPromptExercise({ ex, accent, onFinish }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const grade = async () => {
    if (text.trim().length < 10) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/.netlify/functions/grade-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instruction: ex.prompt, studentPrompt: text }),
      });
      const parsed = await response.json();
      if (parsed.error) throw new Error(parsed.error);
      setFeedback(parsed);
    } catch (e) {
      setError("La correction a échoué. Vérifie ta connexion et réessaie.");
    } finally {
      setLoading(false);
    }
  };

  if (feedback) {
    const criteria = [
      ["Clarté", feedback.clarte],
      ["Contexte", feedback.contexte],
      ["Structure", feedback.structure],
      ["Format", feedback.format],
    ];
    const stars = feedback.note_globale >= 16 ? 3 : feedback.note_globale >= 11 ? 2 : 1;
    return (
      <div>
        <div className="text-center mb-5">
          <div className="text-4xl font-bold display-font text-white">{feedback.note_globale}<span className="text-lg text-white/40">/20</span></div>
          <div className="text-xs text-white/40 mt-1">Note globale</div>
        </div>
        <div className="space-y-3 mb-5">
          {criteria.map(([label, c]) => (
            <div key={label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/80 font-medium">{label}</span>
                <span className="text-white/50">{c.note}/5</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-1">
                <div className="h-full rounded-full" style={{ width: `${(c.note / 5) * 100}%`, background: accent }} />
              </div>
              <div className="text-xs text-white/50">{c.commentaire}</div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 rounded-xl mb-5" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-2">Version améliorée suggérée</div>
          <div className="text-sm text-white/75 leading-relaxed">{feedback.prompt_ameliore}</div>
        </div>
        <button
          onClick={() => onFinish(stars, 20 + stars * 5)}
          className="w-full py-3 rounded-xl font-semibold text-[#0B1512]"
          style={{ background: accent }}
        >
          Continuer
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="px-4 py-3 rounded-xl mb-4 text-sm text-white/70" style={{ background: "rgba(255,255,255,0.04)" }}>
        {ex.prompt}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Écris ton prompt ici..."
        rows={6}
        className="w-full rounded-xl px-4 py-3 text-sm text-white bg-white/5 border border-white/10 focus:outline-none focus:border-white/30 resize-none mb-4"
      />
      {error && <div className="text-xs text-red-300 mb-3">{error}</div>}
      <button
        onClick={grade}
        disabled={loading || text.trim().length < 10}
        className="w-full py-3 rounded-xl font-semibold text-[#0B1512] disabled:opacity-30 flex items-center justify-center gap-2"
        style={{ background: accent }}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Correction en cours...
          </>
        ) : (
          "Faire corriger par l'IA"
        )}
      </button>
    </div>
  );
}

function ResultView({ accent, onClose }) {
  return (
    <div className="text-center py-6">
      <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: accent + "25" }}>
        <Check size={28} style={{ color: accent }} strokeWidth={3} />
      </div>
      <div className="text-white font-bold text-lg display-font mb-1">Module terminé</div>
      <div className="text-white/50 text-sm mb-6">Le module suivant est débloqué.</div>
      <button onClick={onClose} className="w-full py-3 rounded-xl font-semibold text-[#0B1512]" style={{ background: accent }}>
        Retour au parcours
      </button>
    </div>
  );
}
