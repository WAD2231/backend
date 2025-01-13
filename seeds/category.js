/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('category').del();

  // Insert parent categories
  await knex('category').insert([
    { 
      name: 'PC Game Headsets', 
      description: 'High-quality headsets designed for immersive PC gaming experiences.', 
      thumbnail: 'https://media.istockphoto.com/id/1403828056/vector/circuit-board-blue-technology-background.jpg?s=612x612&w=0&k=20&c=FI1jC45r-VAe9heJFR_SGOGosbEi-zNm3B-SgDJJ25c=' 
    },
    { 
      name: 'Computers & Tablets', 
      description: 'Latest computers and tablets for all your computing needs.', 
      thumbnail: 'https://media.tapchitaichinh.vn/w1480/images/upload//2022/12/27/tai-chinh-cong-nghe-2.jpg' 
    },
    { 
      name: 'PlayStation 5 Headsets', 
      description: 'Top-notch headsets for an enhanced PlayStation 5 gaming experience.', 
      thumbnail: 'https://media.tapchitaichinh.vn/w1480/images/upload/tranhuyentrang/01152020/fintech_financial_technology_icons_circuit_board_thinkstock_664731514_3x2-100736056-large.jpg' 
    },
    { 
      name: 'PlayStation 4 Headsets', 
      description: 'High-quality headsets for PlayStation 4 gamers.', 
      thumbnail: 'https://fbu.edu.vn/wp-content/uploads/2020/02/nganh-cong-nghe-thong-tin.jpg' 
    },
    { 
      name: 'Computer Headsets', 
      description: 'Comfortable and high-fidelity headsets for computer use.', 
      thumbnail: 'https://www.pace.edu.vn/uploads/news/ImageContent/2015/09/cong-nghe-thong-tin-trong-san-xuat.png' 
    },
    { 
      name: 'Computer Keyboards, Mice & Accessories', 
      description: 'A wide range of keyboards, mice, and accessories for your computer.', 
      thumbnail: 'https://media.tapchitaichinh.vn/w1480/images/upload//2022/12/27/tai-chinh-cong-nghe-2.jpg' 
    },
    { 
      name: 'Computer Keyboards', 
      description: 'Durable and ergonomic keyboards for all types of computer users.', 
      thumbnail: 'https://media.tapchitaichinh.vn/w1480/images/upload/hoxuantruong/08302022/09.JPG' 
    },
    { 
      name: 'Computer Keyboard & Mouse Combos', 
      description: 'Convenient keyboard and mouse combos for seamless computing.', 
      thumbnail: 'https://media.doanhnhantrevietnam.vn/files/content/2023/08/12/tien-kts-0851.jpg' 
    },
    { 
      name: 'Mac Games & Accessories', 
      description: 'Games and accessories specifically designed for Mac users.', 
      thumbnail: 'https://www.flashfly.net/wp/wp-content/uploads/2022/09/14-vs-16-inch-mbp-m2-pro-and-max-feature-1.jpeg' 
    },
    { 
      name: 'Mac Gaming Keyboards', 
      description: 'High-performance gaming keyboards for Mac users.', 
      thumbnail: 'https://media.istockphoto.com/id/1363326235/vi/anh/flat-lay-c%E1%BB%A7a-c%C3%A1c-s%E1%BA%A3n-ph%E1%BA%A9m-t%C3%A1o-kh%C3%A1c-nhau-tr%C3%AAn-n%E1%BB%81n-m%C3%A0u-x%C3%A1m.jpg?s=612x612&w=0&k=20&c=LjLfDJR6Fkhi3_txTqxyxUie77klD66HlwJSZ_W9ZNY=' 
    },
    { 
      name: 'Asus Gaming Keyboards', 
      description: 'Top-tier gaming keyboards from Asus for an enhanced gaming experience.', 
      thumbnail: 'https://fbu.edu.vn/wp-content/uploads/2020/02/nganh-cong-nghe-thong-tin.jpg' 
    },
    { 
      name: 'Mac Gaming Mice', 
      description: 'Precision gaming mice designed for Mac users.', 
      thumbnail: 'https://media.tapchitaichinh.vn/w1480/images/upload//2022/12/27/tai-chinh-cong-nghe-2.jpg' 
    },
    { 
      name: 'Gaming Laptops', 
      description: 'High-performance laptops built for gaming.', 
      thumbnail: 'https://media.tapchitaichinh.vn/w1480/images/upload//2022/12/27/tai-chinh-cong-nghe-2.jpg' 
    },
    { 
      name: 'PC Gaming Accessories', 
      description: 'Essential accessories to enhance your PC gaming setup.', 
      thumbnail: 'https://fbu.edu.vn/wp-content/uploads/2020/02/nganh-cong-nghe-thong-tin.jpg' 
    },
    { 
      name: 'RGB Gaming Keyboards', 
      description: 'Vibrant RGB gaming keyboards for a visually stunning gaming experience.', 
      thumbnail: 'https://media.doanhnhantrevietnam.vn/files/content/2023/08/12/tien-kts-0851.jpg' 
    },
    { 
      name: 'High-Performance Mice', 
      description: 'Precision mice designed for high-performance computing and gaming.', 
      thumbnail: 'https://www.flashfly.net/wp/wp-content/uploads/2022/09/14-vs-16-inch-mbp-m2-pro-and-max-feature-1.jpeg' 
    },
    { 
      name: 'Custom Build PCs', 
      description: 'Custom-built PCs tailored to your specific needs and preferences.', 
      thumbnail: 'https://media.istockphoto.com/id/1363326235/vi/anh/flat-lay-c%E1%BB%A7a-c%C3%A1c-s%E1%BA%A3n-ph%E1%BA%A9m-t%C3%A1o-kh%C3%A1c-nhau-tr%C3%AAn-n%E1%BB%81n-m%C3%A0u-x%C3%A1m.jpg?s=612x612&w=0&k=20&c=LjLfDJR6Fkhi3_txTqxyxUie77klD66HlwJSZ_W9ZNY=' 
    },
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