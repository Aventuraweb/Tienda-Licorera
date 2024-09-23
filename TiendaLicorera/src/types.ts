export interface Product {
    idproducto: number;
    nombre_producto: string;
    precio: string;
    image_url: string;
    idcategoria: string; 
    nombre_categoria: string; 
    borderColor?: string;
  }

export interface Categoria {
    idcategoria: number; 
    nombreCategoria: string;
  }

 export interface CategoriaClases {
    borderColor: string;
    bgColor: string;
  }
  
// export interface ProductWithInitials extends Product {}
//   const initialProducts: ProductWithInitials[] = [
//   { idproducto: 1, nombreProducto: "Tres Cordilleras", precio: '6000', imagen: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928312/3-cordilleras_jfngny.png", idcategoria: 'cervezas' },
//   { idproducto: 2, nombreProducto: "Stella artois", precio: '7000', imagen: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928357/220812050604_stellaartois-adlatina_sjmlvu.jpg",  idcategoria: 'cervezas' },
//   { idproducto: 3, nombreProducto: "Aguila", precio: '4000', imagen: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928362/AGUILA-BOTELLA-600x600_fqymnv.jpg",  idcategoria: 'cervezas' },
//   { idproducto: 4, nombreProducto: "Papas", precio: '4000', imagen: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928344/815CKByawWL._AC_UF894_1000_QL80__rjybat.jpg", idcategoria: 'snacks' },
//   { idproducto: 5, nombreProducto: "Chocolatinas", precio: '5000', imagen: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928318/450_1000_asqwvr.jpg", idcategoria: 'snacks' },
//   { idproducto: 6, nombreProducto: "Bom-Bom-Gum", precio: '7000', imagen: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928383/images_agyhff.jpg", idcategoria: 'snacks' },
//   { idproducto: 7, nombreProducto: "Buchanan`s", precio: '110000', imagen: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928412/unnamed_6_53de1a21-b4d5-4ee5-a488-a796896e9011_bm7ahw.webp", idcategoria: 'licores' },
//   { idproducto: 8, nombreProducto: "Ron", precio: '58000', imagen: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928396/Imagenes-03-Licores-preferidos-Colombianos_dpirrn.jpg", idcategoria: 'licores' },
//   { idproducto: 9, nombreProducto: "Baylis", precio: '50000', imagen: "https://res.cloudinary.com/dd3oucmlo/image/upload/v1725928368/depositphotos_118386876-stock-photo-bottles-of-assorted-hard-liquor_f4isno.webp", idcategoria: 'licores' },
//   ];