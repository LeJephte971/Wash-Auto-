const prestations = [
    { nom: "Lavage Extérieur", description: "Nettoyage complet de l'extérieur du véhicule", prix: 70.00 },
    { nom: "Lavage Intérieur", description: "Nettoyage approfondi de l'intérieur du véhicule", prix: 60.00 },
    { nom: "Lavage Intérieur et Extérieur", description: "Nettoyage approfondi de l'intérieur et exterieur du véhicule", prix: 120.00 },
    { nom: "Lustrage Intégral", description: "Traitement complet avec lustrage", prix: 110.00 }
];

const produits = [
    { nom: "Pack lavage normal", description: "Pack avec lavage normal", prix: 12.00 },
    { nom: "Pack lavage premium", description: "Pack avec lavage premium", prix: 21.00 },
    { nom: "Pack lavage exclusif", description: "Pack avec lavage exclusif", prix: 35.00 },
    { nom: "Bouteille de savon ultra moussant", description: "Bouteille de savon ultra moussant", prix: 7.00 },
    { nom: "Pulvérisateur lustrant déperlant", description: "Pulvérisateur lustrant déperlant", prix: 5.00 },
    { nom: "Cire lustrante", description: "Cire lustrante", prix: 17.00 }
];

function afficherOptions() {
    const choix = document.getElementById("choix").value;
    const optionDiv = document.getElementById("optionSupplementaire");
    optionDiv.innerHTML = ""; // Réinitialiser le contenu
    

    if (choix === "prestation") {
        let select = '<label for="prestation">Choisissez une prestation :</label><select id="prestation">';
        prestations.forEach(prestation => {
            select += `<option value="${prestation.nom}">${prestation.nom}</option>`;
        });
        select += '</select>';
        optionDiv.innerHTML = select;

    } else if (choix === "produit") {
        let select = '<label for="produit">Choisissez un produit :</label><select id="produit">';
        produits.forEach(produit => {
            select += `<option value="${produit.nom}">${produit.nom}</option>`;
        });
        select += '</select><label for="quantite">Quantité :</label><input type="number" id="quantite" min="1" value="1">';
        optionDiv.innerHTML = select;
    }
}

// Fonction pour générer le devis
function genererDevis() {
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const adresse = document.getElementById("adresse").value;
    const telephone = document.getElementById("telephone").value;
    const mail = document.getElementById("mail").value;
    const choix = document.getElementById("choix").value;

    let nomProduitOuPrestation = "";
    let quantite = 1;
    let description = "";
    let prixHT = 0;

    if (choix === "prestation") {
        const prestationChoisie = document.getElementById("prestation").value;
        const prestation = prestations.find(p => p.nom === prestationChoisie);
        nomProduitOuPrestation = prestation.nom;
        description = prestation.description;
        prixHT = prestation.prix;

    } else if (choix === "produit") {
        const produitChoisi = document.getElementById("produit").value;
        quantite = parseInt(document.getElementById("quantite").value);
        const produit = produits.find(p => p.nom === produitChoisi);
        nomProduitOuPrestation = produit.nom;
        description = produit.description;
        prixHT = produit.prix * quantite;
    }

    const TVA = 0.2; // 20% de TVA
    const montantTVA = prixHT * TVA; // Montant de la TVA
    const prixTTC = prixHT + montantTVA; // Prix TTC


    afficherProforma(nom, prenom, adresse, telephone, mail, nomProduitOuPrestation, quantite, description, prixHT, montantTVA, prixTTC);
    genererPDF(nom, prenom, adresse, telephone, mail, nomProduitOuPrestation, quantite, description, prixHT, montantTVA, prixTTC);
}

// Fonction pour afficher le devis proforma
function afficherProforma(nom, prenom, adresse, telephone, mail, nomProduitOuPrestation, quantite, description, prixHT, montantTVA, prixTTC) {
    const proformaDiv = document.getElementById("proforma");
    proformaDiv.innerHTML = `
        <h2>Devis</h2>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Prénom :</strong> ${prenom}</p>
        <p><strong>Adresse :</strong> ${adresse}</p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
        <p><strong>Mail :</strong> ${mail}</p>
        <p><strong>Produit/Prestation :</strong> ${nomProduitOuPrestation}</p>
        <p><strong>Quantité :</strong> ${quantite}</p>
        <p><strong>Description :</strong> ${description}</p>
        <p><strong>Prix HT :</strong> ${prixHT.toFixed(2)} €</p>
        <p><strong>TVA (20%) :</strong> ${montantTVA.toFixed(2)} €</p>
        <p><strong>Prix TTC :</strong> ${prixTTC.toFixed(2)} €</p>
    `;
}

