/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('reviews').del()
  await knex('reviews').insert([
    { content: 'Absolutely love this product! The build quality is top-notch, and it works flawlessly. Highly recommend to everyone!', rating: 5, product_id: 1, user_id: 1 },
    { content: 'The product is okay for its price. The material feels a bit cheap, and the performance is just average. Expected more.', rating: 3, product_id: 2, user_id: 1 },
    { content: 'This is hands down the best purchase I’ve made this year! Great value for money, and it exceeds all expectations.', rating: 5, product_id: 3, user_id: 1 },
    { content: 'Terrible experience! The product stopped working after a few days, and customer support was unhelpful. Very disappointed.', rating: 1, product_id: 4, user_id: 1 },
    { content: 'It does exactly what it promises. No complaints so far. Solid product for everyday use.', rating: 4, product_id: 5, user_id: 1 },
    { content: 'If you’re looking for reliability and performance, this is the product for you. I’ve been using it daily, and it’s fantastic!', rating: 5, product_id: 6, user_id: 1 },
    { content: 'The product is functional, but there’s nothing special about it. It gets the job done, but don’t expect anything extraordinary.', rating: 3, product_id: 7, user_id: 1 },
    { content: 'Very disappointed with the overall experience. The product didn’t meet my expectations, and the after-sales service was poor.', rating: 2, product_id: 8, user_id: 1 },
    { content: 'Incredible! The design is sleek, and the features are exactly what I was looking for. It’s worth every penny.', rating: 5, product_id: 9, user_id: 1 },
    { content: 'The product is good, but the delivery took longer than expected. Thankfully, it arrived in good condition.', rating: 4, product_id: 10, user_id: 1 }
  ]);
};
