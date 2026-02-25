import { Link } from "react-router-dom";

const CategoryCard = ({ title, image }) => {
  return (
    <Link to={`/category/${title.toLowerCase()}`} className="block">
      <div className="cursor-pointer bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <h3 className="text-center py-4 text-lg font-medium">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;