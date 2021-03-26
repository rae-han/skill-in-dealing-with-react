const loggerMiddleware = first => second => third => {
  console.group('test')
  console.log(first);
  console.log(second);
  console.log(third)
  console.groupEnd();
}

loggerMiddleware(1)(2)(3)