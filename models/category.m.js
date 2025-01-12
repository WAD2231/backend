const db = require("./db");
const SCHEMA = process.env.DB_SCHEMA;

module.exports = {
  getCategoryByName: async (name) => {
    try {
      const query = `
                SELECT *
                FROM ${SCHEMA}.category
                WHERE category_name = $1
            `;
      const category = await db.oneOrNone(query, [name]);
      return category;
    } catch (error) {
      throw error;
    }
  },

  getProductsInCategory: async (id, page, size) => {
    try {
      const query = `
      SELECT 
        pr.product_id AS id,
        pr.product_name AS name,
        pr.price AS price,
        pr.description AS description,
        pr.created_at AS added,
        pr.stock AS stock,
        pr.discount AS discount,
        mn.manufacturer_name AS manufacturer,
        ct.name AS category,
        pr.tag as tag,
        COALESCE(
          JSON_AGG(pi.image_url) 
          FILTER (WHERE pi.image_url IS NOT NULL), 
          '[]'
        ) AS images
      FROM 
        ${SCHEMA}.product pr
      LEFT JOIN 
        ${SCHEMA}.product_image pi
      ON 
        pr.product_id = pi.product_id
      JOIN ${SCHEMA}.category ct on pr.category_id = ct.category_id
      JOIN ${SCHEMA}.manufacturer mn on mn.manufacturer_id = pr.manufacturer_id
      WHERE 
        pr.category_id = $1
      GROUP BY 
        pr.product_id, pr.product_name, pr.price, pr.description, pr.created_at, pr.stock, pr.discount, mn.manufacturer_name, ct.name
      LIMIT $2 OFFSET $3
    `;
      const products = await db.manyOrNone(query, [id, size, (page - 1) * size]);

      const sql = `
        SELECT COUNT(*) AS total_item FROM ${SCHEMA}.product WHERE category_id = $1 
      `

      const total = await db.one(sql, [id]);

      return {
        products,
        paging: {
          total_item: parseInt(total.total_item),
          total_page: Math.ceil(total.total_item / size),
          current_page: page,
          page_size: size
        }
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      let query = `
            SELECT * FROM ${SCHEMA}.category ORDER BY created_at DESC
        `;

      const categories = await db.manyOrNone(query);
      return categories;
    } catch (error) {
      throw error;
    }
  },
  getCategoryDetail: async (categoryId) => {
    try {
      const query = `
                SELECT *
                FROM ${SCHEMA}.category
                WHERE category_id = $1
            `;
      const category = await db.oneOrNone(query, [categoryId]);
      return category;
    } catch (error) {
      throw error;
    }
  },
  createCategory: async (category) => {
    try {
      const query = `
          INSERT INTO ${SCHEMA}.category (name, thumbnail, description, super_category_id)
          VALUES ($1, $2, $3, $4)
          RETURNING *
      `;
      const values = [
        category.name,
        category.thumbnail,
        category.description,
        category.super_category_id,
      ];
      const result = await db.one(query, values);
      return result;
    } catch (error) {
      throw error;
    }
  },
  updateCategory: async (id, category) => {
    try {
      const query = `
            UPDATE ${SCHEMA}.category
            SET name = $1, thumbnail = $2, description = $3, super_category_id = $4
            WHERE category_id = $5
            RETURNING *
        `;
      const values = [
        category.name,
        category.thumbnail,
        category.description,
        category.super_category_id,
        id,
      ];
      const result = await db.one(query, values);
      return result;
    } catch (error) {
      throw error;
    }
  },
  deleteCategory: async (id) => {
    try {
      const query = `
            DELETE FROM ${SCHEMA}.category
            WHERE category_id = $1
        `;
      await db.none(query, [id]);
    } catch (error) {
      throw error;
    }
  },
};
