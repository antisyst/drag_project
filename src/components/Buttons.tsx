import { MdKeyboardArrowUp } from 'react-icons/md';



const Buttons = () => {
  return (
    <div>
        <button className="left_button">
            <MdKeyboardArrowUp/>
        </button>
        <button className="right_button">
            <MdKeyboardArrowUp/>
        </button>
        <button className="top_button">
            <MdKeyboardArrowUp/>
        </button>
        <button className="bottom_button">
            <MdKeyboardArrowUp/>
        </button>
    </div>
  )
}

export default Buttons