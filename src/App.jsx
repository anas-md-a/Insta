
import Header from './pages/Header'
import './App.css'
import RightSide from './pages/RightSide'
import { Col,  Row } from 'react-bootstrap'
import CenterFeed from './pages/CenterFeed'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ToastedMessage from './components/ToastedMessage'



function App() {
 
  return (
    <>
      <Header />
      <ToastedMessage/>
      <Row>
        {/* <Col xs={3} className='d-none d-md-block'>
        <RightSide />
        </Col> */}
        <Col xs={12} className='px-5 pt-3'><CenterFeed/></Col>
        
      </Row>
      
     

      
    </>
  )
}

export default App
