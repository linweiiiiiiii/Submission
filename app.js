const express = require('express'); 
const mysql = require('mysql2'); 
const multer = require('multer');
const app = express(); 

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); //Directory to save uploaded files
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage})

// Create MySQL connection 
const connection = mysql.createConnection({ 
    host: 'sql.freedb.tech', 
    user: 'freedb_IamUser', 
    password: '#y9yAJ6R&?uHgYb', 
    database: 'freedb_establishments' 
});
 
connection.connect((err) => { 
  if (err) { 
    console.error('Error connecting to MySQL:', err); 
    return; 
  } 
  console.log('Connected to MySQL database'); 
});
 
// Set up view engine 
app.set('view engine', 'ejs'); 

// enable static files 
app.use(express.static('public')); 

//enable from proessing
app.use(express.urlencoded({
    extended: false
}));

// Define routes 
app.get('/', (req, res) => { 
    connection.query('SELECT * FROM establishments', (error, results) => { 
        if (error) throw error; 
        res.render('index', { establishments: results }); // Render HTML page with data 
    }); 
}); 

// Define routes 
app.get('/establishment/:id', (req, res) => {
    // Extract the product ID from the request prarmeters 
    const establishmentId = req.params.id;
    const sql = 'SELECT * FROM establishments WHERE establishment_id = ?';
    
    //Fetch data from Mysql based on the Product ID
    connection.query( sql , [establishmentId], (error,results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error Retrieving establishments by ID');
        }

        // Chech if any establishments with the given ID was found
        if (results.length > 0) {
            // Render HTML page with the establishments data
            res.render('establishment', { establishment: results[0] });
        }
        else {
            //if no establishments with the given ID was found, render a 404 page or handle it accordingly
            res.status(404).send('establishment not found')
        }
    });
}); 

app.get('/establishments', (req,res) => {
    res.render('addFood');
});

app.post('/establishments', upload.single('image'), (req, res) =>{
    // extract product data from the request body
    const { place, short_description, rating, dining_type, address, opening_hours, menu } = req.body;
    let image;  
    if (req.file) {
        image = req.file.filename; // saving only the file name
    }
    else {
        image = null;
    }
    
    const sql = 'INSERT INTO establishments ( place_name, short_description, rating, dining_type, address, opening_hours, menu) VALUES (?, ?, ?, ?, ?, ?, ?)';
    //Insert the new product into the database
    connection.query (sql, [ place, short_description, rating, dining_type, address, opening_hours, menu ], (error,results) => {
        if (error) {
            // Handle any error that occurs during the database operation
            console.error("Error adding establishments:", error);
            res.status(500).send('Error adding establishments');
        }
        
        else {
            // Send a success response
            res.redirect('/');
        }
    });
});

app.get('/editestablishment/:id', upload.single('image'), (req,res) => {
    const establishmentId = req.params.id;
    const sql = 'SELECT * FROM establishments WHERE establishment_id = ?';
    // fetch data from mysql based on the product id
    connection.query( sql , [establishmentId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving establishments by ID');
        }
        //Check if any establishments with the given Id was found
        if (results.length > 0) {
            //Render HTML page with establishments data
            res.render('editestablishment', { establishment: results[0] });
        }
        else {
            // if no establishments with the given ID was found, render a 404 message or handle it accordingly
            res.status(404).send('Product not found') 
        }
    });
});

app.post('/editestablishment/:id', upload.single('image'), (req,res) => {
    const establishmentId = req.params.id;
    // Extract establishments data from the request body
    const { place_name,short_description,rating,dining_type,address,opening_hours,menu } = req.body;
    let image = req.body.currentImage // retrieve current image file name
    if (req.file) { // if new image is uploaded
        image = req.file.filename; // set image to be new file name
    }
    const sql = 'UPDATE establishments SET image = ?, place_name = ?, short_description = ?, rating = ?, dining_type = ?, address = ?, opening_hours = ? menu = ?   WHERE establishment_id = ?';

    //Insert a new product into the database
    connection.query( sql, [ place_name,short_description,rating,dining_type,address,opening_hours,menu, establishmentId ], (error,results) => {
        if (error) {
            //Handle any error that occurs during the database opperation
            console.error("Error upadating establishments:", error);
            res.status(500).send('Error updating establishments');
        }
        else {
            //send a success response
            res.redirect('/');
        }
    });
});

app.get('/deleteEstablishment/:id', (req,res) => {
    const establishmentId = req.params.id;
    const sql = 'DELETE FROM establishments WHERE establishment_id = ?';
    connection.query( sql, [establishmentId], (error,results) => {
        if (error) {
            //Handle any error that occurs during the database opperation
            console.error("Error deleting establishment:", error);
            res.status(500).send('Error deleting establishment');
        }

        else {
            //send a success response
            res.redirect('/');
        }
    })
})

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`)); 


// 23012076 LimLinWei