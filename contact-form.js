document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Send the email using EmailJS
    emailjs.send('service_phgwqad', 'template_fmq9bdl', formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');
        }, function(error) {
            console.error('FAILED...', error);
            alert('Failed to send message. Please try again later.');
        });
});