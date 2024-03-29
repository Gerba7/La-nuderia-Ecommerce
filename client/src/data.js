import CoverTienda from './images/la_nuderia_categoria1.jpg';
import CoverTienda2 from './images/la_nuderia_categoria2.jpg';
import CoverTienda3 from './images/la_nuderia_cursos2.jpg';


export const SliderItems = [
    {
        id: 1,
        img: "https://images.pexels.com/photos/10963913/pexels-photo-10963913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "MACRAME",
        description: "MACRAME",
        bg: "f5fafd",
    },
    {
        id: 2,
        img: "",
        title: "MACRAME",
        description: "MACRAME",
        bg: "f5f1ed",
    },
    {
        id: 3,
        img: "",
        title: "MACRAME",
        description: "MACRAME",
        bg: "f5f0f4",
    },
];


export const categories = [
    {
        id: 1,
        img: CoverTienda, //"https://images.pexels.com/photos/6634726/pexels-photo-6634726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Deco",
        category: "/products",
        button: 'Quiero comprar!',
        alt: 'Deco'
    },
    {
        id: 2,
        img: CoverTienda3, //"https://images.pexels.com/photos/6471700/pexels-photo-6471700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Cursos",
        category: "/classes",
        button: 'Quiero aprender!',
        alt: 'cursos'
    },
    {
        id: 3,
        img: CoverTienda2, //"https://images.pexels.com/photos/10964052/pexels-photo-10964052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Luminaria",
        category: "/products",
        button: 'Ver',
        alt: 'porducto'
    },
];

