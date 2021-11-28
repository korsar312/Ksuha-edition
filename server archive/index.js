import express from 'express'
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import fs from "fs";

const tableMimetype = {
  'image/gif': ['.gif', 'image'],
  'image/jpeg': ['.jpeg','image'],
  'image/pjpeg': ['.jpeg','image'],
  'image/png': ['.png','image'],
  'image/svg+xml': ['.svg','image'],
  'image/tiff': ['.tiff','image'],
  'image/vnd.microsoft.icon': ['.icon','image'],
  'image/vnd.wap.wbmp': ['.wbmp','image'],
  'image/webp': ['.webp','image'],
  'application/pdf': ['.pdf','other'],
  'application/msword': ['.pdf','text'],
  'text/plain': ['txt', 'text']
}

function CreateInformObj(obj) {
  return {
    name: null,
    type: null,
    children: [],
    ...obj
  }
}

const app = express()

app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({createParentPath: true}));

const port = process.env.PORT ?? 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});





//=========================================================

app.post("/postDocuments",  (req, res) => {
  let img = req.files.file;
  let desc = JSON.parse(req.body.desc)
  let name = desc.fileName
  let id = new Date().getTime()

  if(fs.existsSync('./documents/' + name + tableMimetype[img.mimetype][0])){
    return   res.send({
      status: false,
      message: 'File is exists',
    });
  }

  img.mv('./documents/' + name + tableMimetype[img.mimetype][0]);

  let documentsList = JSON.parse(fs.readFileSync('documentsList.json', 'utf8'))

  let newobj = {...img, data: null}

  console.log(img)

  documentsList.push({
    ...desc,
    tableMimetype: img.mimetype,
    id: id,
    more: newobj
  })

  fs.writeFileSync('documentsList.json', JSON.stringify(documentsList))

  res.send({
    status: true,
    message: 'File is uploaded',
  });
});

//=========================================================

app.delete("/deleteDocuments",  (req, res) => {
  let desc = JSON.parse(req.body.desc)

  fs.unlinkSync('./documents/' + desc.fileName + tableMimetype[desc.tableMimetype][0])

  let documentsList = JSON.parse(fs.readFileSync('documentsList.json', 'utf8'))

  fs.writeFileSync('documentsList.json', JSON.stringify(documentsList.filter(item=>item.id !== desc.id)))

  res.send({
    status: true,
    message: 'File is removed',
  });
});

//=========================================================

app.get('/allDocuments',(req,res)=>{
  res.json(JSON.parse(fs.readFileSync('documentsList.json', 'utf8')))
})

//=========================================================

app.get('/download', function(req, res){
  let documentsList = JSON.parse(fs.readFileSync('documentsList.json', 'utf8')).find((el)=> el.fileName === req.query.fileName)

  const file = `documents/${documentsList.fileName}${tableMimetype[documentsList.tableMimetype][0]}`;
  res.download(file);
});

//=========================================================










app.post("/postDocumentsF",  (req, res) => {

  const desc = req.body.desc
  const path = req.body.path
  const img = req.files.file;

console.log(path)
  img.mv(`folders/${path.length === 0 ? '' : path + '/'}${img.name}`)

  let folderList = JSON.parse(fs.readFileSync('foldersList.json', 'utf8'))

  if(path.length !== 0) {

    let locat = path.split('/')
    let folder = folderList
    locat.forEach((pathEl) => {

      folder = folder.find((el) => {
        if (el.name === pathEl) {
          folder = el
          return true
        }
      }).children


    })
    console.log(folder)

    folder.push(CreateInformObj({name: img.name, type: 'file'}))

    fs.writeFileSync('foldersList.json', JSON.stringify([...folderList]))

  }else{
    fs.writeFileSync('foldersList.json', JSON.stringify([...folderList, CreateInformObj({name: img.name, type: 'file'})]))
  }

  res.send({
    status: true,
    message: 'Folder is created',
  });
});

//=========================================================

app.post("/addFolder",  (req, res) => {

  const desc = req.body.desc
  const path = req.body.path

  fs.mkdirSync(`folders/${path}/${desc}`)

  let folderList = JSON.parse(fs.readFileSync('foldersList.json', 'utf8'))

  if(path.length !== 0) {

    let locat = path.split('/')
    let folder = folderList
    locat.forEach((pathEl) => {

      folder = folder.find((el) => {
        if (el.name === pathEl) {
          folder = el
          return true
        }
      }).children


    })
    console.log(folder)

    folder.push(CreateInformObj({name: desc, type: 'folder'}))

    fs.writeFileSync('foldersList.json', JSON.stringify([...folderList]))

  }else{

    fs.writeFileSync('foldersList.json', JSON.stringify([...folderList, CreateInformObj({name: desc, type: 'folder'})]))
  }

  res.send({
    status: true,
    message: 'Folder is created',
  });
});

//=========================================================

app.get('/getFolder',(req,res)=>{
  res.json(JSON.parse(fs.readFileSync('foldersList.json', 'utf8')))
})

//=========================================================

app.listen(port, ()=> {
  console.log(`Сервер работает на порте ${port}...`)
})
