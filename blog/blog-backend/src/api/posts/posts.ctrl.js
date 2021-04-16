import Post from '../../models/post';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if(!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  return next();
}

/*
  POST /api/posts
  {
    title: '제목',
    body: '내용',
    tags: ['태그1', '태그2']
  }
*/
export const write = async ctx => {
  const { title, body, tags } = ctx.request.body;
  console.log(title, body, tags)
  const post = new Post({
    title, 
    body,
    tags
  });

  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.thorw(500, e)    
  }
};

export const list = async ctx => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts
  } catch (error) {
    ctx.throw(500, e)
  }
};

export const read = async ctx => {
  const { id } = ctx.params;
  if(!ObjectId.isValid(id)) {
    console.log(`Not valid id`)
    ctx.status = 400;
    return;
  }

  try {
    const post = await Post.findById(id).exec();
    if(!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e)
  }
};

export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const update = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true
    }).exec();

    if(!post) {
      ctx.status = 404;
      return;
    }

    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e)
  }
};

// const posts = new Array(10).fill({}).map((item, index) => ({ id: index, title: `title ${index}`, body: `body ${index}`}))
// let postId = posts.length;

// // // exports.write = ctx => {
// export const write = ctx => {
//   const { title, body } = ctx.request.body;
//   const post = { id: postId, title, body }
//   posts.push(post)
//   postId += 1;
//   ctx.body = posts;
// }

// export const list = ctx => {
//   ctx.body = posts;
// }

// export const read = ctx => {
//   const { id } = ctx.params;
//   const post = posts.find(p => p.id.toString() === id);

//   if(!post) {
//     ctx.status = 404;
//     ctx.body = {
//       message: 'Not found post'
//     };
//     return;
//   }

//   ctx.body = post;
// }

// export const remove = ctx => {
//   const { id } = ctx.params;

//   const index = posts.findIndex(p => p.id.toString() === id);

//   if(index === -1) {
//     ctx.status = 404;
//     ctx.body = {
//       message: 'Not found post'
//     };
//     return;
//   }

//   posts.splice(index, 1);
//   ctx.status = 204; // No Content
// }

// export const replace = ctx => {
//   const { id } = ctx.params;
//   const index = posts.findIndex(p => p.id.toString() === id);

//   if(index === -1) {
//     ctx.status = 404;
//     ctx.body = {
//       message: 'Not found post'
//     };
//     return;
//   }

//   posts[index] = {
//     id,
//     ...ctx.request.body,
//   };

//   ctx.body = posts[index];
// }

// export const update = ctx => {
//   const { id } = ctx.params;
//   const index = posts.findIndex(p => p.id.toString() === id);

//   if(index === -1) {
//     ctx.status = 404;
//     ctx.body = {
//       message: 'Not found post'
//     }
//     return;
//   }

//   posts[index] = {
//     ...posts[index],
//     ...ctx.request.body,
//   };

//   ctx.body = posts[index];
// }
