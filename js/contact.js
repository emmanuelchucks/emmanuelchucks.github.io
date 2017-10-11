$(function() {
    // Get the form.
    var form = $("#contact-form");

    // Get the messages div.
    var formMessages = $("#form-messages");

    // TODO: The rest of the code will go here...
    $(form).submit(function(event) {
    // Stop the browser from submitting the form.
        event.preventDefault();
        $("#submit-btn").addClass("fade-blue").val("Sending...");

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            url: "https://formspree.io/echucks19@gmail.com",
            method: "POST",
            data: JSON.stringify(formData),
            dataType: "json"
        })
            .done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass("alert-danger");
                $(formMessages).addClass("alert-success");
                $("#submit-btn").removeClass("fade-blue").val("Send message");

                // Set the message text.
                $(formMessages).text("Thanks for your message! I will reply shortly.");

                // Clear the form.
                $("#name").val("");
                $("#compname").val("");
                $("#email").val("");
                $("#message").val("");
            })
            .fail(function(data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass("alert-success");
                $(formMessages).addClass("alert-danger");

                // Set the message text.
                if (data.responseText !== "") {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text(
                        "Your message could not be sent. Please refresh the page and try again."
                    );
                }
            });
    });
});
