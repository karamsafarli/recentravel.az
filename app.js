require('dotenv').config()
const express = require('express');
const DaxiliTur = require('./models/daxilitur');
const XariciTur = require('./models/xaricitur');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const Images = require('./models/images');
const Employee = require('./models/employee');
const Profile = require('./models/profile');
const Visa = require('./models/visaschema');
const cloudinary = require('./cloudinary');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000


mongoose.connect(process.env.MONGODB_URI.toString(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, async () => {
        console.log('App is listening on port 3000')
    }))
    .catch((err) => console.log(err))

app.use('/css', express.static('./css'));
app.use('/js', express.static('./js'))
app.use('/vendors', express.static('./vendors'));
app.use('/images', express.static('./images'));
app.use('/photo', express.static('./photo'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser())


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '--' + file.originalname)
//     }
// });

const storage2 = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload2 = multer({ storage: storage2 })

//const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Home.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '_haqqimizda.html'));
});
app.get('/daxilitur', (req, res) => {
    res.sendFile(path.join(__dirname, '_DaxiliTur.html'));
});
app.get('/xaricitur', (req, res) => {
    res.sendFile(path.join(__dirname, '_XariciTur.html'));
});

app.get('/visa', (req, res) => {
    res.sendFile(path.join(__dirname, 'visa.html'));
});

app.get('/daxili-turlar', async (req, res) => {
    try {
        const daxiliTurlar = await DaxiliTur.find();
        res.status(200).json(daxiliTurlar)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

});

app.get('/xarici-turlar', async (req, res) => {
    try {
        const xariciTurlar = await XariciTur.find();
        res.status(200).json(xariciTurlar)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

});

app.get('/change-password', (req, res) => {
    res.render('register')
});

app.get('/logout', (req, res) => {
    res.clearCookie('adminAuth');
    res.redirect('/login')
})

app.post('/change-password', async (req, res) => {
    const { oldpassword, newpassword, newusername } = req.body;
    try {
        const profile = await Profile.findOne();
        if (profile.password === oldpassword) {
            profile.password = newpassword;
            if (newusername) {
                profile.username = newusername
            }
            await profile.save()
            res.redirect('/login')
        } else {
            res.status(403).send("Wrong password")
        }
    } catch (error) {
        res.status(500).send('Wrong password');
    }
})

app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const profile = await Profile.findOne();
        if (profile.password === password && profile.username === username) {
            res.cookie('adminAuth', 'true', { httpOnly: true });
            res.redirect('/admin')
        } else {
            res.status(403).send('Istifadeci adi və ya şifrə yanlışdır');
        }
    } catch (error) {
        res.status(404).send('User not found')
    }
})

const checkAdminAuth = (req, res, next) => {
    if (req.cookies.adminAuth === 'true') {
        next();
    } else {
        res.redirect('/login');
    }
};

app.get('/admin', checkAdminAuth, async (req, res) => {
    const daxiliTurlar = await DaxiliTur.find();
    const xariciTurlar = await XariciTur.find();
    const employees = await Employee.find();
    const visaTurlar = await Visa.find();

    res.render('admin', { daxiliTurlar, xariciTurlar, employees, visaTurlar })
})

app.get('/admin/refresh', checkAdminAuth, async (req, res) => {
    const daxiliTurlar = await DaxiliTur.find();
    const xariciTurlar = await XariciTur.find();
    const employees = await Employee.find();

    res.render('admin', { daxiliTurlar, xariciTurlar, employees });
});

app.post('/daxili-turlar', upload2.single('image'), async (req, res) => {

    const { dturseher, dturtitle, description, dturprice, background } = req.body;
    const imgPath = req.file.path;
    try {
        const result = await cloudinary.uploader.upload(imgPath, { secure: true });
        const newCard = new DaxiliTur({
            cityName: dturseher,
            title: dturtitle,
            description: description,
            imagePath: result.secure_url,
            price: dturprice,
            background: background
        });

        await newCard.save();

        res.status(201).redirect('/admin');
    } catch (error) {
        res.status(500).redirect('/admin')
    }
});

app.delete('/daxili-turlar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await DaxiliTur.findByIdAndDelete(id);
        res.status(201).redirect('/admin')
    } catch (error) {
        res.status(500).send({ message: 'Error deleting the data' });
    }
});

app.delete('/xarici-turlar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await XariciTur.findByIdAndDelete(id);
        res.status(201).redirect('/admin')
    } catch (error) {
        res.status(500).send({ message: 'Error deleting the data' });
    }
});

