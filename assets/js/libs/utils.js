/**
 * Utility
 */

/**
 * 角度からラジアン変換
 * @param {number} - 角度 
 */
function deg2rad(degree){
  return degree * (Math.PI / 180)
}

/**
 * refer to the below URL:
 * https://stackoverflow.com/questions/14666417/set-the-color-the-one-object-in-three-js-with-dat-gui-choose-color
 */
dat.GUI.prototype.addThreeColor = function(obj, varName){
  // threejs & dat.gui have color incompatible formats so we use a dummy data as target :
  var dummy = {}
  // set dummy initial value :
  dummy[varName] = obj[varName].getStyle() 
  return this.addColor(dummy,varName)
    .onChange(function( colorValue  ){
      //set color from result :
      obj[varName].setStyle(colorValue)
    })
}

dat.GUI.prototype.addThreeUniformColor=function(material, uniformName, label){
  return this.addThreeColor(material.uniforms[uniformName],"value").name(label||uniformName);
}