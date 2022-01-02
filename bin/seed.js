const { db, Movie } = require("../server/db/");
const faker = require('faker');
const movie_names = ['blah blah blah']
const movie_rating = [5]
const seed = async () => {
    try {
      await db.sync({ force: true });
      const [blah] = await Promise.all(
        movie_names.map((title, idx) => 
           Movie.create({ title, stars: movie_rating[idx]}),
        )
      )
      db.close();
      console.log(`Seeding successful!`);   
    } catch (err) {
      db.close();
      console.log(` Error seeding: ${err.message} ${err.stack}`);
    }
  };
  
  seed();
  //module.exports = seed