/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('category').insert([
    {name: 'PC Game Headsets', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c='},
    {name: 'Computers & Tablets', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c='},
    {name: 'PlayStation 5 Headsets', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c='},
    {name: 'PlayStation 4 Headsets', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c='},
    {name: 'Computer Headsets', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c='},
    {name: 'Computer Keyboards, Mice & Accessories', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c='},
    {name: 'Computer Keyboards', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c='},
    {name: 'Computer Keyboard & Mouse Combos', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c='},
    {name: 'Mac Games & Accessories', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c='},
    {name: 'Mac Gaming Keyboards', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c='}
  ]);
};
