const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const { connectDB } = require("./db");
const employeeRoutes = require("./routes/employeeRoutes");


const clientPath = path.join(__dirname, "..", "client");


const server = http.createServer(async (req, res) => {

    const fullUrl = new URL(
        req.url,
        `http://${req.headers.host}`
    );

    const pathname = fullUrl.pathname;

    const query = Object.fromEntries(
        fullUrl.searchParams.entries()
    );


    // EMPLOYEE API ROUTES

    if (pathname.startsWith("/employees")) {

        const handled =
            await employeeRoutes(
                req,
                res,
                pathname,
                query
            );

        if (handled) {
            return;
        }
    }


    // STATIC FILES

    let filePath = path.join(
        clientPath,
        pathname
    );


    // Home page

    if (pathname === "/") {

        filePath = path.join(
            clientPath,
            "index.html"
        );
    }


    fs.readFile(filePath, (error, content) => {

        if (error) {

            res.writeHead(404, {
                "Content-Type": "text/plain"
            });

            res.end("Page not found");

            return;
        }


        const extension =
            path.extname(filePath);


        let contentType =
            "text/html";


        if (extension === ".css") {

            contentType =
                "text/css";

        } else if (extension === ".js") {

            contentType =
                "application/javascript";

        }


        res.writeHead(200, {
            "Content-Type": contentType
        });

        res.end(content);

    });

});


connectDB()
    .then(() => {

        server.listen(3000, () => {

            console.log(
                "Server running at http://localhost:3000"
            );

        });

    })
    .catch(error => {

        console.log(
            "Database connection failed:",
            error
        );

    });