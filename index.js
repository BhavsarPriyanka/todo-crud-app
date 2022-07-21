var selectedRow = null;

//show Alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//clear all fields
function clearFields(){
    document.querySelector("#taskName").value = "";
    document.querySelector("#employeeName").value = "";
    document.querySelector("#deadline").value = "";
}

//add task

document.querySelector("#todo-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    //get form values
    const taskName = document.querySelector("#taskName").value;
    const employeeName = document.querySelector("#employeeName").value;
    const deadline = document.querySelector("#deadline").value;

    //validate
    if(taskName == "" || employeeName == "" || deadline == ""){
        showAlert("Please fill in all fields", "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#task-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${taskName}</td>
                <td>${employeeName}</td>
                <td>${deadline}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Task Added", "success");
        }
        else{
            selectedRow.children[0].textContent = taskName;
            selectedRow.children[1].textContent = employeeName;
            selectedRow.children[2].textContent = deadline;
            selectedRow = null;
            showAlert("Task Edited", "info");
        }
        clearFields();
    }
});

//edit task

document.querySelector("#task-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#taskName").value = selectedRow.children[0].textContent;
        document.querySelector("#employeeName").value = selectedRow.children[1].textContent;
        document.querySelector("#deadline").value = selectedRow.children[2].textContent;
    }
});

//delete task

document.querySelector("#task-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Task Deleted", "danger");
    }
})