const { ObjectId } = require("mongodb");
const { getDB } = require("../db");


// ===============================
// ADD EMPLOYEE
// ===============================

async function addEmployee(data) {

    const db = getDB();

    const employee = {
        employeeId: data.employeeId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        department: data.department,
        designation: data.designation,
        salary: Number(data.salary),
        joiningDate: data.joiningDate,
        status: data.status
    };


    // Check employee ID

    const existingEmployee =
        await db.collection("employees").findOne({
            employeeId: employee.employeeId
        });

    if (existingEmployee) {
        throw new Error("Employee ID already exists");
    }


    // Check email

    const existingEmail =
        await db.collection("employees").findOne({
            email: employee.email
        });

    if (existingEmail) {
        throw new Error("Email already exists");
    }


    const result =
        await db.collection("employees").insertOne(employee);


    return {
        success: true,
        message: "Employee added successfully",
        data: employee
    };
}



// ===============================
// GET EMPLOYEES
// SEARCH + FILTER
// ===============================

async function getEmployees(query = {}) {

    const db = getDB();

    const filter = {};


    // SEARCH

    if (query.keyword) {

        filter.$or = [

            {
                employeeId: {
                    $regex: query.keyword,
                    $options: "i"
                }
            },

            {
                name: {
                    $regex: query.keyword,
                    $options: "i"
                }
            },

            {
                email: {
                    $regex: query.keyword,
                    $options: "i"
                }
            }

        ];
    }


    // DEPARTMENT FILTER

    if (query.department) {

        filter.department =
            query.department;
    }


    // STATUS FILTER

    if (query.status) {

        filter.status =
            query.status;
    }


    console.log("MongoDB Filter:", filter);


    const employees =
        await db
            .collection("employees")
            .find(filter)
            .toArray();


    return {
        success: true,
        data: employees
    };
}



// ===============================
// GET SINGLE EMPLOYEE
// ===============================

async function getEmployee(id) {

    const db = getDB();

    let employee;


    // Search using MongoDB _id

    if (ObjectId.isValid(id)) {

        employee =
            await db
                .collection("employees")
                .findOne({
                    _id: new ObjectId(id)
                });
    }


    // Search using employeeId

    if (!employee) {

        employee =
            await db
                .collection("employees")
                .findOne({
                    employeeId: id
                });
    }


    if (!employee) {

        throw new Error("Employee not found");
    }


    return {
        success: true,
        data: employee
    };
}



// ===============================
// UPDATE EMPLOYEE
// ===============================

async function updateEmployee(id, data) {

    const db = getDB();

    let filter;


    if (ObjectId.isValid(id)) {

        filter = {
            _id: new ObjectId(id)
        };

    } else {

        filter = {
            employeeId: id
        };
    }


    const updateData = {

        name: data.name,

        email: data.email,

        phone: data.phone,

        department: data.department,

        designation: data.designation,

        salary: Number(data.salary),

        joiningDate: data.joiningDate,

        status: data.status

    };


    const result =
        await db
            .collection("employees")
            .updateOne(
                filter,
                {
                    $set: updateData
                }
            );


    if (result.matchedCount === 0) {

        throw new Error("Employee not found");
    }


    return {
        success: true,
        message: "Employee updated successfully"
    };
}



// ===============================
// DELETE EMPLOYEE
// ===============================

async function deleteEmployee(id) {

    const db = getDB();

    let filter;


    if (ObjectId.isValid(id)) {

        filter = {
            _id: new ObjectId(id)
        };

    } else {

        filter = {
            employeeId: id
        };
    }


    const result =
        await db
            .collection("employees")
            .deleteOne(filter);


    if (result.deletedCount === 0) {

        throw new Error("Employee not found");
    }


    return {
        success: true,
        message: "Employee deleted successfully"
    };
}



// ===============================
// EXPORT FUNCTIONS
// ===============================

module.exports = {

    addEmployee,

    getEmployees,

    getEmployee,

    updateEmployee,

    deleteEmployee

};