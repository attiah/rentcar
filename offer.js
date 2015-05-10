
function reset() {
    try {
         document.getElementById("id").value="";
         document.getElementById("date").value="";
         document.getElementById("price").value="";
    }
    catch (e) { showmessage(e); }

}

function save(command) {
    if (command == 'save') 
    {
        if (document.getElementById("id").value == "") {
            showmessage("please input Offer  record ");
            return ;
        }
    }
    if (validData()) SaveData(command);
}
function validData() {
    try {
       
        
        var date = document.getElementById("date").value;
        var price = document.getElementById("price").value;
        var cmbi = document.getElementById("cmbi").value;
        var cmbs = document.getElementById("cmbs").value;
      

        if (date == "") {
            showmessage("please input Offer  date ");
            return false;
        }
        if (price == "") {
            showmessage("please input Offer price ");
            return false;
        }

        if (cmbi == "") {
            showmessage("please  Select  Interval ");
            return false;
        }
        if (cmbs == "") {
            showmessage("please Select stadium ");
            return false;
        }

       
        var expname = /^[0-9|]+$/;

        if (!expname.test(price)) {
            showmessage("the price must in number only ");
            return false;
        }

     
       return true;
    }
    catch (e) { showmessage(e); }

}
//============================ Save Data
function SaveData(command) {
    try {
        var id = document.getElementById("id").value;
        var cmbi = document.getElementById("cmbi").value;
        var cmbs = document.getElementById("cmbs").value;
        var price = document.getElementById("price").value;
        var date = document.getElementById("date").value;
        var current = document.getElementById("current").value;
        
        $.ajax({
            type: "POST",
            url: "http://www.tadreeb.ws/code/offer.ashx",
            data: { command: command,current:current, id: id, price: price, date: date, cmbi: cmbi, cmbs: cmbs },
            success: function (par) {
                var arr = par.split("//");
                if (arr[0] != "") showmessage(arr[0]);
                $('#ldata').empty();
                var i = 0;
                for (i = 1; i < arr.length; i++) {
                    var d=arr[i].split("++");
                    $('<li data-icon="false">').append('</h2><h2> Stadium Name : ' + d[8] + '</h2><h2> Interval : ' + d[7] + '</h2><h2> Date : ' + d[3] + '</h2><h2> Price : ' + d[2] + '</h2> <div data-role="controlgroup" data-type="horizontal"><a href="javascript:display(\'' + d[0] + '\',\'' + d[1] + '\',\'' + d[2] + '\',\'' + d[3] + '\',\'' + d[6] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-edit  ui-btn-icon-notext"></a> <a href="javascript:Delete(\'' + d[0] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-delete  ui-btn-icon-notext"></a></div>').appendTo('#ldata');
                }
                $('#ldata').listview().listview('refresh');

            },
            error: function (par) { showmessage(par); }
        });
    }
    catch (e) { showmessage(e); }
}

//============
function display(id, cmbi, price, date, cmbs) {
    try {
        document.getElementById("id").value = id;
        document.getElementById("cmbi").value = cmbi;
        document.getElementById("cmbs").value = cmbs;
        document.getElementById("price").value = price;
        document.getElementById("date").value = date;
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
function load() {
    findallstadium();
    findinterval();
    SaveData('');
}
//---------------------
function findallstadium() {
try{
    $.ajax({
            type: "POST",
            url: "http://www.tadreeb.ws/code/Findstadium.ashx",
            data: { },
            success: function (par) {
                var arr = par.split("//");
                if (arr[0] != "") showmessage(arr[0]);
               $('#cmbs').empty();
                $('#cmbs').append('<option value="0">Select Stadium</option>');

                var i = 0;
                for (i = 1; i < arr.length; i++) {
                    var d=arr[i].split("++");
                    $('#cmbs').append('<option value="' +  d[0] + '">' + d[1] + '</option>');

                }
                $("#cmbi").selectmenu('refresh', true);
            },
            error: function (par) { showmessage(par); }
        });
    }
    catch (e) { showmessage(e); }
}

//
//---------------------
function findinterval() {
    try {
        $.ajax({
            type: "POST",
            url: "http://www.tadreeb.ws/code/Findinterval.ashx",
            data: {},
            success: function (par) {
                var arr = par.split("//");
                if (arr[0] != "") showmessage(arr[0]);
                $('#cmbi').empty();
                $('#cmbi').append('<option value="0">Select Interval</option>');

                var i = 0;
                for (i = 1; i < arr.length; i++) {
                    var d = arr[i].split("++");
                    $('#cmbi').append('<option value="' + d[0] + '">' + d[1] + '</option>');

                }
                $("#cmbi").selectmenu('refresh', true);
            },
            error: function (par) { showmessage(par); }
        });
    }
    catch (e) { showmessage(e); }
}