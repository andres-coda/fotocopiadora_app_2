interface Props {
  titulo: string;
  subtitulo?: boolean | undefined;
  nuevoEstilo?: string | undefined;
}

function Titulo({ titulo, subtitulo, nuevoEstilo = undefined }: Props) {
  return (
    <>
      {subtitulo
        ? <h2 className={`texto grande ${nuevoEstilo && nuevoEstilo}`}>{titulo}</h2>
        : <h1 className={`texto grande centrado ${nuevoEstilo && nuevoEstilo}`}>{titulo}</h1>
      }
    </>
  )
}

export default Titulo