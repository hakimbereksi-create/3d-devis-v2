$(document).ready(function(){
    var files;
    $('input[type=file]').on('change', prepareUpload);
    $('#submit').on('click', uploadFiles);
    $("#loading").hide();

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

    function uploadFiles(event) {
        event.preventDefault();
        $("#loading").show();
        
        emailjs.send('service_np51rgo', 'template_7mjwzt9', {
            filename: files[0].name,
            volume: window.hb3d_volume + ' cm³',
            price: window.hb3d_price + ' € HT',
            from_name: $("#name").val() || 'Client HB3D',
            from_email: $("#email").val() || 'non renseigné',
            from_message: $("#message").val() || ''
        }).then(function() {
            $("#loading").hide();
            alert("✅ MAIL ENVOYÉ à contact@hb3d.fr ! Merci 😊");
        }, function(error) {
            $("#loading").hide();
            alert("❌ Erreur. Contact: +33 06 84 88 25 54");
        });
    }
});
