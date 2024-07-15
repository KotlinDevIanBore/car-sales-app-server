import express from 'express'
import { Router } from 'express'
import ReactDOMServer from 'react-dom/server'


const carGridRouter= Router();


carGridRouter.get ('/api/cargrid', (req,res)=>{

    const markup = ReactDOMServer.renderToString(<CarGrid/>)

    res.send(`
      <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Car Grid</title>
      </head>
      <body>
        <div id="root">${markup}</div>
        <script src="bundle.js"></script>
      </body>
    </html>   
        
        
        
        `)

})



