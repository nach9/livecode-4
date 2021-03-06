const express = require('express')
const router = express.Router()

const models = require('../models')

router.get('/',(req,res)=>{
  let condition={
    include:[models.Item]
  }
  models.Supplier.findAll(condition).then(dataSupplier=>{
    // res.send(dataSupplier)
    res.render('supplier',{dataSupplier:dataSupplier})
  })
})


router.get('/add',(req,res)=>{
  res.render('supplier_add')
})

router.post('/add', (req,res)=>{
  let condition={
    name:req.body.name,
    kota:req.body.kota
  }
  models.Supplier.create(condition).then(newSupplier=>{
    res.redirect('/suppliers')
  })
})

router.get('/edit/:id',(req,res)=>{
  models.Supplier.findById(req.params.id).then(dataSupplier=>{
    res.render('supplier_edit',{dataSupplier:dataSupplier})
  })
})

router.post('/edit/:id', (req,res)=>{
  let update={
      name:req.body.name,
      kota:req.body.kota
  }
  let condition={
    where:{id:req.params.id}
  }
  models.Supplier.update(update,condition).then(updateResult=>{
    res.redirect('/suppliers')

  })
})


router.get('/delete/:id',(req,res)=>{
  models.Supplier.findById(req.params.id).then(dataSupplier=>{
    res.render('supplier_delete',{dataSupplier:dataSupplier})
  })
})

router.post('/delete/:id', (req,res)=>{
  let condition={
    where:{id:req.params.id}
  }
  models.Supplier.destroy(condition).then(updateResult=>{
    res.redirect('/suppliers')

  })
})


router.get('/:id/additem',(req,res)=>{
  let condition={
    include:[models.Supplier]
  }
  models.Item.findAll(condition).then(dataItem=>{
    res.send(dataItem)
    // res.render('supplier_additem',{dataSupplier:dataSupplier})
  })
})

module.exports = router
