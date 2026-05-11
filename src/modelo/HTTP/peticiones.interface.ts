import { httpMethod } from "../../modelo/HTTP/HttpMethod.enum";

type Adapter<T> = (data: any) => T;

export interface FetchDataProps<T> {
  url?: string | null;
  bodyData?: BodyInit | null;
  methodo?: httpMethod | null;
  adapter?: Adapter<T> | null;
}

export interface UseApiProps<T> {
  urlGet?: string | null;
  adapterGet?:  Adapter<T> | null;
  blob?: boolean | undefined;
}