export interface estilosTextoProps {
  default?: boolean | undefined;
  chica?: boolean | undefined;
  mediana?: boolean | undefined;
  negrita?: boolean | undefined;
  grande?: boolean | undefined;
  muyGrande?: boolean | undefined;
  sombra?: boolean | undefined;
  error?: boolean | undefined;
  inverso?: boolean | undefined;
  centrado?: boolean | undefined;
  derecha?: boolean | undefined;
  ajustado?: boolean | undefined;
  alCien?: boolean | undefined;
  nuevoEstilo?: string | undefined;
  etiqueta?: string | undefined;
}

export interface textoProps extends estilosTextoProps {
  texto: String;
}