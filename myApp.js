require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({name:"Aliyu Hamza", age:11, favoriteFoods: ["Rice", "Burrito"] });
  person.save((err,res)=>{
    if(err){
      done(err, null)
    }
    done(null, person);
  })
  
};

const createManyPeople = (arrayOfPeople, done) => {
  const manyPeople = Person.create(arrayOfPeople, (err, res)=>{
  if(err){
      done(err, null)
    }
    done(null, res);
  });
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err,res)=>{
    if(err){
      return done(err, null);
    }
    done(null, res);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, (err,res)=>{
    if(err){
      return done(err, null);
    }
    done(null, res);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId}, (err,res)=>{
    if(err){
      return done(err, null);
    }
    done(null, res);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  Person.findById({_id:personId}, (err,res)=>{
    if(err){
      return done(err, null);
    }
    res.favoriteFoods.push(foodToAdd);
    res.save((err, res)=>{
      done(null, res);
    });
    
  })
 
};

const findAndUpdate =async (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName}, {age:ageToSet}, {new:true}).then(res=>{
    done(null, res);
  }).catch(err=>{
    done(err, null)
  });
  
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId).then(res=>{
    done(null, res);
  }).catch(err=>{
    done(err, null);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}).then(res=>{
    done(null, res)
  }).catch(err=>{
    done(err, null)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort([["name", 1]]) // Specify sort as array of arrays
    .limit(2)
    .select("-age")
    .exec()
    .then((res) => {
      done(null, res);
    })
    .catch((err) => {
      done(err, null);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
