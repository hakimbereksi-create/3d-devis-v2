$(document).ready(function(){
    $('input[type=file]').on('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var volume = Math.round(file.size / 1000 * 0.1);
            var price = (volume * 0.05).toFixed(2);
            
            emailjs.send('service_np51rgo', 'template_7mjwzt9', {
                nom: 'Client HB3D',
                fichier: file.name,
                volume: volume + ' cm³',
                prix: price + '€ HT'
            })
            .then(() => alert('✅ MAIL ENVOYÉ ! Devis: ' + volume + 'cm³ = ' + price + '€'))
            .catch(error => {
                console.error('🚨 EmailJS ERROR:', error);
                alert('❌ Erreur mail. Contact: contact@hb3d.fr');
            });
        }
    });
});
