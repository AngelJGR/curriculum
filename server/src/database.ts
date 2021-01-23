import mysql from 'mysql'
// const mysql = require("mysql");
// const { promisify } = require("util");
import { promisify } from 'util'
import { database } from './keys'

const pool: any = mysql.createPool(database);

pool.getConnection((err: any, connection: any) => {
	if (err){
		if (err.code === "PROTOCOL_CONNECTION_LOST") {console.error("LA CONEXION A LA BASE DE DATOS SE CERRO INESPERADAMENTE")}
		if (err.code === "ER_CON_COUNT_ERROR") {console.error("LA BASE DE DATOS TIENE MUCHAS CONEXIONES")}
		if (err.code === "ECONNREFUSED") {console.error("LA CONEXION HA SIDO RECHAZADA")}
		else console.error("NO SE HA REALIZADO LA CONEXION A LA BASE DE DATOS")
	}
	if (connection){
		connection.release();
		console.log("SE HA REALIZADO LA CONEXION A LA BASE DE DATOS");
		return;
	}
});

pool.query = promisify(pool.query);

export {
	pool
}
// module.exports = pool;