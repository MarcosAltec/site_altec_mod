import React, { useState } from 'react';
import './Teste.css';

const Teste = () => {
    const [currentImage, setCurrentImage] = useState(0);

    // Gera automaticamente as URLs das imagens
    const images = Array.from({ length: 15 }, (_, i) => 
        `https://altecmod.com/img/invictus-dd-15m-mb/view_360/${i + 1}.png`
    );

    // Lógica de controle via slider
    const handleSliderChange = (event) => {
        setCurrentImage(Number(event.target.value)); // Atualiza o índice da imagem
    };

    return (
        <div style={styles.container}>
            <img
                src={images[currentImage]} // Exibe a imagem atual
                alt={`Vista ${currentImage}`}
                style={styles.image}
            />
            <input
                type="range"
                min="0"
                max={images.length - 1}
                value={currentImage}
                onChange={handleSliderChange} // Atualiza a imagem com base na barra
                style={styles.slider}
            />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '600px',
        margin: '0 auto',
    },
    image: {
        width: '100%',
        maxWidth: '500px',
        height: 'auto',
    },
    slider: {
        marginTop: '20px',
        width: '100%',
        maxWidth: '500px',
    },
};

export default Teste;