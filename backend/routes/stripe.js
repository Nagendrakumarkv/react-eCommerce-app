const express=require('express')
const router=express.Router();

const KEY=process.env.STRIPE_KEY;

const stripe=require('stripe')(KEY)

router.post('/payment',async (req,res)=>{
    await stripe.paymentIntents.create({
      amount: req.body.amount,
      // source:req.body.tokenId,
      currency: 'usd',
      payment_method_types: ['card'],
    },(stripeErr,stripeRes)=>{
          if(stripeErr){
            res.status(500).json(stripeErr)
          }else{
            res.status(200).json(stripeRes)
            console.log(stripeRes)
          }});
    
  })
    



module.exports=router;