import CounterContainer from './containers/CounterContainer'
import PostsContainer from './containers/PostListContainer'

const App = () => {
  return (
    <div className="App">
      <CounterContainer />
      <hr />
      <PostsContainer />
    </div>
  );
}

export default App;