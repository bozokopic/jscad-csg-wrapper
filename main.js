const fs = require('fs-extra');
const path = require('path');
const R = require('ramda');
const x3dSerializer = require('@jscad/x3d-serializer');
const csgApi = require('@jscad/csg/api');


function output(dir, name, shape) {
    const rawData = x3dSerializer.serialize(shape);
    const x3domJsPath = require.resolve('x3dom');
    const x3domCssPath = R.pipe(
        path.parse,
        R.assoc('ext', '.css'),
        path.format
    )(x3domJsPath);
    fs.copySync(x3domJsPath, path.join(dir, 'x3dom.js'));
    fs.copySync(x3domCssPath, path.join(dir, 'x3dom.css'));
    fs.writeFileSync(path.join(dir, `${name}.x3d`), rawData);
    fs.writeFileSync(path.join(dir, `${name}.html`), `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <script type="text/javascript" src="x3dom.js"></script>
            <link rel="stylesheet" type="text/css" href="x3dom.css"></link>
            <style>
                body {
                    margin: 0px;
                }
                html, body, x3d, x3d > canvas {
                    width: 100%;
                    height: 100%;
                }
            </style>
        </head>
        <body>
            <x3d>
               <scene>
                   <inline url="${name}.x3d"></inline>
               </scene>
            </x3d>
        </body>
        </html>`);
}


module.exports = {
    output: output,

    circle: csgApi.primitives2d.circle,
    ellipse: csgApi.primitives2d.ellipse,
    rectangle: csgApi.primitives2d.rectangle,
    roundedRectangle: csgApi.primitives2d.roundedRectangle,

    cube: csgApi.primitives3d.cube,
    sphere: csgApi.primitives3d.sphere,
    roundedCube: csgApi.primitives3d.roundedCube,
    cylinder: csgApi.primitives3d.cylinder,
    roundedCylinder: csgApi.primitives3d.roundedCylinder,
    cylinderElliptic: csgApi.primitives3d.cylinderElliptic,
    polyhedron: csgApi.primitives3d.polyhedron,

    union: csgApi.booleanOps.union,
    difference: csgApi.booleanOps.difference,
    intersection: csgApi.booleanOps.intersection,

    translate: csgApi.transformations.translate,
    center: csgApi.transformations.center,
    scale: csgApi.transformations.scale,
    rotate: csgApi.transformations.rotate,
    transform: csgApi.transformations.transform,
    mirror: csgApi.transformations.mirror,
    expand: csgApi.transformations.expand,
    contract: csgApi.transformations.contract,
    minkowski: csgApi.transformations.minkowski,
    hull: csgApi.transformations.hull,
    chain_hull: csgApi.transformations.chain_hull,

    extrudeInOrthonormalBasis: csgApi.extrusions.extrudeInOrthonormalBasis,
    extrudeInPlane: csgApi.extrusions.extrudeInPlane,
    extrude: csgApi.extrusions.extrude,
    linear_extrude: csgApi.extrusions.linear_extrude,
    rotate_extrude: csgApi.extrusions.rotate_extrude,
    rotateExtrude: csgApi.extrusions.rotateExtrude,
    rectangular_extrude: csgApi.extrusions.rectangular_extrude,

    css2rgb: csgApi.color.css2rgb,
    color: csgApi.color.color,
    rgb2hsl: csgApi.color.rgb2hsl,
    hsl2rgb: csgApi.color.hsl2rgb,
    rgb2hsv: csgApi.color.rgb2hsv,
    hsv2rgb: csgApi.color.hsv2rgb,
    html2rgb: csgApi.color.html2rgb,
    rgb2html: csgApi.color.rgb2html,

    vector_char: csgApi.text.vector_char,
    vector_text: csgApi.text.vector_text,
    vectorChar: csgApi.text.vectorChar,
    vectorText: csgApi.text.vectorText
};
