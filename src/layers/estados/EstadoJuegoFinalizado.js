class EstadoJuegoFinalizado extends EstadoGameLayer {
    constructor(gameLayer) {
        super(gameLayer);
        this.mensajeGanador = new Texto("Ha ganado el J" + this.gameLayer.game.getWinner(), 480*0.65,320*0.50);
    }

    getOpcionesDeMenu() {
        var listOptions = new Array();
        var listFunctions = new Array();
        var listTexts = new Array();

        return [listOptions, listFunctions, listTexts];
    }

    dibujar(scrollX) {
        this.mensajeGanador.dibujar(scrollX);
    }
}