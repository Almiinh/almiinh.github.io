import './App.css'

function App() {

  return (
    <>
      <h1>CV Builder</h1>
      <form>
        <label htmlFor="fname">First name: </label>
        <input type="text" id="fname" name="fname"/>
        <label htmlFor="fname">Last name: </label>
        <input type="text" id="fname2" name="fname"/>
        <label htmlFor="fname">E-Mail</label>
        <input type="email" id="fname3" name="fname"/>
        <label htmlFor="fname">Phone Number</label>
        <input type="tel" id="fname4" name="fname"/>
      </form>
    </>
  )
}

export default App
