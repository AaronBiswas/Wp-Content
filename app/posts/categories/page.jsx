import { getAllCategories } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import BackButton from "@/components/back";
import Link from "next/link";

export const metadata = {
  title: "Categories",
  description: "Browse all categories of our blog posts",
  alternates: {
    canonical: "/posts/categories",
  },
};

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <Section>
      <Container className="space-y-6">
        <Prose className="mb-8">
          <h2>Categories</h2>
          <ul className="grid">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/posts/?category=${category.id}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </Prose>
        <BackButton />
      </Container>
    </Section>
  );
}
