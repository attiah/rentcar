

//============================ Save Data
function SaveData(command) {
    try {
        
        var current = document.getElementById("current").value;

        $.ajax({
            type: "POST",
            url: "http://www.tadreeb.ws/code/Listcustomeroffer.ashx",
            data: { command: command, current: current },
            success: function (par) {
                
                var arr = par.split("//");
                if (arr[0] != "") showmessage(arr[0]);
                $('#ldata').empty();
                var i = 0;
                for (i = 1; i < arr.length; i++) {
                    var d = arr[i].split("++");
                    $('<li data-icon="false">').append('</h2><h2> Stadium Name : ' + d[8] + '</h2><h2> Interval : ' + d[7] + '</h2><h2> Date : ' + d[3] + '</h2><h2> Price : ' + d[2] + '</h2><h2> Address : ' + d[11] + '</h2><h2> Owner : ' + d[9] + '</h2><h2> Phone : ' + d[10] + '</h2> <div data-role="controlgroup" data-type="horizontal"><a href="javascript:cancel(\'' + d[0] + '\')" class="ui-btn ui-btn-inline ui-shadow ">Cancel</a> <a href="javascript:map(\'' + d[12] + '\',\'' + d[13] + '\')" class="ui-btn ui-btn-inline ui-shadow">Location</a></div>').appendTo('#ldata');
                }
                $('#ldata').listview().listview('refresh');

            },
            error: function (par) { showmessage(par); }
        });
    }
    catch (e) { showmessage(e); }
}


function cancel(id) {
    document.getElementById("current").value = id;
    SaveData('cancel');
}
function map(n,e) {
    window.location = "https://maps.google.com/maps?q=" + n + "," + e;
   
}