import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <header>
                <Link className="logo" to="/">MyBlog</Link>
                <nav>
                <Link className="" to='/login'>Login</Link>
                <Link className="" to="/register">Register</Link>
                
                </nav>
            </header>
        </>
    );
}

export default Header;