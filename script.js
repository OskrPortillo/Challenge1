
/* Reglas de encriptación: 
"e" es convertido para "enter" 
"i" es convertido para "imes"
"a" es convertido para "ai"
"o" es convertido para "ober"
"u" es convertido para "ufat"
Solo letras minusculas
No se permite acentuación de palabras 
*/

/* Reglas de desencriptación: 
"enter" es convertido para "e" 
"imes" es convertido para "i"
"ai" es convertido para "a"
"ober" es convertido para "o"
"ufat" es convertido para "u"
Solo letras minusculas
No se permite acentuación de palabras   
*/

//funcion que carga el canvas efecto matrix
function loaded(){
    var canvas = document.getElementById( 'canvas' ),
	ctx = canvas.getContext( '2d' ),
    canvas2 = document.getElementById( 'canvas2' ),
    ctx2 = canvas2.getContext( '2d' ),
	// full screen dimensions
	cw = window.innerWidth,
	ch = window.innerHeight,
    charArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
    maxCharCount = 100,
    fallingCharArr = [],
    fontSize = 10,
    maxColums = cw/(fontSize);
    canvas.width = canvas2.width = cw;
    canvas.height = canvas2.height = ch;


    function randomInt( min, max ) {
    	return Math.floor(Math.random() * ( max - min ) + min);
    }

    function randomFloat( min, max ) {
    	return Math.random() * ( max - min ) + min;
    }

    function Point(x,y)
    {
      this.x = x;
      this.y = y;
    }

    Point.prototype.draw = function(ctx){

      this.value = charArr[randomInt(0,charArr.length-1)].toUpperCase();
      this.speed = randomFloat(1,5);


      ctx2.fillStyle = "rgba(255,255,255,0.8)";
      ctx2.font = fontSize+"px san-serif";
      ctx2.fillText(this.value,this.x,this.y);

        ctx.fillStyle = "#0F0";
        ctx.font = fontSize+"px san-serif";
        ctx.fillText(this.value,this.x,this.y);



        this.y += this.speed;
        if(this.y > ch)
        {
          this.y = randomFloat(-100,0);
          this.speed = randomFloat(2,5);
        }
    }

    for(var i = 0; i < maxColums ; i++) {
      fallingCharArr.push(new Point(i*fontSize,randomFloat(-500,0)));
    }


    var update = function()
    {

    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,cw,ch);

    ctx2.clearRect(0,0,cw,ch);

      var i = fallingCharArr.length;

      while (i--) {
        fallingCharArr[i].draw(ctx);
        var v = fallingCharArr[i];
      }

      requestAnimationFrame(update);
    }

update();
}


var textoIngresado = document.querySelector("#input-texto"); 
var mensajeResultado = document.querySelector("#msg");

var botonEncriptar = document.querySelector("#btn-encriptar");
botonEncriptar.addEventListener('click', function(event){
    event.preventDefault();   
})

var botonDesencriptar = document.querySelector("#btn-desencriptar");
botonDesencriptar.addEventListener('click', function(event){
    event.preventDefault();  
})

var botonCopiar = document.querySelector("#btn-copy");
botonCopiar.addEventListener('click', function(event){
    event.preventDefault();         
})

var botonResetear = document.querySelector("#btn-resetear");
botonResetear.addEventListener('click', function(event){
    event.preventDefault();       
})

//funcion que valida si el texto ingresado es con minusculas y sin acentos.
var textoExpresionRegular = /^[a-z\s]+$/g;
function valido(tex){
    if (tex.match(textoExpresionRegular) != null){
        
        return textoValido = true;
    }else{
        
        return textoValido = false;
    }
}

//funcion que encripta el texto ingresado.  
function encriptarTexto(){
    var expresionVocales = [/e/g, /i/g,/a/g, /o/g, /u/g]; 
    var arregloClaves = ["enter","imes","ai","ober","ufat"];
    var texto = textoIngresado.value;
    //primero valida si el texto esta escrito correctamente, en minuscula y sin acento.
    if (valido(texto) == true){

        // se busca en el texto ingresado todo las vocales y se las reemplaza.
        for (var i = 0; i < expresionVocales.length; i++){
            var textoEncriptado = texto.replace(expresionVocales[i],arregloClaves[i]); 
            texto = textoEncriptado;
        }
        mensajeResultado.value = texto; // muestra el texto encriptado en la pagina
        textoIngresado.value = ""; //borra el campo donde se ingresa el mensaje
        textoIngresado.focus(); // se hace focus en el campo donde se ingresa el mensaje
    }else{
        textoIngresado.value = "";
        textoIngresado.focus();
    }
}
   
function desencriptarTexto(){
    var expresionClaves = [/enter/g,/imes/g,/ai/g,/ober/g,/ufat/g];
    var arregloVocales = ["e", "i", "a", "o", "u"]; 
    var texto = textoIngresado.value;
   
    for (var i = 0; i < expresionClaves.length; i++){
         var textoEncriptado = texto.replace(expresionClaves[i],arregloVocales[i]); // se busca en el texto ingresado todo las palabras claves y se las reemplaza
        texto = textoEncriptado;
        }
    mensajeResultado.value = texto;    
    textoIngresado.value = "";
    textoIngresado.focus();       
}

function copiarAlPortapapeles(){
    var mensajeCopiado = document.getElementById("msg");
    mensajeCopiado.select();
    mensajeCopiado.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function resetearCampos(){
    textoIngresado.value = ""; 
    mensajeResultado.value = "";
}


botonEncriptar.onclick = encriptarTexto;

botonDesencriptar.onclick = desencriptarTexto;

botonCopiar.onclick = copiarAlPortapapeles;

botonResetear.onclick = resetearCampos;

