// TODO: Remove jquery dependency

$(function () {
    async function webgl() {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, $(".webgl").innerWidth() / $(".webgl").innerHeight(), 0.1, 1000);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize($(".webgl").innerWidth() / 2, $(".webgl").innerHeight() / 2);
        $(".webgl").append(renderer.domElement);

        scene.background = new THREE.Color(0xffffff);

        var ambient = new THREE.AmbientLight(0xa0a0a0);
        scene.add(ambient);

        var spotLight = new THREE.SpotLight(0xa0a0a0);
        spotLight.position.set(50, 100, 50);

        spotLight.castShadow = true;

        spotLight.shadow.mapSize.width = 512;
        spotLight.shadow.mapSize.height = 512;

        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 75;
        scene.add(spotLight);

        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshLambertMaterial({ color: 0xfea3aa });

        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        function clamp(num, min, max) {
            return num <= min ? min : num >= max ? max : num;
        }

        camera.position.z = 1.75;
        // camera.position.z = clamp(( 1500 / $(".webgl").innerWidth()), 1.75, 3);

        var animate = async () => {
            setTimeout(function () {
                requestAnimationFrame(animate);
            }, 20 / 10);

            cube.rotation.x -= 0.01;
            cube.rotation.y -= 0.01;

            material.color.offsetHSL(.0005, 0, 0);

            cube.geometry.colorsNeedUpdate = true;

            renderer.render(scene, camera);
        };

        animate();
    }

    $(".underline").hover(async function () {
        $(this).find(".line").addClass("expand");
    }, async function () {
        $(this).find(".line").removeClass("expand");
    });

    webgl();
});