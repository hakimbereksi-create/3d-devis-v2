$(document).ready(function(){
    // Popup devis simple SANS conflits
    $('input[type=file]').on('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var volume = Math.round(file.size / 1000 * 0.1);
            var price = (volume * 0.05).toFixed(2);
            
            alert('🎉 DEVIS 3D HB3D\n\n' +
                  '📐 ' + file.name + '\n' +
                  '📦 ' + volume + ' cm³\n' +
                  '💰 ' + price + '€ HT\n\n' +
                  '📧 contact@hb3d.fr\n' +
                  '📞 +33 6 84 88 25 54\n\n' +
                  '**Copiez ce devis !**');
        }
    });

    // Submit simple
    $('#submit').on('click', function() {
        alert('✅ DEVIS PRÊT ! Contactez contact@hb3d.fr avec le popup ci-dessus');
    });
});
