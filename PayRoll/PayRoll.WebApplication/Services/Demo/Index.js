$(document).ready(function () {

    oTable = $('#example').dataTable({

        columns: [
            { 'data': 'Code' },
            { 'data': 'Name' },
            {
                'data': 'Code',
                "bSearchable": false,
                "bSortable": false,
                'render': function (Code) {
                    return '<td><a href=\'javascript:;\' onclick="return Get(' + Code + ')" data-toggle="modal" data-target="#myModal" > <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>  </a></td>';
                }
            },
            {
                'data': 'Code',
                "bSearchable": false,
                "bSortable": false,
                'render': function (Code) {
                    return '<td><a href=\'javascript:;\' id="btnDelete" onclick="return Delete(' + Code + ')" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span>  </a></td>';
                }
            }
        ],
        bServerSide: true,
        sAjaxSource: "/Demo/Table",
        sServerMethod: 'post',
    });
});

function Delete(Code) {
    if (confirm('Are you sure you want to delete this Record?')) {
        var Info = { Code: Code };


        $.ajax({
            method: "post",
            
            url: "/Demo/Delete",
            data: JSON.stringify(Info),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                debugger;
                if (result == "True") {

                    oTable.fnFilter();

                }
            },
            error: function () {
                alert('error');
            }
        });

    }
    else
        return false;
}

function Get(Code) {
    document.getElementById('lblMessage').innerHTML = "";
    document.getElementById('hfCode').value = Code;

    var Info = { Code: Code };

    $.ajax({
        method: "post",
        url: "/Demo/Get",
        data: JSON.stringify(Info),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            document.getElementById('txtName').value = result.data.Name;
        },
        error: function () {
            alert('error');
        }
    });
}

function Clear() {
    document.getElementById('lblMessage').innerHTML = "";
    document.getElementById('hfCode').value = "";

    document.getElementById('txtName').value = "";
}

function Validate() {

    document.getElementById('lblMessage').innerHTML = "";

    if (document.getElementById('txtName').value == "") {
        document.getElementById('lblMessage').innerHTML += "Please insert the Name<br>";
    }
    

    if (document.getElementById('lblMessage').innerHTML == "") {
        Submit();
        document.getElementById('lblMessage').style.color = "Green";
    }
    else {
        document.getElementById('lblMessage').style.color = "Red";
    }
}

function Submit() {

    if (document.getElementById('hfCode').value == "") {

        Insert();
    }
    else {
        Update();
    }

}

function Insert() {

    var Info = {
        Name: document.getElementById('txtName').value,
    };

    $.ajax({
        method: "post",
        url: "/Demo/Insert",
        data: JSON.stringify(Info),
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            if (result == "True") {

                Clear();
                document.getElementById('lblMessage').innerHTML = "Inserted Successfully";
                oTable.fnFilter();
            }

        },
        error: function () {
            alert('error');
        }
    });
}

function Update() {

    var Info = {
        Code: document.getElementById('hfCode').value,
        Name: document.getElementById('txtName').value,
    };

    $.ajax({
        method: "post",
        //getListOfCars is my webmethod
        url: "/Demo/Update",
        data: JSON.stringify(Info),
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            if (result == "True") {

                document.getElementById('lblMessage').innerHTML = "Updated Successfully";
                oTable.fnFilter();
                
            }

        },
        error: function () {
            alert('error');
        }
    });
}

function btnAddClick() {
    if (document.getElementById('hfCode').value !="") {
        Clear();
    }    
}