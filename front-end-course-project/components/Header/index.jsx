import headerStyles from "./Header.module.css"

function Header() {
    return(
        <div id={headerStyles.header}>
            <h1>Ім’ев</h1>
            <h1>Головна</h1>
            <h1>Вийти з аккаунта</h1>
        </div>
    )
    
}

export default Header