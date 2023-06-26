const validateTitleField = (req,res,next) =>{
    const {body} = req

    if(body.title == undefined){
        return res.status(400).json({message: 'title é obrigatório!'})
    }
    if(body.title == ''){
        return res.status(400).json({message: 'title não deve ser vazio!'})
    }
    next()
}
const validateStatusFIeld = (req,res,next) =>{
    const {body} = req
    
    if(body.status == undefined)
        return res.status(400).json({message: 'status é obrigatório!'})
    if(body.status == '')
        return res.status(400).json({message: 'status não deve estar vazio!'})
    next()
}
module.exports = {
    validateStatusFIeld,
    validateTitleField
}