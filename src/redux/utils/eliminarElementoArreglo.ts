import { HasId } from "../../modelo/general/hasId.interface";

interface Prop<T extends HasId> {
    id: string;                         //id del elemento a eliminar
    datoContexto: T[] | null;           //arreglo existente
}
export const eliminarElementoArreglo =  <T extends HasId>({id, datoContexto}:Prop<T>):T[] => {
    if (!datoContexto || datoContexto.length === 0) return [];
    return datoContexto.filter(d=> d.id != id);
} 