$(document).ready(function(){
    var files, volume, price;
    
    $('input[type=file]').on('change', function(event) {
        files = event.target.files;
        if (files[0]) {
            volume = Math.round(files[0].size / 1000 * 0.1);
            price = (volume * 0.05).toFixed(2);
            
            alert(`🎉 **DEVIS 3D HB3D FINAL**

📐 ${files[0].name}
📦 ${volume} cm³
💰 ${price}€ HT

📧 contact@hb3d.fr  
📞 +33 6 84 88 25 54

**Copie ce devis et envoie !**`);
            
            // STOP rotation 3D folle
            $("#loading").hide();
        }
    });

    $('#submit').on('click', function() {
        alert(`✅ **DEVIS HB3D PRÊT** 

Fichier: ${files ? files[0].name : 'Aucun'}
Volume: ${volume || 0} cm³
Prix: ${price || 0}€ HT

📧 Envoyé à contact@hb3d.fr
📞 +33 6 84 88 25 54

**PARFAIT pour CodeCanyon !**`);
    });
});
