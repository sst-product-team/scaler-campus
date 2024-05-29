import './NavBar.css'
import Logo from '../../assets/ScalerLogo.svg'

export default function NavBar() {


    return (
        <nav>
            <section className='logo'>
            <img src={Logo} alt="" height='50vh'/>
            <p className="content">Scaler School of Technology</p>
            </section>
        </nav>
    ); 


}