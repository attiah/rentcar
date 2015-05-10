﻿


function save(command) {
    if (validData()) SaveData(command);
}
function validData() {
    try {
        var id = document.getElementById("userid").value;
        var name = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var pasword = document.getElementById("password").value;
        if (id == "") {
            showmessage("please input Onwer id ");
            return false;
        }

        if (name == "") {
            showmessage("please input Onwer name ");
            return false;
        }
        if (email == "") {
            showmessage("please input Onwer email ");
            return false;
        }

        if (phone == "") {
            showmessage("please input Onwer phone ");
            return false;
        }
        if (pasword == "") {
            showmessage("please input Onwer password ");
            return false;
        }

        if (phone.length != 10) {
            showmessage("Please input phone number in 10 numbers");
            return false;
        }
        if (phone.substring(0, 2) != "05") {
            showmessage("input phone incorrect format and start with 05");
            return false;
        }
        var expname = /^[0-9|]+$/;

        if (!expname.test(phone)) {
            showmessage("the phone must in number only ");
            return false;
        }

        if (email.indexOf(".") == -1 || email.indexOf("@") == -1) {
            showmessage("input Email incorrect format ");
            return false;
        }
        if (email.indexOf(".") < email.indexOf("@")) {
            showmessage("input Email incorrect format ");
            return false;
        }

        return true;
    }
    catch (e) { showmessage(e); }

}
//============================ Save Data

function SaveData(command) {
    try {
        var id = document.getElementById("userid").value;
        var name = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var pasword = document.getElementById("password").value;
        var current = document.getElementById("current").value;

        $.ajax({
            type: "POST",
            url: "http://www.tadreeb.ws/code/owner.ashx",
            data: { command: command, current: current, id: id, name: name, phone: phone, email: email, pass: pasword },
            success: function (par) {
                var arr = par.split("//");
                if (arr[0] != "") showmessage(arr[0]);
             
                var i = 0;
                for (i = 1; i < arr.length; i++) {
                    var d = arr[i].split("++");
                    document.getElementById("userid").value = d[0];
                    document.getElementById("username").value = d[1];
                    document.getElementById("phone").value = d[2];
                    document.getElementById("email").value = d[3];
                    document.getElementById("password").value = d[4];
                    document.getElementById("current").value = d[0];
                }
              

            },
            error: function (par) { showmessage(par); }
        });
    }
    catch (e) { showmessage(e); }
}
