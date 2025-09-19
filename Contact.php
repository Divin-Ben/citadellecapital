<?php
// Active l'affichage des erreurs pour le débogage. A désactiver en production.
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Redirige si le script n'est pas appelé via une méthode POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: index.html");
    exit();
}

// Récupérer les données du formulaire
$nom_client = htmlspecialchars($_POST['nom']);
$prenom_client = htmlspecialchars($_POST['prenom']);
$email_client = htmlspecialchars($_POST['email']);
$message = htmlspecialchars($_POST['message']);

// Informations du destinataire
$destinataire = "citadellecapital@gmail.com";
$sujet = "Nouveau message et preuve de paiement de Citadelle Capital";

// Construire le corps de l'e-mail
$corps_email = "Bonjour,\n\n";
$corps_email .= "Vous avez reçu un nouveau message via le formulaire de contact.\n\n";
$corps_email .= "Détails de la demande :\n";
$corps_email .= "Nom du client : " . $nom_client . "\n";
$corps_email .= "Prénom du client : " . $prenom_client . "\n";
$corps_email .= "Email du client : " . $email_client . "\n";
$corps_email .= "Message :\n" . $message . "\n";

// Gestion du fichier de preuve de paiement
$fichier_valide = false;
$nom_fichier = "";
$chemin_fichier = "";

// Vérifier si un fichier a été téléchargé
if (isset($_FILES['preuve_paiement']) && $_FILES['preuve_paiement']['error'] == UPLOAD_ERR_OK) {
    $nom_fichier = basename($_FILES['preuve_paiement']['name']);
    $chemin_fichier = $_FILES['preuve_paiement']['tmp_name'];
    $taille_fichier = $_FILES['preuve_paiement']['size'];
    $type_fichier = $_FILES['preuve_paiement']['type'];

    // S'assurer que le fichier est une image et qu'il n'est pas trop gros
    $types_autorises = ['image/jpeg', 'image/png', 'image/gif'];
    $taille_max = 5 * 1024 * 1024; // 5 Mo

    if (in_array($type_fichier, $types_autorises) && $taille_fichier <= $taille_max) {
        $fichier_valide = true;
    }
}

// Construction de l'e-mail avec ou sans pièce jointe
$boundary = md5(time());
$entetes = "From: " . $email_client . "\r\n";
$entetes .= "Reply-To: " . $email_client . "\r\n";
$entetes .= "MIME-Version: 1.0\r\n";
$entetes .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n\r\n";

// Corps de l'e-mail
$corps = "--" . $boundary . "\r\n";
$corps .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
$corps .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$corps .= $corps_email . "\r\n\r\n";

// Ajout du fichier en pièce jointe si valide
if ($fichier_valide) {
    $donnees_fichier = chunk_split(base64_encode(file_get_contents($chemin_fichier)));
    $corps .= "--" . $boundary . "\r\n";
    $corps .= "Content-Type: " . $type_fichier . "; name=\"" . $nom_fichier . "\"\r\n";
    $corps .= "Content-Transfer-Encoding: base64\r\n";
    $corps .= "Content-Disposition: attachment; filename=\"" . $nom_fichier . "\"\r\n\r\n";
    $corps .= $donnees_fichier . "\r\n\r\n";
}

$corps .= "--" . $boundary . "--";

// Envoi de l'e-mail
if (mail($destinataire, $sujet, $corps, $entetes)) {
    // Redirection après envoi réussi
    header("Location: index.html?success=true");
    exit();
} else {
    // Redirection en cas d'échec
    header("Location: index.html?success=false");
    exit();
}
?>
