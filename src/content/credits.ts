/** Créditos de imágenes. Fuente: public/img/CREDITS.md (Wikimedia Commons). */
export interface ImageCredit {
  file: string
  subject: string
  author: string
  license: 'Dominio público' | 'CC0' | 'CC BY 2.0' | 'CC BY-SA 4.0'
  url: string
}

export const IMAGE_CREDITS: ImageCredit[] = [
  { file: 'hero-escuela-atenas.jpg', subject: 'La escuela de Atenas', author: 'Raffaello Sanzio (Rafael)', license: 'Dominio público', url: 'https://commons.wikimedia.org/wiki/File:%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg' },
  { file: 'lec-caverna.jpg', subject: 'Alegoría de la caverna (grabado, 1604)', author: 'Jan Saenredam, según Cornelis van Haarlem', license: 'Dominio público', url: 'https://commons.wikimedia.org/wiki/File:Platon_Cave_Sanraedam_1604.jpg' },
  { file: 'lec-sisifo.jpg', subject: 'Sísifo (Museo del Prado)', author: 'Tiziano', license: 'Dominio público', url: 'https://commons.wikimedia.org/wiki/File:Titian_-_Sisyphus_-_Madrid_-_Prado.jpg' },
  { file: 'lec-epicteto.jpg', subject: 'Epicteto (grabado, 1605)', author: 'Theodoor Galle', license: 'Dominio público', url: 'https://commons.wikimedia.org/wiki/File:Epictetus_from_L._Annaei_Senecae_philosophi_Opera,_1605,_title_page_detail.png' },
  { file: 'lec-icaro.jpg', subject: 'Paisaje con la caída de Ícaro', author: 'Pieter Brueghel el Viejo', license: 'Dominio público', url: 'https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Landscape_with_the_Fall_of_Icarus_-_WGA03321.jpg' },
  { file: 'lec-roma.jpg', subject: 'Ruinas del Foro Romano', author: 'David Roberts', license: 'Dominio público', url: 'https://commons.wikimedia.org/wiki/File:David_Roberts_(1796-1864)_-_Ruins_of_the_Roman_Forum_-_OP212_-_Wolverhampton_Art_Gallery.jpg' },
  { file: 'lec-revolucion.jpg', subject: 'La Libertad guiando al pueblo', author: 'Eugène Delacroix', license: 'Dominio público', url: 'https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg' },
  { file: 'lec-guerras.jpg', subject: 'Trinchera de la Primera Guerra Mundial (Somme, 1916)', author: 'John Warwick Brooke', license: 'Dominio público', url: 'https://commons.wikimedia.org/wiki/File:Cheshire_Regiment_trench_Somme_1916.jpg' },
  { file: 'lec-crisis-misiles.jpg', subject: 'Reconocimiento de un sitio de misiles en Cuba (1962)', author: 'Autor no indicado en Commons', license: 'Dominio público', url: 'https://commons.wikimedia.org/wiki/File:Cuban_missiles_alt.jpg' },
  { file: 'lec-independencia.jpg', subject: 'Retrato de Miguel Hidalgo', author: 'Autor anónimo', license: 'Dominio público', url: 'https://commons.wikimedia.org/wiki/File:Miguel_Hidalgo_retrato.png' },
  { file: 'lec-pigmalion.jpg', subject: 'Pigmalión y Galatea', author: 'Jean-Léon Gérôme', license: 'CC0', url: 'https://commons.wikimedia.org/wiki/File:Pygmalion_and_Galatea_MET_DT1969.jpg' },
  { file: 'lec-bombarderos.jpg', subject: 'Tripulación de un bombardero B-17', author: 'United States Army Air Forces', license: 'Dominio público', url: 'https://commons.wikimedia.org/wiki/File:RAF_Thurleigh_-_306th_Bombardment_Group_-_B-17_Flying_Fortress_Flak.jpg' },
  { file: 'lec-pareto.jpg', subject: 'Retrato de Vilfredo Pareto', author: 'Autor desconocido', license: 'Dominio público', url: 'https://commons.wikimedia.org/wiki/File:Vilfredo_Pareto_1870s2.jpg' },
  { file: 'lec-ebbinghaus.jpg', subject: 'Retrato de Hermann Ebbinghaus', author: 'Autor desconocido', license: 'Dominio público', url: 'https://commons.wikimedia.org/wiki/File:Ebbinghaus2.jpg' },
  { file: 'lec-monedas.jpg', subject: 'Pila de monedas', author: 'Dori', license: 'CC0', url: 'https://commons.wikimedia.org/wiki/File:Stack_of_coins_0214(cropped).jpg' },
  { file: 'lec-alcancia.jpg', subject: 'Alcancía con forma de camión', author: 'Noah Wulf', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Model_1925_Kenworth_Collectible_Piggy_Bank_front_view_2.jpg' },
  { file: 'track-brote.jpg', subject: 'Brote creciendo', author: 'Timothy A. Gonsalves', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Adenium_seedling_2day_Uthandi_Aug21_D72_20609-21_ZP.jpg' },
  { file: 'track-ciudad-negocios.jpg', subject: 'Distrito financiero', author: 'Julian Lupyan', license: 'CC0', url: 'https://commons.wikimedia.org/wiki/File:Financial_District_East_Skyline,_2025.jpg' },
  { file: 'bg-biblioteca.jpg', subject: 'Biblioteca antigua (Trinity College, Dublín)', author: 'Rhagfyr', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Old_Library_at_Trinity_College_Dublin.jpg' },
  { file: 'bg-cuaderno.jpg', subject: 'Cuaderno, pluma y escritorio', author: 'Shixart1985', license: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Desk_with_notebook_pens_and_glasses.jpg' },
]
