CREATE TABLE IF NOT EXISTS usuarios (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS categorias (
    idcategoria INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    nombre_categoria VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS productos (
    idproducto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255) NOT NULL, 
    idcategoria INT NOT NULL
);

-- Insertar datos iniciales de usuarios 
INSERT INTO usuarios (nombre_usuario, correo, password) VALUES 
('jaqueline', 'jaqueline1@gmail.com', 'orozco20'); 

-- insertar datos iniciales de categoría 
INSERT INTO categorias ( nombre_categoria ) VALUES
('cerveza'), 
('snacks'), 
('licores'); 

-- insertar datos iniciañles de productos 
INSERT INTO productos (nombre_producto, precio, image_url, idcategoria) VALUES 
('Tres Cordilleras', 6000, 'https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928312/3-cordilleras_jfngny.png', 1),
('Stella artois', 7000, 'https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928357/220812050604_stellaartois-adlatina_sjmlvu.jpg', 1),
('Aguila', 4000, 'https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928362/AGUILA-BOTELLA-600x600_fqymnv.jpg', 1), 
('Papas', 4000, 'https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928344/815CKByawWL._AC_UF894_1000_QL80__rjybat.jpg', 2),
('Chocolatinas', 5000, 'https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928318/450_1000_asqwvr.jpg', 2),
('Bom-Bom-Gum', 7000, 'https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928383/images_agyhff.jpg', 2),
('Buchanan`s', 110000, 'https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928412/unnamed_6_53de1a21-b4d5-4ee5-a488-a796896e9011_bm7ahw.webp', 3),
('Ron', 58000, 'https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928396/Imagenes-03-Licores-preferidos-Colombianos_dpirrn.jpg', 3),
('Baylis', 50000, 'https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928368/depositphotos_118386876-stock-photo-bottles-of-assorted-hard-liquor_f4isno.webp', 3);

