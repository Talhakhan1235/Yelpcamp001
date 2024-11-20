const mongoose=require('mongoose');
const cities=require('./cities')
const {places , descriptors}=require('./seedHelpers')
const Campground=require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',{
})

const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('Database connected')
    console.log('=======seed/index.js 1')

})
console.log('=======seed/index.js 2')

const sample=(array)=>array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price=Math.floor( Math.random()*20)+10;
        const camp = new Campground({
            
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel temporibus id eveniet modi nisi adipisci vero dolorum, numquam perferendis perspiciatis consequuntur debitis consectetur inventore, cupiditate quos harum, at voluptates. Eos.',
            price,
            author: '670e391e89a666dc0cc823a3',
            geometry: {
              type: "Point",
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
              ]
          },
            images:[
                {
                  url: 'https://res.cloudinary.com/dgsyixxnd/image/upload/v1731830211/YelpCamp/hghhcxedz91cfxor48m0.jpg',
                  filename: 'YelpCamp/vv7nzxae5qexfzlipupj',
                },
                {
                  url: 'https://res.cloudinary.com/dgsyixxnd/image/upload/v1731750212/YelpCamp/axuhuabiy43mfwuu37em.jpg',
                  filename: 'YelpCamp/fcnx9ouketr1hai0jlmy',
                }
              ]
        })
        await camp.save();
    }
}

module.exports = seedDB
seedDB().then(()=>{
    mongoose.connection.close()
});