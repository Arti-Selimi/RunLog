import logo from './Images/logo.png'

export const Navbar = () => {
    return (
        <div className="navbar">
            <img src={logo} width={"100px"}/>
            <h2>PooLog</h2>  
        </div>
    )
}