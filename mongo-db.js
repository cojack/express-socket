const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Cat = mongoose.model('Cat', {
    name: String,
    food: String
});

const schema = new mongoose.Schema({name: String}, { versionKey: '_somethingElse' });
const Thing = mongoose.model('Thing', schema);
const thing = new Thing({ name: 'mongoose v3' });
thing.save().then(t1 => {
    t1.name = 'mongoose v3.1';
    return t1.save();
}).then(t1 => console.log(t1));

// const kitty = new Cat({ name: 'Avast 5', food: 'fish' });


// (async () => {
//     await kitty.save();
// })();
// kitty.save()
//     .catch(e => console.error(e))
//     .then(() => Cat.find())
//     .then((cats) => console.log(cats))
//     .catch(e => console.error(e));

// Cat.findById('5df35aae70ff0d3df70c58d5').then(async avast => {
//     avast.name = 'Avast -1';
//     return avast.save();
// }).then(avastminus => console.log(avastminus));
/*
Cat.find({
    food: null
}).then(async cats => {
    if (!cats.length) {
        return;
    }
    for (const cat of cats) {
        cat.food = 'bird';
        await cat.save();
    }
}).then(() => Cat.find({
    food: 'bird'
})).then(cats => console.log(cats));
*/
