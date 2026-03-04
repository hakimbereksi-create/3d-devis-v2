$(document).ready(function(){
    var files;

    $('input[type=file]').on('change', prepareUpload);
    $("#loading").hide();

    // 🔥 POPUP DEVIS
    function prepareUpload(event) {
        files = event.target.files;
        console.log("FILE added to upload queue.", files[0]);
        
        if (files && files.length > 0) {
            const file = files[0];
            window.hb3d_volume = Math.round(file.size / 1000 * 0.1); 
            window.hb3d_price = (window.hb3d_volume * 0.05).toFixed(2);
            
            alert(`🎉 **DEVIS 3D HB3D**\\n\\n` +
                  `📐 **${file.name}**\\n` +
                  `📦 **${window.hb3d_volume} cm³**\\n` +
                  `💰 **${window.hb3d_price}€ HT**\\n\\n` +
                  `📧 contact@hb3d.fr\\n` +
                  `📞 +33 06 84 88 25 54`);
        }
    }

    $('#submit').on('click', uploadFiles);

    function uploadFiles(event) {
        event.stopPropagation();
        event.preventDefault();
        $("#loading").show();
        
        // 🔥 EMAILJS DIRECT (pas besoin PHP)
        if (files && files[0]) {
            emailjs.send('default_service', 'hb3d_devis', {
                filename: files[0].name,
                volume: window.hb3d_volume + ' cm³',
                price: window.hb3d_price + ' € HT',
                from_email: $("#email").val() || 'non renseigné',
                from_name: $("#name").val() || 'non renseigné',
                from_message: $("#message").val() || ''
            }).then(function(response) {
                $("#loading").hide();
                alert("✅ DEVIS envoyé ! Merci 😊");
            }, function(error) {
                $("#loading").hide();
                alert("❌ EmailJS non configuré. Contact: contact@hb3d.fr");
                console.log('EmailJS error:', error);
            });
        }
    }
});
