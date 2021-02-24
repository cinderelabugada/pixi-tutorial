import * as PIXI from 'pixi.js'
import scaleToWindow from './scaleToWindow'

import araraImg from './images/arara.png'
import megamanImg from './images/megaman.png'
import luigiImg from './images/luigi.png'
import coracaoImg from './images/sprites/coracao.png'
import sucoImg from './images/limao.png'


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
    luigiImg,
    coracaoImg,
    sucoImg
  ])
  .add('images/spritesheet.json')
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


  /**
   * Texture Atlas: antes de usar utilize o spritesheetjs sobre uma pasta de
   * imagens png e utilize o .json e .png gerado
   */

/*
  const spritesheetTexture = PIXI.utils.TextureCache["pickachu.png"]
  sprite.coracao = new PIXI.Sprite(
    PIXI.Loader.shared.resources['images/spritesheet.json'].texture['coracao.png']
  )

  sprite.coracao.x = 400
  sprite.coracao.x = 200
  sprite.coracao.y = 200

  app.stage.addChild(sprite.coracao)
*/
 /**
   * Textura fica disponível através do índice igual ao nome do arquivo de
   * imagem.
   */
  sprite.coracao = new PIXI.Sprite(PIXI.Loader.shared.resources[coracaoImg].texture)

  sprite.coracao.vx = 2
  sprite.coracao.vy = 2

  
  sprite.coracao.scale.set(0.2, 0.2)
  /**
   * Para renderizar o sprite ele precisa ser adicionado no objeto stage.
   * Stage é o objeto que contem tudo que é renderizado.
   */
  app.stage.addChild(sprite.coracao)

  /**
   * Textura fica disponível através do índice igual ao nome do arquivo de
   * imagem.
   */
  sprite.suco = new PIXI.Sprite(PIXI.Loader.shared.resources[sucoImg].texture)

  sprite.suco.scale.set(0.1, 0.1)
  sprite.suco.x = 100
  sprite.suco.vx = 2
  sprite.suco.vy = 2

  app.stage.addChild(sprite.suco)

  app.ticker.add(delta => gameLoop(delta))
}

function gameLoop(delta) {
  /**
   * - delta da funcao ticker deixa a atualizacao independente da taxa de quadros
   * - pode ser que diminua a utilização de cpu com o delta
   */
  sprite.coracao.x = (sprite.coracao.x + sprite.coracao.vx + delta) % window.innerWidth
  sprite.coracao.y = (sprite.coracao.y + sprite.coracao.vy + delta) % window.innerHeight

  sprite.suco.x = (sprite.suco.x + sprite.suco.vx + delta) % window.innerWidth
  sprite.suco.y = (sprite.suco.y + sprite.suco.vy + delta) % window.innerHeight
}
