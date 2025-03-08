const paginate = async (model, query, option) => {
   const { page = 1, limit = 10 } = option;
   const skip = (page - 1) * limit;

   const [results, total] = await Promise.all([
      model.find(query).limit(limit).skip(skip),
      model.countDocument(query),
   ]);

   const totalPages = Math.ceil(total / limit);

   return {
      results,
      page,
      limit,
      total,
      totalPages,
   };
};

export default paginate;

