export default async ($content, params, {perPage},error) => {
  const currentPage = parseInt(params.page);

  var files = await $content('desk')
  .sortBy("slug", "asc")
  .fetch();
  var allArticles = [];
  for (let i = 0; i < files.length; i++) {
    allArticles = [...allArticles,...files[i].posts];
  }
  allArticles = allArticles.reverse();

  const totalArticles = allArticles.length;

  // use Math.ceil to round up to the nearest whole number
  const lastPage = Math.ceil(totalArticles / perPage);

  // use the % (modulus) operator to get a whole remainder
  const lastPageCount = totalArticles % perPage == 0
  ?perPage:totalArticles % perPage;

  const skipNumber = () => {
    if (currentPage === 1) {
      return 0;
    }
    if (currentPage === lastPage) {
      return totalArticles - lastPageCount;
    }
    return (currentPage - 1) * perPage;
  };

  const paginatedArticles = allArticles.slice(skipNumber(),skipNumber()+perPage)
  
  if (currentPage === 0 || !paginatedArticles.length) {
    return error({ statusCode: 404, message: "No articles found!" });
  }

  return {
    allArticles,
    paginatedArticles,
  };
};