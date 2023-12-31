import * as THREE from 'three';
//import { Texture } from '/three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.02, 2000 );

const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
renderer.setClearAlpha(0,2);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 1000;

let group; // 声明一个全局变量

// instantiate a loader
const svgloader = new SVGLoader();



// load a SVG resource
svgloader.load(
	// resource URL
	'./drawing.svg',
	// 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData),
	// called when the resource is loaded
	function ( data ) {
		const paths = data.paths;

		group = new THREE.Group();

		for ( let i = 0; i < paths.length; i ++ ) {

			const path = paths[ i ];

			const matrix = new THREE.Matrix4();
			matrix.makeScale(1, -1, 1); // 将Y轴翻转


			const material = new THREE.MeshBasicMaterial( {
				color: 0x000000,
				side: THREE.DoubleSide,
				depthWrite: false
			} );

			if (path.toShapes){
				const shapes = SVGLoader.createShapes( path );

				for ( let j = 0; j < shapes.length; j ++ ) {

					const shape = shapes[ j ];
					const geometry = new THREE.ShapeGeometry( shape );
					const mesh = new THREE.Mesh( geometry, material );

					// 应用矩阵变换到Mesh的位置和缩放属性
					mesh.position.applyMatrix4(matrix);
					mesh.scale.applyMatrix4(matrix);

					group.add( mesh );
				}	
			}

			
		}
		scene.add( group );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


const material = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 100 });

var points = [];
points.push( new THREE.Vector3( - 10000, 0, 0 ) );
points.push( new THREE.Vector3( 10000, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10000 , 0 ) );
points.push( new THREE.Vector3( 0, -10000, 0 ) );

var geometry = new THREE.BufferGeometry().setFromPoints( points );
var line = new THREE.Line( geometry, material );
scene.add( line );

const textloader = new FontLoader();
textloader.load('../node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {
	// 創建文字的幾何形狀
	const texts = ['A', 'B', 'C', 'D'];
	const i=0;
	for (let i = 0; i < texts.length; i++){
		const ltr = texts[i];  
		const textGeometry = new TextGeometry(ltr, {
			font: font,
			size: 80, // 文字大小
			height: 0.1, // 文字厚度
			curveSegments: 12, // 曲線細分數
			bevelEnabled: false // 是否啟用斜角
		});

		// 創建文字的材質
		const material = new THREE.MeshBasicMaterial({ color: 0x000000 });

		// 創建文字物體
		const textMesh = new THREE.Mesh(textGeometry, material);

		// 設置文字的位置
		if(i==0){
			textMesh.position.x = -90; // 調整 X 位置
			textMesh.position.y = 20; // 調整 Y 位置
		}
		else if(i==1){
			textMesh.position.x = 20; // 調整 X 位置
			textMesh.position.y = 20; // 調整 Y 位置
		}
		else if(i==2){
			textMesh.position.x = -90; // 調整 X 位置
			textMesh.position.y = -100; // 調整 Y 位置
		}
		else if(i==3){
			textMesh.position.x = 20; // 調整 X 位置
			textMesh.position.y = -100; // 調整 Y 位置
		}

		// 將文字添加到場景中
		scene.add(textMesh);
	}
});



camera.lookAt( 0, 0, 0 );

let speedx = 5
let speedy = 7

let edge_top = 800
let edge_bottom = -800
let edge_left = -1000
let edge_right = 1000


function animate() {

	renderer.render( scene, camera );

	if (group) { // 检查 group 是否存在
		group.rotation.x += 0.005;
		
		window.addEventListener('keydown', (event) => {
			switch (true) {
				case event.key === 'A' || event.key === 'a':
					edge_top = 800
					edge_bottom = 250
					edge_left = -1500
					edge_right = -400
		
					group.position.x = -500
					group.position.y = 400
					break;
				case event.key === 'B' || event.key === 'b':
					edge_top = 800
					edge_bottom = 250
					edge_left = 0
					edge_right = 1300
		
					group.position.x = 500
					group.position.y = 400
					break;
				case event.key === 'C' || event.key === 'c':
					edge_top = 0
					edge_bottom = -600
					edge_left = -1500
					edge_right = -400
		
					group.position.x = -500
					group.position.y = -400
					break;
				case event.key === 'D' || event.key === 'd':
					edge_top = 0
					edge_bottom = -600
					edge_left = 0
					edge_right = 1300
		
					group.position.x = 500
					group.position.y = -400
					break;
			}
		});

		group.position.x += speedx;
		group.position.y += speedy;

		if(group.position.x >= edge_right)
			speedx = 0-speedx;
		else if(group.position.x < edge_left)
			speedx = 0-speedx;
		if(group.position.y > edge_top)
			speedy = 0-speedy;
		else if(group.position.y < edge_bottom)
			speedy = 0-speedy;

		console.log(`X: ${group.position.x}, Y: ${group.position.y}`);
		//console.log(`X: ${window.innerWidth}, Y: ${window.innerHeight}`);
	}
	
	requestAnimationFrame( animate );
}



animate();

