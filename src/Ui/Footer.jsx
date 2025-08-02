import footerApi from '../api/footerApi.json'
import { NavLink } from "react-router-dom";
import { IoCallSharp } from "react-icons/io5";
import { MdPlace } from "react-icons/md";
import { TbMailPlus } from "react-icons/tb";

export const Footer=(prop)=>{
  
  const footerIcon={
    MdPlace: <MdPlace />,
    IoCallSharp: <IoCallSharp />,
    TbMailPlus: <TbMailPlus />,

  }
    return(

 <footer className="footer-section">
      <div className="container grid grid-three-cols">
        {footerApi.map((ftr,index)=>{
       const {icon,title,details}=ftr;
        return(
            <div className="footer-contact" key={index}>
              <div className="icon">{footerIcon[icon]}</div>
              <div className="footer-contact-text">
                <p>{title}</p>
                <p>{details}</p>
              </div>
            </div>
        );
          })}
      
      </div>

      <div className="copyright-area">
        <div className="container">
          <div className="grid grid-two-cols">
            <div className="copyright-text">
              <p>
               &copy; 2025 
                <NavLink to="https://sayankoley.github.io/" target="_blank">
                  Developed Made with ❤️ by Sayan Creation.
                </NavLink>
              </p>
            </div>

            <div className="footer-menu">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>

            
                <li>
            
                </li>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>

    );
}