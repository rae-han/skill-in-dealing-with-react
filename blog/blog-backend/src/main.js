require('dotenv').config();

// const Koa = require('koa');
// const Router = require('koa-router')
// const bodyParser = require('koa-bodyparser');
// const mongoose = require('mongoose')
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';


const { PORT, MONGO_URI } = process.env;

const mongooseConfigs = {
  useNewUrlParser: true,
  useFindAndModify: false
}
mongoose
  .connect(MONGO_URI, mongooseConfigs)
  .then(() => {
    console.log(`Connected to MongoDB`)
  })
  .catch(e => {
    console.error(e);
  })


// const api = require('./api')
import api from './api'

const app = new Koa();
const router = new Router();

// app.use((ctx, next) => {
//   ctx.body = 'app use';
//   next();
// })

router.use('/api', api.routes());

router.get('/', ctx => {
  ctx.body = 'index'
})

router.get('/about/:name?', ctx => {
  const { name } = ctx.params;
  ctx.body = name ? `${name}의 소개` : '소개';
})

router.get('/posts', ctx => {
  const { id } = ctx.query;
  ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.'
})

app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

const port = PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})