export interface Provincia {
  id: string;
  nombre: string;
}

export interface Localidad {
  id?: string;
  nombre: string;
  provincia: {
    id?: string;
    nombre: string;
  };
}

const BASE_URL = 'https://apis.datos.gob.ar/georef/api';

export const getProvincias = async (): Promise<Provincia[]> => {
  const response = await fetch(`${BASE_URL}/provincias`);
  const data = await response.json();
  return data.provincias || [];
};

export const getLocalidades = async (provinciaNombre: string): Promise<Localidad[]> => {
  const response = await fetch(
    `${BASE_URL}/localidades?provincia=${encodeURIComponent(provinciaNombre)}&max=500`
  );
  const data = await response.json();
  return data.localidades || [];
};
