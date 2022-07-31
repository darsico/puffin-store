import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCartStore, useStore } from '../../store';

const ProductCard = ({ singleProduct, device }) => {
  const [localVariantOption, setLocalVariantOption] = useState(0);
  const { name, price, productImages, salePrice, id } = singleProduct.variants[localVariantOption];
  const { setCart } = useCartStore((state) => state);
  const { setIsOpenCart, changeInitialVariant } = useStore((state) => state);
  const image = productImages[0];

  const productToOrder = {
    productImage: [image],
    productId: id,
    name: singleProduct.name,
    device: device,
    price: salePrice || price,
    quantity: 1,
    color: singleProduct.variants[localVariantOption].name,
  };

  const handleVariantChange = (index, variantId, designId) => {
    setLocalVariantOption(index);
    changeInitialVariant(variantId, designId);
  };

  const handleAddToCart = () => {
    setCart(productToOrder);
    setIsOpenCart(true);
  };

  return (
    <div className="flex flex-col justify-center gap-3 shadow-lg rounded-md ">
      <Link href={`/shop/${singleProduct.slug}`}>
        <div className="h-60 hover:cursor-pointer">
          <figure style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image src={image} alt={`Foto de producto ${singleProduct.name}`} className="object-cover object-center w-full h-full rounded-lg " layout="fill" objectFit="contain" priority />
          </figure>
        </div>
      </Link>
      <div className="flex flex-col justify-start px-4 pb-3">
        <Link href={`/shop/${singleProduct.slug}`}>
          <div className="hover:cursor-pointer">
            <div className="grid grid-cols-[2fr_1fr] justify-center items-start  tracking-tight">
              <p className="text-2xl leading-6">{singleProduct.name}</p>
              <p>{name}</p>
            </div>
            <div className="flex gap-2 pt-1">
              <p className="text-xl ">{`S/. ${salePrice || price}`}</p>
              <p className="text-base text-gray-500 line-through"> {salePrice ? `S/. ${price}` : ''}</p>
            </div>
          </div>
        </Link>
        <div className="flex gap-4 pt-2 h-fit w-fit">
          {singleProduct.variants.map((variant, index) => {
            return (
              <figure className={`${localVariantOption === index ? 'border-orange-700  border-4 ' : 'border-gray-500 border-2 '} rounded-full w-7 h-7 hover:cursor-pointer`} key={variant.id} onClick={() => handleVariantChange(index, variant.id, singleProduct.id)}>
                <img src={variant.textureImage} alt="" className="object-cover object-center w-full h-full rounded-full" />
              </figure>
            );
          })}
        </div>
        <button className="w-full p-2 mt-6 text-xl transition-all border border-gray-600 hover:bg-black hover:text-white" onClick={handleAddToCart}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