app.post('/xarici-turlar', upload2.single('image'), async (req, res) => {
    const { xturseher, xturtitle, description, xturprice, background } = req.body;
    const imgPath = req.file.path;
    try {
        const result = await cloudinary.uploader.upload(imgPath, { secure: true });
        const newCard = new XariciTur({
            cityName: xturseher,
            title: xturtitle,
            description: description,
            imagePath: result.secure_url,
            price: xturprice,
            background: background
        });

        await newCard.save();
        res.status(201).redirect('/admin');
    } catch (error) {
        res.status(500).redirect('/admin')
    }
});


app.get('/visa-turlar', async (req,res) => {
    try {
        const visaTurlar = await Visa.find();
        res.status(200).json(visaTurlar);
    } catch (error) {
        res.status(404).send('Visa turlar not found')
    }

});

app.post('/visa-turlar', upload2.single('image'), async (req, res) => {
    const { vturseher, vturtitle, description, background } = req.body;
    const img = req.file.path;
    try {
        const result = await cloudinary.uploader.upload(img, { secure: true });
        const newVisa = new Visa({
            cityName: vturseher,
            title: vturtitle,
            description: description,
            imagePath: result.secure_url,
            background: background
        });

        await newVisa.save();
        res.status(201).redirect('/admin');
    } catch (error) {
        res.status(500).redirect('/admin')
    }
});

app.delete('/visa-turlar/:id', async (req,res) => {
    const id = req.params.id;

    try {
        await Visa.findByIdAndDelete(id);
        res.status(201).redirect('/admin');
    } catch (error) {
        res.status(500).send('Cannot delete this post');
    }
})


app.get('/header-images', async (req, res) => {
    try {
        const images = await Images.find();
        res.status(200).json(images)
    } catch (error) {
        res.status(500).send(error)
    }
});

app.post('/update-images-1', upload2.single('image'), async (req, res) => {
    const img = req.file.path;
    cloudinary.uploader.upload(img, { secure: true }, async (err, result) => {
        try {
            const bgImage = await Images.findOne();
            bgImage.headerBackground.path = result.secure_url;
            await bgImage.save();
            res.status(201).redirect('/admin');
        } catch (error) {
            res.status(501).send('Error occured')
        }
    })
});

app.post('/update-images-2', upload2.single('image'), async (req, res) => {
    const img = req.file.path
    cloudinary.uploader.upload(img, { secure: true }, async (err, result) => {
        try {
            const imgs = await Images.findOne();
            if (req.file) {
                imgs.smallImages[0].path = result.secure_url;
            }

            if (req.body.text) {
                imgs.smallImages[0].cityName = req.body.text;
            }
            await imgs.save();
            res.status(201).redirect('/admin');
        } catch (error) {
            res.status(501).send('Error occured')
        }
    })
});

app.post('/update-images-3', upload2.single('image'), async (req, res) => {
    const img = req.file.path
    cloudinary.uploader.upload(img, { secure: true }, async (err, result) => {
        try {
            const imgs = await Images.findOne();
            if (req.file) {
                imgs.smallImages[1].path = result.secure_url;
            }

            if (req.body.text) {
                imgs.smallImages[1].cityName = req.body.text;
            }
            await imgs.save();
            res.status(201).redirect('/admin');
        } catch (error) {
            res.status(501).send('Error occured')
        }
    })
});


app.post('/update-images-4', upload2.single('image'), async (req, res) => {
    const img = req.file.path
    cloudinary.uploader.upload(img, { secure: true }, async (err, result) => {
        try {
            const imgs = await Images.findOne();
            if (req.file) {
                imgs.smallImages[2].path = result.secure_url;
            }

            if (req.body.text) {
                imgs.smallImages[2].cityName = req.body.text;
            }
            await imgs.save();
            res.status(201).redirect('/admin');
        } catch (error) {
            res.status(501).send('Error occured')
        }
    })

});

app.get('/about-employee', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees)
    } catch (error) {
        res.status(404).send(error);
    }
});



app.post('/about', upload2.single('image'), async (req, res) => {
    const { name, job, description } = req.body;
    const img = req.file.path;
    cloudinary.uploader.upload(img, { secure: true }, async (err, result) => {
        try {
            const employees = new Employee({
                photo: result.secure_url,
                name: name,
                job: job,
                description: description
            });
            await employees.save()
            res.status(201).redirect('/admin')
        } catch (error) {
            res.status(501).send('Cannot added')
        }
    })
});


app.delete('/about/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await Employee.findByIdAndDelete(id);
        res.status(201).redirect('/admin')
    } catch (error) {
        res.status(500).send({ message: 'Error deleting the data' });
    }
});


app.get('/daxili-turlar/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const dTur = await DaxiliTur.findById(id);
        res.render('dProduct', { dTur })
    } catch (error) {
        res.status(404).send('Not found!')
    }
});


app.get('/xarici-turlar/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const xTur = await XariciTur.findById(id);
        res.render('xProduct', { xTur })
    } catch (error) {
        res.status(404).send('Not found!')
    }
});


