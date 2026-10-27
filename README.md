# 📖 L'Éphéméride Bouayad · اليومية العصرية لبوعياد

> **L'authentique calendrier éphéméride marocain traditionnel en version Web & PWA moderne, accessible hors-ligne.**

Une reproduction numérique fidèle et interactive du célèbre calendrier mural effeuillable marocain « **اليومية العصرية لبوعياد** », présent depuis des décennies dans les foyers et commerces du Royaume du Maroc.

---

## ✨ Fonctionnalités Principales

- 🗓️ **Quadruple Calendrier Marocain en Temps Réel :**
  - **Calendrier Grégorien civil** (international).
  - **Calendrier Hégirien musulman** (avec ajustement visuel de lune selon les Habous).
  - **Calendrier Agricole Fellahi (*Ajami*)** : décalé de 13 jours, dictant les travaux de la terre.
  - **Calendrier Amazighe séculaire** (An 2976, célébrant *Yennayer* / 14 janvier).
- 🕌 **Horaires Officiels de Prière (GMT+0) :**
  - Calcul officiel selon les critères du Ministère des Habous et des Affaires Islamiques du Maroc (Fajr 19°, Icha 17°, jurisprudence malékite pour le Asr).
  - Couverture complète des villes et provinces marocaines (Casablanca, Rabat, Fès, Marrakech, Tanger, Agadir, Oujda, Laâyoune, etc.).
  - Indication de la prière suivante avec compte à rebours et carillon d'adhan optionnel.
  - Direction de la Qibla pour chaque ville.
  - Tableau prévisionnel des 7 prochains jours.
- 🌾 **Guide des 28 Manazil Agricoles & Saisons Marocaines :**
  - Les 28 stations lunaires traditionnelles (*Manazil*) avec leurs étoiles et dictons agraires.
  - Suivi des grandes saisons : *Layali* (البيوض والسود), *Smayem* (السمايم), *Houssom* (الحسوم), *Nissane* (ماء النيسان).
- 📜 **Contenu Quotidien Authentique au Recto & Verso :**
  - **Recto :** Verset coranique du jour avec réflexion (*Tafsir*), Hadith prophétique authentique, et proverbe marocain en Darija avec explication de la morale.
  - **Verso :** Remède de phytothérapie traditionnelle marocaine (*Tibb Al-Aachab*), astuce domestique (*Hila*), événement marquant de l'histoire du Maroc, طور القمر (phase lunaire et % d'illumination) et sagesse du jour.
- ✂️ **Effeuillage Interactif Réaliste :**
  - Effet sonore et animation festive de découpe de la feuille du jour pour passer au jour suivant.
  - Retournement fluide 3D pour consulter le verso (ظهر الورقة).
- 📱 **Progressive Web App (PWA) & Mode Hors-Ligne :**
  - Installable en 1 clic sur iPhone, iPad, Android, Windows et Mac.
  - Fonctionne à 100% sans connexion Internet grâce au cache Workbox.
- 👁️ **Accessibilité & Personnalisation :**
  - Sélecteur de taille de texte global (Compact, Normal, Grand, Très Grand) pour le confort visuel de toutes les générations.
  - Mode sombre (*Charcoal Parchment*) et Mode jour (*Papier Authentique*).
  - Sauvegarde locale des feuillets favoris et moteur de recherche thématique dans les proverbes.
- 🔒 **Respect Total de la Vie Privée :**
  - Aucune inscription requise, zéro publicité, aucun traceur. Données stockées à 100% en local (*localStorage*).

---

## 🚀 Installation & Développement Local

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- npm ou pnpm

### Instructions

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/votre-nom-utilisateur/bouayad-ephemeride.git
   cd bouayad-ephemeride
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:3000`.

4. **Compiler pour la production :**
   ```bash
   npm run build
   ```
   Les fichiers optimisés seront générés dans le dossier `dist/`.

---

## 🌐 Déploiement sur Netlify

Le projet inclut déjà les fichiers `netlify.toml` et `public/_redirects`.

1. Connectez votre dépôt GitHub sur [Netlify](https://app.netlify.com/).
2. Les paramètres sont détectés automatiquement :
   - **Build command :** `npm run build`
   - **Publish directory :** `dist`
3. Cliquez sur **Deploy site**.

---

## ⚖️ Licence & Patrimoine

Ce projet est une initiative culturelle et patrimoniale à but non lucratif, dédiée à la sauvegarde et à la célébration de la mémoire populaire et spirituelle marocaine.
