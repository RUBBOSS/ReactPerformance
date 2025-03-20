import { Country } from '../types/Country';

interface CountryCardProps {
  country: Country;
}

function CountryCard({ country }: CountryCardProps) {
  const { name, population, region, flags } = country;

  return (
    <div className="rounded-md overflow-hidden shadow-md bg-white dark:bg-gray-700">
      <img
        src={flags.png}
        alt={flags.alt || `Flag of ${name.common}`}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg mb-2">{name.common}</h2>
        <p>
          <span className="font-semibold">Population:</span>{' '}
          {population.toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Region:</span> {region}
        </p>
      </div>
    </div>
  );
}

export default CountryCard;
