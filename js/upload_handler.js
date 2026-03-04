$(document).ready(function(){
    var files, volume, price;
    
    $('input[type=file]').on('change', prepareUpload);
    $('#submit').on('click', uploadFiles);
    $("#loading").hide();

    function prepareUpload(event) {
        files = event.target.files;
        console.log("FILE added:", files[0]);
        
        if (files && files[0]) {
            const file = files[0];
            volume = Math.round(file.size / 1000 * 0.1);
            price = (volume * 0.05).toFixed(2);
            
            alert(`🎉 **DEVIS 3D HB3D**

📐 **${file.name}**
📦 **${volume} cm³**
💰 **${price}€ HT**

📧 contact@hb3d.fr
📞 +33 6 84 88 25 54`);
        }
    }

    function uploadFiles(event) {
        event.preventDefault();
        
        if (!files || !volume) {
            alert("❌ Sélectionne un fichier STL d'abord");
            return;
        }
        
        $("#loading").show();
        console.log('🚀 EmailJS →', files[0].name, volume, price);
        
        // 🔥 EMAILJS v4 SYNTAXE
        emailjs.send('service_np51rgo', 'template_7mjwzt9', {
            filename: files[0].name,
            volume: volume + ' cm³',
            price: price + ' € HT',
            from_name: $("#name").val() || 'Client HB3D',
            from_email: $("#email").val() || 'non renseigné',
            from_message: $("#message").val() || ''
        }).then((response) => {
            $("#loading").hide();
            alert("✅ MAIL ENVOYÉ à contact@hb3d.fr !");
            console.log('✅ EmailJS:', response.status, response.text);
        }).catch((error) => {
            $("#loading").hide();
            console.log('❌ EmailJS ERROR:', error);
            alert("❌ Erreur. Contact: +33 6 84 88 25 54");
        });
    }
});
