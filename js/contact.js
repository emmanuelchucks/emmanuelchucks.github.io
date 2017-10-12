$(() => {
    // Get the form.
    const form = $("#contact-form");

    // Get the messages div.
    const formMessages = $("#form-messages");

    // TODO: The rest of the code will go here...
    $(form).submit((event) => {
        // Stop the browser from submitting the form.
        event.preventDefault();
        $("#submit-btn")
            .addClass("fade-blue")
            .val("Sending...");

        const formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            url: "https://formspree.io/echucks19@gmail.com",
            method: "POST",
            data: JSON.stringify(formData),
            dataType: "json",
        })
            .done((response) => {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass("alert alert-danger");
                $(formMessages).addClass("alert alert-success");
                $("#submit-btn")
                    .removeClass("fade-blue")
                    .val("Send message");

                // Set the message text.
                $(formMessages).text(
                    "Thanks for your message! I will reply shortly.",
                );

                // Clear the form.
                $("#name").val("");
                $("#compname").val("");
                $("#email").val("");
                $("#phone").val("");
                $("#message").val("");
            })
            .fail((data) => {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass("alert alert-success");
                $(formMessages).addClass("alert alert-danger");
                $("#submit-btn").val("Sending failed...");

                // Set the message text.
                $(formMessages).text(
                    "Your message could not be sent. Please refresh the page and try again.",
                );
            });
    });
});
