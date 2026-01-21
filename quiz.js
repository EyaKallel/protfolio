// Quiz avec VALIDATION OBLIGATOIRE

const bonnesReponses = {
    q1: 'a',
    q2: 'a',
    q3: 'b',
    q4: 'a',
    q5: 'c',
    q6: 'b',
    q7: 'a',
    q8: 'b',
    q9: 'a',
    q10: 'b'
};

function calculerScore() {
    const formulaire = document.getElementById('quizForm');
    
    // VÉRIFIER SI TOUTES LES QUESTIONS SONT RÉPONDUES
    let toutesReponses = true;
    let questionsManquantes = [];
    
    for (let question in bonnesReponses) {
        const reponse = formulaire.querySelector(`input[name="${question}"]:checked`);
        if (!reponse) {
            toutesReponses = false;
            questionsManquantes.push(question.replace('q', ''));
        }
    }
    
    // SI PAS TOUTES LES RÉPONSES : ALERTE
    if (!toutesReponses) {
        alert("⚠️ Attention ! Vous devez répondre à TOUTES les questions !\n\nQuestions manquantes : " + questionsManquantes.join(', '));
        return;
    }
    
    // CALCULER LE SCORE
    let score = 0;
    let nbCorrect = 0;
    
    for (let question in bonnesReponses) {
        const reponse = formulaire.querySelector(`input[name="${question}"]:checked`);
        if (reponse.value === bonnesReponses[question]) {
            score++;
            nbCorrect++;
        }
    }
    
    // AFFICHER LE RÉSULTAT
    const zoneResultat = document.getElementById('result');
    const pourcentage = (score / 10) * 100;
    
    let message = '';
    if (pourcentage >= 80) {
        message = "Excellent ! ";
    } else if (pourcentage >= 60) {
        message = "Bien ! ";
    } else if (pourcentage >= 40) {
        message = "Peut mieux faire ! 📚";
    } else {
        message = "Il faut réviser ! ";
    }
    
    zoneResultat.innerHTML = `
        <h2>Votre Score : ${score}/10</h2>
        <p>${message}</p>
        <p><strong>Réponses correctes : ${nbCorrect}</strong></p>
    `;
    
    // AFFICHER LES BONNES RÉPONSES
    afficherBonnesReponses();
}

function afficherBonnesReponses() {
    const zoneReponses = document.getElementById('answers');
    zoneReponses.style.display = 'block';
    
    let html = '<h2>✅ Bonnes Réponses :</h2><ul>';
    
    const explications = {
        q1: 'Q1 : pour le pied de page',
        q2: 'Q2 : text-align: center',
        q3: 'Q3 : JavaScript',
        q4: 'Q4 : le plus grand',
        q5: 'Q5 : Bootstrap',
        q6: 'Q6 : display: flex',
        q7: 'Q7 : MySQL',
        q8: 'Q8 : Git',
        q9: 'Q9 : HyperText Markup Language',
        q10: 'Q10 : Langage de script'
    };
    
    for (let q in bonnesReponses) {
        html += `<li>${explications[q]} → Réponse ${bonnesReponses[q].toUpperCase()}</li>`;
    }
    
    html += '</ul>';
    zoneReponses.innerHTML = html;
}

// BARRE DE PROGRESSION
function mettreAJourProgression() {
    const formulaire = document.getElementById('quizForm');
    let repondues = 0;
    
    for (let q in bonnesReponses) {
        if (formulaire.querySelector(`input[name="${q}"]:checked`)) {
            repondues++;
        }
    }
    
    const pourcent = (repondues / 10) * 100;
    const barre = document.getElementById('progress-bar');
    if (barre) {
        barre.style.width = pourcent + '%';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
        radio.addEventListener('change', mettreAJourProgression);
    });
});