(function () {
    emailjs.init("user_MkCT1xIxJ2h1sitIi1aDu");
})();

function sendMail(contactDetails) {

    let templateParams = {
        name: 'James',
        notes: 'Check this out!'
    };

    emailjs.send('service_dq6by94', 'flightdetails', {
        "from_name": contactDetails.nameInput.value,
        "user_email": contactDetails.inputEmail.value,
        "message": contactDetails.queryTextarea.value,
    })
        .then(function (response) {
            alert("SUCCESS");
        }, function (error) {
            console.log('FAILED...', error);
        });
    return false;
}
