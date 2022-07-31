import { useStore } from '../../store';
import { motion } from 'framer-motion';
const Options = ({ variants }) => {
  const { setVariantOption, variantOption } = useStore((state) => state);
  const variantId = variantOption.id;
  return (
    <div className="flex flex-col h-fit w-fit gap-2">
      <h5>
        Variante: <span className="font-medium">{variantOption.name}</span>
      </h5>
      <div className="flex h-fit w-fit gap-4">
        {variants.map((item, index) => {
          const { id, name } = item;
          return (
            <motion.button key={index} onClick={() => setVariantOption(id)} title={name} className={`${variantId === id ? 'border-4 border-orange-700 rounded-full' : ''}`}>
              <figure className="w-14 h-14">
                <img src={item.textureImage} className="object-cover object-center w-full h-full rounded-full" />
              </figure>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Options;
