<?php
// Autoload des classes
spl_autoload_register(function ($class) {
    require_once '../' . str_replace('\\', '/', $class) . '.php';
});

$controller = isset($_GET['controller']) ? ucfirst($_GET['controller']) . 'Controller' : 'ServiceController';
$action = isset($_GET['action']) ? $_GET['action'] : 'index';

// Inclusion du contrôleur
$controllerPath = '../controllers/' . $controller . '.php';
if (file_exists($controllerPath)) {
    require_once $controllerPath;
    $controllerObj = new $controller();

    if (method_exists($controllerObj, $action)) {
        $controllerObj->$action();
    } else {
        echo 'Action non trouvée.';
    }
} else {
    echo 'Contrôleur non trouvé.';
}
