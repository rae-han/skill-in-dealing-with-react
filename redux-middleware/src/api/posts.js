const sleep = n => new Promise(resolve => setTimeout(resolve, n))

const posts = new Array(16).fill({}).map((arr, idx) => ({ id: idx, title: `제목${idx}`, body: `내용${idx}`}))

export const getPosts = async () => {
  await sleep(2000);
  return posts;
}

export const getPost = async id => {
  await sleep(500);
  return posts.find(post => post.id === id);
};