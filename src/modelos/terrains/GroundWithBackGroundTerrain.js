class GroundWithBackgroundTerrain extends Terrain {

    constructor(rutaImagen, x, y, defenseLevel) {
        super(rutaImagen, x, y, defenseLevel);
        this.casillaFondo = new BackgroundTerrain(x, y);
    }

    dibujar(scrollX) {
        this.casillaFondo.dibujar(scrollX);
        super.dibujar(scrollX);
    }
    
}
