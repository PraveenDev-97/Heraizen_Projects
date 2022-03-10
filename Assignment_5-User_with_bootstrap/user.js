let formData = localStorage.getItem("formData") === null? [] : Array.from(JSON.parse(localStorage.getItem("formData")));
const addData = (e) =>{
    e.preventDefault();

    // get all input
    const name = document.getElementById("name").value;
    const phnum = document.getElementById("phnum").value;
    const email = document.getElementById("email").value;

    // get data from local storage or set it empty
    let formData=JSON.parse(localStorage.getItem("formData"))  || [] ;

    console.log(formData)

    // check for duplicate

    for(let user of formData){
      if(user.name.toLowerCase() == name.toLowerCase()){
          alert("User Name already exists!!...");
          return;
      }
    //   if(user.phnum == phnum){
    //     alert("User Phone no already exists!!...");
    //     return;
    //   }
    //   if(user.email.toLowerCase() == email.toLowerCase()){
    //     alert("User Email already exists!!...");
    //     return;
    //   }
    }
    // get the ID value or set it to -1 if not exist ( if exist, it means that it is editing)
    var ID = document.getElementById("id").value || -1

    // Find the index of the id in the form
    objIndex = formData.findIndex((obj => obj.id == ID));
    
    // check if the index exist i.e equal to 0 or greater then update the value
    if(objIndex >= 0)
    {
        formData[objIndex].name = name;
        formData[objIndex].phnum = phnum;
        formData[objIndex].email = email;
        
    }
    else{
        // else insert new value
        formData.push({
            name: name,
            phnum: phnum,
            email: email,
            id: Math.floor(Math.random() * 10000) + 99999, 
            //generating a unique ID
        });
    }
    
    // set the local storage
    localStorage.setItem("formData",JSON.stringify(formData));
    
    // display the information
    dispData();

    // clear all input value
    clear();
}
function dispData(){
    // If data exist in the storage
    if(localStorage.getItem("formData")){
    
    var output = document.querySelector("tbody");
    output.innerHTML = "";   
    i=0;
    // loop through it and display the data
    JSON.parse(localStorage.getItem("formData")).forEach(data =>{
        output.innerHTML += `
                <tr>  
                <td>${i+1}</td>    
                <td>${data.name}</td>                  
                <td>${data.phnum}</td>
                <td>${data.email}</td>                  
                <td><button type="button" id="btnEdit" onclick="editData(`+i+`);" class='fa fa-pencil btn btn-info style = font-size:24px'></button></td>
                <td><button type="button" id="btndt" onclick="deleteData(`+i+`);" class='fa fa-trash btn btn-danger'></button></td>
                </tr>
        `; 
        i++;
    });
}

}

// display data on page load
dispData(); 

// delete data function
function deleteData(id){
    let formData=JSON.parse(localStorage.getItem('formData'));
    let delArr=[...formData];
    delArr.splice(id,1);
    formData=[...delArr]
    localStorage.setItem('formData',JSON.stringify(formData));
    dispData();
    clear()
}

// clear input function
function clear(){
    document.getElementById("name").value="";
    document.getElementById("phnum").value="";
    document.getElementById("email").value="";
    document.getElementById("id").value="";
}

// edit data function
function editData(id){
    let arr=JSON.parse(localStorage.getItem('formData'));
    document.getElementById('name').value=arr[id].name;
    document.getElementById('phnum').value=arr[id].phnum;
    document.getElementById('email').value=arr[id].email;
    document.getElementById('id').value=arr[id].id; 
    // using id to edit and identify this editing
}

//Search function for table based on name

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
        }         
    }
}


// function inputChange(event){
//     ser = event.target.value; 
// }


// function search(){
//     let myUsers = [];
//     myUsers =  formData.filter(user => user.name.includes(ser) || user.email.includes(ser));
//     console.log(myUsers)
// }