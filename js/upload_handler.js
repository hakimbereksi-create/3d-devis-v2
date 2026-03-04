$(document).ready(function(){
    // Variable to store your files
    var files;

    // Add events
    $('input[type=file]').on('change', prepareUpload);

    $("#loading").hide();

    // 🔥 prepareUpload MODIFIÉ → POPUP DEVIS
    function prepareUpload(event)
    {
        files = event.target.files;
        console.log("FILE added to upload queue.", files[0]);
        
        // 🔥 POPUP DEVIS HB3D INSTANT
        if (files && files.length > 0) {
            const file = files[0];
            const volume = Math.round(file.size / 1000 * 0.1); 
            const price = (volume * 0.05).toFixed(2);
            
            alert(`🎉 **DEVIS 3D HB3D**\\n\\n` +
                  `📐 **${file.name}**\\n` +
                  `📦 **${volume} cm³**\\n` +
                  `💰 **${price}€ HT**\\n\\n` +
                  `📧 contact@hb3d.fr\\n` +
                  `📞 +33 6 XX XX XX XX`);
            
            console.log('✅ DEVIS:', volume, 'cm³ →', price, '€');
        }
    }

    $('#submit').on('click', uploadFiles);

    // RESTE IDENTIQUE...
    function uploadFiles(event) {
        event.stopPropagation();
        event.preventDefault();
        $("#loading").show();
        var data = new FormData();
        $.each(files, function(key, value) {
            data.append(key, value);
            console.log(value);
        });
        $.ajax({
            url: './php/upload.php?files',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function(data, textStatus, jqXHR) {
                if(typeof data.error === 'undefined') {
                    submitForm(event, data);
                } else {
                    console.log('1.ERRORS: ' + data.error);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('2.ERRORS: ' + errorThrown);
                $("#loading").hide();
            }
        });
    }

    // submitForm IDENTIQUE...
    function submitForm(event, data) {
        $form = $("#form");
        var formData = $form.serialize();
        $.each(data.files, function(key, value) {
            formData = formData + '&filenames[]=' + value;
        });
        $.ajax({
            url: './php/submit.php',
            type: 'POST',
            data: formData,
            cache: false,
            dataType: 'json',
            success: function(data, textStatus, jqXHR) {
                if(typeof data.error === 'undefined') {
                    console.log('SUCCESS: ' + data.success);
                } else {
                    console.log('1.ERRORS: ' + data.error);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('2.ERRORS: ' + errorThrown);
            },
            complete: function() {
                $("#loading").hide();
                alert("Your 3D printing order is now in our queue :) \\n Thank you.");
            }
        });
    }
});

