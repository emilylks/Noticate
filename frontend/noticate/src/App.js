import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">

      <h1>File Upload</h1>

      <form action="http://localhost:9000/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="avatar"></input>
        <button>Submit</button>
      </form>

    </div>
  );
}

export default App;
