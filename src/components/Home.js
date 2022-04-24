
import Notes from "./Notes.js"

const Home = (props) => {
  const {showAlert} = props;
  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>
  )
}
 
export default Home;