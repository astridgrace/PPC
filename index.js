const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const SCORE_FILE = 'score.json';

// Variables pour le score cumulatif
let victoires = 0;
let defaites = 0;
let egalites = 0;

// Fonction pour charger les scores depuis le fichier
function chargerScores() {
  try {
    if (fs.existsSync(SCORE_FILE)) {
      const data = fs.readFileSync(SCORE_FILE, 'utf8');
      const scores = JSON.parse(data);
      victoires = scores.victoires || 0;
      defaites = scores.defaites || 0;
      egalites = scores.egalites || 0;
      console.log(`Scores précédents chargés : Victoires: ${victoires} | Défaites: ${defaites} | Égalités: ${egalites}\n`);
    }
  } catch (error) {
    console.log('Impossible de charger les scores précédents. Démarrage avec des scores à zéro.\n');
  }
}

// Fonction pour sauvegarder les scores dans le fichier
function sauvegarderScores() {
  try {
    const scores = {
      victoires: victoires,
      defaites: defaites,
      egalites: egalites
    };
    fs.writeFileSync(SCORE_FILE, JSON.stringify(scores, null, 2), 'utf8');
    console.log('Scores sauvegardés avec succès !');
  } catch (error) {
    console.log('Erreur lors de la sauvegarde des scores.');
  }
}

console.log("Bienvenue dans Pierre-Feuille-Ciseaux !");
chargerScores();

function jouerRound() {
  rl.question("Choisissez votre coup (pierre, feuille ou ciseaux) : ", (choix) => {
    const choixMinuscule = choix.toLowerCase().trim();
    
    if (choixMinuscule === 'pierre' || choixMinuscule === 'feuille' || choixMinuscule === 'ciseaux') {
      console.log(`Vous avez choisi : ${choixMinuscule}`);
      
      // Choix aléatoire de l'ordinateur
      const options = ['pierre', 'feuille', 'ciseaux'];
      const choixOrdinateur = options[Math.floor(Math.random() * options.length)];
      console.log(`L'ordinateur a choisi : ${choixOrdinateur}`);
      
      // Déterminer le gagnant
      if (choixMinuscule === choixOrdinateur) {
        console.log('Égalité !');
        egalites++;
      } else if (
        (choixMinuscule === 'pierre' && choixOrdinateur === 'ciseaux') ||
        (choixMinuscule === 'feuille' && choixOrdinateur === 'pierre') ||
        (choixMinuscule === 'ciseaux' && choixOrdinateur === 'feuille')
      ) {
        console.log('Vous gagnez !');
        victoires++;
      } else {
        console.log('Vous perdez !');
        defaites++;
      }
      
      // Afficher le score cumulatif
      console.log(`\nScore : Victoires: ${victoires} | Défaites: ${defaites} | Égalités: ${egalites}`);
      
      // Demander si le joueur veut rejouer
      rl.question("\nVoulez-vous rejouer ? (y/n) : ", (reponse) => {
        const reponseMinuscule = reponse.toLowerCase().trim();
        
        if (reponseMinuscule === 'y') {
          console.log('');
          jouerRound();
        } else if (reponseMinuscule === 'n') {
          console.log('Merci d\'avoir joué !');
          sauvegarderScores();
          rl.close();
        } else {
          console.log('Réponse invalide. Merci d\'avoir joué !');
          sauvegarderScores();
          rl.close();
        }
      });
    } else {
      console.log(`Choix invalide : ${choix}. Veuillez choisir entre 'pierre', 'feuille' ou 'ciseaux'.`);
      jouerRound();
    }
  });
}

jouerRound();
