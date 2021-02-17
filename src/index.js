///import * as PIXI from 'pixi.js'
import * as PIXI from './pixi/pixi.min.js'
import scaleToWindow from './scaleToWindow'

import characterImage from './images/arara.png'

// Cria um novo objeto do tipo Application que cria um canvas para HTML
const app = new PIXI.Application({ 
  width: window.innerWidth,         // default: 800
  height: window.innerHeight,        // default: 600
  antialias: true,    // default: false
  transparent: true,  // default: false
  resolution: 1       // default: 1
});

// Modifica cor de fundo
//app.renderer.backgroundColor = 0x061639;

// Modifica o tamanho e disposição do canvas
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = 'block';
app.renderer.autoResize = true;

// Atualiza tamanho do canvas responsivamente
window.addEventListener('resize', function(event){ 
  scaleToWindow(app.renderer.view);
})

// Adiciona o canvas na página HTML
document.body.appendChild(app.view);

/**
 * Carrega os sprites e converte para o formato cache textura utilizado pelo WebGL
 */

console.log(app)

const loader = PIXI.Loader.shared
//const loader = new PIXI.Loader()

app.loader.add('images/megaman.png')
  .load(setup)

  function setup (loader, resources) {
    /**
     * Textura fica disponível através do índice igual ao nome do arquivo de
     * imagem
     */
    const sprite = new PIXI.Sprite(resources['images/megaman.png'].texture)

    /**
     * Para renderizar o sprite ele precisa ser adicionado no objeto stage.
     * Stage é o objeto que contem tudo que é renderizado.
     */
    app.stage.addChild(sprite);
  }


