function includeHTML()
{
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++)
    {
        elmnt = z[i];
        file = elmnt.getAttribute("include-html");
        if (file)
        {
        /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function()
            {
                if (this.readyState == 4)
                {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }      
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
};

document.addEventListener("DOMContentLoaded", ()=> {
    function init() {
        const yearElem = document.getElementById("yearCurrent");
        if (yearElem) {
            yearElem.textContent = new Date().getFullYear();
        }
    }
    setTimeout(init,500);
});

document.addEventListener("DOMContentLoaded", ()=> {
    emailjs.init("UwvDEoUNCiTtnRg9F");
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();
        document.getElementById("loader").style.display = "flex";
        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
        };
        emailjs.send("service_6sn6jvo", "template_3t5nn6n", formData)
            .then(function (response) {
                alert("Message sent successfully!");
                document.getElementById("contact-form").reset();
            })
            .catch(function (error) {
                alert("Failed to send message. Please try again.");
                console.error("Error:", error);
            })
            .finally(function () {
                document.getElementById("loader").style.display = "none";
            });
    });
});