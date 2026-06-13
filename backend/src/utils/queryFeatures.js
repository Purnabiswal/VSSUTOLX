export function buildProductQuery(query) {
  const filter = {};
  if (query.keyword) {
    filter.$text = { $search: query.keyword };
  }
  if (query.category) filter.category = query.category;
  if (query.status) filter.status = query.status;
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }
  return filter;
}

export function pagination(query) {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 12, 1), 50);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

export function sortBy(query) {
  const allowed = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'price-low': 'price',
    'price-high': '-price',
    popular: '-views',
  };
  return allowed[query.sort] || '-createdAt';
}
