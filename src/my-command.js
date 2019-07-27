import sketch from 'sketch'
import {
  getApiToken,
  getCopyPrefix
} from "./Settings";
const UI = require('sketch/ui')
require('babel-polyfill')
const Abstract = require('abstract-sdk')

var Dialog = require("./modules/Dialog").dialog;
var ui = require("./modules/Dialog").ui;
import {
  checkIntersect,
  getRecentObject,
  msRectToXYXWH
} from "./modules/utils.js"

var SketchContext = context

const copyPrefix = getCopyPrefix()


export default function(context) {

  if (validateAbstract(context)._value == true) {

    context.api().selectedDocument.selectedLayers.iterate(layer => {
      getArtboardComments(context, layer.sketchObject.parentArtboard()).then(
        results => {
          let annotatedComments = []
          for (let comment of results.comments) {
            if (comment.annotation && comment.body.startsWith(copyPrefix)) {
              annotatedComments.push(comment)
            }
          }

          let layers = layer.sketchObject.layers()

          for (let comment of annotatedComments) {

            for (var i = 0; i < layers.length; i++) {
              if (layers[i].class() == 'MSTextLayer' &&
                checkIntersect(comment.annotation, msRectToXYXWH(layers[i].frame()))
              ) {
                layers[i].stringValue = comment.body.replace(copyPrefix, '')
              }
              if (layers[i].class() == 'MSSymbolInstance') {
                console.log('Layer is a symbol instance')
                console.log(layers[i].availableOverrides())
                for (var j = 0; j < layers[i].availableOverrides().length; j++) {

                  let symbolFrame = layers[i].frame()
                  let textFrame = layers[i].availableOverrides()[j].affectedLayer().frame()
                  //We need to offset the frame for the layer within the symbol to check for intersects
                  var offsetFrame = {
                    x: textFrame.x() + symbolFrame.x(),
                    y: textFrame.y() + symbolFrame.y(),
                    width: textFrame.width(),
                    height: textFrame.height()
                  }

                  //console.log(offsetFrame)
                  if (checkIntersect(comment.annotation, offsetFrame) && layers[i].availableOverrides()[j].handlerClass() == 'MSTextOverrideEventHandler') {

                    let point = layers[i].availableOverrides()[j].overridePoint()
                    layers[i].setValue_forOverridePoint(comment.body.replace(copyPrefix, ''), point);
                  }
                }
              }
              if (layers[i].class() == 'MSLayerGroup') {

                for (var k = 0; k < layers[i].layers().length; k++) {

                  let groupFrame = layers[i].frame()
                  let textFrame = layers[i].layers()[k].frame()

                  var offsetFrame = {
                    x: textFrame.x() + groupFrame.x(),
                    y: textFrame.y() + groupFrame.y(),
                    width: textFrame.width(),
                    height: textFrame.height()
                  }

                  if (checkIntersect(comment.annotation, offsetFrame) && layers[i].layers()[k].class() == 'MSTextLayer') {
                    layers[i].layers()[k].stringValue = comment.body.replace(copyPrefix, '')
                  }
                }
              }

            }
          }
        })


    });

  } else {
    UI.message('Abstract is not installed, or you are not in an Abstract document')
  }
}


/**
 * Get all comments for file
 * @param  {Object} context Sketch Context Object
 * @return  {Array}
 */
async function getComments(context) {
  let file = await Abstract.sketch.file(context)
  let comments = await client.comments.list({
    branchId: file.branchId,
    fileId: file.fileId,
    projectId: file.projectId,
    sha: "latest"
  })
  return {
    comments: comments,
    file: file
  }
}

/**
 * Gets comments related to an artboard
 * @param  {Object} context Sketch Context Object
 * @param  {Object} layer Sketch layer
 * @return  {Array}
 */
async function getArtboardComments(context, artboard) {
  let file = await Abstract.sketch.file(context)
  let comments = await client.comments.list({
    branchId: file.branchId,
    fileId: file.fileId,
    projectId: file.projectId,
    layerId: artboard.objectID(),
    pageId: artboard.parentPage().objectID(),
    sha: "latest"
  })
  return {
    comments: comments,
    file: file
  }
}





const client = new Abstract.Client({
  accessToken: getApiToken()
});

export async function listBranches() {
  // Query all projects
  const projects = await client.projects.list();
  // Iterate through each project
  for (const project of projects) {
    // Log the number of branches
    const branches = await client.branches.list({
      projectId: project.id
    });
    console.log(`${project.name}: ${branches.length} branches`);
  }
}






export async function validateAbstract(context) {
  if (Abstract.sketch.isAbstractPluginInstalled()) {

    if (Abstract.sketch.isAbstractDocument(context)) {
      //Abstract Plugin is installed, and user is in an abstract file.
      console.log('Abstract Plugin is installed, and user is in an abstract file.')
      return true
    } else {
      //Abstract Plugin is installed, and not in an abstract file.
      console.error('Abstract Plugin is installed, but user is  not in an abstract file.')
      return false
    }
  } else {
    //Plugin not installed
    console.error('Abstract Plugin is not installed.')
    return false
  }
}
