import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Tag {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    tags: Tag[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tags', href: '/tags' },
];

export default function Index({ tags }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this tag?')) {
            destroy(`/tags/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tags" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Tags</CardTitle>
                        <Button asChild>
                            <Link href="/tags/create">Create Tag</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <table className="w-full text-sm">
                                <thead className="border-b bg-muted/50">
                                    <tr>
                                        <th className="p-4 text-left font-medium">Name</th>
                                        <th className="p-4 text-left font-medium">Slug</th>
                                        <th className="p-4 text-right font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tags.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="p-4 text-center text-muted-foreground">
                                                No tags found.
                                            </td>
                                        </tr>
                                    ) : (
                                        tags.map((tag) => (
                                            <tr key={tag.id} className="border-b">
                                                <td className="p-4">{tag.name}</td>
                                                <td className="p-4">{tag.slug}</td>
                                                <td className="p-4 text-right space-x-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/tags/${tag.id}/edit`}>Edit</Link>
                                                    </Button>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(tag.id)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
