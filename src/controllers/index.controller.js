
const { Pool } = require('pg')
const { SlonikError } = require('slonik')

const pool = new Pool({
    host:'localhost',
    user:'postgres',
    password:'1010031429',
    database:'pruebatecnica',
    port:'5432'
})

const getAsistentes = async(req,res) =>{
    const response = await pool.query('select * from asistente')
    res.json(response.rows)

}

const getAsistentesByName=async(req,res)=>{
    const nombre = req.params.nombre
    const response = await pool.query('select * from asistente where lower(nombre||\' \'||apellido) like($1)',['%'+nombre+'%'])
    res.json(response.rows)
}

const getAsistentesByDocument = async(req,res) =>{
    const {tipoid,numid} = req.params;
    const response = await pool.query('select * from asistente where tipodocumento=$1 and numerodocumento like($2)',[tipoid,numid+'%'])
    res.json(response.rows)
}

const getAsistentesByEmail=async(req,res)=>{
    const email = req.params.email
    const response = await pool.query('select * from asistente where lower(email) like($1)',['%'+email+'%'])
    res.json(response.rows)
}

const saveAsistente = (req,res) =>{
    const {
        nombre,
        apellido,
        tipodocumento,
        numerodocumento,
        telefono,
        email,
        estado
    } = req.body;
    pool.query('insert into asistente values ($1,$2,$3,$4,$5,$6,$7)', [nombre,apellido,tipodocumento,Number(numerodocumento),telefono,email,estado])
        .then(response =>
            res.json({"message":"Asistente añadido con exito"})
        ).catch(
            error => res.status(503).json({
                "messageError":"El usuario con ese tipo y numero de documento ya existen"
            })
        )
    
    
}

const deleteAsistente = async(req,res) =>{
    const {tipoid,numid} = req.params;
    await pool.query('delete from asistente where tipodocumento=$1 and numerodocumento=$2',[tipoid,numid])
    res.json({"message":"Asistente borrado con exito"}) 

}

const updateAsistente = async(req,res)=>{
    const {
        nombre,
        apellido,
        tipodocumento,
        numerodocumento,
        telefono,
        email
    } = req.body;
    
    await pool.query('update asistente set nombre=$1,apellido=$2,telefono=$3,email=$4 where tipodocumento=$5 and numerodocumento=$6 ', [nombre,apellido,telefono,email,tipodocumento,numerodocumento])

    res.json({"message":"Asistente actualizado con exito"})
}
const patchAsistente = async(req,res)=>{
    const {tipoid,numid,estado} = req.params;
    await pool.query('update asistente set estado=$1 where tipodocumento=$2 and numerodocumento=$3',[estado,tipoid,numid])
    res.status(200).end() 

}


const AsistenteDb ={
    deleteAsistente,
    getAsistentesByEmail,
    getAsistentesByDocument,
    getAsistentesByName,
    getAsistentes,
    patchAsistente,
    saveAsistente,
    updateAsistente,
}

module.exports = AsistenteDb