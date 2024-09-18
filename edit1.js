let data = JSON.parse(localStorage.getItem('object')) || [];

function readAll() {
    localStorage.setItem("object", JSON.stringify(data)); // Save data to local storage
    var tabledata = document.querySelector(".data_table");

    var object = localStorage.getItem('object');
    var objectdata = JSON.parse(object);
    var elements = "";

    objectdata.map(record => (
        elements += `<tr>
        <td>${record.name}</td>
        <td>${record.email}</td> 
        <td>
        <button class="edit" onclick="edit(${record.id})">Edit</button>
        <button class="delete" onclick="delet(${record.id})">Delete</button>
        </td>
        </tr>`
    ));
    tabledata.innerHTML = elements;
}

function delet(id) {
    data = data.filter(rec => rec.id !== id); 
    localStorage.setItem('object', JSON.stringify(data)); 
    readAll();
}

function create() {
    document.querySelector(".create_form").style.display = "block";
    document.querySelector(".add_div").style.display = "none";
}

function add() {
    var name = document.querySelector(".name").value;
    var email = document.querySelector(".email").value;

    // Ensure fields are not empty
    if (name === "" || email === "") {
        alert("Both fields are required!");
        return;
    }

    // Generate a unique id
    var newId = data.length ? Math.max(...data.map(rec => rec.id)) + 1 : 1;

    var newobj = { id: newId, name: name, email: email };
    data.push(newobj);
    localStorage.setItem("object", JSON.stringify(data)); // Save to local storage

    document.querySelector(".create_form").style.display = "none";
    document.querySelector(".add_div").style.display = "block";
    readAll();
}

function edit(id) {
    document.querySelector('.update_form').style.display = "block";
    var obj = data.find(rec => rec.id === id);

    // Populate the form with current data
    document.querySelector('.uname').value = obj.name;
    document.querySelector('.uemail').value = obj.email;
    document.querySelector('.id').value = obj.id;
}

function update() {
    var id = parseInt(document.querySelector('.id').value);
    var name = document.querySelector('.uname').value;
    var email = document.querySelector('.uemail').value;

    // Ensure fields are not empty
    if (name === "" || email === "") {
        alert("Both fields are required!");
        return;
    }

    var index = data.findIndex(rec => rec.id === id);
    data[index] = { id, name, email }; // Update record in data array
    localStorage.setItem("object", JSON.stringify(data)); // Save updated data to local storage

    document.querySelector('.update_form').style.display = "none";
    readAll();
}

readAll();
