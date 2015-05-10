
function reset() {
    try {
         document.getElementById("id").value="";
         document.getElementById("name").value="";
         document.getElementById("address").value="";
         document.getElementById("description").value = "";
        
    }
    catch (e) { showmessage(e); }

}
function map() {
    var id = document.getElementById("id").value;
    if (id == "") {
        showmessage("pleaseselect  Stadium  ");
        return ;
    }
    window.location = "location.html?sid="+id;
}
function save(command) {
    if (validData()) SaveData(command);
}
function validData() {
    try {
       
        var name = document.getElementById("name").value;
        var address = document.getElementById("address").value;
        var description = document.getElementById("description").value;
       
      
        if (name == "") {
            showmessage("please input Stadium name ");
            return false;
        }
        if (address == "") {
            showmessage("please input address ");
            return false;
        }

        if (description == "") {
            showmessage("please input  description ");
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
        var name = document.getElementById("name").value;
        var address = document.getElementById("address").value;
        var description = document.getElementById("description").value;
         var current = document.getElementById("current").value;

         $.ajax({
             type: "POST",
             url: "http://www.tadreeb.ws/code/stadium.ashx",
             data: { command: command, current: current, id: id, name: name, description: description, address: address },
             success: function (par) {
                
                 var arr = par.split("//");
                 if (arr[0] != "") showmessage(arr[0]);
                 $('#ldata').empty();
                 var i = 0;
                 for (i = 1; i < arr.length; i++) {
                     var d = arr[i].split("++");
                     $('<li data-icon="false">').append('<h2>  Name : ' + d[1] + '</h2><h2> description : ' + d[2] + '</h2> <div data-role="controlgroup" data-type="horizontal"><a href="javascript:display(\'' + d[0] + '\',\'' + d[1] + '\',\'' + d[2] + '\',\'' + d[3] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-edit  ui-btn-icon-notext"></a> <a href="javascript:Delete(\'' + d[0] + '\')" class="ui-btn ui-btn-inline ui-shadow ui-icon-delete  ui-btn-icon-notext"></a></div>').appendTo('#ldata');
                 }
                 $('#ldata').listview().listview('refresh');

             },
             error: function (par) { showmessage(par); }
         });
    }
    catch (e) { showmessage(e); }
}

//============
function display(id, name, description, address, password) {
    try {
        document.getElementById("id").value = id;
        document.getElementById("name").value = name;
        document.getElementById("address").value = address;
        document.getElementById("description").value = description;
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