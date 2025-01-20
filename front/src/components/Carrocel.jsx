import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Carrocel(props) {
    const imagens = (props.itens)
    const demais_fotos = imagens.length > 0 ? imagens[0].demais_fotos : []; 

    return(
        <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
            {demais_fotos.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Imagem ${index + 1}`} />
                </div>
                ))}
        </Carousel>
    )
}

export default Carrocel;