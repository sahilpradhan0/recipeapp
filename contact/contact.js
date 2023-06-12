const fullName = document.getElementById("name");
const email = document.getElementById("email");
const msg = document.getElementById("message");
const submit = document.getElementById("submit");

submit.addEventListener('click', (e) => {
    e.preventDefault();
    var params = {
        from_name : fullName.value,
        email_id : email.value,
        message : msg.value,
    }
    emailjs.send("service_9d841jn","template_659n92g",params).then(function(res){
        alert("Message sent successfully");
    })

})