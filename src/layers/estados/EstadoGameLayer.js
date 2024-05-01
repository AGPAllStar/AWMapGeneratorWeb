class EstadoGameLayer {
    constructor(gameLayer) {
        this.gameLayer = gameLayer;
    }

    getOpcionesDeMenu() {
        var listOptions = new Array();
        var buttonFinishTurn = new Boton(imagenes.boton_opcion, 480*0.70 + 32,320*0.85);
        listOptions.push(buttonFinishTurn);

        var listFunctions = new Array();
        listFunctions.push(this.gameLayer.finalizarTurno);

        var listTexts = new Array();
        listTexts.push(new Texto("Finalizar turno", 480*0.70,320*0.85));

        return [listOptions, listFunctions, listTexts];
    }

    marcarCasilla(casilla) {
        
    }

    dibujarRangoDeAccion() {
        
    }

    dibujarCasillasMarcadas() {
        
    }
}