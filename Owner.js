
function reset() {
    try {
         document.getElementById("userid").value="";
         document.getElementById("username").value="";
         document.getElementById("email").value="";
         document.getElementById("phone").value="";
         document.getElementById("password").value="";
      
    }
    catch (e) { showmessage(e); }

}

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
                $('#ldata').empty();
                var i = 0;
                for (i = 1; i < arr.length; i++) {
                    var d = arr[i].split("++");
                    $('<li data-icon="false">').append('<h2> Owner ID : ' + d[0] + '</h2><h2> Owner Name : ' + d[1] + '</h2><h2> Phone : ' + d[2] + '</h2> <div data-role="controlgroup" data-type="horizontal"><a href="javascript:display(\'' + d[0] + '\',\'' + d[1] + '\',\'' + d[2] + '\',\'' + d[3] + '\',\'' + d[4] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-edit  ui-btn-icon-notext"></a> <a href="javascript:Delete(\'' + d[0] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-delete  ui-btn-icon-notext"></a></div>').appendTo('#ldata');
                }
                $('#ldata').listview().listview('refresh');

            },
            error: function (par) { showmessage(par); }
        });
    }
    catch (e) { showmessage(e); }
}

//============
function display(id, name, phone, email, password) {
    try {
        document.getElementById("userid").value = id;
        document.getElementById("username").value = name;
        document.getElementById("email").value = email;
        document.getElementById("phone").value = phone;
        document.getElementById("password").value = password;
        document.getElementById("current").value = id;
    }
    catch (e) { showmessage(e); }
}
function Delete(id) {
    document.getElementById("current").value = id;
    var answer = confirm('are you sure ?');
    if (answer) {
        SaveData('delete');
    }
}