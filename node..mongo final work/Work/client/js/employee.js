async function loadEmployees() {

    const keyword =
        document.getElementById(
            "keyword"
        ).value.trim();

    const department =
        document.getElementById(
            "department"
        ).value;

    const status =
        document.getElementById(
            "status"
        ).value;


    const params =
        new URLSearchParams();


    if (keyword) {
        params.append(
            "keyword",
            keyword
        );
    }


    if (department) {
        params.append(
            "department",
            department
        );
    }


    if (status) {
        params.append(
            "status",
            status
        );
    }


    const response =
        await fetch(
            `/employees?${params.toString()}`
        );


    const result =
        await response.json();


    const table =
        document.getElementById(
            "employeeTable"
        );


    table.innerHTML = "";


    if (!result.success) {

        table.innerHTML =
            `<tr>
                <td colspan="8">
                    ${result.message}
                </td>
             </tr>`;

        return;
    }


    if (result.data.length === 0) {

        table.innerHTML =
            `<tr>
                <td colspan="8">
                    No employees found
                </td>
             </tr>`;

        return;
    }


    result.data.forEach(employee => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${employee.employeeId}
            </td>

            <td>
                ${employee.name}
            </td>

            <td>
                ${employee.email}
            </td>

            <td>
                ${employee.department}
            </td>

            <td>
                ${employee.designation}
            </td>

            <td>
                ₹${employee.salary}
            </td>

            <td>
                ${employee.status}
            </td>

            <td>

                <button
                    onclick="viewEmployee('${employee.employeeId}')"
                >
                    View
                </button>

                <button
                    onclick="editEmployee('${employee.employeeId}')"
                >
                    Edit
                </button>

                <button
                    onclick="deleteEmployee('${employee.employeeId}')"
                >
                    Delete
                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


// VIEW
function viewEmployee(id) {

    window.location.href =
        `employee-details.html?id=${id}`;
}


// EDIT
function editEmployee(id) {

    window.location.href =
        `edit-employee.html?id=${id}`;
}


// DELETE
async function deleteEmployee(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this employee?"
        );


    if (!confirmDelete) {
        return;
    }


    const response =
        await fetch(
            `/employees/${id}`,
            {
                method: "DELETE"
            }
        );


    const result =
        await response.json();


    alert(result.message);


    if (result.success) {

        loadEmployees();

        loadDashboard();

    }

}


// DASHBOARD
async function loadDashboard() {

    const response =
        await fetch("/dashboard");

    const result =
        await response.json();


    if (!result.success) {
        return;
    }


    document.getElementById(
        "total"
    ).innerText =
        result.data.total;


    document.getElementById(
        "active"
    ).innerText =
        result.data.active;


    document.getElementById(
        "inactive"
    ).innerText =
        result.data.inactive;


    document.getElementById(
        "departments"
    ).innerText =
        result.data.departments.length;

}


// Load data when page opens
loadEmployees();

loadDashboard();