/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del();

  // Insert parent categories
  await knex('category').insert([
    { name: 'PC Game Headsets', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c=' },
    { name: 'Computers & Tablets', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c=' },
    { name: 'PlayStation 5 Headsets', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c=' },
    { name: 'PlayStation 4 Headsets', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c=' },
    { name: 'Computer Headsets', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c=' },
    { name: 'Computer Keyboards, Mice & Accessories', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c=' },
    { name: 'Computer Keyboards', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c=' },
    { name: 'Computer Keyboard & Mouse Combos', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c=' },
    { name: 'Mac Games & Accessories', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c=' },
    { name: 'Mac Gaming Keyboards', thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c=' }
  ]);

  // Get the inserted categories to use their IDs
  const categories = await knex('category').select('category_id', 'name');

  // Create a map of category names to IDs
  const categoryMap = categories.reduce((map, category) => {
    map[category.name] = category.category_id;
    return map;
  }, {});

  // Update subcategories with correct super_category_id
  await knex('category')
    .where({ name: 'Computers & Tablets' })
    .update({ super_category_id: categoryMap['PC Game Headsets'] });
  await knex('category')
    .where({ name: 'PlayStation 5 Headsets' })
    .update({ super_category_id: categoryMap['Computers & Tablets'] });
  await knex('category')
    .where({ name: 'PlayStation 4 Headsets' })
    .update({ super_category_id: categoryMap['PC Game Headsets'] });
  await knex('category')
    .where({ name: 'Computer Headsets' })
    .update({ super_category_id: categoryMap['PC Game Headsets'] });
  await knex('category')
    .where({ name: 'Computer Keyboards, Mice & Accessories' })
    .update({ super_category_id: categoryMap['PlayStation 5 Headsets'] });
  await knex('category')
    .where({ name: 'Computer Keyboards' })
    .update({ super_category_id: categoryMap['PC Game Headsets'] });
  await knex('category')
    .where({ name: 'Computer Keyboard & Mouse Combos' })
    .update({ super_category_id: categoryMap['Computers & Tablets'] });
  await knex('category')
    .where({ name: 'Mac Games & Accessories' })
    .update({ super_category_id: categoryMap['PlayStation 5 Headsets'] });
  await knex('category')
    .where({ name: 'Mac Gaming Keyboards' })
    .update({ super_category_id: categoryMap['Mac Games & Accessories'] });
  await knex('category')
    .where({ name: 'Asus Gaming Keyboards' })
    .update({ super_category_id: categoryMap['Mac Gaming Keyboards'] });
};