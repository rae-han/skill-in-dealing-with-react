import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi'

const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if(!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  return next();
}

export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if(!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  try {
    const post = await Post.findById(id);
    //포스트가 존재하지 않을 때
    if(!post) {
      ctx.status = 404;
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e)
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
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    user: ctx.state.user
  })

  const result = schema.validate(ctx.request.body);
  console.log(result)
  if(result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
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
  const page = parseInt(ctx.query.page || '1', 10);
  const pageSize = parseInt(ctx.query.pageSize || '10', 10);

  if(page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post
      .find()
      .sort({ _id: -1})
      .limit(pageSize)
      .skip((page-1)*pageSize)
      .exec();
    const postCount = await Post.countDocuments().exec();
    
    ctx.set('Last-Page', Math.ceil(postCount/pageSize));
    ctx.body = posts
      .map(post => post.toJSON())
      .map(post => ({
        ...post,
        body: post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`
      }))
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
  console.log(id)

  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  })

  const result = schema.validate(ctx.request.body);
  console.log(result)
  if(result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

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
