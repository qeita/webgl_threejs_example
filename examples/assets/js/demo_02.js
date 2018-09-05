( () => {

  class App{
    constructor(){
      this.stats = new Stats()
      this.gui = new dat.GUI()
      this.winW = window.innerWidth
      this.winH = window.innerHeight
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera( 75, this.winW / this.winH, 0.1, 1000)
      this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
      this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement )
      this.axesHelper = new THREE.AxesHelper( 5 )
      this.raycaster = new THREE.Raycaster()

      this.init()
    }

    init(){
      // Common
      document.body.appendChild( this.stats.dom )

      this.renderer.setClearColor(0x000000, 0)
      this.renderer.setSize( this.winW, this.winH )
      document.body.appendChild( this.renderer.domElement )
      this.scene.add( this.axesHelper )

      let planeGeo = new THREE.PlaneGeometry( 30, 30, 32, 32 )
      let planeMat = new THREE.MeshBasicMaterial({color: 0xdddddd, side: THREE.DoubleSide, wireframe: true})
      this.plane = new THREE.Mesh( planeGeo, planeMat )
      this.plane.rotation.set( deg2rad(90), 0, 0 )
      this.scene.add( this.plane )

      window.addEventListener('resize', () => {
        this.resize()
      }, false)

      this.animate()

      // Customize 
      this.render()
    }

    render(){
      let cubeGeo = new THREE.BoxGeometry(1, 1, 1)
      let cubeMat = new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.6})
      this.cube = new THREE.Mesh( cubeGeo, cubeMat )
      this.cube.name = 'cube'

      this.scene.add( this.cube )

      this.camera.position.set( 5, 5, 5 )
      this.camera.lookAt( this.scene.position )

      let cubeFolder = this.gui.addFolder('cube')
      cubeFolder.addThreeColor(this.cube.material, 'color')
      cubeFolder.add(this.cube.material, 'opacity', 0, 1)
      cubeFolder.add(this.cube.position, 'x', -20, 20)
      cubeFolder.add(this.cube.position, 'y', -20, 20)
      cubeFolder.add(this.cube.position, 'z', -20, 20)


      this.renderer.domElement.addEventListener('click', (e) => {
        let mouse = new THREE.Vector2()
        mouse.x = (e.clientX / this.winW) * 2 - 1
        mouse.y = -(e.clientY / this.winH) * 2 + 1

        this.raycaster.setFromCamera( mouse, this.camera )
        let intersects = this.raycaster.intersectObjects( this.scene.children )
        for(let i = 0; i < intersects.length; i++){
          if(intersects[i].object.name === 'cube'){
            console.log('click')
            AnimManager.to(this.cube, 0.8, {
              x: 8,
              y: 5,
              z: 2,
              scaleX: 3
            })
            break
          }
        }

      }, false)
    }

    resize(){
      this.winW = window.innerWidth
      this.winH = window.innerHeight
      this.renderer.setSize( this.winW, this.winH )
      this.camera.aspect = this.winW / this.winH
      this.camera.updateProjectionMatrix()
    }

    animate(){
      let me = this

      function tick(){
        me.stats.begin()
        me.controls.update()
        me.renderer.render( me.scene, me.camera )
        me.stats.end()

        requestAnimationFrame( tick )
      }
      tick()
    }
  }

  new App()

})()