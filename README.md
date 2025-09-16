# 🎉 LotoStats

Une application React + Vite + Tailwind qui affiche des statistiques sur les tirages du Loto.  
Elle permet de visualiser les numéros les plus sortis, les plus rares, et propose une combinaison générée aléatoirement basée sur les statistiques.

---

## 🚀 Fonctionnalités

- 📊 **Top 5 numéros les plus sortis** (y compris le numéro chance).  
- 🔍 **Top 5 numéros les plus rares** (y compris le numéro chance).  
- ✨ **Proposition aléatoire** :  
  Génère à chaque clic une combinaison de 5 numéros parmi les plus fréquents + 1 numéro chance parmi les plus fréquents.  
- 📈 **Graphique interactif** :  
  En cliquant sur un numéro, une courbe affiche son évolution par **année** ou par **mois**.  
- 🎨 Interface soignée avec TailwindCSS, animations avec Framer Motion.  
- 🌐 Déployée sur **GitHub Pages**.

---

## 📂 Structure du projet

```
lotostats-react/
├── public/              # fichiers statiques (favicon, etc.)
├── src/
│   ├── components/      # composants React (UI)
│   │   ├── NumberBall.jsx
│   │   ├── NumberModal.jsx
│   │   ├── RandomSuggestion.jsx
│   │   ├── StatsSection.jsx
│   ├── services/
│   │   └── lotoApi.js   # traitement des données loto
│   ├── App.jsx          # composant principal
│   └── main.jsx         # point d’entrée React
├── package.json
├── vite.config.js
├── postcss.config.js
├── tailwind.config.js
└── README.md            # documentation
```

---

## 🛠️ Installation & lancement

### 1. Cloner le dépôt
```bash
git clone https://github.com/Joyxt/lotostats-react.git
cd lotostats-react
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer en local
```bash
npm run dev
```
👉 L’app est disponible sur : [http://localhost:5173](http://localhost:5173)

---

## 🌐 Déploiement sur GitHub Pages

1. Ajouter la dépendance :
```bash
npm install gh-pages --save-dev
```

2. Vérifier que dans `package.json` tu as bien :
```json
"homepage": "https://joyxt.github.io/lotostats-react",
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "gh-pages -d dist"
}
```

3. Construire et déployer :
```bash
npm run build
npm run deploy
```

👉 L’app sera disponible ici :  
🔗 https://joyxt.github.io/lotostats-react/

---

## 📊 Données

L’application utilise un fichier JSON contenant l’historique des tirages du Loto.  
Chaque tirage contient les boules principales, le numéro chance et la date.  

Exemple :
```json
{
  "date_de_tirage": "2025-09-13",
  "boule_1": 29,
  "boule_2": 31,
  "boule_3": 6,
  "boule_4": 41,
  "boule_5": 28,
  "numero_chance": 10
}
```

---

## ❤️ Auteur

Projet réalisé par **Skalito** avec React, Vite, Tailwind et Recharts.  
Déployé grâce à **GitHub Pages**.  
