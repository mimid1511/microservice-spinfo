import React, { useState } from 'react';
import Navbar from './Navbar';

const ProfileForm = () => {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mettre à jour le profil avec les données dans formData
        console.log('Données soumises:', formData);
        // Vous pouvez ajouter ici une logique pour envoyer les données au serveur, par exemple avec une requête HTTP
    };

    return (
        <>
            <nav>
                <Navbar />
                <h1 style={{ padding: "10px", backgroundColor: 'black', color: 'white' }}>Profil</h1>
            </nav>
            <br />

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom">Nom:</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Mettre à jour le profil</button>
            </form>

        </>
    );
};

export default ProfileForm;
