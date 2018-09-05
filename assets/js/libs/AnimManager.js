( () => {
  
  const AnimManager = {
    /**
     * 
     * @param {object} o - Three.jsのメッシュオブジェクト
     * @param {number} d - 秒数(単位: s)
     * @param {object} p - パラメーター( x, y, z, rotate(rotateX, rotateY, rotateZ), scale(scaleX, scaleY, scaleZ), opacity )
     */
    to: (o, d, p) => {
      let stdTime = performance.now()
      let params = {}
      let currentParams = {}

      // プロパティの取得及び比較
      for(let k in p){
        if(k === 'x' || k === 'y' || k === 'z'){
          params[ k ] = p[ k ]
          currentParams[ k ] = o.position[ k ]          
        }
        if(k.indexOf('rotate') >= 0){
          params[ k ] = p[ k ]
          currentParams[ k ] = o.rotation[ k.substr('rotate'.length).toLowerCase() ]
        }
        if(k.indexOf('scale') >= 0){
          params[ k ] = p[ k ]
          currentParams[ k ] = o.scale[ k.substr('scale'.length).toLowerCase() ]
        }
      }

      window.requestAnimationFrame( update )

      function update(){
        let progress = (performance.now() - stdTime) / (d * 1000)
        progress = Math.min(progress, 1)

        for(let k in currentParams){
          if(k === 'x' || k === 'y' || k === 'z'){
            o.position[ k ] = currentParams[ k ] + (params[ k ] - currentParams[ k ]) * progress
          }
          if(k.indexOf('rotate') >= 0){
            o.rotation[ k.substr('rotate'.length).toLowerCase() ] = currentParams[ k ] + (params[ k ] - currentParams[ k ]) * progress
          }
          if(k.indexOf('scale') >= 0){
            o.scale[ k.substr('scale'.length).toLowerCase() ] = currentParams[ k ] + (params[ k ] - currentParams[ k ]) * progress
          }
        }

        if(progress < 1){
          window.requestAnimationFrame( update )
        }
      }
    }
  }

  window.AnimManager = AnimManager

})()