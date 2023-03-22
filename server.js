const express = require('express')
const app = express()
const port = 3030
const bodyParser = require('body-parser')
const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: true }))

// SET STORAGE
var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.toString().split('/')[1];
        if (ext !== 'jpeg') {
            return cb(null, file.originalname.toString().split('.')[0] + '.jpeg');
        }
        cb(null, file.originalname.toString());
    },


})

var upload = multer({ storage: storage, limits: { fileSize: 1 * 1024 * 1024 } })

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    res.send('Thành công')
})

//Uploading multiple files
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});