// Fonction pour générer le PDF du devis
function genererPDF(nom, prenom, adresse, telephone, mail, nomProduitOuPrestation, quantite, description, prixHT, montantTVA, prixTTC) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Ajout d'un en-tête
    doc.setFontSize(20);
    doc.text("Devis", 10, 20);
    doc.setFontSize(12);
    doc.text("N° 2024-001", 10, 30);

    // Détails de l'entreprise
    doc.setFontSize(16);
    doc.text("Shine auto", 150, 20);
    doc.setFontSize(12);
    doc.text("12 Rue de la Liberté, 75015", 150, 30);
    doc.text("Téléphone : 01 23 45 67 89", 150, 40);
    doc.text("Email : shineauto@gmail.com", 150, 50);

    // Informations du client
    doc.setFontSize(14);
    doc.text("Informations du client", 10, 70);
    doc.setFontSize(12);
    doc.text(`Nom du client : ${prenom} ${nom}`, 10, 80);
    doc.text(`Adresse : ${adresse}`, 10, 90);
    doc.text(`Téléphone : ${telephone}`, 10, 100);
    doc.text(`Email : ${mail}`, 10, 110);

    // Détails du devis
    doc.setFontSize(14);
    doc.text("Détails du devis", 10, 130);
    const startY = 140;
    doc.autoTable({
        head: [['Description', 'Quantité', 'Prix Unitaire', 'Total']],
        body: [[description, quantite, `${prixHT.toFixed(2)} €`, `${prixTTC.toFixed(2)} €`]],
        startY: startY,
        theme: 'grid',
    });
}

// Vérification du numéro de téléphone
function verifierNumeroTelephone(numero) {
    const regex = /^0[1-68]([-. ]?[0-9]{2}){4}$/;
    return regex.test(numero);
}

// Vérification de l'adresse e-mail
function verifierEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}



// Écouteur d'événement pour la soumission du formulaire
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formulaire');

    form.addEventListener('submit', function (event) {
        const numeroTelephone = document.getElementById('telephone').value;
        const email = document.getElementById('mail').value;

        // Vérification du numéro de téléphone
        if (!verifierNumeroTelephone(numeroTelephone)) {
            alert('Le numéro de téléphone est incorrect. Veuillez entrer un numéro valide.');
            event.preventDefault();
        }
        // Vérification de l'adresse e-mail
        else if (!verifierEmail(email)) {
            alert('L\'adresse e-mail est incorrecte. Veuillez entrer une adresse e-mail valide.');
            event.preventDefault();
        } 
        // Générer le devis si tout est correct
        else {
            genererDevis();
            event.preventDefault();
        }
    });
});

// Fonction pour réinitialiser le formulaire
function resetForm() {
    document.getElementById("formulaire").reset();
    document.getElementById("optionSupplementaire").innerHTML = ""; // Réinitialiser le contenu des options
    document.getElementById("proforma").innerHTML = ""; // Effacer le devis proforma affiché
}

// Fonction pour générer le PDF du devis
function genererPDF(nom, prenom, adresse, telephone, mail, nomProduitOuPrestation, quantite, description, prixHT, montantTVA, prixTTC) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // En-tête
    doc.setFontSize(24);
    doc.setTextColor(11, 49, 238); // Couleur bleue pour le titre
    doc.text("Devis", 10, 20);

    // Informations de l'entreprise
    doc.setFontSize(12);
    doc.setTextColor(100); // Gris pour le texte de l'entreprise
    doc.text("Shine Auto", 10, 30);
    doc.text("12 Rue de la Liberté, 75015 Paris", 10, 35);
    doc.text("Téléphone : 01 23 45 67 89", 10, 40);
    doc.text("Email : shineauto@gmail.com", 10, 45);
    
    // Informations du client
    doc.setFontSize(14);
    doc.setTextColor(0); // Noir pour le texte des clients
    doc.text("Informations du client", 10, 60);
    doc.setFontSize(12);
    doc.text(`Nom du client : ${prenom} ${nom}`, 10, 70);
    doc.text(`Adresse : ${adresse}`, 10, 75);
    doc.text(`Téléphone : ${telephone}`, 10, 80);
    doc.text(`Email : ${mail}`, 10, 85);
    
    // Détails de la prestation ou du produit
    doc.setFontSize(14);
    doc.setTextColor(0); // Noir par défaut
    doc.text("Détails du Devis", 10, 100);

    // Tableau pour afficher le produit ou la prestation
    const startY = 110;
    doc.autoTable({
        head: [['Description', 'Quantité', 'Prix HT', 'Total']],
        body: [[description, quantite, `${prixHT.toFixed(2)} €`, `${prixTTC.toFixed(2)} €`]],
        startY: startY,
        styles: { fillColor: [230, 230, 250] }, // Couleur de fond du tableau
        headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255], fontSize: 12 }, // En-tête du tableau
        theme: 'grid',
    });


    // Footer
    const totalY = doc.previousAutoTable.finalY + 20;
    doc.setFontSize(12);
    doc.setTextColor(0); // Noir pour le texte du footer
    doc.text(`Total HT : ${prixHT.toFixed(2)} €`, 10, totalY);
    doc.text(`Total TTC : ${prixTTC.toFixed(2)} €`, 10, totalY + 10);
    doc.text(`Total TVA : 20%`, 10, totalY + 20);
    doc.setFontSize(10);
    doc.text("Conditions de paiement : Paiement sous 30 jours.", 10, totalY + 40);
    doc.text("Merci pour votre confiance !", 10, totalY + 45);

    // Sauvegarde du PDF
    doc.save('Devis.pdf');
}


document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.link');
    const page = document.getElementById('page');
  
    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
  
        // Ajoute l'effet de fondu en sortie
        page.classList.add('fade-out');
  
        // Attends la fin de l'animation avant de rediriger
        setTimeout(() => {
          window.location.href = this.href;
        }, 700); // Correspond à la durée de la transition (0.5s)
      });
    });
  });