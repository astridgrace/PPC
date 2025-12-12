const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Bienvenue dans Pierre-Feuille-Ciseaux !");

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
    } else if (
      (choixMinuscule === 'pierre' && choixOrdinateur === 'ciseaux') ||
      (choixMinuscule === 'feuille' && choixOrdinateur === 'pierre') ||
      (choixMinuscule === 'ciseaux' && choixOrdinateur === 'feuille')
    ) {
      console.log('Vous gagnez !');
    } else {
      console.log('Vous perdez !');
    }
  } else {
    console.log(`Choix invalide : ${choix}. Veuillez choisir entre 'pierre', 'feuille' ou 'ciseaux'.`);
  }
  
  rl.close();
});
