import React, {Component} from 'react';
import Dish1 from '../Photos/Dish1.jpg';
import Dish2 from '../Photos/Dish2.jpg';
import Dish3 from '../Photos/Dish3.jpg';

const Home = () => {

        return(
            <div>
                <div>
                <h3 className="title">Principul Meu</h3>
                <p>
                        Acest site este facut special pentru persoanele care vor sa invete a gati dar nu stiu unde sa inceapa.
                    Am vrut sa fac acesti pasi usori pentru toata lumea, asa ca am si creeat un dictionar,
                    Dex-o-diment special pentru a aduna in aceelasi loc toate informatile necesare.
                    Este mult mai usor decat pare sa gatesti, asta este sigur.
                </p>
                </div>
                <div className="images">
                    <div align="center" className="Home_Image">
                    <img src={Dish1} alt="First_Image" className="Image"/>
                    </div>
                    <div align="center" className="Home_Image">
                    <img src={Dish2} alt="Second_Image" className="Image"/>
                    </div>
                    <div align="center" className="Home_Image">
                    <img src={Dish3} alt="Third_Image" className="Image"/>
                    </div>
                </div>
                <h3 className="title">De ce am ales sa fac asta?</h3>
                <p>
                        Pai este unul dintre putinele lucruri ce ne separa de animale. Oamenii decand sunt ei isi gatesc mancarea.
                    Din pacate viata moderna e grabita si mereu in miscare ceea ce ne lasa putin timp pentru a mai gati.
                    Acest lucru nu este groaznic, mai ales cu existenta semi-preparatelor si restaurantelor. Dar asta a adus
                    la reducerea persoanelor care gatesc dar mai rau si reducerea persoanelor care stiu sa gateasca. Aici vreau sa 
                    adresez aceasta problema si sa incerc sa ii fac pe oameni sa incerce sa ii dea o sansa, diindca nu e asa de greu cum poate parea la prima vedere.
                </p>
            </div>
        )
}

export default Home;
