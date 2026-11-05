const http = require("http");
const fs = require("fs");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

const client = new MongoClient("mongodb://127.0.0.1:27017/");

let products;

async function connectDB() {
    await client.connect();

    const db = client.db("productDb");
    products = db.collection("products");

    console.log("MongoDB connected");
}

const server = http.createServer(async (req, res) => {

    // -------------------------
    // HOME PAGE
    // -------------------------
    if (req.method === "GET" && req.url === "/") {

        fs.readFile(
            path.join(__dirname, "public", "index.html"),
            (err, data) => {

                if (err) {
                    res.writeHead(500);
                    res.end("Error loading page");
                    return;
                }

                res.writeHead(200, {
                    "Content-Type": "text/html"
                });

                res.end(data);
            }
        );

        return;
    }


    // -------------------------
    // CSS
    // -------------------------
    if (req.method === "GET" && req.url === "/style.css") {

        fs.readFile(
            path.join(__dirname, "public", "style.css"),
            (err, data) => {

                if (err) {
                    res.writeHead(500);
                    res.end("Error loading CSS");
                    return;
                }

                res.writeHead(200, {
                    "Content-Type": "text/css"
                });

                res.end(data);
            }
        );

        return;
    }


    // -------------------------
    // JAVASCRIPT
    // -------------------------
    if (req.method === "GET" && req.url === "/script.js") {

        fs.readFile(
            path.join(__dirname, "public", "script.js"),
            (err, data) => {

                if (err) {
                    res.writeHead(500);
                    res.end("Error loading JavaScript");
                    return;
                }

                res.writeHead(200, {
                    "Content-Type": "text/javascript"
                });

                res.end(data);
            }
        );

        return;
    }


    // -------------------------
    // GET ALL PRODUCTS
    // -------------------------
    if (req.method === "GET" && req.url === "/products") {

        try {

            const result = await products.find().toArray();

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(result));

        } catch (error) {

            res.writeHead(500);
            res.end(JSON.stringify({
                message: "Error getting products"
            }));
        }

        return;
    }


    // -------------------------
    // GET SINGLE PRODUCT
    // -------------------------
    if (
        req.method === "GET" &&
        req.url.startsWith("/products/")
    ) {

        try {

            const id = req.url.split("/")[2];

            const product = await products.findOne({
                _id: new ObjectId(id)
            });

            if (!product) {

                res.writeHead(404, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Product not found"
                }));

                return;
            }

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(product));

        } catch (error) {

            res.writeHead(500);
            res.end(JSON.stringify({
                message: "Error getting product"
            }));
        }

        return;
    }


    // -------------------------
    // SEARCH PRODUCT
    // -------------------------
    if (
        req.method === "GET" &&
        req.url.startsWith("/search")
    ) {

        try {

            const url = new URL(req.url, `http://${req.headers.host}`);

            const name = url.searchParams.get("name");

            const result = await products.find({
                name: {
                    $regex: name,
                    $options: "i"
                }
            }).toArray();

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(result));

        } catch (error) {

            res.writeHead(500);
            res.end(JSON.stringify({
                message: "Search error"
            }));
        }

        return;
    }


    // -------------------------
    // CREATE PRODUCT
    // -------------------------
    if (
        req.method === "POST" &&
        req.url === "/products"
    ) {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", async () => {

            try {

                const data = JSON.parse(body);

                const product = {
                    name: data.name,
                    description: data.description,
                    price: Number(data.price),
                    quantity: Number(data.quantity),
                    createdAt: new Date().toISOString().split("T")[0]
                };

                const result = await products.insertOne(product);

                res.writeHead(201, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Product added successfully",
                    productId: result.insertedId
                }));

            } catch (error) {

                console.log(error);

                res.writeHead(500, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Error adding product"
                }));
            }
        });

        return;
    }


    // -------------------------
    // UPDATE PRODUCT
    // -------------------------
    if (
        req.method === "PUT" &&
        req.url.startsWith("/products/")
    ) {

        const id = req.url.split("/")[2];

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", async () => {

            try {

                const data = JSON.parse(body);

                const updatedProduct = {
                    name: data.name,
                    description: data.description,
                    price: Number(data.price),
                    quantity: Number(data.quantity)
                };

                const result = await products.updateOne(
                    {
                        _id: new ObjectId(id)
                    },
                    {
                        $set: updatedProduct
                    }
                );

                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Product updated successfully"
                }));

            } catch (error) {

                console.log(error);

                res.writeHead(500, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Error updating product"
                }));
            }
        });

        return;
    }


    // -------------------------
    // DELETE PRODUCT
    // -------------------------
    if (
        req.method === "DELETE" &&
        req.url.startsWith("/products/")
    ) {

        try {

            const id = req.url.split("/")[2];

            const result = await products.deleteOne({
                _id: new ObjectId(id)
            });

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Product deleted successfully"
            }));

        } catch (error) {

            console.log(error);

            res.writeHead(500, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Error deleting product"
            }));
        }

        return;
    }


    // -------------------------
    // PAGE NOT FOUND
    // -------------------------

    res.writeHead(404);
    res.end("Page not found");
});


connectDB()
    .then(() => {

        server.listen(3000, () => {
            console.log("Server running at http://localhost:3000");
        });

    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });