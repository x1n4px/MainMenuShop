package com.MainMenuShop.MainMenuShop.dto;

import com.MainMenuShop.MainMenuShop.entities.Productos;
import lombok.*;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode
@ToString
public class ProductosOnlineDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String referencia;
    private String nombre;
    private String marca;
    private String categoría;
    private String nutricion;
     private String familia;
    private String etapaVida;
    private String tamañoRaza;
    private String cuidadosEspecificos;
    private String sabores;
    private String material;
    private String efectivoContra;
    private double precioNeto;
    private double ivaAsociado;
    private double peso;
    private String imagen;
    private String descripcion;



    public static ProductosOnlineDTO fromProducto(Productos producto) {
        var dto = new ProductosOnlineDTO();
        dto.setId(producto.getId());
        dto.setReferencia(producto.getReferencia());
        dto.setNombre(producto.getNombre());
        dto.setMarca(producto.getMarca());
        dto.setCategoría(producto.getCategoría());
        dto.setNutricion(producto.getNutricion());
         dto.setFamilia(producto.getFamilia());
        dto.setEtapaVida(producto.getEtapaVida());
        dto.setTamañoRaza(producto.getTamañoRaza());
        dto.setCuidadosEspecificos(producto.getCuidadosEspecificos());
        dto.setSabores(producto.getSabores());
        dto.setMaterial(producto.getMaterial());
        dto.setEfectivoContra(producto.getEfectivoContra());
        dto.setPrecioNeto(producto.getPrecioNeto());
        dto.setIvaAsociado(producto.getIvaAsociado());
        dto.setPeso(producto.getPeso());
        dto.setImagen(producto.getImagen());
        dto.setDescripcion(producto.getDescripcion());
         return dto;
    }

    public Productos toProducto() {
        var producto = new Productos();
        producto.setId(id);
        producto.setReferencia(referencia);
        producto.setNombre(nombre);
        producto.setMarca(marca);
        producto.setCategoría(categoría);
        producto.setNutricion(nutricion);

        producto.setFamilia(familia);
        producto.setEtapaVida(etapaVida);
        producto.setTamañoRaza(tamañoRaza);
        producto.setCuidadosEspecificos(cuidadosEspecificos);
        producto.setSabores(sabores);
        producto.setMaterial(material);
        producto.setEfectivoContra(efectivoContra);
        producto.setPrecioNeto(precioNeto);
        producto.setIvaAsociado(ivaAsociado);
        producto.setPeso(peso);
        producto.setImagen(imagen);
        producto.setDescripcion(descripcion);
        return producto;
    }
}
