CREATE TABLE IF NOT EXISTS usuarios (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS productos (
    idproducto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255) NOT NULL, 
    idcategoria INT 
);

CREATE TABLE IF NOT EXISTS categorias (
    idcategoria INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    nombre_categoria VARCHAR(100) NOT NULL
)

-- Insertar datos iniciales
INSERT INTO usuarios (nombre_usuario, correo, password) VALUES 
('jaqueline', 'jaqueline1@gmail.com', 'orozco20'); 


INSERT INTO productos (nombre_producto, precio, image_url, idcategoria) VALUES 
(idproducto: 1, nombre_producto: "Tres Cordilleras", precio: '6000', image_url: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928312/3-cordilleras_jfngny.png", idcategoria: 1 ),
(idproducto: 2, nombre_producto: "Stella artois", precio: '7000', image_url: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928357/220812050604_stellaartois-adlatina_sjmlvu.jpg",  idcategoria: 1 ),
(idproducto: 3, nombre_producto: "Aguila", precio: '4000', image_url: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928362/AGUILA-BOTELLA-600x600_fqymnv.jpg",  idcategoria: 1), 
(idproducto: 4, nombre_producto: "Papas", precio: '4000', image_url: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928344/815CKByawWL._AC_UF894_1000_QL80__rjybat.jpg", idcategoria: 2),
(idproducto: 5, nombre_producto: "Chocolatinas", precio: '5000', image_url: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928318/450_1000_asqwvr.jpg", idcategoria: 2),
(idproducto: 6, nombre_producto: "Bom-Bom-Gum", precio: '7000', image_url: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928383/images_agyhff.jpg", idcategoria: 2),
(idproducto: 7, nombre_producto: "Buchanan`s", precio: '110000', image_url: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928412/unnamed_6_53de1a21-b4d5-4ee5-a488-a796896e9011_bm7ahw.webp", idcategoria: 3),
(idproducto: 8, nombre_producto: "Ron", precio: '58000', image_url: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928396/Imagenes-03-Licores-preferidos-Colombianos_dpirrn.jpg", idcategoria: 3),
(idproducto: 9, nombre_producto: "Baylis", precio: '50000', image_url: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928368/depositphotos_118386876-stock-photo-bottles-of-assorted-hard-liquor_f4isno.webp", 3); 

INSERT INTO categorias ( nombre_categoria ) VALUES
('cerveza'), 
('snacks'), 
('licores')