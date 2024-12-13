var User = require('./userModel')
async function list(req,res,next){
    await User.find()
              .then((data,err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
    //res.end('User List')
}

const create =async (req,res,next)=>{
    const { nom, email } = req.body 
    console.log(req.body.nom);
    console.log(req.params.age)
    const { age } = req.params
    console.log(req.params);
    await new User({
        nom: nom,
        email: email,
        age: age
    }).save()
      .then((data, err)=>{
          if(err){
              res.status(500).json(err)
            }
            console.log(data);
      })
    
res.json('User added ! nom : '+ nom + ' email : '+ email+ ' age : '+ age)
}

const update = async (req, res, next)=>{
    await User.findByIdAndUpdate(req.params.id, req.body)
              .then((data, err)=>{
                res.json(data)
              })
}

async function deleteU(req, res, next) {
    await User.findByIdAndDelete(req.params.id)
              .then((data, err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
}

// Find user by ID
const findById = async (req, res, next) => {
    const userId = req.params.id;
    await User.findById(userId)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error finding user', error: err });
        });
};

// Find user by nom
const findByNom = async (req, res, next) => {
    const { nom } = req.params;
    await User.findOne({ nom })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error finding user', error: err });
        });
};



// Find user by email
const findByEmail = async (req, res, next) => {
    const { email } = req.params;
    await User.findOne({ email })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error finding user', error: err });
        });
};

// Find user by age
const findByAge = async (req, res, next) => {
    const { age } = req.params;
    await User.find({ age })
        .then((data) => {
            if (data.length === 0) {
                return res.status(404).json({ message: 'No users found with this age' });
            }
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error finding user by age', error: err });
        });
};

module.exports = { create, list, update, deleteU, findById, findByNom, findByEmail, findByAge }