
let btn = document.getElementById('addButton');
let currentEditingRow = null;

btn.addEventListener("click", function() {
    if (btn.innerHTML === "Save") {
        saveEdit();
    } else {
        add();
    }
});

function add() {
    let id = document.getElementById("one").value;
    let sName = document.getElementById("two").value;
    let classN = document.getElementById("three").value;
    let email = document.getElementById("four").value;
    let address = document.getElementById("five").value;

    if (id === "" || sName === "" || classN === "" || email === '' || address === '') {
        alert('Please enter all fields');  // this will display alert message when any of the input filed is empty
    } else {
        let tableB = document.getElementById("tableBody");
        let tableR = document.createElement("tr");

        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");
        let cell4 = document.createElement("td");
        let cell5 = document.createElement("td");
        let cell6 = document.createElement("td");

        cell1.innerHTML = id;
        cell2.innerHTML = sName;
        cell3.innerHTML = classN;
        cell4.innerHTML = email;
        cell5.innerHTML = address;

        let dltB = document.createElement("button");
        dltB.innerHTML = "delete";
        dltB.className = "delete-btn";

        let editB = document.createElement("button");
        editB.innerHTML = "edit";
        editB.className = "edit-btn";

        cell6.appendChild(dltB);
        cell6.appendChild(editB);

        tableR.appendChild(cell1);
        tableR.appendChild(cell2);
        tableR.appendChild(cell3);
        tableR.appendChild(cell4);
        tableR.appendChild(cell5);
        tableR.appendChild(cell6);

        tableB.appendChild(tableR); //this will put the all inputs values in table body--> tr -->td

        // this will clear input fields after adding
        document.getElementById("one").value = "";
        document.getElementById("two").value = "";
        document.getElementById("three").value = "";
        document.getElementById("four").value = "";
        document.getElementById("five").value = "";

        // Attached event listeners to the buttons
        dltB.addEventListener('click', removeItems);
        editB.addEventListener('click', editItems);

        // this willl save our data to local storage
        saveToLocalStorage();
    }
}

function removeItems() {
    let rowToRemove = this.closest('tr');
    rowToRemove.remove();                  // when the user click on delete button this will remove all data from table
    saveToLocalStorage();
}

function editItems() {                     // this function is for  edit button
    currentEditingRow = this.closest('tr');
    let cells = currentEditingRow.children;

    document.getElementById("one").value = cells[0].innerHTML;
    document.getElementById("two").value = cells[1].innerHTML;
    document.getElementById("three").value = cells[2].innerHTML;
    document.getElementById("four").value = cells[3].innerHTML;
    document.getElementById("five").value = cells[4].innerHTML;

    btn.innerHTML = "Save";
}

function saveEdit() {
    let cells = currentEditingRow.children;
    cells[0].innerHTML = document.getElementById("one").value;
    cells[1].innerHTML = document.getElementById("two").value;
    cells[2].innerHTML = document.getElementById("three").value;
    cells[3].innerHTML = document.getElementById("four").value;
    cells[4].innerHTML = document.getElementById("five").value;

    // this will clear the input fields after saving
    document.getElementById("one").value = "";
    document.getElementById("two").value = "";
    document.getElementById("three").value = "";
    document.getElementById("four").value = "";
    document.getElementById("five").value = "";

    btn.innerHTML = "Add";
    currentEditingRow = null;
    saveToLocalStorage();
}

function saveToLocalStorage() {
    let tableB = document.getElementById("tableBody");
    let rows = tableB.getElementsByTagName("tr");
    let data = [];

    for (let row of rows) {
        let cells = row.getElementsByTagName("td");
        let rowData = {
            id: cells[0].innerHTML,
            name: cells[1].innerHTML,
            classN: cells[2].innerHTML,
            email: cells[3].innerHTML,
            address: cells[4].innerHTML
        };
        data.push(rowData);
    }

    localStorage.setItem("tableData", JSON.stringify(data));
}

function loadFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem("tableData"));
    if (data) {
        let tableB = document.getElementById("tableBody");
        tableB.innerHTML = ""; // This will clear current table content

        for (let rowData of data) {
            let tableR = document.createElement("tr");

            let cell1 = document.createElement("td");
            let cell2 = document.createElement("td");
            let cell3 = document.createElement("td");
            let cell4 = document.createElement("td");
            let cell5 = document.createElement("td");
            let cell6 = document.createElement("td");

            cell1.innerHTML = rowData.id;
            cell2.innerHTML = rowData.name;
            cell3.innerHTML = rowData.classN;
            cell4.innerHTML = rowData.email;
            cell5.innerHTML = rowData.address;

            let dltB = document.createElement("button");
            dltB.innerHTML = "delete";
            dltB.className = "delete-btn";

            let editB = document.createElement("button");
            editB.innerHTML = "edit";
            editB.className = "edit-btn";

            cell6.appendChild(dltB);
            cell6.appendChild(editB);

            tableR.appendChild(cell1);
            tableR.appendChild(cell2);
            tableR.appendChild(cell3);
            tableR.appendChild(cell4);
            tableR.appendChild(cell5);
            tableR.appendChild(cell6);

            tableB.appendChild(tableR);

            // Attached event listeners to the buttons
            dltB.addEventListener('click', removeItems);
            editB.addEventListener('click', editItems);
        }
    }
}

// this will Load table data from local storage on page re-load
window.onload = loadFromLocalStorage;

