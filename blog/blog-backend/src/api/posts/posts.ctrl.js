const posts = new Array(10).fill({}).map((item, index) => ({ id: index, title: `title ${index}`, body: `body ${index}`}))
let postId = posts.length;

exports.write = ctx => {
  const { title, body } = ctx.request.body;
  const post = { id: postId, title, body }
  posts.push(post)
  postId += 1;
  ctx.body = posts;
}

exports.list = ctx => {
  ctx.body = posts;
}

exports.read = ctx => {
  const { id } = ctx.params;
  const post = posts.find(p => p.id.toString() === id);

  if(!post) {
    ctx.status = 404;
    ctx.body = {
      message: 'Not found post'
    };
    return;
  }

  ctx.body = post;
}

exports.remove = ctx => {
  const { id } = ctx.params;

  const index = posts.findIndex(p => p.id.toString() === id);

  if(index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'Not found post'
    };
    return;
  }

  posts.splice(index, 1);
  ctx.status = 204; // No Content
}

exports.replace = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);

  if(index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'Not found post'
    };
    return;
  }

  posts[index] = {
    id,
    ...ctx.request.body,
  };

  ctx.body = posts[index];
}

exports.update = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);

  if(index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'Not found post'
    }
    return;
  }

  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };

  ctx.body = posts[index];
}
