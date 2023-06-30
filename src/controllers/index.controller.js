
const { Pool } = require('pg')

const pool = new Pool({
    host:'localhost',
    user:'postgres',
    password:'1010031429',
    database:'pruebatecnica',
    port:'5432'
})


const getTotal = async(req,res)=>{
    const response = await pool.query('select count(*) from asistente')
    res.json({
        
             total:response.rows[0].count
    })
}

const getAsistentes = async(req,res) =>{
    const page = req.params.page
    const response = await pool.query("select * from asistente order by apellido limit 10 offset $1",[page*10]);
    res.json(response.rows)

}

const getAsistentesByName=async(req,res)=>{
    const {nombre,page} = req.params
    const response = await pool.query('select * from asistente where lower(nombre||\' \'||apellido) like($1) order by apellido limit 10 offset $2',['%'+nombre+'%',page*10])
    const count = await pool.query('select count(*) from asistente where lower(nombre||\' \'||apellido) like($1)',['%'+nombre+'%'])

    res.json({
        filas:response.rows,
        total:count.rows[0].count
    })
}

const getAsistentesByDocument = async(req,res) =>{
    const {tipoid,numid,page} = req.params;
    const response = await pool.query('select * from asistente where tipodocumento=$1 and lower(numerodocumento) like($2) order by apellido limit 10 offset $3',[tipoid,numid+'%',page*10])
    const count = await pool.query('select count(*) from asistente where tipodocumento=$1 and lower(numerodocumento) like($2)',[tipoid,numid+'%'])

    res.json({
        filas:response.rows,
        total:count.rows[0].count
    })
}

const getAsistentesByEmail=async(req,res)=>{
    const {email,page} = req.params
    const response = await pool.query('select * from asistente where lower(email) like($1) order by apellido limit 10 offset $2',['%'+email+'%',page*10])
    const count = await pool.query('select count(*) from asistente where lower(email) like($1)',['%'+email+'%'])
    
    res.json({
        filas:response.rows,
        total:count.rows[0].count
    })
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
            error => res.status(200).json({
                "messageError":error.detail
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
    getTotal,
    patchAsistente,
    saveAsistente,
    updateAsistente,
}

module.exports = AsistenteDb