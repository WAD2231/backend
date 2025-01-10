/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('product_image').del()
  await knex('product_image').insert([
    { product_id: 1, image_url: 'https://m.media-amazon.com/images/I/61gSpxZTZZL._AC_UY218_.jpg' },
    { product_id: 1, image_url: 'https://m.media-amazon.com/images/I/7113k0qNblL._AC_UY218_.jpg' },
    { product_id: 1, image_url: 'https://m.media-amazon.com/images/I/61j3wQheLXL._AC_UY218_.jpg' },
    { product_id: 1, image_url: 'https://m.media-amazon.com/images/I/61is2ZwnHEL._AC_UY218_.jpg' },

    { product_id: 2, image_url: 'https://m.media-amazon.com/images/I/61is2ZwnHEL._AC_UY218_.jpg' },
    { product_id: 2, image_url: 'https://m.media-amazon.com/images/I/61gSpxZTZZL._AC_UY218_.jpg' },
    { product_id: 2, image_url: 'https://m.media-amazon.com/images/I/61j3wQheLXL._AC_UY218_.jpg' },

    { product_id: 3, image_url: 'https://m.media-amazon.com/images/I/61jBnY6paeL._AC_UY218_.jpg' },
    { product_id: 3, image_url: 'https://m.media-amazon.com/images/I/61+zbpS+6iL._AC_UY218_.jpg' },
    { product_id: 3, image_url: 'https://m.media-amazon.com/images/I/71Ly9zSMVnL._AC_UY218_.jpg' },

    { product_id: 4, image_url: 'https://m.media-amazon.com/images/I/611G2Fw-4PL._AC_UY218_.jpg' },
    { product_id: 4, image_url: 'https://m.media-amazon.com/images/I/61qhXbkJvTL._AC_UY218_.jpg' },
    { product_id: 4, image_url: 'https://m.media-amazon.com/images/I/61-kTKQuDUL._AC_UY218_.jpg' },
    { product_id: 4, image_url: 'https://m.media-amazon.com/images/I/61K+wxYVIEL._AC_UY218_.jpg' },

    { product_id: 5, image_url: 'https://m.media-amazon.com/images/I/61jhVTLFAEL._AC_UY218_.jpg' },
    { product_id: 5, image_url: 'https://m.media-amazon.com/images/I/71ehwfAM4-L._AC_UY218_.jpg' },
    { product_id: 5, image_url: 'https://m.media-amazon.com/images/I/615wODNPYJL._AC_UY218_.jpg' },

    { product_id: 6, image_url: 'https://m.media-amazon.com/images/I/51jkxo3a7bL._AC_UY218_.jpg' },
    { product_id: 6, image_url: 'https://m.media-amazon.com/images/I/61RM1rMoceL._AC_UY218_.jpg' },
    { product_id: 6, image_url: 'https://m.media-amazon.com/images/I/71Yp7pxBFOL._AC_UY218_.jpg' },
    { product_id: 6, image_url: 'https://m.media-amazon.com/images/I/61Q56A7UfNL._AC_UY218_.jpg' },

    { product_id: 7, image_url: 'https://m.media-amazon.com/images/I/715mkYSaJLL._AC_UY218_.jpg' },
    { product_id: 7, image_url: 'https://m.media-amazon.com/images/I/51jkxo3a7bL._AC_UY218_.jpg' },
    { product_id: 7, image_url: 'https://m.media-amazon.com/images/I/61RM1rMoceL._AC_UY218_.jpg' },

    { product_id: 8, image_url: 'https://m.media-amazon.com/images/I/51jkxo3a7bL._AC_UY218_.jpg' },
    { product_id: 8, image_url: 'https://m.media-amazon.com/images/I/71ehwfAM4-L._AC_UY218_.jpg' },
    { product_id: 8, image_url: 'https://m.media-amazon.com/images/I/61Q56A7UfNL._AC_UY218_.jpg' },

    { product_id: 9, image_url: 'https://m.media-amazon.com/images/I/61qhXbkJvTL._AC_UY218_.jpg' },
    { product_id: 9, image_url: 'https://m.media-amazon.com/images/I/71Yp7pxBFOL._AC_UY218_.jpg' },
    { product_id: 9, image_url: 'https://m.media-amazon.com/images/I/61RM1rMoceL._AC_UY218_.jpg' },

    { product_id: 10, image_url: 'https://m.media-amazon.com/images/I/61gSpxZTZZL._AC_UY218_.jpg' },
    { product_id: 10, image_url: 'https://m.media-amazon.com/images/I/61j3wQheLXL._AC_UY218_.jpg' },
    { product_id: 10, image_url: 'https://m.media-amazon.com/images/I/61is2ZwnHEL._AC_UY218_.jpg' },

    { product_id: 11, image_url: 'https://m.media-amazon.com/images/I/61gSpxZTZZL._AC_UY218_.jpg' },
    { product_id: 11, image_url: 'https://m.media-amazon.com/images/I/71ehwfAM4-L._AC_UY218_.jpg' },
    { product_id: 11, image_url: 'https://m.media-amazon.com/images/I/61is2ZwnHEL._AC_UY218_.jpg' },

    { product_id: 12, image_url: 'https://m.media-amazon.com/images/I/71Yp7pxBFOL._AC_UY218_.jpg' },
    { product_id: 12, image_url: 'https://m.media-amazon.com/images/I/61j3wQheLXL._AC_UY218_.jpg' },
    { product_id: 12, image_url: 'https://m.media-amazon.com/images/I/61is2ZwnHEL._AC_UY218_.jpg' },

    { product_id: 13, image_url: 'https://m.media-amazon.com/images/I/61gSpxZTZZL._AC_UY218_.jpg' },
    { product_id: 13, image_url: 'https://m.media-amazon.com/images/I/61-kTKQuDUL._AC_UY218_.jpg' },
    { product_id: 13, image_url: 'https://m.media-amazon.com/images/I/71Yp7pxBFOL._AC_UY218_.jpg' },

    { product_id: 14, image_url: 'https://m.media-amazon.com/images/I/61is2ZwnHEL._AC_UY218_.jpg' },
    { product_id: 14, image_url: 'https://m.media-amazon.com/images/I/61-kTKQuDUL._AC_UY218_.jpg' },
    { product_id: 14, image_url: 'https://m.media-amazon.com/images/I/71Yp7pxBFOL._AC_UY218_.jpg' },

    { product_id: 15, image_url: 'https://m.media-amazon.com/images/I/61gSpxZTZZL._AC_UY218_.jpg' },
    { product_id: 15, image_url: 'https://m.media-amazon.com/images/I/61-kTKQuDUL._AC_UY218_.jpg' },
    { product_id: 15, image_url: 'https://m.media-amazon.com/images/I/715mkYSaJLL._AC_UY218_.jpg' },

    { product_id: 16, image_url: 'https://m.media-amazon.com/images/I/61is2ZwnHEL._AC_UY218_.jpg' },
    { product_id: 16, image_url: 'https://m.media-amazon.com/images/I/61-kTKQuDUL._AC_UY218_.jpg' },
    { product_id: 16, image_url: 'https://m.media-amazon.com/images/I/715mkYSaJLL._AC_UY218_.jpg' },

    { product_id: 17, image_url: 'https://m.media-amazon.com/images/I/61qhXbkJvTL._AC_UY218_.jpg' },
    { product_id: 17, image_url: 'https://m.media-amazon.com/images/I/61-kTKQuDUL._AC_UY218_.jpg' },
    { product_id: 17, image_url: 'https://m.media-amazon.com/images/I/71Yp7pxBFOL._AC_UY218_.jpg' },
    { product_id: 17, image_url: 'https://m.media-amazon.com/images/I/61RM1rMoceL._AC_UY218_.jpg' },

    { product_id: 18, image_url: 'https://m.media-amazon.com/images/I/71Ly9zSMVnL._AC_UY218_.jpg' },
    { product_id: 18, image_url: 'https://m.media-amazon.com/images/I/51FRJHB7XOL._AC_UY218_.jpg' },
    { product_id: 18, image_url: 'https://m.media-amazon.com/images/I/61j6ey6mBpL._AC_UY218_.jpg' },

    { product_id: 19, image_url: 'https://m.media-amazon.com/images/I/71yqtewaJKL._AC_UY218_.jpg' },
    { product_id: 19, image_url: 'https://m.media-amazon.com/images/I/61o3FbQ6OJL._AC_UY218_.jpg' },
    { product_id: 19, image_url: 'https://m.media-amazon.com/images/I/71IL4SsThNL._AC_UY218_.jpg' },

    { product_id: 20, image_url: 'https://m.media-amazon.com/images/I/71IvAZyaR0L._AC_UY218_.jpg' },
    { product_id: 20, image_url: 'https://m.media-amazon.com/images/I/61l906x+fZL._AC_UY218_.jpg' },
    { product_id: 20, image_url: 'https://m.media-amazon.com/images/I/61dVV8sjTLL._AC_UY218_.jpg' },
    { product_id: 20, image_url: 'https://m.media-amazon.com/images/I/71hGqu8tSCL._AC_UY218_.jpg' },

    { product_id: 21, image_url: 'https://m.media-amazon.com/images/I/71geIOeuw-L._AC_UY218_.jpg' },
    { product_id: 21, image_url: 'https://m.media-amazon.com/images/I/61aogecaK-L._AC_UY218_.jpg' },
    { product_id: 21, image_url: 'https://m.media-amazon.com/images/I/61EkW1BUMRL._AC_UY218_.jpg' },
    { product_id: 21, image_url: 'https://m.media-amazon.com/images/I/71yqtewaJKL._AC_UY218_.jpg' },

    { product_id: 22, image_url: 'https://m.media-amazon.com/images/I/71yqtewaJKL._AC_UY218_.jpg' },
    { product_id: 22, image_url: 'https://m.media-amazon.com/images/I/61o3FbQ6OJL._AC_UY218_.jpg' },
    { product_id: 22, image_url: 'https://m.media-amazon.com/images/I/71IL4SsThNL._AC_UY218_.jpg' },

    { product_id: 23, image_url: 'https://m.media-amazon.com/images/I/71IvAZyaR0L._AC_UY218_.jpg' },
    { product_id: 23, image_url: 'https://m.media-amazon.com/images/I/61l906x+fZL._AC_UY218_.jpg' },
    { product_id: 23, image_url: 'https://m.media-amazon.com/images/I/61dVV8sjTLL._AC_UY218_.jpg' },

    { product_id: 24, image_url: 'https://m.media-amazon.com/images/I/71hGqu8tSCL._AC_UY218_.jpg' },
    { product_id: 24, image_url: 'https://m.media-amazon.com/images/I/71geIOeuw-L._AC_UY218_.jpg' },
    { product_id: 24, image_url: 'https://m.media-amazon.com/images/I/61aogecaK-L._AC_UY218_.jpg' },

    { product_id: 25, image_url: 'https://m.media-amazon.com/images/I/61EkW1BUMRL._AC_UY218_.jpg' },
    { product_id: 25, image_url: 'https://m.media-amazon.com/images/I/71yqtewaJKL._AC_UY218_.jpg' },
    { product_id: 25, image_url: 'https://m.media-amazon.com/images/I/61o3FbQ6OJL._AC_UY218_.jpg' },

    { product_id: 26, image_url: 'https://m.media-amazon.com/images/I/71IL4SsThNL._AC_UY218_.jpg' },
    { product_id: 26, image_url: 'https://m.media-amazon.com/images/I/61l906x+fZL._AC_UY218_.jpg' },
    { product_id: 26, image_url: 'https://m.media-amazon.com/images/I/71IvAZyaR0L._AC_UY218_.jpg' },

    { product_id: 27, image_url: 'https://m.media-amazon.com/images/I/61dVV8sjTLL._AC_UY218_.jpg' },
    { product_id: 27, image_url: 'https://m.media-amazon.com/images/I/71hGqu8tSCL._AC_UY218_.jpg' },
    { product_id: 27, image_url: 'https://m.media-amazon.com/images/I/71geIOeuw-L._AC_UY218_.jpg' },

    { product_id: 28, image_url: 'https://m.media-amazon.com/images/I/61aogecaK-L._AC_UY218_.jpg' },
    { product_id: 28, image_url: 'https://m.media-amazon.com/images/I/61EkW1BUMRL._AC_UY218_.jpg' },
    { product_id: 28, image_url: 'https://m.media-amazon.com/images/I/71yqtewaJKL._AC_UY218_.jpg' },

    { product_id: 29, image_url: 'https://m.media-amazon.com/images/I/61o3FbQ6OJL._AC_UY218_.jpg' },
    { product_id: 29, image_url: 'https://m.media-amazon.com/images/I/71IL4SsThNL._AC_UY218_.jpg' },
    { product_id: 29, image_url: 'https://m.media-amazon.com/images/I/61l906x+fZL._AC_UY218_.jpg' },

    { product_id: 30, image_url: 'https://m.media-amazon.com/images/I/71IvAZyaR0L._AC_UY218_.jpg' },
    { product_id: 30, image_url: 'https://m.media-amazon.com/images/I/61dVV8sjTLL._AC_UY218_.jpg' },
    { product_id: 30, image_url: 'https://m.media-amazon.com/images/I/71hGqu8tSCL._AC_UY218_.jpg' },

    { product_id: 31, image_url: 'https://m.media-amazon.com/images/I/81divYKpeTL._AC_UY218_.jpg' },
    { product_id: 31, image_url: 'https://m.media-amazon.com/images/I/815uX7wkOZS._AC_UY218_.jpg' },
    { product_id: 31, image_url: 'https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg' },
    { product_id: 31, image_url: 'https://m.media-amazon.com/images/I/81yG4KTmOpL._AC_UY218_.jpg' },

    { product_id: 32, image_url: 'https://m.media-amazon.com/images/I/71yaP7euNAL._AC_UY218_.jpg' },
    { product_id: 32, image_url: 'https://m.media-amazon.com/images/I/61Wc1fDGJuL._AC_UY218_.jpg' },
    { product_id: 32, image_url: 'https://m.media-amazon.com/images/I/51PsNbMd-CL._AC_UY218_.jpg' },

    { product_id: 33, image_url: 'https://m.media-amazon.com/images/I/71yFp1LYUGL._AC_UY218_.jpg' },
    { product_id: 33, image_url: 'https://m.media-amazon.com/images/I/61IpRGnny7L._AC_UY218_.jpg' },
    { product_id: 33, image_url: 'https://m.media-amazon.com/images/I/71CGrFl8cjL._AC_UY218_.jpg' },

    { product_id: 34, image_url: 'https://m.media-amazon.com/images/I/616aCuRtnpL._AC_UY218_.jpg' },
    { product_id: 34, image_url: 'https://m.media-amazon.com/images/I/61ULmOi9n5L._AC_UY218_.jpg' },
    { product_id: 34, image_url: 'https://m.media-amazon.com/images/I/614Jk1dIoGL._AC_UY218_.jpg' },
    { product_id: 34, image_url: 'https://m.media-amazon.com/images/I/71gbrvRJI-L._AC_UY218_.jpg' },

    { product_id: 35, image_url: 'https://m.media-amazon.com/images/I/61jojpe4KVL._AC_UY218_.jpg' },
    { product_id: 35, image_url: 'https://m.media-amazon.com/images/I/71pTP-ll4sL._AC_UY218_.jpg' },
    { product_id: 35, image_url: 'https://m.media-amazon.com/images/I/614Jk1dIoGL._AC_UY218_.jpg' },

    { product_id: 36, image_url: 'https://m.media-amazon.com/images/I/71CGrFl8cjL._AC_UY218_.jpg' },
    { product_id: 36, image_url: 'https://m.media-amazon.com/images/I/614Jk1dIoGL._AC_UY218_.jpg' },
    { product_id: 36, image_url: 'https://m.media-amazon.com/images/I/51PsNbMd-CL._AC_UY218_.jpg' },

    { product_id: 37, image_url: 'https://m.media-amazon.com/images/I/815uX7wkOZS._AC_UY218_.jpg' },
    { product_id: 37, image_url: 'https://m.media-amazon.com/images/I/81divYKpeTL._AC_UY218_.jpg' },
    { product_id: 37, image_url: 'https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg' },

    { product_id: 38, image_url: 'https://m.media-amazon.com/images/I/81yG4KTmOpL._AC_UY218_.jpg' },
    { product_id: 38, image_url: 'https://m.media-amazon.com/images/I/71yaP7euNAL._AC_UY218_.jpg' },
    { product_id: 38, image_url: 'https://m.media-amazon.com/images/I/71pTP-ll4sL._AC_UY218_.jpg' },
    { product_id: 38, image_url: 'https://m.media-amazon.com/images/I/61jojpe4KVL._AC_UY218_.jpg' },

    { product_id: 39, image_url: 'https://m.media-amazon.com/images/I/71gbrvRJI-L._AC_UY218_.jpg' },
    { product_id: 39, image_url: 'https://m.media-amazon.com/images/I/614Jk1dIoGL._AC_UY218_.jpg' },
    { product_id: 39, image_url: 'https://m.media-amazon.com/images/I/815uX7wkOZS._AC_UY218_.jpg' },

    { product_id: 40, image_url: 'https://m.media-amazon.com/images/I/81divYKpeTL._AC_UY218_.jpg' },
    { product_id: 40, image_url: 'https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg' },
    { product_id: 40, image_url: 'https://m.media-amazon.com/images/I/81yG4KTmOpL._AC_UY218_.jpg' },

    { product_id: 41, image_url: 'https://m.media-amazon.com/images/I/71yaP7euNAL._AC_UY218_.jpg' },
    { product_id: 41, image_url: 'https://m.media-amazon.com/images/I/71pTP-ll4sL._AC_UY218_.jpg' },
    { product_id: 41, image_url: 'https://m.media-amazon.com/images/I/61jojpe4KVL._AC_UY218_.jpg' },
    { product_id: 41, image_url: 'https://m.media-amazon.com/images/I/71gbrvRJI-L._AC_UY218_.jpg' },

    { product_id: 42, image_url: 'https://m.media-amazon.com/images/I/614Jk1dIoGL._AC_UY218_.jpg' },
    { product_id: 42, image_url: 'https://m.media-amazon.com/images/I/815uX7wkOZS._AC_UY218_.jpg' },
    { product_id: 42, image_url: 'https://m.media-amazon.com/images/I/81divYKpeTL._AC_UY218_.jpg' },

    { product_id: 43, image_url: 'https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg' },
    { product_id: 43, image_url: 'https://m.media-amazon.com/images/I/81yG4KTmOpL._AC_UY218_.jpg' },
    { product_id: 43, image_url: 'https://m.media-amazon.com/images/I/71yaP7euNAL._AC_UY218_.jpg' },

    { product_id: 44, image_url: 'https://m.media-amazon.com/images/I/71pTP-ll4sL._AC_UY218_.jpg' },
    { product_id: 44, image_url: 'https://m.media-amazon.com/images/I/61jojpe4KVL._AC_UY218_.jpg' },
    { product_id: 44, image_url: 'https://m.media-amazon.com/images/I/71gbrvRJI-L._AC_UY218_.jpg' },
    { product_id: 44, image_url: 'https://m.media-amazon.com/images/I/614Jk1dIoGL._AC_UY218_.jpg' },

    { product_id: 45, image_url: 'https://m.media-amazon.com/images/I/815uX7wkOZS._AC_UY218_.jpg' },
    { product_id: 45, image_url: 'https://m.media-amazon.com/images/I/81divYKpeTL._AC_UY218_.jpg' },
    { product_id: 45, image_url: 'https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg' },

    { product_id: 46, image_url: 'https://m.media-amazon.com/images/I/81yG4KTmOpL._AC_UY218_.jpg' },
    { product_id: 46, image_url: 'https://m.media-amazon.com/images/I/71yaP7euNAL._AC_UY218_.jpg' },
    { product_id: 46, image_url: 'https://m.media-amazon.com/images/I/71pTP-ll4sL._AC_UY218_.jpg' },

    { product_id: 47, image_url: 'https://m.media-amazon.com/images/I/61jojpe4KVL._AC_UY218_.jpg' },
    { product_id: 47, image_url: 'https://m.media-amazon.com/images/I/71gbrvRJI-L._AC_UY218_.jpg' },
    { product_id: 47, image_url: 'https://m.media-amazon.com/images/I/614Jk1dIoGL._AC_UY218_.jpg' },

    { product_id: 48, image_url: 'https://m.media-amazon.com/images/I/815uX7wkOZS._AC_UY218_.jpg' },
    { product_id: 48, image_url: 'https://m.media-amazon.com/images/I/81divYKpeTL._AC_UY218_.jpg' },
    { product_id: 48, image_url: 'https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg' },

    { product_id: 49, image_url: 'https://m.media-amazon.com/images/I/81yG4KTmOpL._AC_UY218_.jpg' },
    { product_id: 49, image_url: 'https://m.media-amazon.com/images/I/71yaP7euNAL._AC_UY218_.jpg' },
    { product_id: 49, image_url: 'https://m.media-amazon.com/images/I/71pTP-ll4sL._AC_UY218_.jpg' },
    { product_id: 49, image_url: 'https://m.media-amazon.com/images/I/61jojpe4KVL._AC_UY218_.jpg' },

    { product_id: 50, image_url: 'https://m.media-amazon.com/images/I/71gbrvRJI-L._AC_UY218_.jpg' },
    { product_id: 50, image_url: 'https://m.media-amazon.com/images/I/614Jk1dIoGL._AC_UY218_.jpg' },
    { product_id: 50, image_url: 'https://m.media-amazon.com/images/I/815uX7wkOZS._AC_UY218_.jpg' },

    { product_id: 51, image_url: 'https://m.media-amazon.com/images/I/61gKkYQn6lL._AC_UY218_.jpg' },
    { product_id: 51, image_url: 'https://m.media-amazon.com/images/I/71yaP7euNAL._AC_UY218_.jpg' },
    { product_id: 51, image_url: 'https://m.media-amazon.com/images/I/815uX7wkOZS._AC_UY218_.jpg' },

    { product_id: 52, image_url: 'https://m.media-amazon.com/images/I/61jojpe4KVL._AC_UY218_.jpg' },
    { product_id: 52, image_url: 'https://m.media-amazon.com/images/I/614Jk1dIoGL._AC_UY218_.jpg' },
    { product_id: 52, image_url: 'https://m.media-amazon.com/images/I/81divYKpeTL._AC_UY218_.jpg' },
    { product_id: 52, image_url: 'https://m.media-amazon.com/images/I/81yG4KTmOpL._AC_UY218_.jpg' },

    { product_id: 53, image_url: 'https://m.media-amazon.com/images/I/71pTP-ll4sL._AC_UY218_.jpg' },
    { product_id: 53, image_url: 'https://m.media-amazon.com/images/I/71gbrvRJI-L._AC_UY218_.jpg' },
    { product_id: 53, image_url: 'https://m.media-amazon.com/images/I/71yaP7euNAL._AC_UY218_.jpg' },

    { product_id: 54, image_url: 'https://m.media-amazon.com/images/I/614Jk1dIoGL._AC_UY218_.jpg' },
    { product_id: 54, image_url: 'https://m.media-amazon.com/images/I/71CGrFl8cjL._AC_UY218_.jpg' },
    { product_id: 54, image_url: 'https://m.media-amazon.com/images/I/61IpRGnny7L._AC_UY218_.jpg' },

    { product_id: 55, image_url: 'https://m.media-amazon.com/images/I/71yaP7euNAL._AC_UY218_.jpg' },
    { product_id: 55, image_url: 'https://m.media-amazon.com/images/I/815uX7wkOZS._AC_UY218_.jpg' },
    { product_id: 55, image_url: 'https://m.media-amazon.com/images/I/51PsNbMd-CL._AC_UY218_.jpg' },

    { product_id: 56, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 56, image_url: 'https://m.media-amazon.com/images/I/51rp0nqaPoL._AC_UY218_.jpg' },
    { product_id: 56, image_url: 'https://m.media-amazon.com/images/I/61xk4XNRktL._AC_UY218_.jpg' },
    { product_id: 56, image_url: 'https://m.media-amazon.com/images/I/61UjBLFlH2L._AC_UY218_.jpg' },

    { product_id: 57, image_url: 'https://m.media-amazon.com/images/I/61pmLlKbSTL._AC_UY218_.jpg' },
    { product_id: 57, image_url: 'https://m.media-amazon.com/images/I/71PGVVHz08L._AC_UY218_.jpg' },
    { product_id: 57, image_url: 'https://m.media-amazon.com/images/I/61XyNdmvr6L._AC_UY218_.jpg' },

    { product_id: 58, image_url: 'https://m.media-amazon.com/images/I/81nkYlfA5ZL._AC_UY218_.jpg' },
    { product_id: 58, image_url: 'https://m.media-amazon.com/images/I/71CxUvG46rL._AC_UY218_.jpg' },
    { product_id: 58, image_url: 'https://m.media-amazon.com/images/I/41al5-lNvML._AC_UY218_.jpg' },

    { product_id: 59, image_url: 'https://m.media-amazon.com/images/I/61LE9-6KxdL._AC_UY218_.jpg' },
    { product_id: 59, image_url: 'https://m.media-amazon.com/images/I/51fYXSnSu9L._AC_UY218_.jpg' },
    { product_id: 59, image_url: 'https://m.media-amazon.com/images/I/71HLNfFVCcL._AC_UY218_.jpg' },
    
    { product_id: 60, image_url: 'https://m.media-amazon.com/images/I/51rp0nqaPoL._AC_UY218_.jpg' },
    { product_id: 60, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 60, image_url: 'https://m.media-amazon.com/images/I/71CxUvG46rL._AC_UY218_.jpg' },
    
    { product_id: 61, image_url: 'https://m.media-amazon.com/images/I/71PGVVHz08L._AC_UY218_.jpg' },
    { product_id: 61, image_url: 'https://m.media-amazon.com/images/I/61UjBLFlH2L._AC_UY218_.jpg' },
    { product_id: 61, image_url: 'https://m.media-amazon.com/images/I/71L1ezoIH9L._AC_UY218_.jpg' },
    
    { product_id: 62, image_url: 'https://m.media-amazon.com/images/I/81xDumBYGBL._AC_UY218_.jpg' },
    { product_id: 62, image_url: 'https://m.media-amazon.com/images/I/71HLNfFVCcL._AC_UY218_.jpg' },
    { product_id: 62, image_url: 'https://m.media-amazon.com/images/I/61pmLlKbSTL._AC_UY218_.jpg' },
    
    { product_id: 63, image_url: 'https://m.media-amazon.com/images/I/51fYXSnSu9L._AC_UY218_.jpg' },
    { product_id: 63, image_url: 'https://m.media-amazon.com/images/I/71L1ezoIH9L._AC_UY218_.jpg' },
    { product_id: 63, image_url: 'https://m.media-amazon.com/images/I/61pmLlKbSTL._AC_UY218_.jpg' },
    
    { product_id: 64, image_url: 'https://m.media-amazon.com/images/I/41al5-lNvML._AC_UY218_.jpg' },
    { product_id: 64, image_url: 'https://m.media-amazon.com/images/I/81xDumBYGBL._AC_UY218_.jpg' },
    { product_id: 64, image_url: 'https://m.media-amazon.com/images/I/71CxUvG46rL._AC_UY218_.jpg' },
    
    { product_id: 65, image_url: 'https://m.media-amazon.com/images/I/61pmLlKbSTL._AC_UY218_.jpg' },
    { product_id: 65, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 65, image_url: 'https://m.media-amazon.com/images/I/61XyNdmvr6L._AC_UY218_.jpg' },
    
    { product_id: 66, image_url: 'https://m.media-amazon.com/images/I/61UjBLFlH2L._AC_UY218_.jpg' },
    { product_id: 66, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 66, image_url: 'https://m.media-amazon.com/images/I/71HLNfFVCcL._AC_UY218_.jpg' },

    { product_id: 67, image_url: 'https://m.media-amazon.com/images/I/51fYXSnSu9L._AC_UY218_.jpg' },
    { product_id: 67, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 67, image_url: 'https://m.media-amazon.com/images/I/71CxUvG46rL._AC_UY218_.jpg' },

    { product_id: 68, image_url: 'https://m.media-amazon.com/images/I/71HLNfFVCcL._AC_UY218_.jpg' },
    { product_id: 68, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 68, image_url: 'https://m.media-amazon.com/images/I/71L1ezoIH9L._AC_UY218_.jpg' },

    { product_id: 69, image_url: 'https://m.media-amazon.com/images/I/61pmLlKbSTL._AC_UY218_.jpg' },
    { product_id: 69, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 69, image_url: 'https://m.media-amazon.com/images/I/71L1ezoIH9L._AC_UY218_.jpg' },
    { product_id: 69, image_url: 'https://m.media-amazon.com/images/I/71HLNfFVCcL._AC_UY218_.jpg' },

    { product_id: 70, image_url: 'https://m.media-amazon.com/images/I/51fYXSnSu9L._AC_UY218_.jpg' },
    { product_id: 70, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 70, image_url: 'https://m.media-amazon.com/images/I/61pmLlKbSTL._AC_UY218_.jpg' },
    
    { product_id: 71, image_url: 'https://m.media-amazon.com/images/I/71HLNfFVCcL._AC_UY218_.jpg' },
    { product_id: 71, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 71, image_url: 'https://m.media-amazon.com/images/I/71L1ezoIH9L._AC_UY218_.jpg' },
    { product_id: 71, image_url: 'https://m.media-amazon.com/images/I/61pmLlKbSTL._AC_UY218_.jpg' },
    
    { product_id: 72, image_url: 'https://m.media-amazon.com/images/I/51fYXSnSu9L._AC_UY218_.jpg' },
    { product_id: 72, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 72, image_url: 'https://m.media-amazon.com/images/I/71L1ezoIH9L._AC_UY218_.jpg' },
    { product_id: 72, image_url: 'https://m.media-amazon.com/images/I/71HLNfFVCcL._AC_UY218_.jpg' },

    { product_id: 73, image_url: 'https://m.media-amazon.com/images/I/61pmLlKbSTL._AC_UY218_.jpg' },
    { product_id: 73, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 73, image_url: 'https://m.media-amazon.com/images/I/71L1ezoIH9L._AC_UY218_.jpg' },

    { product_id: 74, image_url: 'https://m.media-amazon.com/images/I/51fYXSnSu9L._AC_UY218_.jpg' },
    { product_id: 74, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 74, image_url: 'https://m.media-amazon.com/images/I/71L1ezoIH9L._AC_UY218_.jpg' },
    
    { product_id: 75, image_url: 'https://m.media-amazon.com/images/I/61pmLlKbSTL._AC_UY218_.jpg' },
    { product_id: 75, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 75, image_url: 'https://m.media-amazon.com/images/I/71L1ezoIH9L._AC_UY218_.jpg' },
    { product_id: 75, image_url: 'https://m.media-amazon.com/images/I/71HLNfFVCcL._AC_UY218_.jpg' },

    { product_id: 76, image_url: 'https://m.media-amazon.com/images/I/51fYXSnSu9L._AC_UY218_.jpg' },
    { product_id: 76, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 76, image_url: 'https://m.media-amazon.com/images/I/71L1ezoIH9L._AC_UY218_.jpg' },
    
    { product_id: 77, image_url: 'https://m.media-amazon.com/images/I/61pmLlKbSTL._AC_UY218_.jpg' },
    { product_id: 77, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 77, image_url: 'https://m.media-amazon.com/images/I/71L1ezoIH9L._AC_UY218_.jpg' },
    
    { product_id: 78, image_url: 'https://m.media-amazon.com/images/I/51fYXSnSu9L._AC_UY218_.jpg' },
    { product_id: 78, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 78, image_url: 'https://m.media-amazon.com/images/I/71L1ezoIH9L._AC_UY218_.jpg' },
    { product_id: 78, image_url: 'https://m.media-amazon.com/images/I/71HLNfFVCcL._AC_UY218_.jpg' },

    { product_id: 79, image_url: 'https://m.media-amazon.com/images/I/61pmLlKbSTL._AC_UY218_.jpg' },
    { product_id: 79, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 79, image_url: 'https://m.media-amazon.com/images/I/71L1ezoIH9L._AC_UY218_.jpg' },
    
    { product_id: 80, image_url: 'https://m.media-amazon.com/images/I/51fYXSnSu9L._AC_UY218_.jpg' },
    { product_id: 80, image_url: 'https://m.media-amazon.com/images/I/515zGEaozeL._AC_UY218_.jpg' },
    { product_id: 80, image_url: 'https://m.media-amazon.com/images/I/71L1ezoIH9L._AC_UY218_.jpg' },

  ]);
};
