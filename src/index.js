import * as PIXI from 'pixi.js'
import scaleToWindow from './scaleToWindow'

import araraImg from './images/arara.png'
import megamanImg from './images/megaman.png'
import luigiImg from './images/luigi.png'

/**
 * Cria um novo objeto do tipo Application que cria um canvas para HTML
 */
const app = new PIXI.Application({ 
  width: window.innerWidth,         // default: 800
  height: window.innerHeight,        // default: 600
  antialias: true,    // default: false
  transparent: false,  // default: false
  resolution: 1       // default: 1
});

/**
 * Modifica cor de fundo
 */
//app.renderer.backgroundColor = 0x061639;

/**
 * Modifica o tamanho e disposição do canvas
 */
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = 'block';
app.renderer.autoResize = true;

/**
 * Atualiza tamanho do canvas responsivamente
 */
window.addEventListener('resize', function(event){ 
  scaleToWindow(app.renderer.view);
})

/**
 * Adiciona o canvas na página HTML
 */
document.body.appendChild(app.view);

/**
 * Carrega os sprites e converte para o formato cache textura utilizado pelo WebGL
 */
PIXI.Loader.shared
  .add([
    araraImg,
    megamanImg,
    luigiImg
  ])
  .load(setup)

const sprite = {}
function setup () {
  /**
   * Textura fica disponível através do índice igual ao nome do arquivo de
   * imagem.
   */
  sprite.arara = new PIXI.Sprite(PIXI.Loader.shared.resources[araraImg].texture)

  /**
   * Para renderizar o sprite ele precisa ser adicionado no objeto stage.
   * Stage é o objeto que contem tudo que é renderizado.
   */
  app.stage.addChild(sprite.arara)

  /**
   * Carregando sprites from tileset (cartela de sprites). Nesse caso o
   * tutorial apresenta esse carregamento de forma um pouco diferente da
   * utilizada pelos sprites comuns.
   * Nesse caso é realizada a identificação da localização do frame em
   * que o sub-sprite está posicionado na textura. Assim o pixi realiza o
   * "recorte" na textura.
   */

  // Obtêm a textura carregada
  const megamanTexture = PIXI.utils.TextureCache[megamanImg]

  // Identifica a localização do frame
  megamanTexture.frame = new PIXI.Rectangle(164, 166, 52, 52)

  // Carrega o "recorte" da textura como sprite
  sprite.megaman = new PIXI.Sprite(megamanTexture)

  // desloca a imagem para não sobrepor com a anterior da arara
  sprite.megaman.x = 190
  sprite.megaman.y = 32

  /**
   * Adição do sprite do tileset
   */
  app.stage.addChild(sprite.megaman);

  /**
   * Modificar posição do sprite
   */
  sprite.luigi = new PIXI.Sprite(PIXI.Loader.shared.resources[luigiImg].texture)

  // redimencionamento com tamanho em pixels
  sprite.luigi.width = 64
  sprite.luigi.height = 64

  // redimencionamento com porcentagem
  // sprite.luigi.scale.set(0.5, 0.5)

  // deslocamento com base no pixel 0,0 (canto superior esquerdo)
  sprite.luigi.position.set(190, 190)

  // define o ponto de rotação transladando a textura
  //sprite.anchor.set(0.5, 0.5)

  // define o ponto de rotação sem transportar a textura
  sprite.luigi.pivot.set(32, 32)

  // realiza a rotação [radianos]
  sprite.luigi.rotation = 0.6

  /**
   * Inclui o sprite no stage para ser renderizado
   */
  app.stage.addChild(sprite.luigi)
}


