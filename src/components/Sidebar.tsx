import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const categories = [
  { id: 'warhammer-40k', name: 'Warhammer 40K' },
  { id: 'age-of-sigmar', name: 'Age of Sigmar' },
  { id: 'modeling', name: 'Modeling & Painting' },
  { id: 'tactics', name: 'Tactics & Strategy' },
  { id: 'events', name: 'Community Events' },
  { id: 'beginners', name: 'Beginner\'s Guide' },
  { id: 'lore', name: 'Lore & Background' },
];

export default function Sidebar() {
  const router = useRouter();
  const currentCategory = router.query.category as string;

  return (
    <aside className="w-64 bg-white p-4 shadow-md">
      <nav>
        <h2 className="mb-4 text-lg font-semibold text-warhammer-800">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/category/${category.id}`}
                className={clsx(
                  'block rounded-md px-3 py-2 text-sm',
                  currentCategory === category.id
                    ? 'bg-warhammer-100 text-warhammer-800'
                    : 'text-warhammer-600 hover:bg-warhammer-50'
                )}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}