import Update from "@/app/colles/update/[id]/update";

export const dynamicParams = true;
export const revalidate = 3600; // The amount of seconds before the page revalidates

export async function generateStaticParams() {
    // Generate two pages at build time and the rest (3-100) on-demand
    return [];
}

export default function Page({ params }: { params: { collaId: string } }) {
    return <Update params={params} />;
}