require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const db = require("./models");
const path = require('path');
const { v4: uuidv4 } = require('uuid'); 
const fs = require('fs');

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueSuffix); 
  }
});


// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const agriculteur = await db.Agriculteur.findOne({ where: { email } });
    const commerAgricole = await db.Commeragricole.findOne({ where: { email } });
    const isAdmin = email === 'isAdmin@agricool.com' && password === 'agricool2024';

    if (!agriculteur && !commerAgricole && !isAdmin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    let user;
    let userType;
    if (isAdmin) {
      user = { email: 'isAdmin@agricool.com' };
      userType = "admin";
    } else if (agriculteur) {
      user = agriculteur;
      userType = "agriculteur";
    } else {
      user = commerAgricole;
      userType = "commeragricole";
    }

    const validPassword = isAdmin ? true : await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.idAgriculteur || user.idCM }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    res.json({ message: "Login successful", userId: user.idAgriculteur || user.idCM, userType });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


const upload = multer({ storage: storage });

app.post('/signup', upload.single('photo'), async (req, res) => {
  try {
    const { nom, prenom, email, password, numtelephone, userType } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const table = userType === 'agriculteur' ? db.Agriculteur : db.Commeragricole;

    let photoFileName;
    if (req.file) {
      photoFileName = `${uuidv4()}${path.extname(req.file.originalname)}`;
      fs.renameSync(req.file.path, `uploads/${photoFileName}`);
    } else {
      photoFileName = 'random.png';
    }

    const newUser = await table.create({
      nom,
      prenom,
      email,
      password: hashedPassword, 
      numtelephone,
      photo: photoFileName 
    });

    res.status(201).json({ message: "Utilisateur créer ave succés", userId: newUser.id });
  } catch (error) {
    console.error("Erreur lors de l\'inscription:", error);
    res.status(500).json({ error: "Erreur" });
  }
});


// Routes d'agriculteur

const pubRouter = require('./routes/addpost');
app.use("/ajouterpublication", pubRouter);

const editerprofil = require('./routes/editerprofil');
app.use('/editprofil', editerprofil); 

const tr = require('./routes/gesterrain');
app.use('/terraindemander', tr);

const profilRouter = require('./routes/profil');
app.use("/profile", profilRouter);

const publicationRouter = require('./routes/pubs');
app.use("/publication", publicationRouter);

const like = require('./routes/like');
app.use("/likes",like);

const comment = require('./routes/commentaire');
app.use("/comments",comment);

const homeRouter = require('./routes/home');
app.use("/home", homeRouter);

const gereproduits = require('./routes/gereproduits');
app.use("/gereproduits", gereproduits);

const gereterrains = require('./routes/gereterrains');
app.use("/gereterrains", gereterrains);

const produitRouter = require("./routes/produit"); 
app.use("/ajouterproduit", produitRouter); 

const marketplacerouter = require('./routes/listedesproduits');
app.use("/listeproduit", marketplacerouter);

const pub = require('./routes/gerepublication');
app.use("/gerepublication", pub);

const gv = require('./routes/gestiondeventes');
app.use("/gestiondeventes", gv);

const disc = require('./routes/discussionroute');
app.use("/messages", disc);

const terrain = require('./routes/displayterrain');
app.use("/listeterrain", terrain);

const cart = require('./routes/panieragriculteur');
app.use("/panier", cart);

const terrainRouter = require('./routes/terrain');
app.use("/ajouterterrain", terrainRouter);

//Commerçant Agricole routes

const pacom = require('./routes/paniercommercant');
app.use("/paniercommercant", pacom);



// Admin
const m = require('./routes/admin/adminHome');
app.use("/adminHome", m);

const us = require('./routes/admin/gereuser');
app.use("/editerutilisateur", us);

const rec = require('./routes/admin/rec');
app.use("/rec", rec);

const recp = require('./routes/admin/produitdec');
app.use('/produitrec',recp);


// SERVER
const PORT = process.env.PORT || 3001;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
