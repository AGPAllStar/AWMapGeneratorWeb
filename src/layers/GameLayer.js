class GameLayer extends Layer {

    constructor() {
        super();
        this.mensaje = new Boton(imagenes.mensaje_como_jugar, 480/2, 320/2);
        this.pausa = true;
        this.iniciar();
    }

    iniciar() {
        this.scrollX = 0;

        reproducirMusica();

        this.fondoPuntos = new Fondo(imagenes.icono_puntos, 480*0.80,320*0.05);
        this.fondo = new Fondo(imagenes.fondo_2, 480*0.5,320*0.5);

        this.cargarMapa("res/1-1.txt");

        this.dinero = new Texto(this.game.actualPlayer.money, 480*0.85,320*0.07);
        this.jugadorActivo = new Texto("Turno del J" + this.game.actualPlayer.id, 480*0.75,320*0.15);

        this.cancelar();
    }
    
    actualizar(){
        if (this.pausa){
            return;
        }

        if(this.game.isGameFinished()) {
            this.estado = new EstadoJuegoFinalizado(this);
            this.obtenerOpcionesDeMenu();
        }

        this.mensaje = new Boton(imagenes.mensaje_ganar, 480/2, 320/2);
        this.fondo.actualizar();
    }

    calcularScroll(){
        this.scrollX = 0;
    }    
    
    dibujar(){
        this.calcularScroll();
        this.fondo.dibujar();
        for (var i=0; i < this.game.map.length; i++){
            for (var j=0; j < this.game.map[i].length; j++){
                this.game.map[i][j].dibujar(this.scrollX);
            }
        }
        
        // HUD
        this.estado.dibujar(this.scrollX);
        
        for(var i = 0;i < this.opcionesDeMenu.length;i++) {
            this.opcionesDeMenu[i].dibujar(this.scrollX);
        }

        for(var i = 0;i < this.textosDeMenu.length;i++) {
            this.textosDeMenu[i].dibujar(this.scrollX);
        }

        this.fondoPuntos.dibujar();
        this.dinero.dibujar();
        this.jugadorActivo.dibujar();
        if ( this.pausa ) {
            this.mensaje.dibujar();
        }
    }      

    procesarControles(){
        if (controles.continuar){
            controles.continuar = false;
            this.pausa = false;
        }
    }
    
    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function() {
            var texto = fichero.responseText;
            var arrayMap = this.convertirStrAArray(texto);
            this.game = new Game(arrayMap, 2);
        }.bind(this);
    
        fichero.send(null);
    }

    convertirStrAArray(strMap) {
        var arrayMap = new Array();
        var lineas = strMap.split('\n');
        for(let i = 0;i < lineas.length;i++) {
            var row = new Array();
            for(let j = 0;j < lineas[i].length;j++) {
                if(lineas[i].charAt(j) != "\r" && lineas[i].charAt(j) != "\t"){
                    row.push(lineas[i].charAt(j));
                }
            }
            arrayMap.push(row);
        }
        return arrayMap;
    }

    calcularPulsaciones(pulsaciones){
        // Suponemos a false
        controles.continuar = false;
        for (var r=0; r < this.game.map.length; r++){
            for (var c=0; c < this.game.map[r].length; c++){
                this.game.map[r][c].pulsado = false;
            }
        }
        for(var j = 0;j < this.opcionesDeMenu.length;j++) {
            this.opcionesDeMenu[j].pulsado = false;
        }

        var opcionDeMenuPulsada = false;
    
        for(var i=0; i < pulsaciones.length; i++){
            // MUY SIMPLE SIN BOTON cualquier click en pantalla lo activa
            if(pulsaciones[i].tipo == tipoPulsacion.inicio){
                controles.continuar = true;
            }

            for(var j = 0;j < this.opcionesDeMenu.length;j++) {
                if(this.opcionesDeMenu[j].contienePunto(pulsaciones[i].x , pulsaciones[i].y)){
                    this.opcionesDeMenu[j].pulsado = true;
                    if(pulsaciones[i].tipo == tipoPulsacion.inicio) {
                        opcionDeMenuPulsada = true;
                        this.funcionesDeMenu[j].bind(this)();
                    }
                }
            }

            if(!opcionDeMenuPulsada) {
                for (var r=0; r < this.game.map.length; r++){
                    for (var c=0; c < this.game.map[r].length; c++){
                        if (this.game.map[r][c].contienePunto(pulsaciones[i].x , pulsaciones[i].y) ){
                            this.game.map[r][c].pulsado = true;
                            if(pulsaciones[i].tipo == tipoPulsacion.inicio) {
                                this.estado.marcarCasilla(this.game.map[r][c]);
                                this.obtenerOpcionesDeMenu();
                            }
                        }
                    }
                }
            }
            
        }
    }

    prepararMovimiento() {
        var casillaPrevia = this.estado.casillaMarcada;
        this.estado = new EstadoMovimientoPreparado(this, casillaPrevia);
        this.obtenerOpcionesDeMenu();
    }

    prepararAtaque() {
        var casillaPrevia = this.estado.casillaMarcada;
        this.estado = new EstadoAtaquePreparado(this, casillaPrevia);
        this.obtenerOpcionesDeMenu();
    }

    mover() {
        // Realizar movimiento
        this.game.moveTroop(this.estado.casillaMarcada, this.estado.casillaMarcada2);
        this.cancelar();
    }

    atacar() {
        // Realizar ataque
        this.game.attackTroop(this.estado.casillaMarcada, this.estado.casillaMarcada2);
        this.cancelar();
    }

    conquistar() {
        // Realizar conquista
        this.game.conquerBuilding(this.estado.casillaMarcada);
        this.cancelar();
    }

    prepararInvocacion() {
        var casillaPrevia = this.estado.casillaMarcada;
        this.estado = new EstadoInvocacionPreparado(this, casillaPrevia);
        this.obtenerOpcionesDeMenu();
    }

    invocarTropa(strTropa) {
        this.game.invokeTroop(strTropa, this.estado.casillaMarcada);
        this.dinero.valor = this.game.actualPlayer.money;
        this.cancelar();
    }

    invocarInfanteria() {
        this.invocarTropa("infantry");
    }

    invocarTanque() {
        this.invocarTropa("tank");
    }

    invocarHelicoptero() {
        this.invocarTropa("helicopter");
    }

    finalizarTurno() {
        this.game.finishTurn();
        this.cancelar();
        this.dinero.valor = this.game.actualPlayer.money;
        this.jugadorActivo.valor = "Turno del J" + this.game.actualPlayer.id;
    }

    cancelar() {
        this.estado = new EstadoNulo(this);
        this.obtenerOpcionesDeMenu();
    }

    obtenerOpcionesDeMenu() {
        var options = this.estado.getOpcionesDeMenu();
        this.opcionesDeMenu = options[0];
        this.funcionesDeMenu = options[1];
        this.textosDeMenu = options[2];
    }
    
}
