
function reset() {
    try {
         document.getElementById("userid").value="";
         document.getElementById("username").value="";
        
      
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
       

        if (name == "") {
            showmessage("please input Interval ");
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
        var current = document.getElementById("current").value;

        $.ajax({
            type: "POST",
            url: "http://www.tadreeb.ws/code/interval.ashx",
            data: { command: command, current: current, id: id, name: name },
            success: function (par) {
                var arr = par.split("//");
                if (arr[0] != "") showmessage(arr[0]);
                $('#ldata').empty();
                var i = 0;
                for (i = 1; i < arr.length; i++) {
                    var d = arr[i].split("++");
                    $('<li data-icon="false">').append('<h2> Interval : ' + d[1] + '</h2> <div data-role="controlgroup" data-type="horizontal"><a href="javascript:display(\'' + d[0] + '\',\'' + d[1] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-edit  ui-btn-icon-notext"></a> <a href="javascript:Delete(\'' + d[0] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-delete  ui-btn-icon-notext"></a></div>').appendTo('#ldata');
                }
                $('#ldata').listview().listview('refresh');

            },
            error: function (par) { showmessage(par); }
        });
    }
    catch (e) { showmessage(e); }
}

//============
function display(id, name) {
    try {
        document.getElementById("userid").value = id;
        document.getElementById("username").value = name;
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