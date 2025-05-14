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