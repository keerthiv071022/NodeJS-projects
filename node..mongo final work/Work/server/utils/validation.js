function validateEmployee(employee) {

    const requiredFields = [
        "employeeId",
        "name",
        "email",
        "phone",
        "department",
        "designation",
        "salary",
        "joiningDate",
        "status"
    ];

    for (let field of requiredFields) {
        if (
            employee[field] === undefined ||
            employee[field] === null ||
            employee[field].toString().trim() === ""
        ) {
            return `${field} is required`;
        }
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(employee.email)) {
        return "Invalid email format";
    }

    // Phone validation
    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(employee.phone)) {
        return "Phone number must contain 10 digits";
    }

    // Salary validation
    const salary = Number(employee.salary);

    if (isNaN(salary) || salary <= 0) {
        return "Salary must be a positive number";
    }

    // Department validation
    const departments = [
        "Development",
        "HR",
        "Marketing",
        "Finance",
        "Testing"
    ];

    if (!departments.includes(employee.department)) {
        return "Invalid department";
    }

    // Status validation
    if (!["Active", "Inactive"].includes(employee.status)) {
        return "Invalid employment status";
    }

    return null;
}

module.exports = {
    validateEmployee
};