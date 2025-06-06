const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getsRouter = require("./getsRouter.js");
const postsRouter = require("./postsRouter.js");
const { getsControllers } = require("../controllers/getsControllers");
// const { default: Country } = require('../../../client/src/Components/Country/Country.jsx');
//const { getsControllers } = require("../controllers/postsControllers");
//const { Country} = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.post ('/test', async (req, res) => {

//     const  {id, namename, flagpic, continent, capital, subregion, area, pop} = req.body
//     try {
//         let dbresponse = await Country.create({id, namename, flagpic, continent, capital, subregion, area, pop})
//         let objresponse = {message: 'Country created', status: 'Accepted', data: { id, namename, flagpic, continent, capital, subregion, area, pop}}
//         res.status(200).send(objresponse)
//     } catch (error) {
//         res.status(404).send(error.message)
//     }
   

// })

router.use ('/countries', getsRouter)
router.use ('/activities', postsRouter)
console.log ('paso por index')

module.exports = router;
