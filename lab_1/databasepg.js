const{Client}=require('pg')

const client=new Client({
    host:"c2pbv94csjtajh.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com",
    user:"u4c5ov243n0iub",
    port:5432,
    password:"p28c5adafbdad50998d9366073598ea30f28ecf99d8223ccaa3c312bf31f24aba",
    database:"d2lobnjsa42fh9"
})

client.connect();
client.query("SELECT * FROM users",(err,res)=>{
    if(!err){
        console.log(res.rows);
    }
    else{
        console.log(err.message);
    }
    client.end;
})