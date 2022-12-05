import clientPromise from "../../lib/mongodb";
import NextCors from 'nextjs-cors';

export default async (req: any, res: any) => {

    const {name, email, message} = req.body;
    
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

   try {
       const client = await clientPromise;

       const db = client.db("contacts");

       const response = await db.collection("contacts").insertOne({name, email, message})

       res.json({success: response.acknowledged} );
   } catch (e) {
       console.error(e);
       res.json({success: false})
   }
};