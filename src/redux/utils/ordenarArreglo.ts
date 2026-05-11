import { HasId } from "../../modelo/general/hasId.interface";

interface Prop<T extends HasId> {
    dato: T | null;                   // nuevo dato
    datoContexto: T[] | null;         //arreglo existente
    sortKey?: keyof T;                //clave para ordenar el arreglo
    desendente?: boolean;              //tipo de orden, true de mayor a menor
}

export const arregloOrdenado = <T extends HasId>({
    dato = null,
    datoContexto = null,
    sortKey,
    desendente = false,
}: Prop<T>): T[] => {
    if (!dato) return datoContexto || [];

    const nuevoContexto: T[] = [...(datoContexto || [])];
    const index = nuevoContexto.findIndex(c => c.id === dato.id);

    if (index === -1) {
        nuevoContexto.push(dato);
    } else {
        nuevoContexto[index] = dato;
    }

    if (sortKey && typeof nuevoContexto[0]?.[sortKey] === 'string') {
        return nuevoContexto.sort((a, b) => desendente
            ? String(b[sortKey]).localeCompare(String(a[sortKey]), 'es', { sensitivity: 'base' })
            : String(a[sortKey]).localeCompare(String(b[sortKey]), 'es', { sensitivity: 'base' })

        );
    }

    return nuevoContexto;
};