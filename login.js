
function home() {
    window.location = "index.html";
}
function aboutMenu() {
    window.location = "about.html";
}
function loginMenu() {
    window.location = "login.html";
}
function ContactMenu() {
    window.location = "contactus.html";
}

function NoteMenu() {
    window.location = "note.html";
}

//------------------------
function cregister() 
{
    try {
        var id = document.getElementById("userid").value;
        var name = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var pasword = document.getElementById("password").value;
        if (id == "") {
            showmessage("please input Customer id ");
            return;
        }

        if (name == "") {
            showmessage("please input Customer name ");
            return;
        }
        if (email == "") {
            showmessage("please input Customer email ");
            return;
        }

        if (phone == "") {
            showmessage("please input Customer phone ");
            return;
        }
        if (pasword == "") {
            showmessage("please input Customer password ");
            return;
        }
       
        if (phone.length != 10) {
            showmessage("Please input phone number in 10 numbers");
            return;
        }
        if (phone.substring(0,2) != "05") {
            showmessage("input phone incorrect format and start with 05");
            return;
        }
        var expname = /^[0-9|]+$/;

        if (!expname.test(phone)) {
            showmessage("the phone must in number only ");
            return;
        }

        if (email.indexOf(".") == -1 || email.indexOf("@") == -1) {
            showmessage("input Email incorrect format ");
            return;
        }
        

        $.ajax({
            type: "POST",
            url: "http://www.tadreeb.ws/code/cregister.ashx",
            data: { id: id, name: name, phone: phone, email: email, pass: pasword },
            success: function (par) {
                showmessage(par);
            },
            error: function (par) { showmessage(par); }
        });
    }
    catch (e) { showmessage(e); }

}
//-----------------------
//------------------------
function onwer() {
    try {
        var id = document.getElementById("userid").value;
        var name = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var pasword = document.getElementById("password").value;
        if (id == "") {
            showmessage("please input Onwer id ");
            return;
        }

        if (name == "") {
            showmessage("please input Onwer name ");
            return;
        }
        if (email == "") {
            showmessage("please input Onwer email ");
            return;
        }

        if (phone == "") {
            showmessage("please input Onwer phone ");
            return;
        }
        if (pasword == "") {
            showmessage("please input Onwer password ");
            return;
        }

        if (phone.length != 10) {
            showmessage("Please input phone number in 10 numbers");
            return;
        }
        if (phone.substring(0, 2) != "05") {
            showmessage("input phone incorrect format and start with 05");
            return;
        }
        var expname = /^[0-9|]+$/;

        if (!expname.test(phone)) {
            showmessage("the phone must in number only ");
            return;
        }

        if (email.indexOf(".") == -1 || email.indexOf("@") == -1) {
            showmessage("input Email incorrect format ");
            return;
        }
        if (email.indexOf(".") < email.indexOf("@")) {
            showmessage("input Email incorrect format ");
            return;
        }

        $.ajax({
            type: "POST",
            url: "http://www.tadreeb.ws/code/OnwerRegister.ashx",
            data: { id: id, name: name, phone: phone, email: email, pass: pasword },
            success: function (par) {
                showmessage(par);
            },
            error: function (par) { showmessage(par); }
        });
    }
    catch (e) { showmessage(e); }

}
//-----------------------
function login() {
    try {
        var id = document.getElementById("id").value;
        var pasword = document.getElementById("pass").value;
        if (id == "") {
            showmessage("please input user id ");
            return;
        }

        if (pasword == "") {
            showmessage("please input  password ");
            return;
        }


        $.ajax({
            type: "POST",
            url: "http://www.tadreeb.ws/code/login.ashx",
            data: { id: id,  pass: pasword },
            success: function (par) {
                var arr = par.split("//");
                showmessage(arr[1]);
                if (arr[0] == "1") {
                    window.location = "customerpage.html";
                }
                if (arr[0] == "2") {
                    window.location = "ownerpage.html";
                }
                if (arr[0] == "3") {
                    window.location = "admin.html";
                }
            },
            error: function (par) { showmessage(par); }
        });
    }
    catch (e) { showmessage(e); }


}