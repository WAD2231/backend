let count = 0;

const createTree = (list, super_category_id = null) => {
  const tree = [];

  list.forEach((item) => {
    if (item.super_category_id === super_category_id) {
      count++;
      const newItem = { ...item, index: count }; 
      const children = createTree(list, item.category_id);
      if (children.length > 0) {
        newItem.children = children;
      }
      tree.push(newItem);
    }
  });

  return tree;
};

module.exports = (list, super_category_id = null) => {
  count = 0; // Đặt lại bộ đếm
  return createTree(list, super_category_id);
};
