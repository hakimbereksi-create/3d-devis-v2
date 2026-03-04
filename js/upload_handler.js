$(document).ready(function(){
    // 1. STL → CALCUL VOLUME SEUL (AUCUN MAIL)
    $('input[type=file]').on('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var volume = Math.round(file.size / 1000 * 0.1);
            var price = (volume * 0.05).toFixed(2);
            
            // 💾 SAUVEGARDE pour BOUTON
            window.hb3dQuote = {volume: volume, price: price, file: file.name};
            
            alert('📦 VOLUME CALCULÉ !\n\n' +
                  file.name + '\n' + volume + ' cm³ = ' + price + '€ HT\n\n' +
                  '✅ Remplissez le formulaire → ENVOYER');
        }
    });

    // 2. BOUTON ENVOYER → MAIL COMPLET
    $('#submit').on('click', function() {
        // Vérif STL chargé
        if (!window.hb3dQuote) {
            alert('⚠️ 1️⃣ Chargez d\'abord un fichier STL !');
            return;
        }
        
        // Récup formulaire
        var formData = {
            nom: $('#name').val() || 'Anonyme',
            email: $('#email').val() || 'non fourni',
            material: $('input[name="material"]:checked').val() || 'Non sélectionné',
            color: $('input[name="color"]:checked').val() || 'Non sélectionné',
            qty: $('#qty').val() || 1,
            message: $('#message').val() || '',
            fichier: window.hb3dQuote.file,
            volume: window.hb3dQuote.volume + ' cm³',
            prix: window.hb3dQuote.price + '€ HT'
        };

        // 🚀 ENVOI MAIL
        emailjs.send('service_np51rgo', 'template_7mjwzt9', formData)
        .then(() => {
            alert('🎉 DEVIS ENVOYÉ PARFAITEMENT !\n\n' +
                  '✅ ' + formData.material + ' ' + formData.color + '\n' +
                  '📦 ' + formData.volume + ' → ' + formData.prix);
            $('#form')[0].reset();
            window.hb3dQuote = null;
        })
        .catch(error => {
            console.error('EmailJS ERROR:', error);
            alert('❌ Erreur technique\n📧 contact@hb3d.fr direct');
        });
    });
});
