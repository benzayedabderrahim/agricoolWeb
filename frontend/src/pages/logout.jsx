import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const confirmLogout = window.confirm("Voulez-vous vous déconnecter ?");

        if (confirmLogout) {
            localStorage.removeItem('userId');
            navigate('/');
        } else {
            navigate('/'); 
        }
    }, [navigate]);

    return (
        <div>
            <h2>Vous avez été déconnecté</h2>
        </div>
    );
}

export default Logout;
