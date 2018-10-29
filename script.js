/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 10;

/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
 * með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 */
function start() {
  alert('Markmiðið er að svara eins mörgum af 10 dæmum rétt eins hratt og mögulegt er.');
  do {
    play();
  }
  while (confirm("Spila annan?"))
}

/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 *
 * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
 * upplsýingar um niðurstöður.
 *
 */
function play() {
  const startTime = performance.now();
  let games = 0;
  let stig = 0;
  let asking;
  do {
    asking = ask();
    if(asking === true){
      console.log('Stig!');
      stig++;
    }
    if(asking === null){
      alert("Hætt í leik");
      return;
    }
    games++;
  } while (GAMES_TO_PLAY > games)
  const endTime = (performance.now() - startTime)/1000;
  let avg = stig/endTime;
  alert(`Þú svaraðir ${stig} af ${games} rétt á ${endTime.toFixed(2)} sekúndum. \n 
  Meðalrétt svör á sekúndu eru ${avg.toFixed(2)}`);
  
  return true;
}

/**
 * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
 * nota true, false og null ef notandi hættir). Birtir notanda propmpt til að
 * svara í og túlkar svarið yfir í tölu.
 *
 * Mögulegar spurningar eru:
 * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
 * - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
 *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
 *
 * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.
 */
function ask() {
  const question = getQuestion();

  const input = prompt(`Hvað er ${question.spurning}`);
  if (parseGuess(input) === null) {
    return null;
  }
  if (question.svar == parseGuess(input)) {
    return true;
  }
  return false;
}

function getQuestion() {
  const random = Math.random() * 100;  
  const spurnSvar = {
    spurning: null,
    svar: null
  };
  if (random < 25) {
    const tala1 = randomNumber(1, 100);
    const tala2 = randomNumber(1, 100);
    spurnSvar.spurning = `${tala1} \+ ${tala2}`;
    spurnSvar.svar = tala1 + tala2;
    return spurnSvar;
  } else if (random < 50) {
    const tala1 = randomNumber(1, 100);
    const tala2 = randomNumber(1, 100);
    spurnSvar.spurning = `${tala1} \- ${tala2}`;
    spurnSvar.svar = tala1 - tala2;
    return spurnSvar;
  } else if (random < 75) {
    const tala1 = randomNumber(1, 10);
    const tala2 = randomNumber(1, 10);
    spurnSvar.spurning = `${tala1} \* ${tala2}`;
    spurnSvar.svar = tala1 * tala2;
    return spurnSvar;
  } else {
    const tala1 = randomNumber(2, 10);
    const tala2 = tala1 * randomNumber(2, 10);
    spurnSvar.spurning = `${tala2} \/ ${tala1}`;
    spurnSvar.svar = tala2 / tala1;
    return spurnSvar;
  }
}
/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Tekur inn input sem streng og skilar þeirri tölu sem hægt er að ná þar úr.
 * Ef ekki er hægt að ná tölu úr input er null skilað.
 */
function parseGuess(input) {
  const parsed = parseInt(input, 10);

  if (isNaN(parsed)) {
    return null;
  }

  return parsed;
}

// Byrjar leik
start();