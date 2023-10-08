import { BsSendFill } from 'react-icons/bs';
 
const Header = () => {
  return (
    <header>
        <div>
            <h1>Services</h1>
        </div>
        <div className="header_tools">
            <button className='view_button'>List View</button>
            <button className='header_button'>
                <BsSendFill/>
            </button>
            
        </div>
    </header>
  )
}

export default Header;