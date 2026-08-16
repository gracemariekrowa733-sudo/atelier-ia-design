# Guide de mise en ligne — L'Atelier

## 1. Mettre le projet sur GitHub
1. Va sur github.com et crée un nouveau dépôt (repository), par exemple `atelier-ia-design`.
2. Mets tous ces fichiers dedans (comme pour tes autres projets).

## 2. Connecter à Netlify
1. Va sur netlify.com et connecte-toi (ou crée un compte gratuit).
2. Clique sur "Add new site" → "Import an existing project".
3. Choisis ton dépôt GitHub `atelier-ia-design`.
4. Netlify détecte automatiquement les réglages (grâce au fichier `netlify.toml`). Clique sur "Deploy".

## 3. Ajouter ta clé API en sécurité (étape la plus importante)
1. Dans Netlify, va dans ton site → **Site configuration** → **Environment variables**.
2. Clique **Add a variable**.
3. Nom de la variable : `GEMINI_API_KEY`
4. Valeur : colle ta clé Google AI Studio (celle qui commence par `AQ.` ou `AIzaSy...`).
5. Sauvegarde, puis relance un déploiement (**Deploys** → **Trigger deploy**).

C'est tout : ta clé reste secrète sur les serveurs de Netlify, jamais visible dans le code public.

## 4. Tester
Ouvre l'adresse que Netlify te donne (ex: `atelier-ia-design.netlify.app`) sur ton téléphone. Tout devrait fonctionner, y compris le correcteur IA.

## Important
- Ne mets JAMAIS ta clé API directement dans un fichier de code qui va sur GitHub — seulement dans les "Environment variables" de Netlify.
- Ta progression (XP, modules terminés) est sauvegardée sur ton téléphone/navigateur. Si tu changes d'appareil ou effaces les données du navigateur, elle repart à zéro (normal pour cette version).
