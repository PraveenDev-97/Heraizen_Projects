let baseurl = "https://lwl-ems.herokuapp.com/api/ems";
let url="";
let edit = false;
let id = "";

getEmp();

function getEmp()
{
    let str ="";
     url = `${baseurl}/all`;
    let ele = document.querySelector("#data");
        fetch(url).then(response => response.json()).then(result => {
            console.log(result);
            result.forEach(element => {

            str +=` <tr>
                <th scope="row">${element["id"]}</th>
                <td>${element["name"]}</td>
                <td>${element["email"]}</td>
                <td>${element["salary"]}</td>
                <td><button type="button" onclick="editEmp(this);" class='fa fa-pencil btn btn-info style = font-size:24px'></button></td>
                <td><button type="button" onclick="deleteEmp(this);" class='fa fa-trash btn btn-danger'></button></td>
                </tr>`;
         
            });
                ele.innerHTML = str;
        });
}

function setEmp(){
    
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let salary = document.querySelector("#salary").value;

    document.querySelector("#empform").reset();

    let data = {"name": name , "email": email , "salary":salary};
    
    url = `${baseurl}/`
    if(!edit){

        fetch(url ,{
             method  :   "POST",
            headers :   {
            'Content-Type' : 'application/json'
            },
            body    :   JSON.stringify(data)
            }).then(response => {
            console.log(response);
            getEmp();
        })
    }
    else {
        data = {"id" : id , "name" : name , "email" : email , "salary" : salary};
        console.log(data);
        fetch(url ,{
            method  :   "PUT",
           headers :   {
           'Content-Type' : 'application/json'
           },
           body    :   JSON.stringify(data)
           }).then(response => {
           console.log(response);
           getEmp();
       })
    }
    edit = false; 
}

function deleteEmp(td) {
    let row = td.parentElement.parentElement;
     id = row.cells[0].innerHTML;
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("emptable").deleteRow(row.rowIndex);
        url = `${baseurl}/${id}`;
        fetch(url , {
            method  :   "DELETE"
        }).then(response => {
            console.log(response);
            getEmp();
        })
    }
}

function editEmp(td) {
    let row = td.parentElement.parentElement;
    id  = row.cells[0].innerHTML;
    document.getElementById("name").value = row.cells[1].innerHTML;
    document.getElementById("email").value = row.cells[2].innerHTML;
    document.getElementById("salary").value = row.cells[3].innerHTML;
    edit = true;

}