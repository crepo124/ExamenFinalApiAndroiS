const mongoose = require('mongoose')
const Game = require('./models/Game')
require('dotenv').config()

const games = [
    { name: "Call of Duty: Modern Warfare", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wkb.jpg", price: 59.99, genre: "disparos", description: "El shooter táctico más realista del mercado." },
    { name: "Resident Evil Village", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dut.jpg", price: 39.99, genre: "miedo", description: "Sobrevive en un pueblo misterioso lleno de criaturas." },
    { name: "God of War", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg", price: 49.99, genre: "accion", description: "Kratos y su hijo en una épica aventura nórdica." },
    { name: "Halo Infinite", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dto.jpg", price: 59.99, genre: "disparos", description: "El Master Chief regresa en la entrega más ambiciosa de Halo." },
    { name: "Silent Hill 2", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7vef.jpg", price: 49.99, genre: "miedo", description: "El clásico survival horror completamente remasterizado." },
    { name: "Spider-Man 2", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6ub3.jpg", price: 69.99, genre: "accion", description: "Peter Parker y Miles Morales enfrentan amenazas nuevas." },
    { name: "Doom Eternal", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1nc8.jpg", price: 29.99, genre: "disparos", description: "El Slayer regresa para eliminar hordas de demonios." },
    { name: "Outlast", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rc6.jpg", price: 19.99, genre: "miedo", description: "Periodista atrapado en un manicomio sin salida." },
    { name: "Devil May Cry 5", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1lgo.jpg", price: 29.99, genre: "accion", description: "Dante y Nero contra el árbol demoníaco Qliphoth." },
    { name: "Valorant", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.jpg", price: 0.00, genre: "disparos", description: "Shooter táctico 5v5 con agentes de habilidades únicas." },
    { name: "Alien Isolation", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rc5.jpg", price: 24.99, genre: "miedo", description: "Sobrevive siendo cazado por un Xenomorfo en una estación espacial." },
    { name: "Sekiro: Shadows Die Twice", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1mnd.jpg", price: 49.99, genre: "accion", description: "Ninja del Japón feudal en búsqueda de venganza." },
    { name: "Apex Legends", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1thx.jpg", price: 0.00, genre: "disparos", description: "Battle royale con leyendas de habilidades únicas." },
    { name: "Amnesia: The Bunker", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6sdj.jpg", price: 29.99, genre: "miedo", description: "Sobrevive en un búnker de la Primera Guerra Mundial." },
    { name: "Mortal Kombat 1", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7578.jpg", price: 59.99, genre: "accion", description: "El reinicio del universo de Mortal Kombat con nuevas mecánicas." },
    { name: "Counter-Strike 2", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7ob9.jpg", price: 0.00, genre: "disparos", description: "La evolución definitiva del clásico shooter táctico." },
    { name: "Five Nights at Freddy's", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rca.jpg", price: 7.99, genre: "miedo", description: "Sobrevive tus turnos nocturnos en la pizzería animatrónica." },
    { name: "Batman: Arkham Knight", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1qfj.jpg", price: 19.99, genre: "accion", description: "Batman enfrenta al Caballero de Arkham en Gotham City." },
    { name: "Battlefield 2042", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2qfj.jpg", price: 29.99, genre: "disparos", description: "Guerra a gran escala en el año 2042 con especialistas." },
    { name: "Phasmophobia", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2tl8.jpg", price: 13.99, genre: "miedo", description: "Caza fantasmas cooperativo con equipos de investigación paranormal." },
    { name: "Red Dead Redemption 2", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg", price: 39.99, genre: "accion", description: "Una historia épica del Lejano Oeste con Arthur Morgan." },
    { name: "Overwatch 2", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5gxe.jpg", price: 0.00, genre: "disparos", description: "Shooter de héroes en equipos con misiones PvE y PvP." },
    { name: "The Evil Within 2", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rc9.jpg", price: 19.99, genre: "miedo", description: "Sebastian Castellanos busca a su hija en un mundo distorsionado." },
    { name: "Assassin's Creed Mirage", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6rqf.jpg", price: 49.99, genre: "accion", description: "Basim en Bagdad, regreso a las raíces del sigilo." },
    { name: "Hunt: Showdown", image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1sbs.jpg", price: 39.99, genre: "disparos", description: "Shooter PvPvE en los pantanos de Louisiana cazando monstruos." }
]

async function seed() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Conectado a MongoDB')

    await Game.deleteMany({})
    console.log('Juegos anteriores eliminados')

    await Game.insertMany(games)
    console.log('25 juegos insertados correctamente')

    await mongoose.disconnect()
    console.log('Listo!')
    process.exit(0)
}

seed()