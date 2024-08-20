class Producto {
  constructor(nomb, precio) {
    this.nombre = nomb;
    this.precio = precio;
  }
}

class Carrito {
  constructor(compra) {
    this.compra = compra;
  }
}

const Leche = new Producto("Leche", 1000);
const PanDeMolde = new Producto("Pan de Molde", 2000);
const Queso = new Producto("Queso", 1200);
const Mermelada = new Producto("Mermelada", 890);
const Azucar = new Producto("Azúcar", 1300);

const ListaProductos = [Leche, PanDeMolde, Queso, Mermelada, Azucar];
let Compra = [];

function agregarProducto() {
  const numProd = Number(
    prompt("Ingrese el número del producto que desea agregar al carrito:")
  );
  if (numProd >= 1 && numProd <= 5) {
    const prodSelecc = ListaProductos[numProd - 1];
    const cantidadProducto = Number(
      prompt("Ingrese la cantidad de unidades: ")
    );
    const precioTotal = Number(prodSelecc.precio * cantidadProducto);

    alert(
      `Se agregaron ${cantidadProducto} ${prodSelecc.nombre}(s) al carrito`
    );

    const prodRepetido = Compra.map(elem => elem.nombre).includes(
      prodSelecc.nombre
    );

    if (prodRepetido) {
      const indice = Compra.map(elem => elem.nombre).indexOf(prodSelecc.nombre);

      Compra[indice].cantidadProducto += cantidadProducto;
      Compra[indice].precioTotal += precioTotal;
    } else {
      const prodFinal = {
        nombre: prodSelecc.nombre,
        precio: prodSelecc.precio,
        cantidadProducto: cantidadProducto,
        precioTotal: precioTotal,
      };
      Compra.push(prodFinal);
    }
  } else {
    alert("Por favor ingrese un número de producto válido");
  }
}

function totalCompra() {
  const valorTotal = Compra.map(elem => elem.precioTotal);
  const suma = valorTotal.reduce((a, b) => a + b);
  return suma;
}

function mostrarDetalles() {
  const carrito = new Carrito(Compra);
  const valorTotal = totalCompra();
  let mensaje = `Detalles del carrito: \n`;
  carrito.compra.forEach(
    elem =>
      (mensaje += `x${elem.cantidadProducto} ${elem.nombre} - Total: $${elem.precioTotal} \n`)
  );
  const confirmacion = prompt(
    `${mensaje}\nValor total: $${valorTotal}\n¿Desea finalizar compra? (s/n)`
  );
  return confirmacion;
}

function finalizarCompra() {
  const confirmacion = mostrarDetalles();
  if (confirmacion === "s") {
    alert(`Compra exitosa!\nTotal: $${totalCompra()}`);
    Compra = [];
  }
}
