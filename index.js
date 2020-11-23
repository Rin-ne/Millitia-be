const request = require( 'request-promise' );
const url = require( 'url' );
const dom = require( 'jsdom' ).JSDOM;
const express = require( 'express' );
const app = express();
const cors = require("cors")

if ( ! process.env.PORT ) {
	process.env.PORT = 3000;
}

let getUrl = async (uri)=>{
	const cookieJar = request.jar();
	const body = await request.get( {
		url: uri,
		jar: cookieJar
	} );
	let n = body.search(`<script type="text/javascript">
    var a`)
    let p = body.search(`<meta property="og:title" content="`)
    let m = body.search(`<meta name="twitter:title"`)
    p = p + 35
	n = n + 44
	let nameLength = m - p - 23
	console.log(n)
	console.log(p)
	console.log(nameLength)
	let name = (()=>{
		let y = body.split("")
		let g = ""
		let length = nameLength
		let r = 0
		while(r < length){
			g = g + y[p+r]
			r++
		}
		g = g.split(";").join("")
		return g
	})()
	console.log(name)
	let A = (()=>{
		let k = body.split("")
		let g = ""
		let length = 3
		let r = 0
		while(r < length){
			g = g + k[n+r]
			r++
		}
		g = g.split(";").join("")
		return g
	})()
	let B = 3
	console.log(A)
	let id = Math.pow(A, 3)+B
	console.log(id)
	let hostname = (()=>{
		let o = uri.split("/")
		o[0] = ""
		o[1] = ''
		o[3] = ""
		o[4] = ""
		o[5] = ""
		return o.join("")
	})()
	let inden = (()=>{
		let o = uri.split("/")
		o[0] = ""
		o[1] = ''
		o[2] = ""
		o[3] = ""
		o[5] = ""
		return o.join("")
	})()
	let link = `https://${hostname}/d/${inden}/${id}/${name}`
	return link
	// let window = new dom( body ).window;
	// console.log(window)
	// let scripts = window.document.querySelectorAll( 'script[type="text/javascript"]' );
	// console.log(scripts)
	// if ( ! scripts.length ) {
	// 	return {
	// 		message: 'File not found.'
	// 	};
	// }
	// let name = window.document.head.querySelector( 'meta[property="og:title"]' );
	// console.log(name)
	// if ( name ) {
	// 	name = name.getAttribute( 'content' );
	// } else {
	// 	return {
	// 		message: 'There is no file name.'
	// 	};
	// }

	// let id = /^\/v\/(?<id>.*?)\/file\.html$/;

	// if ( id.test( uri ) ) {
	// 	id = id.exec( uri ).groups.id;
	// }
	// let download;
	// scripts.forEach( function( script ) {
	// 	var content = script.textContent.toString().replace( /(\t{1,}|\s{2,}|\r|\n)/g, '' );
	// 	var pattern = /^var\s+?a\s+?=\s+?(?<a>\d+)\;var\s+?b\s+?=\s+?(?<b>\d+)\;/;
	// 	if ( pattern.test( content ) ) {
	// 		var { a, b } = pattern.exec( content ).groups;
	// 		var c = Math.floor( a / 3 );
	// 		download = `https://${hostname}/d/${id}/${(c + a % b)}/${name}`;
	// 	}
	// } );
	// console.log(download)
	// return {
	// 	url: download.trim()
	// } || {
	// 	message: 'No download file.'
	// };
} 
// let main = async ()=>{
// 	console.log(await getUrl("https://www15.zippyshare.com/v/H9hLzwrO/file.html"))
// }
// main()
app.use(cors())
app.get("/", (r, q)=>{
	let uri = r.query.url
	let hostname = (()=>{
		let o = uri.split("/")
		o[0] = ""
		o[1] = ''
		o[3] = ""
		o[4] = ""
		o[5] = ""
		return o.join("")
	})()
	q.send(hostname)
})
app.get( '/zs', async function( req, res ) {
	res.status( 200 );
	res.type( 'application/json' );

	if ( req.query.url ) {
		res.send(JSON.stringify({
			url: await getUrl(req.query.url)

		}))
	} else {
		res.end( JSON.stringify( {
			message: 'no url'
		} ) );
	}
} );

app.listen( process.env.PORT, function() {
	console.log( `Success running on http://localhost:${process.env.PORT}` );
} ); 
