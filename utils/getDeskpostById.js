export default async ($content,params) => {
  var id = params.id;
  var yearMonth = id.substring(5, 12);
  const thisMonth = await $content('desk/'+yearMonth)
  .fetch();

  var post = {};
  thisMonth.posts.map(function(a) {
    if (a.id == id) {
      post = a;
    }
  });
  return {
    post
  }
}