class Terrain extends Boton{

    constructor(rutaImagen, x, y, defenseLevel) {
        super(rutaImagen, x, y);
        this.defenseLevel = defenseLevel;
        this.troop = null;
    }

    canTroopPassThrough(troop) {
        return true;
    }

    actualizar() {
        super.actualizar();
        if(this.troop != null) {
            this.troop.actualizar();
        }
    }

    dibujar(scrollX) {
        super.dibujar(scrollX);
        if(this.troop != null) {
            this.troop.dibujar(scrollX);
        }
    }
    
}
