const {
    addEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController");

async function employeeRoutes(req, res, pathname, query) {

    // POST - ADD EMPLOYEE
    if (req.method === "POST" && pathname === "/employees") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", async () => {

            try {

                const data = JSON.parse(body);

                const result = await addEmployee(data);

                res.writeHead(201, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify(result));

            } catch (error) {

                console.log("ADD EMPLOYEE ERROR:", error);

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: false,
                    message: error.message
                }));
            }

        });

        return true;
    }


    // GET - ALL EMPLOYEES
    if (req.method === "GET" && pathname === "/employees") {

        try {

            const result = await getEmployees(query);

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(result));

        } catch (error) {

            console.log(error);

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                success: false,
                message: error.message
            }));
        }

        return true;
    }


    // GET - SINGLE EMPLOYEE
    if (
        req.method === "GET" &&
        pathname.startsWith("/employees/") &&
        pathname.split("/").length === 3
    ) {

        const id = pathname.split("/")[2];

        try {

            const result = await getEmployee(id);

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(result));

        } catch (error) {

            res.writeHead(404, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                success: false,
                message: error.message
            }));
        }

        return true;
    }


    // PUT - UPDATE EMPLOYEE
    if (
        req.method === "PUT" &&
        pathname.startsWith("/employees/")
    ) {

        const id = pathname.split("/")[2];

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", async () => {

            try {

                const data = JSON.parse(body);

                const result =
                    await updateEmployee(id, data);

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify(result));

            } catch (error) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: false,
                    message: error.message
                }));
            }

        });

        return true;
    }


    // DELETE - EMPLOYEE
    if (
        req.method === "DELETE" &&
        pathname.startsWith("/employees/")
    ) {

        const id = pathname.split("/")[2];

        try {

            const result =
                await deleteEmployee(id);

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(result));

        } catch (error) {

            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                success: false,
                message: error.message
            }));
        }

        return true;
    }


    return false;
}

module.exports = employeeRoutes;